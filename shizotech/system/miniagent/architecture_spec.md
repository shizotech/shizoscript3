# Architecture graph (`architecture.shio`, `web/architecture/`)

A high-level map of the codebase a node works on, shown as a node graph in the web
interface (`shz miniagent --web`). The owner designs on that map instead of writing long
specs: edits in the graph are collected as **pending changes**, a worker can write a
**plan** for them, and only **Apply** lets a worker change the code.

```
            Analyze / Re-sync                     Review plan (optional, repeatable)
   worker ──────────────────► architecture.json ──────────────────► architecture_plan.md
   reads the code              nodes, edges,       pending edits      (no code changes)
                               pending, plan, job       │
   owner edits the graph ──────────────────────────────►│
                                                        ▼  Apply
                                              worker implements the edits;
                                              on "finished" they become the model
```

Everything runs on the node's own task system: every job is one `Megamind.add_task`
task (it shows in the Tasks page, the Telegram router and `/api/tasks` like any other
task), its end arrives through `Megamind.add_task_finished_listener`.

## Files (in the agent space, `.agentspace/` by default, `--agentspace <dir>`)

| File | Written by | What |
|---|---|---|
| `architecture.json` | the board (code) | the model: nodes, edges, pending edits, plan, the last job, history |
| `architecture.analysis.json` | the analysis worker | the raw analysis; the board validates and merges it |
| `architecture_plan.md` | the plan worker | the plan the owner reads before Apply |

Workers never write `architecture.json`: the board merges their output, so a re-sync
cannot lose pending edits or the positions the owner arranged. A file that cannot be
read is moved to `architecture.json.corrupt-<ms>` and the board starts empty.

## `architecture.json`

```json
{
  "version": 1, "project": "demo", "summary": "two or three sentences",
  "revision": 3, "analyzed_at": "2026-10-28 18:00:00",
  "nodes": [{"id": "core", "label": "Core", "kind": "module", "group": "back",
             "path": "src/core.cpp", "purpose": "one line", "x": 120.0, "y": 80.0}],
  "edges": [{"id": "app>core:calls", "source": "app", "target": "core",
             "kind": "calls", "label": "run()"}],
  "pending": [{"id": "e1793…-ab12", "op": "add_node", "node": {…}, "note": "…", "created": 1793…}],
  "plan": {"text": "# Plan …", "edit_ids": ["e…"], "outdated": false, "feedback": "", "taskid": "…"},
  "job": {"kind": "apply", "taskid": "…", "state": "implement", "started": 1793…,
          "report": "", "error": "", "edit_ids": ["e…"]},
  "history": [{"kind": "apply", "time": 1793…, "taskid": "…", "report": "…", "edits": 2}]
}
```

* node `kind`: `module file service ui data external test config`; edge `kind`:
  `calls data includes events network` (source uses / sends to target). Unknown kinds fall
  back to `module` / `calls`. An analysis may write `from` / `to` instead of
  `source` / `target` and leave out ids (made from the label).
* `x` / `y`: the position on the page (`POST /api/architecture/layout`); nodes without
  one are placed by the page's layout and then stored.
* An empty list is written as `{}` (ShizoScript json); readers treat it as `[]`.

## Pending edits

| op | fields | check |
|---|---|---|
| `add_node` | `node` = label, kind, group, path, purpose (x, y) | a taken id gets `-2`, `-3`, … |
| `update_node` | `target`, `node` = the changed fields | the node exists, is not pending add / remove |
| `remove_node` | `target` | its edges go with it |
| `add_edge` | `edge` = source, target, kind, label | both nodes exist (pending new nodes count), no self loop, no duplicate |
| `update_edge` | `target`, `edge` = kind / label | |
| `remove_edge` | `target` | |

Every edit may carry a `note` for the worker. Dropping an `add_node` edit drops the edits
that depend on it. The page shows the model **with** the edits applied, marked
(`pending` = add / update / remove). While an Apply runs no edits are accepted; an edit
added or dropped after a plan was written marks the plan `outdated`.

## Jobs (one at a time)

| Button | Task | When it ends `finished` | Otherwise |
|---|---|---|---|
| Analyze / Re-sync | `Architecture-Analysis`: write `architecture.analysis.json` | validated, merged (ids keep positions, pending stays), `revision + 1` | the model stays, `job.error` says why (invalid JSON, unknown node ids, no file) |
| Review plan (+ feedback) | `Architecture-Plan`: write `architecture_plan.md`, change no code | `plan` = the file (or the report) | |
| Apply | `Architecture-Apply`: implement the edits (with the plan) | the edits are committed into nodes / edges, the plan is cleared | the edits stay pending, `job.error` = the report |

`question` from a worker is shown as an error with the question. A job whose task the
node does not know after a restart is marked `lost`.

## HTTP (`web_ui.shio`, with the node API token)

| Method | Path | Body |
|---|---|---|
| GET | `/api/architecture` | – (model with the edits applied, pending, plan, live job) |
| POST | `/api/architecture/analyze` | – |
| POST | `/api/architecture/edits` | one edit (table above) |
| DELETE | `/api/architecture/edits/<id>` | – |
| POST | `/api/architecture/discard` | – (all pending edits and the plan) |
| POST | `/api/architecture/layout` | `{"positions": {"<id>": [x, y]}}` |
| POST | `/api/architecture/plan` | `{"feedback": "…"}` (optional) |
| POST | `/api/architecture/apply` | – |

A refused action answers `409` with the reason (`{"ok": false, "error": "…"}`).

## The page

`web/architecture/` — an SVG renderer of its own (no library, no CDN): groups as tinted
areas, node cards coloured by kind, curved edges with arrows (data / events animated),
pending changes in amber (removals in red), pan / zoom / drag, search, hover and
selection dim everything that is not connected. The side panel shows the overview
(pending changes, Review plan, Apply, the plan with a feedback box, history) or the
selected node / connection with its change form, *Connect to…* and *Remove*.

Tests: `shz architecture_selftest.shio` (model, merge, edits, jobs on a fake host, the
`--web` command line).
