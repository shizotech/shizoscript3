# miniagent runtime flow: web UI, Telegram router, goals and signals

This is the operational contract after the 2026-11-07 alignment. It describes what actually
happens when a prompt is sent from the web UI or from the Telegram router, which directories
are read, how a worker subprocess is spawned, and how a task's terminal state reaches the owner.

## 1. Storage roots (no current-working-directory dependency)

```
std.user_path()/miniagent/
  node/                              the node's own mind
    .agentspace/                     node-level goals, preferences, ledger
    .megamind/architecture/          node-level architecture graph
  workspaces/                        the workspace registry (root workspace)
    workspaces.json                  registry
    settings.json                    max_sessions
    <workspace>/                     a real project workspace
      .agentspace/                   that workspace's goals, preferences, ledger
      .megamind/sessions/<sid>/      session.json, chat.json, chat.json.result.json, config.json
      .megamind/architecture/        that workspace's architecture graph
```

`miniagent_storage.shio` owns the path helpers. `node.shio`, `goals.shio`, `web_ui.shio` and
`workspaces.shio` use them, so starting a node from any directory does not create `./.agentspace`.

The synthetic `root` workspace is the registry container; it does not get a project `.agentspace`.
Every real workspace scheduler is started when the node/web UI starts, and a newly created
workspace gets its scheduler immediately.

## 2. Web UI prompt flow

`shz miniagent --web` (or `shz miniagent.node --web`):

1. `__init__.shio` sees `--web` / `--node` / `--web=<port>` and loads `node.shio`.
2. `node.shio` creates a `Megamind` host: one receptionist agent + `max_workers` worker threads,
   and starts the ShizoNet AI node service.
3. It starts the node-level `GoalScheduler` on `std.user_path()/miniagent/node/.agentspace`
   (unless `--no-goals` / `--agentspace` says otherwise).
4. `web_ui_start()` starts the HTTP server on port 13337 (or `--port`), registers the node JSON
   API, the legacy chat (`/api/adminagent`), the legacy architecture routes, and
   `workspaces_api_register()`.
5. `workspaces_api_register()` creates:
   - `WorkspaceStore()` at `std.user_path()/miniagent/workspaces`
   - `SessionManager(store, cfg)`, which loads every saved `session.json` from every workspace's
     `.megamind/sessions/`
   - schedulers for every registered real workspace (`workspaces_start_all_schedulers`)
6. The dashboard (`web/index.html`, `web/dashboard.js`) talks to the workspace API:
   - `GET /api/workspaces` -> tree, settings, stats
   - `POST /api/workspaces/<id>/sessions` -> new session (title, mode, prompt, reasoning_effort)
   - `POST /api/sessions/<id>/prompt` -> prompt into an existing session
   - `POST /api/sessions/<id>/effort` -> persist low/medium/high reasoning effort for future turns
   - `GET /api/sessions/<id>/stream` -> SSE (`delta`, `user`, `status`, `done`, `error`, `stats`)
7. Creating a session (`SessionManager.create_session`) writes `session.json` and `config.json`
   below the workspace's `.megamind/sessions/<sid>/`, then spawns a subprocess:

   ```
   std.local_executable() workspace_agent.shio
       --workspace <workspace path>
       --config-file <session dir>/config.json
       --session-id <sid>
       --history-file <session dir>/chat.json
       --reasoning-effort low|medium|high
       --role adaptive
       --mode normal|goal
   ```

   The process starts in the workspace directory (`p.start(args, w.path, false)`), and
   `workspace_agent.shio` also does `std.cd(workspace)`.
8. `workspace_agent.shio`:
   - loads `chat.json` (the complete conversation, source of truth) and imports it into the agent;
   - creates `GoalSpace(workspace + "/.agentspace")` and a `GoalScheduler` for its goal tools;
   - registers `get_goals`, `create_goal`, `create_recurring_goal`, `update_goal`,
     `set_goal_status`, `run_goal_now`, `create_workspace_task`, `goal_finish`;
   - registers the architecture board at `workspace + "/.megamind/architecture"`;
   - emits one JSON object per stdout line: `ready`, `delta`, `stats`, `done`, `error`.
9. The parent `SessionManager.pump()` thread reads those lines and updates `session.json`,
   pushes SSE events, and calls the finished-task listeners (the workspace goal scheduler).
   The chat itself is loaded from `chat.json`; `session.json.events` is only a bounded replay
   window, not a second transcript.
10. A new prompt while the turn is running:
    - `send_prompt()` sends `{"type":"interrupt"}` then `{"type":"prompt",...}`.
    - `workspace_agent.shio`'s protocol reader calls `agent.stop()` and queues the new prompt.
    - `run_turn()` sees the stopped result, breaks the old turn, and starts the new prompt on the
    same thread. The old turn does not emit a `done`; the new turn owns the terminal result.
11. Terminal result:
    - the adaptive `signal` tool is the single model endpoint:
      `signal(event=finished|failed|question, report=...)`;
    - `run_turn()` reads `agent.env.signal_event` and emits
      `{"type":"done","status":"finished|failed|question",...}`.
    - `goal_finish(status=finished|failed)` is an alias used by Loop mode.
    - a `question` is terminal and needs the owner; it is not mapped to `failed`.
    - an exited subprocess with a matching `chat.json.result.json` is recovered as
      `finished|failed|question`; an exit without a terminal result is reported as `failed`
      with the reason. It is not silently restarted.
12. Scheduled goals in a workspace:
    - `GoalScheduler` ticks every 15 s, rescans the workspace `.agentspace`, activates windows
      exactly once, and calls `WorkspaceHost.add_task(...)`.
    - `WorkspaceHost.add_task` calls `SessionManager.create_session(workspace_id, name, "normal",
      goal, "adaptive")`, i.e. the goal run is a subprocess session in that same workspace
      directory. The scheduler settles it through `inspect_task` / the finished listener.
    - The node-level `Megamind` goal scheduler uses the node's own worker pool at
      `std.user_path()/miniagent/node/.agentspace`.

## 3. Telegram router prompt flow

`shz telegram_router.shio --bot-token ...`:

1. `TelegramRouter(cfg, opts)` builds a `Router` (a `miniagent` with the `router` role) and
   starts the ShizoNet router service.
2. The trusted-chat list is read from `trusted_chats` (default `std.config_path("miniagent",
   "trusted_chats")`). No file / empty list -> the first chat that messages the bot becomes the
   trusted chat and is written to disk. Untrusted chats are ignored.
3. The bot transport's `on_any_message` calls `TelegramRouter.tg_handle_message`:
   - text and text documents (`.md`, `.txt`, `.json`, code, up to 256 KB) are accepted;
   - the caption of a document is the instruction;
   - a burst of messages from the same chat within 1500 ms becomes one turn;
   - commands such as `/nodes`, `/tasks`, `/status`, `/goals`, `/goal ...`, `/allow`, `/deny`,
     `/forget`, `/help`, `/id` are handled locally or in the worker thread.
4. `tg_worker()` sends queued notifications and runs one router-agent turn at a time.
   Telegram HTTP never runs on the ShizoNet thread.
5. The router-agent turn (`roles/router`) gets `get_nodes`, `get_node_overview`, `get_tasks`,
   `start_task`, `update_task`, `stop_task`, `inspect_task`, `get_last_actions`, `notify`,
   `finish(report)`. The agent reads the node table and picks a node; it does not keyword-match.
6. `Router.add_task(node, goal)`:
   - refuses an unknown/offline node with a concrete reason;
   - is idempotent for the same goal on the same node while the task is open;
   - default mode `receptionist` sends `ai_request` to the node's receptionist and stores the
   mirror record with `remote_request_id`;
   - mode `worker` sends `ai_task_add` directly to the node's worker pool.
7. The router poller (`poll_ms`, default 1000) polls open mirror records:
   - `ai_request_poll` for delegated receptionist turns;
   - `ai_task` for worker tasks;
   - node refresh every 5 s; the router announces node online/offline itself.
8. Terminal task states are mirrored and emitted as `task_state`:
   `queued | generating | finished | failed | question | stopped | lost`.
   `task_finished` from the node is deduplicated against the poller transition; Telegram also
   keeps one terminal message per taskid. A plain finished goal run produces one terminal task
   message, not a second goal-status message.
9. `lost` is definitive only: after the node has been offline for the grace period
   (`ROUTER_TASK_LOST_GRACE_MS`) or after a definitive `not found` with no report. Transient
   poll failures keep the task open and only update `last_error`. The node's completed
   `ai_request` stays pollable for one hour (`AI_REQUEST_TTL_MS`), so a late poll does not
   turn a completed task into `lost`.
10. Telegram notifications are the owner-facing sink: `task_state` terminal, `task_stalled`,
   node `notify`, and `file` (send_file) are rendered. Node online/offline, running progress,
    and tool calls are silent unless `--verbose-events` is used.

## 4. The single signal contract

| State | Produced by | Meaning |
|---|---|---|
| `finished` | `signal(event=finished, report)` / `goal_finish(status=finished)` / a normal turn result | the task met its contract; report is the result |
| `failed` | `signal(event=failed, report)` / `goal_finish(status=failed)` / crash, API failure, exit without result | the task could not complete; report is the reason |
| `question` | `signal(event=question, report)` | terminal; the owner must answer before work continues |
| `stopped` | `stop_task`, window end, pause/cancel | the task was intentionally stopped |
| `lost` | router only | the node/task is definitively gone after grace or a definitive not-found |

The model does **not** invent `lost`; it only emits `finished`, `failed`, `question`. `lost` is a
transport/mirror observation, not a model signal. This keeps the Telegram messages truthful:
a task with a complete execution log is not reported as lost because a poll hiccupped.
