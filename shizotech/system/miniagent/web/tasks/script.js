/* Tasks: the worker pool of the node (GET /api/tasks, /api/status, /api/events) */
const $ = (id) => document.getElementById(id);
// an empty list arrives as {} (ShizoScript json)
const arr = (x) => (Array.isArray(x) ? x : x && typeof x === 'object' ? Object.values(x) : []);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function ago(ms) {
  if (!ms) return '';
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (s < 60) return s + ' s ago';
  if (s < 3600) return Math.round(s / 60) + ' min ago';
  return Math.round(s / 3600) + ' h ago';
}

function taskCard(t) {
  const st = t.state || 'planned';
  const live = st === 'research' || st === 'implement';
  const id = t.taskid;
  const out = t.raw_output ? `<div class="task-out">${esc(String(t.raw_output).slice(-1200))}</div>` : '';
  const report = t.report ? `<div class="report">${esc(t.report)}</div>` : '';
  const actions = (live || st === 'planned')
    ? `<div class="task-actions">
         <button class="btn" data-update="${esc(id)}">Send update</button>
         <button class="btn danger" data-stop="${esc(id)}">Stop</button>
       </div>` : '';
  return `<div class="card">
    <div class="task-head">${live ? '<span class="pulse"></span>' : ''}
      <span class="task-name" title="${esc(t.name)}">${esc(t.name)}</span>
      <span class="badge ${esc(st)}">${esc(st)}</span></div>
    <div class="task-goal">${esc(t.task || t.goal || '')}</div>
    <div class="task-meta">${t.start_time ? (String(t.start_time).startsWith('ended') ? esc(t.start_time) : 'started ' + esc(t.start_time)) : 'waiting for a worker'}${t.last_update_ms ? ' · last activity ' + ago(t.last_update_ms) : ''}</div>
    ${report}${out}${actions}
  </div>`;
}

async function refresh() {
  try {
    const [st, tasks, events] = await Promise.all([
      NodeApi.get('/api/status'), NodeApi.get('/api/tasks'), NodeApi.get('/api/events'),
    ]);
    const t = st.tasks || {};
    $('stats').innerHTML = `<span>receptionist <b>${st.receptionist && st.receptionist.active ? 'busy' : 'idle'}</b></span>
      <span>queued requests <b>${(st.receptionist && st.receptionist.queued) || 0}</b></span>
      <span>running <b>${t.running || 0}</b></span><span>planned <b>${t.planned || 0}</b></span>
      <span>model <b>${esc((st.model && st.model.name) || '?')}</b></span>`;

    const live = arr(tasks).filter((x) => ['planned', 'research', 'implement'].includes(x.state));
    $('tasks').innerHTML = live.length ? live.map(taskCard).join('') : '<div class="empty">No running or planned task.</div>';

    // the node keeps the last finished / failed tasks, the events have the rest of this session
    const done = arr(tasks).filter((x) => !['planned', 'research', 'implement'].includes(x.state));
    const seen = new Set(done.map((x) => x.taskid));
    arr(events).forEach((e) => {
      if (!seen.has(e.taskid)) done.push({ name: e.name, state: e.state, report: e.report, taskid: e.taskid, end_time: new Date(e.time).toLocaleString() });
    });
    $('events').innerHTML = done.length ? done.map((t) => taskCard(Object.assign({}, t, { start_time: t.end_time ? 'ended ' + t.end_time : t.start_time })))
      .join('') : '<div class="empty">Nothing finished yet.</div>';
  } catch (e) {
    $('stats').textContent = e.status === 401 ? 'The node needs its API token.' : 'The node does not answer: ' + e.message;
  }
}

document.addEventListener('click', async (ev) => {
  const stop = ev.target.closest('[data-stop]');
  const upd = ev.target.closest('[data-update]');
  try {
    if (stop && confirm('Stop this task?')) { await NodeApi.del('/api/task/' + stop.dataset.stop); refresh(); }
    if (upd) {
      const msg = prompt('Message for the worker of this task:');
      if (msg) { await NodeApi.put('/api/task/' + upd.dataset.update, { message: msg }); refresh(); }
    }
  } catch (e) { alert(e.message); }
});

$('btnNew').onclick = () => { $('newTask').classList.toggle('hidden'); $('taskGoal').focus(); };
$('btnCancel').onclick = () => $('newTask').classList.add('hidden');
$('newTask').onsubmit = async (ev) => {
  ev.preventDefault();
  const goal = $('taskGoal').value.trim();
  if (!goal) return;
  try {
    await NodeApi.post('/api/task', { name: $('taskName').value.trim(), goal });
    $('taskGoal').value = ''; $('taskName').value = '';
    $('newTask').classList.add('hidden');
    refresh();
  } catch (e) { alert(e.message); }
};

refresh();
setInterval(refresh, 2000);
