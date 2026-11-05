# web/ — the web interface of a node

Served by `web_ui.shio` when a node runs with `--web` (`shz miniagent --web`). Plain
HTML / CSS / JS, no build step and no CDN: the pages work without internet.

```
web/
├── index.html, dashboard.js/.css   the shell: one sidebar workspace tree + main pane (no iframe)
├── chat/                           chat with the node's receptionist (POST /api/adminagent, /poll, /stop)
├── tasks/                          the worker tasks (/api/tasks, /api/status, /api/events, POST/PUT/DELETE /api/task)
├── architecture/                   the architecture graph (/api/architecture/..., ../architecture_spec.md)
│   ├── graph.js                    SVG renderer, layout, editing, side panel
│   └── style.css
├── components/
│   ├── nodeapi.js                  fetch helper: the {ok, data} envelope, the API token (X-Api-Token)
│   ├── icons.css                   the fa-* icon classes as plain glyphs (no Font Awesome download)
│   ├── minimd.js                   small Markdown renderer + highlight.js stand-in for the chat
│   ├── theme.css, ui.css, utils.js shared theme (green / black) and helpers
└── cow_lays_eggs.html              the secret egg
```

Notes for changes:

* An empty list arrives as `{}` (ShizoScript json): turn API lists into arrays before
  using them (`Array.isArray(x) ? x : Object.values(x || {})`).
* With `--api-token` every `/api/` call needs the token; `NodeApi` asks once and keeps it
  in `localStorage` (`?token=<t>` in the URL sets it as well).
* The API is documented in `../node_api.md` (node) and `../architecture_spec.md` (graph).
* The session SSE URL is `/api/sessions/<id>/stream?token=<t>&since=<seq>`. EventSource cannot
  send headers, so the token is accepted as a query value; `since` stops the page from
  replaying the history it already rendered. The route sets `Content-Type: text/event-stream`.
* On restart the session manager loads the saved `session.json` files from each workspace's
  `.megamind/sessions/`; sessions that were running are marked stopped.
* A workspace that already has a legacy `.agentspace/architecture.json` gets it copied into
  `.megamind/architecture/architecture.json` when the workspace is created.
## Workspace dashboard (issue #907)

`index.html`, `dashboard.css` and `dashboard.js` are the workspace dashboard. They replace the
old node-scoped navigation with a recursive workspace tree; each workspace has sessions,
architecture and tasks under its own `.megamind/`. Chat streams through
`GET /api/sessions/<id>/stream`; a new prompt interrupts the running turn. Settings edits
`max_sessions`; live token/usage stats and notifications are shown in the shell.
API contract: `../workspace_spec.md`. The old `chat/`, `tasks/` and `architecture/` pages remain
as standalone files but are no longer the dashboard's primary navigation.
