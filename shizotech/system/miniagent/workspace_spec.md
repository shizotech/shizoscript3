# miniagent workspace + session spec (issue #907)

The node's web UI becomes a workspace tree, and every workspace owns its own `.megamind`:
sessions, architecture and tasks live inside the workspace directory, not in the node's CWD.

## Files

| Path | Owner | Purpose |
|---|---|---|
| `workspaces.shio` | backend | `WorkspaceStore`, `SessionManager`, `WorkspaceHost`, API registration |
| `workspace_agent.shio` | backend | subprocess session agent, JSON line protocol |
| `workspaces_selftest.shio` | backend | store / settings / protocol tests |
| `web/index.html`, `web/dashboard.css`, `web/dashboard.js` | frontend | workspace dashboard |
| `web/*` existing modules | frontend may reuse components, must not rewrite archive/chat/tasks pages |
| `web_ui.shio` | parent | includes and registers `workspaces.shio` |
| `telegram_router.shio` | follow-up | client mode |

## User data root

`store_root = std.user_path() + "/miniagent/workspaces"`

- The global workspace is the root directory itself.
- `workspaces.json` is the registry.
- `settings.json` holds `max_sessions` (default 2).
- Every workspace directory has `.megamind/` with:
  - `.megamind/sessions/<session_id>/session.json`
  - `.megamind/sessions/<session_id>/config.json`
  - `.megamind/architecture/architecture.json`
  - `.megamind/tasks/goals/...` (goal engine root)

Workspaces are bound to physical directories and can be nested. `parent` is a workspace id;
a child created without an explicit path goes below the parent's directory. Existing directories
are reused; missing directories are created. `.megamind` is created if missing.

## Workspace object

```json
{"id":"...","name":"...","path":"...","parent":"...","created":123,"description":""}
```

`GET /api/workspaces` returns `{tree, workspaces, settings, stats}`.
`POST /api/workspaces` takes `{name, path?, parent?}` and returns the workspace.
`GET /api/workspaces/<id>` returns workspace, sessions, architecture state and task overview.
`DELETE /api/workspaces/<id>` removes the registry entry only, refuses when children exist.

## Session object

```json
{"id":"...","workspace_id":"...","title":"...","mode":"normal|goal",
 "status":"starting|running|waiting|done|failed|stopped",
 "prompt":"...","events":[...],"token_usage":0,"created":123,"updated":123}
```

Routes:

- `GET /api/workspaces/<id>/sessions`
- `POST /api/workspaces/<id>/sessions` body `{title?, mode?, prompt?}`; at most `max_sessions`
  active sessions globally.
- `GET /api/sessions/<id>`
- `POST /api/sessions/<id>/prompt` body `{prompt}`; interrupts the running turn, then sends
  the new prompt.
- `POST /api/sessions/<id>/mode` body `{mode}`.
- `POST /api/sessions/<id>/stop`
- `GET /api/sessions/<id>/stream` => SSE `delta`, `user`, `status`, `done`, `error`, `stats`
- `GET /api/settings`, `PUT /api/settings` body `{max_sessions}`
- `GET /api/stats` => active sessions, running processes, token usage per session.

## Session agent protocol

`workspace_agent.shio` runs in the workspace directory, with `--workspace`, `--config-file`,
`--session-id`, `--role`, `--mode`. It emits one JSON object per line on stdout:

```json
{"type":"ready","session_id":"..."}
{"type":"delta","action":{...}}
{"type":"done","ok":true,"status":"finished|failed","report":"...","token_usage":0}
{"type":"error","message":"..."}
{"type":"stats","token_usage":0}
```

It reads stdin JSON lines:

```json
{"type":"prompt","text":"..."}
{"type":"interrupt"}
{"type":"mode","mode":"normal|goal"}
{"type":"stop"}
```

A new prompt while a turn runs interrupts: the agent calls `stop()`, the turn returns, and the
new prompt is taken next. Goal mode loops the same prompt until the agent calls a `goal_finish`
tool with `status=finished` or `status=failed`; a crash / API failure / process exit before a
terminal state is retried by the session manager with backoff. Normal mode also retries an
API-level failure but stops on an explicit `failed` report.

## Architecture and tasks

For a workspace `W`:

- `ArchitectureBoard(WorkspaceHost(manager, W.id), W.path + "/.megamind/architecture", role)`
- `GoalScheduler(W.path + "/.megamind/tasks", WorkspaceHost(manager, W.id))`

`WorkspaceHost` is duck-typed like `Megamind`:

- `add_task(name, goal, role)` -> session id
- `inspect_task(taskid)` -> `{state, report, name, ...}` (state: planned/running/done/failed)
- `stop_task(taskid)`
- `update_task(taskid, message)`
- `background_capacity()`
- `add_task_finished_listener(cb)`
- `notify_user(msg)`

API routes for architecture/tasks mirror the existing node routes under
`/api/workspaces/<id>/architecture/...` and `/api/workspaces/<id>/tasks/...`.

## Frontend contract

Single page at `/`. Sidebar: recursive workspace tree, global tasks, settings, live stats.
Main: selected workspace header, sessions, chat with normal/goal toggle, architecture graph tab,
tasks tab. SSE keeps the chat fluid; animations for running/working states. No CDN.
The session agent also registers `create_task` (goal engine) so a chat can turn a prompt into a
regular/recurring task in the workspace. Retry has no attempt cap: the manager restarts an exited
non-terminal process, and the agent retries API failures with backoff capped at 30 s.

## Follow-up fixes for the last #907 comment

- The SSE route sets `Content-Type: text/event-stream` (it used to merge the JSON content type
  into the header set), accepts `?token=<t>` because EventSource cannot send headers, and
  accepts `?since=<last_seq>` so the dashboard does not replay history it already rendered.
- `SessionManager` loads every `session.json` from each workspace's `.megamind/sessions/` on
  start. Non-terminal saved sessions are marked stopped because their subprocess is gone.
- `WorkspaceStore.ensure_megamind` copies a legacy `.agentspace/architecture.json` into
  `.megamind/architecture/architecture.json` when that workspace has no per-workspace graph.
- Task API: `GET /api/workspaces/<id>/tasks` returns `{goals, sessions, templates}`;
  `POST /api/workspaces/<id>/goals` creates a validated goal (via `goal_tool_create`), and
  `POST /api/workspaces/<id>/goals/<goal_id>/status` moves a proposed goal to active/paused.
- The dashboard has one sidebar: workspace tree with the selected workspace's sessions nested
  below it. A `+` creates an empty session immediately with an auto title (the first prompt
  renames it); there is no session popup. Tasks are split into Active, Proposed, Templates and
  Finished; the task menu can start a normal/goal session task. Architecture has Analyze,
  Review plan, Apply and Discard buttons and imports an existing legacy model.
