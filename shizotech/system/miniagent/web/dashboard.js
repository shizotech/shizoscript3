/* ── Workspace dashboard (issue #907) ──
 * Single-page UI: one sidebar with the recursive workspace tree and the
 * sessions of the selected workspace; chat, architecture and tasks tabs in
 * the main pane. API contract: ../workspace_spec.md.
 * No CDN, no build step.
 */

'use strict';

const $ = (id) => document.getElementById(id);

const arr = (x) => {
  if (Array.isArray(x)) return x;
  if (x && typeof x === 'object') return Object.values(x);
  return [];
};

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const num = (x) => {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
};

const fmtNum = (x) => num(x).toLocaleString();

const timeValue = (x) => {
  if (typeof x === 'number') return x;
  if (typeof x === 'string') {
    const n = Date.parse(x);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

const timeAgo = (x) => {
  const t = timeValue(x);
  if (!t) return 'just now';
  const diff = Math.max(0, Date.now() - t);
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return sec + 's ago';
  const min = Math.floor(sec / 60);
  if (min < 60) return min + 'm ago';
  const hour = Math.floor(min / 60);
  if (hour < 24) return hour + 'h ago';
  return Math.floor(hour / 24) + 'd ago';
};

const statusLabel = (status) => {
  const s = String(status || 'idle');
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const statusClass = (status) => {
  const s = String(status || '').toLowerCase();
  if (s === 'running' || s === 'starting' || s === 'waiting' || s === 'planned') return 'running';
  if (s === 'done' || s === 'finished' || s === 'completed') return 'done';
  if (s === 'failed' || s === 'error' || s === 'cancelled') return 'failed';
  if (s === 'stopped' || s === 'paused' || s === 'archived') return 'stopped';
  return 'idle';
};

const isRunningStatus = (status) => {
  const s = String(status || '').toLowerCase();
  return s === 'running' || s === 'starting' || s === 'waiting' || s === 'planned';
};

let markdownRenderer = null;

function mdRender(text) {
  if (!markdownRenderer) {
    const factory = typeof window.markdownit === 'function' ? window.markdownit : null;
    markdownRenderer = factory
      ? factory({ breaks: true })
      : { render: (s) => '<p>' + esc(s).replace(/\n/g, '<br>') + '</p>' };
  }
  try {
    return markdownRenderer.render(String(text || ''));
  } catch (e) {
    return '<p>' + esc(text || '') + '</p>';
  }
}

const state = {
  workspaces: [],
  byId: {},
  selectedWorkspace: null,
  selectedSession: null,
  session: null,
  sessions: [],
  settings: { max_sessions: 2 },
  stats: {},
  notifications: [],
  notificationSeen: 0,
  view: 'workspace',
  tab: 'chat',
  architecture: null,
  taskData: null,
  stream: null,
  streamSince: 0,
  streamAbort: null,
  currentAgentBubble: null,
  currentAgentText: '',
  pendingUser: null,
  composerMode: 'normal',
  renderingHistory: false
};

function applySettings(raw) {
  const s = raw && raw.settings ? raw.settings : raw;
  if (s && typeof s === 'object') state.settings = Object.assign({}, state.settings, s);
  if (state.settings.max_sessions == null) state.settings.max_sessions = 2;
}

function toast(message, kind = 'info', timeout = 4200) {
  const box = $('toasts');
  if (!box) return;
  const el = document.createElement('div');
  el.className = 'toast ' + kind;
  el.textContent = String(message || '');
  box.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(18px)';
    setTimeout(() => el.remove(), 240);
  }, timeout);
}

function makeEmpty(title, desc) {
  const el = document.createElement('div');
  el.className = 'empty-state';
  el.innerHTML = '<i class="fa-solid fa-comments"></i><div>' + esc(title) + '</div>' +
    (desc ? '<div class="empty-state-desc">' + esc(desc) + '</div>' : '');
  return el;
}

function makeEmptyCompact(title, desc) {
  const el = makeEmpty(title, desc);
  el.classList.add('compact');
  return el;
}

/* ── Settings ── */
async function loadSettings() {
  const data = await NodeApi.get('/api/settings');
  applySettings(data);
}

function openSettings() {
  $('maxSessionsInput').value = num(state.settings.max_sessions) || 2;
  $('settingsDialog').hidden = false;
}

function closeSettings() {
  $('settingsDialog').hidden = true;
}

async function saveSettings() {
  const value = Number($('maxSessionsInput').value);
  if (!Number.isInteger(value) || value < 1) {
    toast('Max sessions must be a positive integer.', 'warn');
    return;
  }
  try {
    await NodeApi.put('/api/settings', { max_sessions: value });
    state.settings.max_sessions = value;
    closeSettings();
    renderStats();
    toast('Settings saved.', 'success');
  } catch (e) {
    toast('Could not save settings: ' + e.message, 'error');
  }
}

/* ── Workspace tree ── */
function flattenWorkspaces(raw) {
  let list = [];
  if (Array.isArray(raw)) {
    list = raw;
  } else if (raw && typeof raw === 'object') {
    if (Array.isArray(raw.workspaces)) list = raw.workspaces;
    else if (Array.isArray(raw.tree)) list = raw.tree;
    else if (raw.workspaces && typeof raw.workspaces === 'object') list = Object.values(raw.workspaces);
    else if (raw.tree && typeof raw.tree === 'object') list = Object.values(raw.tree);
    else list = Object.values(raw);
  }

  const out = [];
  const seen = new Set();
  const walk = (nodes, parentId) => {
    arr(nodes).forEach((w) => {
      if (!w || !w.id || seen.has(w.id)) return;
      seen.add(w.id);
      if (!w.parent && parentId) w.parent = parentId;
      out.push(w);
      if (w.children) walk(w.children, w.id);
    });
  };
  walk(list, null);
  return out;
}

function rootWorkspaces() {
  return state.workspaces
    .filter((w) => !w.parent || !state.byId[w.parent])
    .sort((a, b) => String(a.name || a.id).localeCompare(String(b.name || b.id)));
}

function childrenOf(id) {
  return state.workspaces
    .filter((w) => w.parent != null && String(w.parent) === String(id))
    .sort((a, b) => String(a.name || a.id).localeCompare(String(b.name || b.id)));
}

function renderWorkspaceTree() {
  const host = $('workspaceTree');
  host.innerHTML = '';
  const roots = rootWorkspaces();

  if (!roots.length) {
    host.appendChild(makeEmpty('No workspaces yet.', 'Create one with the + button.'));
    return;
  }

  const built = new Set();

  function renderNode(w) {
    if (!w || built.has(w.id)) return null;
    built.add(w.id);

    const item = document.createElement('div');
    item.className = 'ws-item';

    const row = document.createElement('div');
    row.className = 'ws-row';

    const link = document.createElement('button');
    link.className = 'ws-link' + (state.selectedWorkspace && state.selectedWorkspace.id === w.id ? ' active' : '');
    link.dataset.wsId = w.id;
    link.title = w.path || w.id;
    link.innerHTML =
      '<span class="ws-name">' + esc(w.name || w.id) + '</span>' +
      '<span class="ws-path">' + esc(w.path || '') + '</span>';

    const addSession = document.createElement('button');
    addSession.className = 'ws-add';
    addSession.dataset.addSession = w.id;
    addSession.title = 'New session in this workspace';
    addSession.innerHTML = '<i class="fa-solid fa-plus"></i>';

    const addChild = document.createElement('button');
    addChild.className = 'ws-add ws-child-add';
    addChild.dataset.addChild = w.id;
    addChild.title = 'Add child workspace';
    addChild.innerHTML = '<i class="fa-solid fa-folder-plus"></i>';

    row.appendChild(link);
    row.appendChild(addSession);
    row.appendChild(addChild);
    item.appendChild(row);

    const children = childrenOf(w.id);
    if (children.length) {
      const childBox = document.createElement('div');
      childBox.className = 'ws-children';
      children.forEach((c) => {
        const child = renderNode(c);
        if (child) childBox.appendChild(child);
      });
      item.appendChild(childBox);
    }

    // Sessions of the selected workspace live in the same sidebar, below
    // the workspace row, instead of a second rail.
    if (state.selectedWorkspace && state.selectedWorkspace.id === w.id) {
      const list = arr(state.sessions).slice().sort((a, b) => {
        return (timeValue(b.updated || b.created) || 0) - (timeValue(a.updated || a.created) || 0);
      });

      if (list.length) {
        const sessBox = document.createElement('div');
        sessBox.className = 'ws-sessions';
        list.forEach((s) => {
          const btn = document.createElement('button');
          btn.className = 'session-item' + (state.selectedSession === s.id ? ' active' : '');
          btn.dataset.sessionId = s.id;
          btn.innerHTML =
            '<span class="status-dot ' + statusClass(s.status) + '"></span>' +
            '<span class="session-name">' + esc(s.title || 'Session') + '</span>' +
            '<span class="session-tokens">' + fmtNum(s.token_usage) + ' tok</span>';
          sessBox.appendChild(btn);
        });
        item.appendChild(sessBox);
      }
    }

    return item;
  }

  roots.forEach((w) => {
    const node = renderNode(w);
    if (node) host.appendChild(node);
  });
}

function openWorkspaceForm(parentId) {
  state.newParent = parentId || '';
  const parent = state.newParent ? state.byId[state.newParent] : null;
  $('workspaceParentLabel').textContent = 'Parent: ' + (parent ? parent.name : 'root');
  $('workspaceName').value = '';
  $('workspacePath').value = '';
  $('workspaceForm').classList.remove('hidden');
  $('workspaceName').focus();
}

async function createWorkspace() {
  const name = $('workspaceName').value.trim();
  if (!name) {
    toast('Workspace name is required.', 'warn');
    return;
  }
  const path = $('workspacePath').value.trim();
  const body = { name };
  if (path) body.path = path;
  if (state.newParent) body.parent = state.newParent;

  try {
    const data = await NodeApi.post('/api/workspaces', body);
    const id = data && (data.id || data.workspace_id || data.workspaceId || (data.workspace && data.workspace.id));
    $('workspaceForm').classList.add('hidden');
    await loadWorkspaces();
    if (id && state.byId[id]) await selectWorkspace(id);
    toast('Workspace created.', 'success');
  } catch (e) {
    toast('Could not create workspace: ' + e.message, 'error');
  }
}

/* ── Workspace data ── */
async function loadWorkspaces() {
  const data = await NodeApi.get('/api/workspaces');
  state.workspaces = flattenWorkspaces(data);
  state.byId = {};
  state.workspaces.forEach((w) => { state.byId[w.id] = w; });
  applySettings(data.settings);
  state.stats = data.stats || state.stats;

  renderWorkspaceTree();
  renderStats();

  if (!state.selectedWorkspace) {
    const saved = localStorage.getItem('miniagent_workspace_id');
    const id = saved && state.byId[saved] ? saved : (state.workspaces[0] && state.workspaces[0].id);
    if (id) await selectWorkspace(id);
  }
}

async function selectWorkspace(id) {
  const ws = state.byId[id];
  if (!ws) return;

  state.view = 'workspace';
  state.selectedWorkspace = ws;
  state.selectedSession = null;
  state.session = null;
  state.architecture = null;
  state.taskData = null;
  state.currentAgentBubble = null;
  state.currentAgentText = '';
  localStorage.setItem('miniagent_workspace_id', id);
  closeStream();

  $('workspaceView').hidden = false;
  $('globalTasksView').hidden = true;
  renderHeader();
  renderWorkspaceTree();
  renderSessionHeader();
  setChatEmpty();

  try {
    await refreshWorkspace(id);
  } catch (e) {
    toast('Could not load workspace: ' + e.message, 'error');
  }
}

async function refreshWorkspace(id) {
  const data = await NodeApi.get('/api/workspaces/' + encodeURIComponent(id));
  const ws = data.workspace || data;

  if (ws && ws.id) {
    state.selectedWorkspace = ws;
    state.byId[ws.id] = ws;
    const idx = state.workspaces.findIndex((w) => w.id === ws.id);
    if (idx >= 0) state.workspaces[idx] = Object.assign(state.workspaces[idx], ws);
  }

  applySettings(data.settings);
  state.sessions = arr(data.sessions).map((s) => {
    if (!s || typeof s !== 'object') return null;
    const sid = s.id || s.session_id || s.sessionId;
    return Object.assign({}, s, { id: sid != null ? String(sid) : '' });
  }).filter(Boolean);

  if (data.architecture) state.architecture = data.architecture;
  if (data.goals) state.taskData = { goals: arr(data.goals), sessions: arr(data.tasks), templates: [] };

  renderHeader();
  renderWorkspaceTree();
  renderStats();

  if (state.selectedSession && state.sessions.some((s) => s.id === state.selectedSession)) {
    await selectSession(state.selectedSession);
  } else if (state.sessions.length) {
    state.selectedSession = state.sessions[0].id;
    await selectSession(state.selectedSession);
  } else {
    state.selectedSession = null;
    state.session = null;
    renderSessionHeader();
    setChatEmpty();
  }
}

/* ── Header / stats ── */
function renderHeader() {
  const globalBtn = $('btnGlobalTasks');
  if (state.view === 'globalTasks') {
    globalBtn.classList.add('active');
    $('workspaceBreadcrumb').textContent = 'all workspaces';
    $('workspaceTitle').textContent = 'Global tasks';
    $('workspaceMeta').textContent = 'Tasks across ' + state.workspaces.length + ' workspace(s)';
    return;
  }

  globalBtn.classList.remove('active');

  const ws = state.selectedWorkspace;
  if (!ws) {
    $('workspaceBreadcrumb').textContent = 'workspaces';
    $('workspaceTitle').textContent = 'No workspace selected';
    $('workspaceMeta').textContent = '';
    return;
  }

  const parent = ws.parent ? state.byId[ws.parent] : null;
  $('workspaceBreadcrumb').textContent = parent ? parent.name + ' / ' + (ws.name || ws.id) : 'root / ' + (ws.name || ws.id);
  $('workspaceTitle').textContent = ws.name || ws.id;
  $('workspaceMeta').textContent =
    (ws.path || '') + ' - ' + state.sessions.length + ' session' + (state.sessions.length === 1 ? '' : 's');
}

function sumTokens(x) {
  if (Array.isArray(x)) return x.reduce((sum, item) => sum + sumTokens(item), 0);
  if (x && typeof x === 'object') return Object.values(x).reduce((sum, item) => sum + sumTokens(item), 0);
  return num(x);
}

function renderStats() {
  const st = state.stats || {};
  const sessionTokens = state.sessions.reduce((sum, s) => sum + num(s.token_usage), 0);
  const tokens = sumTokens(st.token_usage ?? st.total_token_usage ?? st.total_tokens ?? st.tokens ?? sessionTokens);
  const active = num(st.active_sessions ?? st.active ?? st.sessions_active ?? state.sessions.filter((s) => isRunningStatus(s.status)).length);
  const running = num(st.running_processes ?? st.running ?? st.processes ?? 0);
  const max = num(state.settings.max_sessions) || 0;

  $('statsBody').innerHTML =
    '<div class="stat-line"><span>Active sessions</span><b>' + active + '</b></div>' +
    '<div class="stat-line"><span>Running processes</span><b>' + running + '</b></div>' +
    '<div class="stat-line"><span>Token usage</span><b>' + fmtNum(tokens) + '</b></div>' +
    '<div class="stat-line"><span>Max sessions</span><b>' + max + '</b></div>';

  $('headerStats').innerHTML =
    '<span class="stat-chip"><i class="fa-solid fa-bolt"></i> <b>' + fmtNum(tokens) + '</b> tok</span>' +
    '<span class="stat-chip">active <b>' + active + '</b></span>' +
    '<span class="stat-chip">running <b>' + running + '</b></span>' +
    '<span class="stat-chip">max <b>' + max + '</b></span>';
}

async function refreshStats() {
  const data = await NodeApi.get('/api/stats');
  state.stats = data || {};
  renderStats();
}

/* ── Sessions ── */
function setChatEmpty() {
  $('chatMessages').innerHTML =
    '<div class="empty-state">' +
      '<i class="fa-solid fa-comments"></i>' +
      '<div>No messages yet.</div>' +
      '<div class="empty-state-desc">Pick a session or create one with + in the sidebar.</div>' +
    '</div>';
  state.currentAgentBubble = null;
  state.currentAgentText = '';
}

function renderSessionHeader() {
  const s = state.session;
  const titleEl = $('sessionTitleEl');
  const metaEl = $('sessionMetaEl');
  const modeButtons = document.querySelectorAll('#modeToggle button');

  if (!s) {
    titleEl.textContent = 'No session selected';
    metaEl.textContent = 'Select a session in the sidebar or create one with +.';
    modeButtons.forEach((b) => {
      b.classList.toggle('active', b.dataset.mode === state.composerMode);
      b.disabled = false;
    });
    $('btnStopSession').disabled = true;
    $('btnSendPrompt').disabled = !state.selectedWorkspace;
    $('promptInput').disabled = !state.selectedWorkspace;
    $('composerHint').textContent = state.selectedWorkspace
      ? 'Send a prompt to start a session, or use + to start an empty one.'
      : 'Select a workspace first.';
    return;
  }

  titleEl.textContent = s.title || 'Session';
  metaEl.textContent = statusLabel(s.status) + ' - ' + (s.mode || 'normal') +
    ' - ' + fmtNum(s.token_usage) + ' tokens';

  modeButtons.forEach((b) => {
    b.classList.toggle('active', b.dataset.mode === (s.mode || 'normal'));
    b.disabled = false;
  });

  $('btnStopSession').disabled = !isRunningStatus(s.status) && !['starting', 'waiting', 'running', 'planned'].includes(String(s.status));
  $('btnSendPrompt').disabled = !state.selectedWorkspace;
  $('promptInput').disabled = !state.selectedWorkspace;

  if (isRunningStatus(s.status)) {
    $('composerHint').textContent = 'Running - sending a new prompt interrupts the current turn.';
  } else if (s.mode === 'goal') {
    $('composerHint').textContent = 'Goal mode loops the prompt until finished or failed.';
  } else {
    $('composerHint').textContent = 'Prompt starts a normal turn.';
  }
}

async function selectSession(id) {
  if (!id) return;
  state.selectedSession = String(id);
  closeStream();

  try {
    const data = await NodeApi.get('/api/sessions/' + encodeURIComponent(id));
    const session = data.session || data;
    state.session = session && (session.id || session.session_id || session.sessionId)
      ? session
      : { id, title: 'Session', status: 'starting', mode: 'normal', events: [] };
    state.session.id = String(state.session.id || id);
    state.selectedSession = state.session.id;
    if (!state.session.events) state.session.events = [];
  } catch (e) {
    toast('Could not load session: ' + e.message, 'error');
    state.session = null;
    renderSessionHeader();
    return;
  }

  renderSessionHeader();
  renderWorkspaceTree();
  renderSessionHistory(state.session.events);

  const st = String(state.session.status || '').toLowerCase();
  if (!['done', 'failed', 'stopped'].includes(st)) openStream(id);
}

function renderSessionHistory(events) {
  $('chatMessages').innerHTML = '';
  state.currentAgentBubble = null;
  state.currentAgentText = '';

  const list = arr(events);
  let maxSeq = 0;
  list.forEach((ev) => {
    maxSeq = Math.max(maxSeq, num(ev.seq));
  });
  state.streamSince = maxSeq;

  if (!list.length) {
    setChatEmpty();
    return;
  }
  state.renderingHistory = true;

  list.forEach((ev) => applySessionEvent(ev));
  state.renderingHistory = false;
  scrollChat();
}

function applySessionEvent(ev) {
  if (!ev || typeof ev !== 'object') return;
  const type = ev.type || 'delta';
  if (type === 'delta') {
    handleStreamEvent('delta', ev.action || ev.delta || ev);
  } else {
    handleStreamEvent(type, ev);
  }
}

/* ── Chat rendering ── */
function scrollChat() {
  const el = $('chatMessages');
  el.scrollTop = el.scrollHeight;
}

function resetAgentBubble() {
  state.currentAgentBubble = null;
  state.currentAgentText = '';
}

function addUser(text, local = false) {
  if (!text) return;
  const wrap = document.createElement('div');
  wrap.className = 'msg user';
  wrap.innerHTML =
    '<div class="msg-label"><span>You</span><span>' + esc(timeAgo(Date.now())) + '</span></div>' +
    '<div class="msg-body">' + esc(text) + '</div>';
  $('chatMessages').appendChild(wrap);
  resetAgentBubble();
  scrollChat();
  if (local) {
    state.pendingUser = String(text);
    setTimeout(() => {
      if (state.pendingUser === String(text)) state.pendingUser = null;
    }, 8000);
  }
}

function addAgentText(text) {
  if (!text) return;
  if (!state.currentAgentBubble) {
    const wrap = document.createElement('div');
    wrap.className = 'msg agent';
    wrap.innerHTML = '<div class="msg-label"><span>Agent</span></div><div class="msg-body"></div>';
    $('chatMessages').appendChild(wrap);
    state.currentAgentBubble = wrap.querySelector('.msg-body');
    state.currentAgentText = '';
  }
  state.currentAgentText += String(text);
  state.currentAgentBubble.innerHTML = mdRender(state.currentAgentText);
  scrollChat();
}

function addReasoning(text) {
  if (!text) return;
  const wrap = document.createElement('div');
  wrap.className = 'msg reasoning';
  wrap.innerHTML =
    '<div class="msg-label"><span>Reasoning</span></div>' +
    '<div class="msg-body">' + esc(text) + '</div>';
  $('chatMessages').appendChild(wrap);
  scrollChat();
}

function addToolStart(tool) {
  const wrap = document.createElement('div');
  wrap.className = 'msg tool';
  wrap.dataset.toolId = tool && tool.id ? String(tool.id) : '';
  wrap.innerHTML =
    '<div class="tool-head"><i class="fa-solid fa-gear"></i>' +
      '<span class="tool-name">' + esc(tool && tool.name ? tool.name : 'tool') + '</span></div>' +
    '<div class="tool-args">' + esc(JSON.stringify(tool && tool.args ? tool.args : {})) + '</div>' +
    '<div class="tool-result hidden"></div>';
  $('chatMessages').appendChild(wrap);
  scrollChat();
}

function addToolEnd(tool) {
  const id = tool && tool.id ? String(tool.id) : '';
  const cards = Array.from($('chatMessages').querySelectorAll('.msg.tool'));
  let card = null;
  for (let i = cards.length - 1; i >= 0; i--) {
    if (cards[i].dataset.toolId === id) { card = cards[i]; break; }
  }
  if (!card && cards.length) card = cards[cards.length - 1];

  const resultText = JSON.stringify(tool && tool.result !== undefined ? tool.result : (tool || {}));
  if (card) {
    const result = card.querySelector('.tool-result');
    if (result) {
      result.classList.remove('hidden');
      result.textContent = resultText;
    }
  } else {
    const wrap = document.createElement('div');
    wrap.className = 'msg tool';
    wrap.dataset.toolId = id;
    wrap.innerHTML =
      '<div class="tool-head"><i class="fa-solid fa-gear"></i>' +
        '<span class="tool-name">' + esc(tool && tool.name ? tool.name : 'tool') + '</span></div>' +
      '<div class="tool-result">' + esc(resultText) + '</div>';
    $('chatMessages').appendChild(wrap);
  }
  scrollChat();
}

function addMilestone(text) {
  if (!text) return;
  const wrap = document.createElement('div');
  wrap.className = 'msg milestone';
  wrap.innerHTML = '<i class="fa-solid fa-check-circle"></i> ' + esc(text);
  $('chatMessages').appendChild(wrap);
  scrollChat();
}

function addReport(text) {
  if (!text) return;
  const wrap = document.createElement('div');
  wrap.className = 'msg report';
  wrap.innerHTML =
    '<div class="msg-label"><span>Report</span></div>' +
    '<div class="msg-body">' + mdRender(text) + '</div>';
  $('chatMessages').appendChild(wrap);
  scrollChat();
}

function addError(text) {
  const wrap = document.createElement('div');
  wrap.className = 'msg error';
  wrap.innerHTML =
    '<div class="msg-label"><span>Error</span></div>' +
    '<div class="msg-body">' + esc(text) + '</div>';
  $('chatMessages').appendChild(wrap);
  scrollChat();
}

/* ── Session state ── */
function setSessionStatus(status) {
  if (!state.session) return;
  const raw = String(status || '').toLowerCase();
  const mapped = raw === 'finished' ? 'done' : raw === 'error' ? 'failed' : raw;
  state.session.status = mapped || 'running';
  const s = state.sessions.find((x) => x.id === state.session.id);
  if (s) s.status = mapped;
  renderSessionHeader();
  renderWorkspaceTree();
}

function updateTokenUsage(value) {
  const n = num(value);
  if (state.session) state.session.token_usage = n;
  const s = state.sessions.find((x) => x.id === state.session.id);
  if (s) s.token_usage = n;
  renderSessionHeader();
  renderWorkspaceTree();
  renderStats();
}

/* ── SSE stream ── */
function closeStream() {
  if (state.stream) {
    try { state.stream.close(); } catch (e) {}
    state.stream = null;
  }
  if (state.streamAbort) {
    state.streamAbort.abort();
    state.streamAbort = null;
  }
}

function streamUrl(id, since) {
  const token = NodeApi.token();
  const params = new URLSearchParams();
  params.set('since', String(since || 0));
  if (token) params.set('token', token);
  return '/api/sessions/' + encodeURIComponent(id) + '/stream?' + params.toString();
}

function openStream(id) {
  closeStream();
  const since = state.streamSince || 0;
  const es = new EventSource(streamUrl(id, since));
  state.stream = es;
  state.streamSince = since;

  ['delta', 'user', 'status', 'done', 'error', 'stats'].forEach((name) => {
    es.addEventListener(name, (ev) => handleStreamEvent(name, ev.data));
  });
  es.onmessage = (ev) => handleStreamEvent('message', ev.data);

  let errors = 0;
  es.onerror = () => {
    if (state.stream !== es) return;
    errors++;
    if (es.readyState === EventSource.CLOSED || errors >= 2) {
      try { es.close(); } catch (e) {}
      state.stream = null;
      fetchStream(id, since);
    }
  };
}

function ensureStream(id) {
  if (!state.stream && !state.streamAbort) openStream(id);
}

async function fetchStream(id, since) {
  if (state.stream) {
    try { state.stream.close(); } catch (e) {}
    state.stream = null;
  }
  if (state.streamAbort) state.streamAbort.abort();
  const controller = new AbortController();
  state.streamAbort = controller;

  try {
    const res = await fetch(streamUrl(id, since), {
      headers: NodeApi.headers(),
      signal: controller.signal
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('text/event-stream')) {
      throw new Error('stream returned ' + contentType);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      buffer = buffer.replace(/\r\n/g, '\n');

      let idx;
      while ((idx = buffer.indexOf('\n\n')) >= 0) {
        const block = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);
        parseSseBlock(block);
      }
    }
    if (buffer.trim()) parseSseBlock(buffer);
  } catch (e) {
    if (e.name !== 'AbortError') toast('Live stream failed: ' + e.message, 'error');
  } finally {
    if (state.streamAbort === controller) state.streamAbort = null;
  }
}

function parseSseBlock(block) {
  let event = 'message';
  let data = '';
  block.split('\n').forEach((line) => {
    if (line.startsWith('event:')) event = line.slice(6).trim();
    else if (line.startsWith('data:')) data += (data ? '\n' : '') + line.slice(5).trimStart();
  });
  if (data) handleStreamEvent(event, data);
}

function handleStreamEvent(name, raw) {
  let data = raw;
  if (typeof raw === 'string') {
    try { data = JSON.parse(raw); } catch (e) { data = raw; }
  }
  if (data && typeof data === 'object' && data.type) name = data.type;

  if (name === 'delta') {
    const action = (data && (data.action || data.delta)) || data;
    if (!action || typeof action !== 'object') return;
    if (action.text != null) addAgentText(String(action.text));
    else if (action.reasoning != null) addReasoning(String(action.reasoning));
    else if (action.tool_start) addToolStart(action.tool_start);
    else if (action.tool_end) addToolEnd(action.tool_end);
    else if (action.milestone != null) addMilestone(String(action.milestone));
    return;
  }

  if (name === 'user') {
    const text = data && (data.text || data.prompt || data.message);
    if (state.pendingUser && String(text) === state.pendingUser) {
      state.pendingUser = null;
      return;
    }
    addUser(text);
    return;
  }

  if (name === 'status') {
    setSessionStatus(data && (data.status || data.state || data.value));
    return;
  }

  if (name === 'stats') {
    updateTokenUsage(data && (data.token_usage ?? data.tokens));
    return;
  }

  if (name === 'done') {
    const rawStatus = data && data.status;
    const status = rawStatus === 'finished' ? 'done' : rawStatus === 'failed' ? 'failed' : (rawStatus || 'done');
    setSessionStatus(status);
    if (data && data.report) addReport(data.report);
    if (data && data.token_usage != null) updateTokenUsage(data.token_usage);
    closeStream();
    if (!state.renderingHistory) toast(status === 'failed' ? 'Session failed.' : 'Session finished.', status === 'failed' ? 'error' : 'success');
    return;
  }

  if (name === 'error') {
    const msg = data && (data.message || data.error) || 'Unknown error';
    addError(msg);
    setSessionStatus('failed');
    if (!state.renderingHistory) toast(msg, 'error');
    return;
  }

  if (name === 'message') {
    if (data && data.text != null) addAgentText(String(data.text));
    else if (data && data.action) handleStreamEvent('delta', data);
    return;
  }

  if (data && data.action) handleStreamEvent('delta', data);
}

/* ── Chat actions ── */
function currentMode() {
  return state.session ? (state.session.mode || state.composerMode) : state.composerMode;
}

async function sendPrompt() {
  const text = $('promptInput').value.trim();
  if (!text) return;
  if (!state.selectedWorkspace) {
    toast('Select a workspace first.', 'warn');
    return;
  }

  const ws = state.selectedWorkspace;
  try {
    if (!state.session) {
      const data = await NodeApi.post('/api/workspaces/' + encodeURIComponent(ws.id) + '/sessions', {
        mode: currentMode(),
        prompt: text
      });
      const id = data && (data.id || data.session_id || data.sessionId || (data.session && data.session.id));
      $('promptInput').value = '';
      if (id) state.selectedSession = String(id);
      await refreshWorkspace(ws.id);
      toast('Session started.', 'success');
      return;
    }

    const id = state.session.id;
    const wasRunning = isRunningStatus(state.session.status);
    state.pendingUser = String(text);
    await NodeApi.post('/api/sessions/' + encodeURIComponent(id) + '/prompt', { prompt: text });
    addUser(text, true);
    $('promptInput').value = '';
    setSessionStatus('running');
    ensureStream(id);
    toast(wasRunning ? 'Prompt sent - current turn interrupted.' : 'Prompt sent.', 'info');
  } catch (e) {
    state.pendingUser = null;
    toast('Prompt failed: ' + e.message, 'error');
  }
}

async function setMode(mode) {
  if (!state.session) {
    state.composerMode = mode;
    renderSessionHeader();
    toast('New sessions will use ' + mode + ' mode.', 'info');
    return;
  }
  try {
    await NodeApi.post('/api/sessions/' + encodeURIComponent(state.session.id) + '/mode', { mode });
    state.session.mode = mode;
    renderSessionHeader();
    toast('Mode set to ' + mode + '.', 'info');
  } catch (e) {
    toast('Could not change mode: ' + e.message, 'error');
  }
}

async function stopSession() {
  if (!state.session) return;
  try {
    await NodeApi.post('/api/sessions/' + encodeURIComponent(state.session.id) + '/stop');
    setSessionStatus('stopped');
    closeStream();
    toast('Session stopped.', 'warn');
  } catch (e) {
    toast('Could not stop session: ' + e.message, 'error');
  }
}

async function newSession(workspaceId) {
  if (!state.byId[workspaceId]) return;

  if (!state.selectedWorkspace || state.selectedWorkspace.id !== workspaceId) {
    await selectWorkspace(workspaceId);
  }

  try {
    const data = await NodeApi.post('/api/workspaces/' + encodeURIComponent(workspaceId) + '/sessions', {
      mode: state.composerMode
    });
    const id = data && (data.id || data.session_id || data.sessionId || (data.session && data.session.id));
    if (id) state.selectedSession = String(id);
    await refreshWorkspace(workspaceId);
    toast('Session created.', 'success');
  } catch (e) {
    toast('Could not create session: ' + e.message, 'error');
  }
}

/* ── Architecture ── */
const KIND_COLORS = {
  module: '#1f6f5c',
  file: '#2b4f6b',
  service: '#5b4b8a',
  ui: '#7a5a2c',
  data: '#3c6b74',
  external: '#7b4d4d',
  test: '#4b6b3c',
  config: '#6a5c3b'
};

function kindColor(kind) {
  return KIND_COLORS[kind] || '#1f6f5c';
}

function architectureSvg(nodes, edges) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.classList.add('arch-svg');

  const defs = document.createElementNS(NS, 'defs');
  const marker = document.createElementNS(NS, 'marker');
  marker.setAttribute('id', 'archArrow');
  marker.setAttribute('viewBox', '0 0 10 10');
  marker.setAttribute('refX', '8');
  marker.setAttribute('refY', '5');
  marker.setAttribute('markerWidth', '6');
  marker.setAttribute('markerHeight', '6');
  marker.setAttribute('orient', 'auto');
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', 'M0,0 L10,5 L0,10 z');
  path.setAttribute('fill', '#8696a0');
  marker.appendChild(path);
  defs.appendChild(marker);
  svg.appendChild(defs);

  const positions = new Map();
  nodes.forEach((n, i) => {
    let x = Number(n.x);
    let y = Number(n.y);
    if (!Number.isFinite(x)) x = 80 + (i % 4) * 180;
    if (!Number.isFinite(y)) y = 70 + Math.floor(i / 4) * 110;
    positions.set(n.id, { x, y, node: n });
  });

  const vals = Array.from(positions.values());
  const minX = Math.min(...vals.map((p) => p.x), 0) - 70;
  const maxX = Math.max(...vals.map((p) => p.x), 0) + 70;
  const minY = Math.min(...vals.map((p) => p.y), 0) - 70;
  const maxY = Math.max(...vals.map((p) => p.y), 0) + 70;
  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);
  svg.setAttribute('viewBox', minX + ' ' + minY + ' ' + width + ' ' + height);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  edges.forEach((e) => {
    const from = e.source || e.from;
    const to = e.target || e.to;
    const a = positions.get(from);
    const b = positions.get(to);
    if (!a || !b) return;

    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', a.x);
    line.setAttribute('y1', a.y);
    line.setAttribute('x2', b.x);
    line.setAttribute('y2', b.y);
    line.setAttribute('class', 'arch-edge');
    line.setAttribute('marker-end', 'url(#archArrow)');
    svg.appendChild(line);

    if (e.label) {
      const label = document.createElementNS(NS, 'text');
      label.setAttribute('x', (a.x + b.x) / 2);
      label.setAttribute('y', (a.y + b.y) / 2 - 4);
      label.setAttribute('class', 'arch-edge-label');
      label.setAttribute('text-anchor', 'middle');
      label.textContent = String(e.label);
      svg.appendChild(label);
    }
  });

  nodes.forEach((n) => {
    const p = positions.get(n.id);
    const label = String(n.label || n.id || 'node');
    const w = Math.min(250, Math.max(80, 55 + label.length * 7));
    const h = 52;

    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'arch-node');

    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', p.x - w / 2);
    rect.setAttribute('y', p.y - h / 2);
    rect.setAttribute('width', w);
    rect.setAttribute('height', h);
    rect.setAttribute('rx', '8');
    rect.setAttribute('fill', kindColor(n.kind));
    g.appendChild(rect);

    const text = document.createElementNS(NS, 'text');
    text.setAttribute('x', p.x);
    text.setAttribute('y', p.y - 4);
    text.textContent = label;
    g.appendChild(text);

    if (n.path) {
      const sub = document.createElementNS(NS, 'text');
      sub.setAttribute('x', p.x);
      sub.setAttribute('y', p.y + 12);
      sub.setAttribute('class', 'arch-path');
      sub.textContent = String(n.path);
      g.appendChild(sub);
    }

    const title = document.createElementNS(NS, 'title');
    title.textContent = String(n.purpose || n.path || label);
    g.appendChild(title);
    svg.appendChild(g);
  });

  return svg;
}

function archButton(label, action, className = 'btn btn-small') {
  const b = document.createElement('button');
  b.className = className;
  b.textContent = label;
  b.addEventListener('click', () => architectureAction(action));
  return b;
}

function renderArchitecture() {
  const host = $('architectureView');
  const raw = state.architecture || {};
  const arch = raw.architecture || raw;
  const nodes = arr(arch.nodes);
  const edges = arr(arch.edges);
  const pending = arr(arch.pending);
  const plan = arch.plan || {};
  const job = arch.job || {};

  host.innerHTML = '';

  const head = document.createElement('div');
  head.className = 'arch-head';

  const titleBlock = document.createElement('div');
  titleBlock.className = 'arch-title-block';
  titleBlock.innerHTML =
    '<div><h2>' + esc(arch.project || (state.selectedWorkspace && state.selectedWorkspace.name) || 'Architecture') + '</h2>' +
      '<div class="arch-summary">' + esc(arch.summary || '') + '</div></div>';
  head.appendChild(titleBlock);

  const actions = document.createElement('div');
  actions.className = 'arch-actions';
  actions.appendChild(archButton('Analyze', 'analyze'));
  if (pending.length) {
    actions.appendChild(archButton('Review plan', 'plan', 'btn btn-small btn-ghost'));
    actions.appendChild(archButton('Apply', 'apply'));
    actions.appendChild(archButton('Discard', 'discard', 'btn btn-small btn-ghost'));
  }
  head.appendChild(actions);
  host.appendChild(head);

  const cards = document.createElement('div');
  cards.className = 'arch-cards';
  const cardValues = [
    ['Revision', arch.revision != null ? arch.revision : '-'],
    ['Analyzed', arch.analyzed_at || 'never'],
    ['Nodes', nodes.length],
    ['Edges', edges.length],
    ['Pending edits', pending.length]
  ];
  cardValues.forEach(([label, value]) => {
    const card = document.createElement('div');
    card.className = 'arch-card';
    card.innerHTML = '<span>' + esc(label) + '</span><b>' + esc(value) + '</b>';
    cards.appendChild(card);
  });
  host.appendChild(cards);

  if (!nodes.length) {
    host.appendChild(makeEmptyCompact('No architecture model.', 'Run Analyze to build the graph for this workspace.'));
  } else {
    host.appendChild(architectureSvg(nodes, edges));
  }

  const panel = document.createElement('div');
  panel.className = 'arch-panel';

  const pendingPane = document.createElement('div');
  pendingPane.className = 'pane';
  pendingPane.innerHTML = '<h3>Pending edits</h3>';
  if (!pending.length) {
    pendingPane.innerHTML += '<div class="pane-text">None.</div>';
  } else {
    const list = document.createElement('div');
    list.className = 'pending-list';
    pending.forEach((p) => {
      const item = document.createElement('div');
      item.className = 'pending-item';
      item.innerHTML =
        '<span class="op">' + esc(p.op || 'edit') + '</span>' +
        '<span>' + esc(p.note || p.target || (p.node && p.node.label) || '') + '</span>';
      list.appendChild(item);
    });
    pendingPane.appendChild(list);
  }
  panel.appendChild(pendingPane);

  const planPane = document.createElement('div');
  planPane.className = 'pane';
  planPane.innerHTML = '<h3>Plan</h3>';
  if (plan && plan.text) {
    planPane.innerHTML += '<div class="pane-text">' + mdRender(plan.text) + '</div>';
  } else {
    planPane.innerHTML += '<div class="pane-text">No plan yet.</div>';
  }
  panel.appendChild(planPane);

  const jobPane = document.createElement('div');
  jobPane.className = 'pane';
  jobPane.innerHTML = '<h3>Job</h3>';
  if (job && (job.taskid || job.state)) {
    jobPane.innerHTML += '<div class="job-live">' +
      ((job.state === 'implement' || job.state === 'research' || isRunningStatus(job.state)) ? '<span class="pulse-ring"></span>' : '') +
      esc(job.state || 'unknown') + '</div>' +
      '<div class="pane-text">' + esc(job.report || job.error || '') + '</div>';
  } else {
    jobPane.innerHTML += '<div class="pane-text">No job running.</div>';
  }
  panel.appendChild(jobPane);

  host.appendChild(panel);
}

async function loadArchitecture() {
  if (!state.selectedWorkspace) return;
  const host = $('architectureView');
  host.innerHTML = '<div class="empty-state compact">Loading architecture...</div>';
  try {
    const data = await NodeApi.get('/api/workspaces/' + encodeURIComponent(state.selectedWorkspace.id) + '/architecture');
    state.architecture = data.architecture || data;
    renderArchitecture();
  } catch (e) {
    host.innerHTML = '<div class="empty-state compact">Could not load architecture: ' + esc(e.message) + '</div>';
    toast('Architecture failed: ' + e.message, 'error');
  }
}

async function architectureAction(action) {
  if (!state.selectedWorkspace) return;
  const ws = state.selectedWorkspace;
  try {
    await NodeApi.post('/api/workspaces/' + encodeURIComponent(ws.id) + '/architecture/' + action);
    toast('Architecture ' + action + ' started.', 'info');
    await loadArchitecture();
    setTimeout(() => {
      loadArchitecture().catch(() => {});
      refreshWorkspace(ws.id).catch(() => {});
    }, 1200);
  } catch (e) {
    toast('Architecture action failed: ' + e.message, 'error');
  }
}

/* ── Tasks ── */
function taskStateClass(raw) {
  const st = String(raw || 'planned').toLowerCase().replace(/[^a-z]/g, '') || 'planned';
  return st;
}

function goalCard(g, workspaceId) {
  if (!g || typeof g !== 'object') return null;
  const st = String(g.status || 'planned').toLowerCase();
  const card = document.createElement('div');
  card.className = 'task-card';

  const top = document.createElement('div');
  top.className = 'task-top';
  top.innerHTML =
    '<div class="task-name">' + esc(g.title || g.id || 'Task') + '</div>' +
    '<span class="task-state ' + esc(taskStateClass(g.status)) + '">' + esc(statusLabel(g.status)) + '</span>';
  card.appendChild(top);

  if (g.schedule) {
    const p = document.createElement('div');
    p.className = 'task-goal';
    p.textContent = 'Schedule: ' + String(g.schedule);
    card.appendChild(p);
  }
  if (g.next_window) {
    const p = document.createElement('div');
    p.className = 'task-goal';
    p.textContent = 'Next: ' + String(g.next_window);
    card.appendChild(p);
  }
  if (g.active_window) {
    const p = document.createElement('div');
    p.className = 'task-goal';
    p.textContent = 'Now: ' + String(g.active_window);
    card.appendChild(p);
  }
  if (g.last_outcome) {
    const p = document.createElement('div');
    p.className = 'task-report';
    p.textContent = 'Last: ' + String(g.last_outcome);
    card.appendChild(p);
  }

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  if (st === 'proposed') {
    const btn = document.createElement('button');
    btn.className = 'btn btn-small';
    btn.textContent = 'Activate';
    btn.addEventListener('click', () => setGoalStatus(workspaceId, g.id, 'active'));
    actions.appendChild(btn);
  } else if (st === 'active') {
    const btn = document.createElement('button');
    btn.className = 'btn btn-small btn-ghost';
    btn.textContent = 'Pause';
    btn.addEventListener('click', () => setGoalStatus(workspaceId, g.id, 'paused'));
    actions.appendChild(btn);
  } else if (st === 'paused') {
    const btn = document.createElement('button');
    btn.className = 'btn btn-small';
    btn.textContent = 'Resume';
    btn.addEventListener('click', () => setGoalStatus(workspaceId, g.id, 'active'));
    actions.appendChild(btn);
  }

  if (actions.childElementCount) card.appendChild(actions);
  return card;
}

function sessionCard(s, workspaceId) {
  if (!s || typeof s !== 'object') return null;
  const st = String(s.state || s.status || 'planned').toLowerCase();
  const card = document.createElement('div');
  card.className = 'task-card';

  const top = document.createElement('div');
  top.className = 'task-top';
  top.innerHTML =
    '<div class="task-name">' + esc(s.name || s.title || s.taskid || 'Task') + '</div>' +
    '<span class="task-state ' + esc(taskStateClass(st)) + '">' + esc(statusLabel(st)) + '</span>';
  card.appendChild(top);

  const meta = document.createElement('div');
  meta.className = 'task-goal';
  meta.textContent = 'Session ' + (s.taskid || s.id || '') + ' - ' + fmtNum(s.token_usage) + ' tokens';
  card.appendChild(meta);

  if (s.report || s.error) {
    const report = document.createElement('div');
    report.className = 'task-report';
    report.textContent = s.report || s.error;
    card.appendChild(report);
  }

  const actions = document.createElement('div');
  actions.className = 'task-actions';
  if (isRunningStatus(st) || st === 'planned' || st === 'running') {
    const btn = document.createElement('button');
    btn.className = 'btn btn-small btn-danger';
    btn.textContent = 'Stop';
    btn.addEventListener('click', () => stopTask(workspaceId, s.taskid || s.id));
    actions.appendChild(btn);
  }
  if (actions.childElementCount) card.appendChild(actions);
  return card;
}

function taskSection(title, subtitle, cards, emptyText) {
  const wrap = document.createElement('section');
  wrap.className = 'task-section';
  const head = document.createElement('div');
  head.className = 'task-section-head';
  head.innerHTML = '<h3>' + esc(title) + '</h3>' + (subtitle ? '<span>' + esc(subtitle) + '</span>' : '');
  wrap.appendChild(head);

  if (!cards.length) {
    wrap.appendChild(makeEmptyCompact(emptyText, ''));
    return wrap;
  }

  const grid = document.createElement('div');
  grid.className = 'task-grid';
  cards.forEach((c) => { if (c) grid.appendChild(c); });
  wrap.appendChild(grid);
  return wrap;
}

function renderTasks(data, workspaceName, workspaceId) {
  const host = $('taskView');
  host.innerHTML = '';

  const goals = arr(data && data.goals);
  const sessions = arr(data && data.sessions);
  const templates = arr(data && data.templates);

  const head = document.createElement('div');
  head.className = 'task-headline';
  head.innerHTML =
    '<div><h2>Tasks - ' + esc(workspaceName || 'workspace') + '</h2>' +
      '<div class="form-hint">Active tasks, proposed tasks and the goal templates of this workspace.</div></div>' +
    '<button id="btnNewTask" class="btn btn-small">+ New task</button>';
  host.appendChild(head);

  const form = document.createElement('form');
  form.id = 'taskForm';
  form.className = 'inline-form hidden';
  form.innerHTML =
    '<input id="taskTitle" type="text" placeholder="Task title (optional)" autocomplete="off" />' +
    '<textarea id="taskGoal" rows="3" placeholder="What should the task do?"></textarea>' +
    '<div class="form-row">' +
      '<select id="taskMode">' +
        '<option value="normal">Normal</option>' +
        '<option value="goal">Goal mode</option>' +
      '</select>' +
      '<button type="submit" class="btn btn-small">Start task</button>' +
      '<button type="button" id="btnCancelTask" class="btn btn-small btn-ghost">Cancel</button>' +
    '</div>';
  host.appendChild(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const goal = $('taskGoal').value.trim();
    if (!goal) {
      toast('Describe what the task should do.', 'warn');
      return;
    }
    const title = $('taskTitle').value.trim() || goal.slice(0, 48);
    const mode = $('taskMode').value || 'normal';
    try {
      await NodeApi.post('/api/workspaces/' + encodeURIComponent(workspaceId) + '/tasks', {
        name: title,
        goal,
        mode,
        role: 'adaptive'
      });
      $('taskForm').classList.add('hidden');
      $('taskTitle').value = '';
      $('taskGoal').value = '';
      await loadTasks();
      await refreshWorkspace(workspaceId);
      toast('Task started.', 'success');
    } catch (e) {
      toast('Could not start task: ' + e.message, 'error');
    }
  });

  $('btnNewTask').addEventListener('click', () => {
    $('taskForm').classList.remove('hidden');
    $('taskTitle').focus();
  });
  $('btnCancelTask').addEventListener('click', () => $('taskForm').classList.add('hidden'));

  const activeGoals = goals.filter((g) => ['active', 'paused'].includes(String(g.status || '').toLowerCase()));
  const activeSessions = sessions.filter((s) => ['planned', 'running', 'starting', 'waiting'].includes(String(s.state || '').toLowerCase()));
  const activeCards = activeGoals.map((g) => goalCard(g, workspaceId))
    .concat(activeSessions.map((s) => sessionCard(s, workspaceId)));

  host.appendChild(taskSection(
    'Active tasks',
    activeCards.length ? activeCards.length + ' active' : '',
    activeCards,
    'No active tasks.'
  ));

  const proposed = goals.filter((g) => String(g.status || '').toLowerCase() === 'proposed');
  host.appendChild(taskSection(
    'Proposed tasks',
    proposed.length ? proposed.length + ' waiting for activation' : '',
    proposed.map((g) => goalCard(g, workspaceId)),
    'No proposed tasks. The agent can create one from chat.'
  ));

  if (templates.length) {
    const wrap = document.createElement('section');
    wrap.className = 'task-section';
    const headT = document.createElement('div');
    headT.className = 'task-section-head';
    headT.innerHTML = '<h3>Task templates</h3><span>Existing goal templates in .megamind/tasks/templates</span>';
    wrap.appendChild(headT);
    const chips = document.createElement('div');
    chips.className = 'template-chips';
    templates.forEach((t) => {
      const chip = document.createElement('div');
      chip.className = 'template-chip';
      chip.textContent = t.name || String(t);
      chips.appendChild(chip);
    });
    wrap.appendChild(chips);
    host.appendChild(wrap);
  }

  const finishedSessions = sessions.filter((s) => ['done', 'failed', 'stopped'].includes(String(s.state || '').toLowerCase()));
  const otherGoals = goals.filter((g) => ['completed', 'cancelled', 'archived'].includes(String(g.status || '').toLowerCase()));
  const finishedCards = otherGoals.map((g) => goalCard(g, workspaceId))
    .concat(finishedSessions.map((s) => sessionCard(s, workspaceId)));

  host.appendChild(taskSection(
    'Finished / archived',
    finishedCards.length ? finishedCards.length + ' item(s)' : '',
    finishedCards,
    'Nothing finished yet.'
  ));
}

async function loadTasks() {
  if (!state.selectedWorkspace) return;
  const host = $('taskView');
  host.innerHTML = '<div class="empty-state compact">Loading tasks...</div>';
  try {
    const data = await NodeApi.get('/api/workspaces/' + encodeURIComponent(state.selectedWorkspace.id) + '/tasks');
    state.taskData = data;
    renderTasks(data, state.selectedWorkspace.name, state.selectedWorkspace.id);
  } catch (e) {
    host.innerHTML = '<div class="empty-state compact">Could not load tasks: ' + esc(e.message) + '</div>';
    toast('Tasks failed: ' + e.message, 'error');
  }
}

async function setGoalStatus(workspaceId, goalId, status) {
  try {
    await NodeApi.post('/api/workspaces/' + encodeURIComponent(workspaceId) + '/goals/' + encodeURIComponent(goalId) + '/status', { status });
    toast('Goal ' + status + '.', 'success');
    await loadTasks();
    await refreshWorkspace(workspaceId).catch(() => {});
  } catch (e) {
    toast('Goal update failed: ' + e.message, 'error');
  }
}

async function stopTask(workspaceId, taskid) {
  try {
    await NodeApi.del('/api/workspaces/' + encodeURIComponent(workspaceId) + '/tasks/' + encodeURIComponent(taskid));
    toast('Task stopped.', 'warn');
    await loadTasks();
    await refreshWorkspace(workspaceId).catch(() => {});
  } catch (e) {
    toast('Could not stop task: ' + e.message, 'error');
  }
}

/* ── Global tasks ── */
async function showGlobalTasks() {
  state.view = 'globalTasks';
  state.selectedSession = null;
  state.session = null;
  closeStream();
  $('workspaceView').hidden = true;
  $('globalTasksView').hidden = false;
  renderHeader();
  renderWorkspaceTree();
  renderSessionHeader();

  const host = $('globalTasksContent');
  host.innerHTML = '<h2>Global tasks</h2>' +
    '<div class="global-tasks-sub">Tasks across ' + state.workspaces.length + ' workspace(s).</div>' +
    '<div class="empty-state compact">Loading tasks...</div>';

  const results = await Promise.all(state.workspaces.map(async (ws) => {
    try {
      const data = await NodeApi.get('/api/workspaces/' + encodeURIComponent(ws.id) + '/tasks');
      return { ws, data };
    } catch (e) {
      return { ws, data: null, error: e.message };
    }
  }));

  host.innerHTML = '<h2>Global tasks</h2>' +
    '<div class="global-tasks-sub">Tasks across ' + state.workspaces.length + ' workspace(s).</div>';

  const groups = document.createElement('div');
  groups.className = 'global-task-groups';
  let total = 0;

  results.forEach(({ ws, data, error }) => {
    const goals = arr(data && data.goals);
    const sessions = arr(data && data.sessions);
    const activeGoals = goals.filter((g) => ['active', 'paused'].includes(String(g.status || '').toLowerCase()));
    const activeSessions = sessions.filter((s) => ['planned', 'running', 'starting', 'waiting'].includes(String(s.state || '').toLowerCase()));
    const proposed = goals.filter((g) => String(g.status || '').toLowerCase() === 'proposed');
    const cards = activeGoals.map((g) => goalCard(g, ws.id))
      .concat(activeSessions.map((s) => sessionCard(s, ws.id)));

    if (!cards.length && !proposed.length && !error) return;
    total += cards.length + proposed.length;

    const group = document.createElement('div');
    group.className = 'global-group';
    group.innerHTML = '<h3><i class="fa-solid fa-grid-2"></i> ' + esc(ws.name || ws.id) + '</h3>';
    if (error) {
      group.innerHTML += '<div class="form-hint">Could not load: ' + esc(error) + '</div>';
    }
    if (cards.length) {
      const grid = document.createElement('div');
      grid.className = 'task-grid';
      cards.forEach((c) => { if (c) grid.appendChild(c); });
      group.appendChild(grid);
    }
    if (proposed.length) {
      group.innerHTML += '<div class="form-hint">' + proposed.length + ' proposed task(s).</div>';
    }
    if (!cards.length && !proposed.length && !error) {
      group.innerHTML += '<div class="form-hint">No active tasks.</div>';
    }
    groups.appendChild(group);
  });

  if (!total && !results.some((r) => r.error)) {
    host.appendChild(makeEmpty('No tasks anywhere.', 'Create goals in a workspace task scheduler.'));
  } else {
    host.appendChild(groups);
  }
}

/* ── Notifications ── */
async function refreshNotifications() {
  try {
    const data = await NodeApi.get('/api/notifications');
    state.notifications = arr(data).slice(-30);
    const badge = $('notificationBadge');
    if (state.notifications.length) {
      badge.textContent = String(state.notifications.length);
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }

    const now = Date.now();
    const fresh = state.notifications.filter((n) => timeValue(n.time || n.created || n.timestamp) > state.notificationSeen);
    if (state.notificationSeen && fresh.length) {
      const latest = fresh[fresh.length - 1];
      toast(latest.message || latest.text || 'Notification', 'info');
    }
    state.notificationSeen = now;
  } catch (e) {
    // notifications are optional for the workspace dashboard
  }
}

function renderNotifications() {
  const panel = $('notificationPanel');
  if (!state.notifications.length) {
    panel.innerHTML = '<div class="empty-state compact">No notifications.</div>';
    return;
  }
  panel.innerHTML = state.notifications.slice().reverse().map((n) => {
    const msg = n.message || n.text || '';
    const t = timeValue(n.time || n.created || n.timestamp);
    return '<div class="notification-item"><div>' + esc(msg) + '</div>' +
      '<div class="notification-time">' + esc(t ? timeAgo(t) : '') + '</div></div>';
  }).join('');
}

/* ── Navigation / events ── */
function showTab(tab) {
  state.tab = tab;
  state.view = 'workspace';
  document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach((p) => p.classList.add('hidden'));
  const panel = $('tab' + tab.charAt(0).toUpperCase() + tab.slice(1));
  if (panel) panel.classList.remove('hidden');
  $('workspaceView').hidden = false;
  $('globalTasksView').hidden = true;
  if (tab === 'architecture') loadArchitecture();
  if (tab === 'tasks') loadTasks();
}

function toggleSidebar() {
  const sidebar = $('sidebar');
  const overlay = $('sidebarOverlay');
  if (window.innerWidth <= 900) {
    sidebar.classList.remove('collapsed');
    sidebar.classList.toggle('open');
    overlay.hidden = !sidebar.classList.contains('open');
  } else {
    sidebar.classList.remove('open');
    sidebar.classList.toggle('collapsed');
    overlay.hidden = true;
  }
}

function bindEvents() {
  $('btnNewWorkspace').addEventListener('click', () => openWorkspaceForm(''));
  $('workspaceForm').addEventListener('submit', (e) => { e.preventDefault(); createWorkspace(); });
  $('btnCancelWorkspace').addEventListener('click', () => $('workspaceForm').classList.add('hidden'));

  $('workspaceTree').addEventListener('click', (e) => {
    const addSessionBtn = e.target.closest('[data-add-session]');
    if (addSessionBtn) {
      e.stopPropagation();
      newSession(addSessionBtn.dataset.addSession);
      return;
    }

    const addChild = e.target.closest('[data-add-child]');
    if (addChild) {
      e.stopPropagation();
      openWorkspaceForm(addChild.dataset.addChild);
      return;
    }

    const link = e.target.closest('[data-ws-id]');
    if (link) selectWorkspace(link.dataset.wsId);

    const session = e.target.closest('[data-session-id]');
    if (session) selectSession(session.dataset.sessionId);
  });

  $('btnGlobalTasks').addEventListener('click', showGlobalTasks);
  $('btnSettings').addEventListener('click', openSettings);
  $('btnSaveSettings').addEventListener('click', saveSettings);
  $('btnCancelSettings').addEventListener('click', closeSettings);
  $('btnCloseSettings').addEventListener('click', closeSettings);
  $('settingsDialog').addEventListener('click', (e) => {
    if (e.target === $('settingsDialog')) closeSettings();
  });

  $('modeToggle').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-mode]');
    if (btn && !btn.disabled) setMode(btn.dataset.mode);
  });

  $('btnStopSession').addEventListener('click', stopSession);
  $('btnSendPrompt').addEventListener('click', sendPrompt);
  $('promptInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      sendPrompt();
    }
  });

  $('tabbar').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tab]');
    if (btn) showTab(btn.dataset.tab);
  });

  $('btnNotifications').addEventListener('click', () => {
    const panel = $('notificationPanel');
    panel.hidden = !panel.hidden;
    if (!panel.hidden) renderNotifications();
  });

  $('btnToggleSidebar').addEventListener('click', toggleSidebar);
  $('btnMobileMenu').addEventListener('click', toggleSidebar);
  $('sidebarOverlay').addEventListener('click', () => {
    $('sidebar').classList.remove('open');
    $('sidebarOverlay').hidden = true;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('settingsDialog').hidden) closeSettings();
  });
}

/* ── Boot ── */
async function init() {
  bindEvents();

  try {
    await loadSettings();
  } catch (e) {
    toast('Could not load settings: ' + e.message, 'warn');
  }

  try {
    await loadWorkspaces();
  } catch (e) {
    toast('Could not load workspaces: ' + e.message, 'error');
  }

  try {
    await refreshStats();
  } catch (e) {
    // stats are optional at boot
  }

  try {
    await refreshNotifications();
  } catch (e) {
    // notifications are optional
  }

  setInterval(() => refreshStats().catch(() => {}), 5000);
  setInterval(() => refreshNotifications().catch(() => {}), 12000);
  setInterval(() => {
    if (state.tab === 'architecture') loadArchitecture().catch(() => {});
  }, 6000);
}

document.addEventListener('DOMContentLoaded', init);
