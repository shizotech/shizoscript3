// ════════════════════════════════════════════
//  Expert Groups Module
// ════════════════════════════════════════════

// ════════════════════════════════════════════
//  Configuration
// ════════════════════════════════════════════
const STORAGE_KEY_GROUPS = 'expertgroups_data';
const STORAGE_KEY_ACTIVE_GROUP = 'expertgroups_active';

// Default agent personalities for groups
const AGENT_PERSONALITIES = [
  { id: 'planner', name: 'Planner', role: 'Strategic Planner', avatar: 'fa-robot', color: '#006d5a' },
  { id: 'architect', name: 'Architect', role: 'System Architect', avatar: 'fa-cubes', color: '#00a884' },
  { id: 'analyst', name: 'Analyst', role: 'Data Analyst', avatar: 'fa-chart-line', color: '#00c498' },
  { id: 'writer', name: 'Writer', role: 'Content Writer', avatar: 'fa-pen-nib', color: '#008a6e' },
  { id: 'coder', name: 'Coder', role: 'Expert Coder', avatar: 'fa-code', color: '#005c4b' },
  { id: 'researcher', name: 'Researcher', role: 'Deep Researcher', avatar: 'fa-microscope', color: '#007a71' },
  { id: 'designer', name: 'Designer', role: 'UI/UX Designer', avatar: 'fa-palette', color: '#009a8c' },
  { id: 'reviewer', name: 'Reviewer', role: 'Quality Reviewer', avatar: 'fa-check-circle', color: '#00b09d' }
];

// ════════════════════════════════════════════
//  Data Storage Functions
// ════════════════════════════════════════════
function loadGroups() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_GROUPS)) || [];
  } catch {
    return [];
  }
}

function saveGroups(groups) {
  localStorage.setItem(STORAGE_KEY_GROUPS, JSON.stringify(groups));
}

function getActiveGroupId() {
  return localStorage.getItem(STORAGE_KEY_ACTIVE_GROUP);
}

function setActiveGroupId(id) {
  localStorage.setItem(STORAGE_KEY_ACTIVE_GROUP, id);
}

function generateId() {
  return 'group_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

function createGroup(name, agentIds) {
  const group = {
    id: generateId(),
    name: name || 'New Group',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    agentIds: agentIds || ['planner', 'architect'],
    messages: []
  };
  
  const groups = loadGroups();
  groups.unshift(group);
  saveGroups(groups);
  
  return group;
}

function deleteGroup(id) {
  let groups = loadGroups();
  groups = groups.filter(g => g.id !== id);
  saveGroups(groups);
  
  if (getActiveGroupId() === id) {
    setActiveGroupId(groups.length ? groups[0].id : null);
  }
}

function updateGroupName(id, newName) {
  const groups = loadGroups();
  const group = groups.find(g => g.id === id);
  if (group) {
    group.name = newName;
    group.updatedAt = Date.now();
    saveGroups(groups);
  }
}

function addMessage(groupId, agentId, content) {
  const groups = loadGroups();
  const group = groups.find(g => g.id === groupId);
  if (!group) return;
  
  const message = {
    id: generateId(),
    agentId: agentId,
    content: content,
    timestamp: Date.now()
  };
  
  group.messages.push(message);
  group.updatedAt = Date.now();
  saveGroups(groups);
}

function getGroup(id) {
  return loadGroups().find(g => g.id === id) || null;
}

// ════════════════════════════════════════════
//  DOM References
// ════════════════════════════════════════════
const groupSidebar = document.getElementById('groupSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const groupList = document.getElementById('groupList');
const btnNewGroup = document.getElementById('btnNewGroup');
const btnToggleGroupSidebar = document.getElementById('btnToggleGroupSidebar');
const btnToggleSidebar = document.getElementById('btnToggleSidebar');
const currentGroupTitle = document.getElementById('currentGroupTitle');
const chatMessages = document.getElementById('chatMessages');
const messagesInner = document.getElementById('chatMessages').querySelector('.messages-inner');
const emptyChatState = document.getElementById('emptyChatState');
const groupMessageInput = document.getElementById('groupMessageInput');
const btnSendMessage = document.getElementById('btnSendMessage');
const participantsSidebar = document.getElementById('participantsSidebar');
const participantsList = document.getElementById('participantsList');
const onlineCount = document.getElementById('onlineCount');
const totalAgents = document.getElementById('totalAgents');

// ════════════════════════════════════════════
//  State Management
// ════════════════════════════════════════════
let activeGroupId = getActiveGroupId();
let isSidebarVisible = true;
let isMobile = window.innerWidth <= 992;

// ════════════════════════════════════════════
//  UI Rendering Functions
// ════════════════════════════════════════════
function renderGroupList() {
  const groups = loadGroups();
  groupList.innerHTML = '';
  
  if (!groups.length) {
    groupList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-robot"></i></div>
        <p>No groups yet</p>
        <p style="margin-top:8px;font-size:12px">Click "New Group" to create one</p>
      </div>
    `;
    return;
  }
  
  groups.forEach(group => {
    const item = document.createElement('div');
    item.className = 'group-item' + (group.id === activeGroupId ? ' active' : '');
    item.dataset.groupId = group.id;
    
    // Get last message preview
    const lastMessage = group.messages[group.messages.length - 1];
    const preview = lastMessage 
      ? `${getMessageAgentName(lastMessage.agentId)}: ${lastMessage.content.substring(0, 40) + (lastMessage.content.length > 40 ? '...' : '')}`
      : 'No messages yet';
    
    // Get agent count
    const agents = getGroup(group.id)?.agentIds || [];
    
    item.innerHTML = `
      <div class="group-icon"><i class="fa-solid fa-robot"></i></div>
      <div class="group-info">
        <div class="group-name">${escapeHtml(group.name)}</div>
        <div class="group-preview">${escapeHtml(preview)}</div>
      </div>
      <div class="group-meta">
        <div class="group-count">${agents.length} agents</div>
        <div class="group-time">${formatTime(group.updatedAt)}</div>
      </div>
    `;
    
    item.addEventListener('click', () => switchGroup(group.id));
    groupList.appendChild(item);
  });
}

function renderMessages() {
  messagesInner.innerHTML = '';
  
  if (!activeGroupId) {
    messagesInner.appendChild(emptyChatState);
    emptyChatState.style.display = 'block';
    return;
  }
  
  const group = getGroup(activeGroupId);
  if (!group || !group.messages.length) {
    messagesInner.appendChild(emptyChatState);
    emptyChatState.style.display = 'block';
    return;
  }
  
  emptyChatState.style.display = 'none';
  
  group.messages.forEach(message => {
    appendMessageBubble(message);
  });
  
  scrollToBottom();
}

function appendMessageBubble(message) {
  const agent = getAgentById(message.agentId);
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble ' + (message.agentId === 'user' ? 'user' : 'agent');
  bubble.innerHTML = `
    <div class="message-wrapper">
      <div class="message-avatar">
        <i class="fa-solid ${agent ? agent.avatar : 'fa-user'}"></i>
      </div>
      <div class="message-content">${escapeHtml(message.content)}</div>
    </div>
    <div class="message-meta">
      <span class="agent-name">${agent ? agent.name : 'Unknown'}</span>
      <span>•</span>
      <span>${formatTime(message.timestamp)}</span>
    </div>
  `;
  
  messagesInner.appendChild(bubble);
  scrollToBottom();
}

function renderParticipants() {
  participantsList.innerHTML = '';
  
  if (!activeGroupId) {
    participantsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-user-astronaut"></i></div>
        <p>No active participants</p>
      </div>
    `;
    updateStats(0, 0);
    return;
  }
  
  const group = getGroup(activeGroupId);
  if (!group) return;
  
  const agents = group.agentIds;
  let onlineCountValue = agents.length;
  
  agents.forEach(agentId => {
    const agent = getAgentById(agentId);
    
    const item = document.createElement('div');
    item.className = 'participant-item';
    item.innerHTML = `
      <div class="participant-avatar" style="background: linear-gradient(135deg, ${agent.color} 0%, #00c498 100%);">
        <i class="fa-solid ${agent.avatar}"></i>
      </div>
      <div class="participant-info">
        <div class="participant-name">${agent.name}</div>
        <div class="participant-role">${agent.role}</div>
      </div>
      <div class="participant-status"></div>
    `;
    
    participantsList.appendChild(item);
  });
  
  updateStats(onlineCountValue, agents.length);
}

function updateStats(online, total) {
  onlineCount.textContent = online;
  totalAgents.textContent = total;
}

// ════════════════════════════════════════════
//  Helper Functions
// ════════════════════════════════════════════
function getAgentById(id) {
  return AGENT_PERSONALITIES.find(a => a.id === id);
}

function getMessageAgentName(agentId) {
  const agent = getAgentById(agentId);
  return agent ? agent.name : (agentId === 'user' ? 'You' : 'Unknown');
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function switchGroup(groupId) {
  setActiveGroupId(groupId);
  activeGroupId = groupId;
  
  const group = getGroup(groupId);
  if (group) {
    currentGroupTitle.textContent = group.name;
    renderMessages();
    renderParticipants();
  }
  
  renderGroupList();
  
  // Broadcast event for dashboard integration
  if (window.parent && window.parent.postMessage) {
    window.parent.postMessage({
      type: 'expertgroups:switch',
      module: 'expertgroups',
      payload: { groupId }
    }, '*');
  }
}

function createNewGroup() {
  const name = prompt('Enter group name:', 'New Expert Group');
  if (!name) return;
  
  // Select default agents
  const agentIds = ['planner', 'architect'];
  
  const group = createGroup(name, agentIds);
  switchGroup(group.id);
  renderGroupList();
}

// ════════════════════════════════════════════
//  Event Handlers
// ════════════════════════════════════════════
btnNewGroup.addEventListener('click', createNewGroup);

btnToggleGroupSidebar.addEventListener('click', () => {
  groupSidebar.classList.toggle('collapsed');
  sidebarOverlay.classList.toggle('visible', !groupSidebar.classList.contains('collapsed'));
  isSidebarVisible = !groupSidebar.classList.contains('collapsed');
});

btnToggleSidebar.addEventListener('click', () => {
  participantsSidebar.classList.toggle('collapsed');
  sidebarOverlay.classList.toggle('visible', !participantsSidebar.classList.contains('collapsed'));
});

sidebarOverlay.addEventListener('click', () => {
  groupSidebar.classList.add('collapsed');
  participantsSidebar.classList.add('collapsed');
  sidebarOverlay.classList.remove('visible');
  isSidebarVisible = false;
});

groupMessageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

btnSendMessage.addEventListener('click', sendMessage);

// Auto-resize textarea
function autoResizeTextarea() {
  groupMessageInput.style.height = 'auto';
  groupMessageInput.style.height = Math.min(groupMessageInput.scrollHeight, 160) + 'px';
}

groupMessageInput.addEventListener('input', autoResizeTextarea);

// ════════════════════════════════════════════
//  Message Sending
// ════════════════════════════════════════════
async function sendMessage() {
  if (!activeGroupId) {
    alert('Please select or create a group first');
    return;
  }
  
  const text = groupMessageInput.value.trim();
  if (!text) return;
  
  // Add user message
  addMessage(activeGroupId, 'user', text);
  appendMessageBubble({ agentId: 'user', content: text, timestamp: Date.now() });
  groupMessageInput.value = '';
  autoResizeTextarea();
  
  // Simulate agent responses (in real implementation, this would call the API)
  const group = getGroup(activeGroupId);
  if (!group) return;
  
  // Send message to each agent in parallel
  for (const agentId of group.agentIds) {
    if (agentId !== 'user') {
      // Simulate response delay
      setTimeout(async () => {
        const response = await generateAgentResponse(agentId, text);
        addMessage(activeGroupId, agentId, response);
        appendMessageBubble({ agentId, content: response, timestamp: Date.now() });
      }, Math.random() * 1000 + 500);
    }
  }
}

async function generateAgentResponse(agentId, message) {
  // In real implementation, this would call the backend API
  // For now, return a simulated response
  
  const agent = getAgentById(agentId);
  
  // Simulate different response styles based on agent personality
  const responses = {
    planner: `Based on your message "${message}", I recommend we break this down into strategic phases. First, we should analyze the core objectives, then develop implementation steps.`,
    architect: `Analyzing your request: "${message}". The system architecture should follow these principles: modularity, scalability, and maintainability. I propose using a microservices approach.`,
    analyst: `Regarding "${message}", I've analyzed the key points. Here are the critical insights: [1] Main objective clear, [2] Implementation considerations noted, [3] Success criteria defined.`,
    writer: `On the topic of "${message}", I can craft a comprehensive response. The key elements to include are: clear messaging, audience engagement, and actionable takeaways.`,
    coder: `Implementing "${message}" requires careful code structure. I'll use modern ES6+ features with proper error handling, documentation, and unit tests.`,
    researcher: `For "${message}", I'll conduct a thorough research. I'll examine multiple sources, cross-reference information, and provide evidence-based insights.`,
    designer: `Designing for "${message}" needs a user-centric approach. I'll focus on visual hierarchy, accessibility, and responsive design principles.`,
    reviewer: `Reviewing "${message}": Quality checks pass. Recommendations: add test coverage, improve documentation, and ensure cross-browser compatibility.`
  };
  
  return responses[agentId] || `Agent "${agent?.name || agentId}" processed: "${message}"`;
}

// ════════════════════════════════════════════
//  Dashboard Integration
// ════════════════════════════════════════════
function initDashboardIntegration() {
  // Listen for messages from parent window
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'dashboard:theme-change') {
      // Handle theme changes if needed
      console.log('Expert Groups: Theme changed', e.data.payload);
    }
  });
}

// ════════════════════════════════════════════
//  Initialization
// ════════════════════════════════════════════
function init() {
  // Set initial state
  if (activeGroupId && getGroup(activeGroupId)) {
    switchGroup(activeGroupId);
  } else {
    // Create default group if none exists
    const groups = loadGroups();
    if (!groups.length) {
      createGroup('Default Group', ['planner', 'architect', 'analyst']);
      activeGroupId = getGroup('Default Group').id;
      switchGroup(activeGroupId);
    }
  }
  
  renderGroupList();
  renderParticipants();
  autoResizeTextarea();
  initDashboardIntegration();
  
  // Log initialization
  console.log('Expert Groups Module initialized');
  console.log('Active group:', activeGroupId ? getGroup(activeGroupId)?.name : 'None');
  
  // Broadcast initialization
  if (window.parent && window.parent.postMessage) {
    window.parent.postMessage({
      type: 'expertgroups:ready',
      module: 'expertgroups'
    }, '*');
  }
}

// ════════════════════════════════════════════
//  Event Listeners for Module Management
// ════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', init);

// Listen for messages from iframe
window.addEventListener('message', (e) => {
  if (e.data && e.data.type) {
    switch (e.data.type) {
      case 'notification':
        console.log('Expert Groups: Notification received', e.data.payload);
        break;
      case 'themeChange':
        console.log('Expert Groups: Theme change received', e.data.payload);
        break;
    }
  }
});
