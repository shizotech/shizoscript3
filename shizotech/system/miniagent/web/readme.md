# web/ — the web interface of a node

Served by `web_ui.shio` when a node runs with `--web` (`shz miniagent --web`). Plain
HTML / CSS / JS, no build step and no CDN: the pages work without internet.

```
web/
├── index.html, dashboard.js/.css   the shell: sidebar, header (node status, notifications), one iframe per page
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
