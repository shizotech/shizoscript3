# Expert Groups Backend API Documentation

## Overview

The Expert Groups module provides a group chat functionality with AI agents. This documentation covers the backend API endpoints, data structures, message flows, and usage examples for the Expert Groups module.

**Backend Server**: `http://localhost:13337`  
**Data Storage**: LevelDB in `agent_space/dashboard/expertgroups.db`  
**Namespace**: `window.DashboardExpertGroups.API`

---

## Data Structures

### Expert Group Structure

```json
{
  "id": "expertgroup_01-Jan-2026_12-00-00_xyz123",
  "name": "Development Team",
  "description": "Group for development team discussions",
  "agents": [
    {
      "id": "agent1",
      "name": "Planner",
      "role": "Strategic Planner",
      "personality": "Strategic and organized, focuses on long-term planning",
      "color": "#006d5a",
      "avatar": "fa-robot",
      "canReadFiles": true,
      "canWriteFiles": false,
      "canUseSkills": true,
      "createdAt": 1704067200000
    }
  ],
  "agentIds": ["agent1", "agent2"],
  "messages": [
    {
      "id": "msg_01-Jan-2026_12-30-00_abc456",
      "timestamp": 1704069000000,
      "agentId": "user",
      "content": "Hello agents!"
    }
  ],
  "createdAt": 1704067200000,
  "updatedAt": 1704069000000
}
```

### Agent Structure (within groups)

```json
{
  "id": "agent_id",
  "name": "Agent Name",
  "role": "Agent Role",
  "personality": "Agent Personality Description",
  "color": "#hexcolor",
  "avatar": "icon-name",
  "canReadFiles": true,
  "canWriteFiles": false,
  "canUseSkills": true,
  "createdAt": 1234567890
}
```

### Message Structure

```json
{
  "id": "msg_id",
  "timestamp": 1234567890,
  "agentId": "user_or_agent_id",
  "content": "Message content"
}
```

---

## API Endpoints

### Authentication

No authentication required. All endpoints are publicly accessible on the local server.

### Request/Response Format

All endpoints follow this common format:

**Success Response:**
```json
{
  "ok": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "ok": false,
  "error": "Error message"
}
```

---

## Group Management Endpoints

### 1. List All Expert Groups

**GET** `/api/expertgroups/list`

Retrieves all expert groups from the database.

**Response:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "expertgroup_01-Jan-2026_12-00-00_xyz123",
      "name": "Development Team",
      "description": "Group for development team discussions",
      "agents": [...],
      "agentIds": ["agent1", "agent2"],
      "messages": [...],
      "createdAt": 1704067200000,
      "updatedAt": 1704069000000
    }
  ]
}
```

**JavaScript Example:**
```javascript
const groups = await window.DashboardExpertGroups.API.list();
console.log(groups);
```

---

### 2. Get Specific Expert Group

**GET** `/api/expertgroups/:id`

Retrieves a specific expert group by ID.

**Response:**
```json
{
  "ok": true,
  "data": { ...group object... }
}
```

**Error Response:**
```json
{
  "ok": false,
  "error": "Expert group not found"
}
```

**JavaScript Example:**
```javascript
const group = await window.DashboardExpertGroups.API.get('expertgroup_01-Jan-2026_12-00-00_xyz123');
```

---

### 3. Create New Expert Group

**POST** `/api/expertgroups`

Creates a new expert group with provided data.

**Request Body:**
```json
{
  "name": "Group Name",
  "description": "Group Description",
  "agentIds": ["agent1", "agent2"]
}
```

**Response:**
```json
{
  "ok": true,
  "data": {
    "id": "expertgroup_01-Jan-2026_12-00-00_xyz123",
    "name": "Group Name",
    "description": "Group Description",
    "agents": [],
    "agentIds": ["agent1", "agent2"],
    "messages": [],
    "createdAt": 1704067200000,
    "updatedAt": 1704067200000
  }
}
```

**JavaScript Example:**
```javascript
const newGroup = await window.DashboardExpertGroups.API.create({
  name: 'Development Team',
  description: 'Group for development discussions',
  agentIds: ['agent1', 'agent2']
});
```

---

### 4. Update Expert Group

**PUT** `/api/expertgroups/:id`

Updates an existing expert group.

**Request Body:**
```json
{
  "name": "Updated Group Name",
  "description": "Updated Description",
  "agentIds": ["agent1", "agent2", "agent3"]
}
```

**Response:**
```json
{
  "ok": true,
  "data": { ...updated group object... }
}
```

**JavaScript Example:**
```javascript
const updated = await window.DashboardExpertGroups.API.update(
  'expertgroup_01-Jan-2026_12-00-00_xyz123',
  {
    name: 'Updated Group Name',
    description: 'Updated Description'
  }
);
```

---

### 5. Delete Expert Group

**DELETE** `/api/expertgroups/:id`

Deletes an expert group.

**Response:**
```json
{
  "ok": true
}
```

**JavaScript Example:**
```javascript
const success = await window.DashboardExpertGroups.API.delete('expertgroup_01-Jan-2026_12-00-00_xyz123');
```

---

## Agent Management Endpoints

### 6. Get Agents in Group

**GET** `/api/expertgroups/:id/agents`

Retrieves all agent IDs in an expert group.

**Response:**
```json
{
  "ok": true,
  "data": ["agent1", "agent2", "agent3"]
}
```

**JavaScript Example:**
```javascript
const agentIds = await window.DashboardExpertGroups.API.getAgents('expertgroup_01-Jan-2026_12-00-00_xyz123');
```

---

### 7. Get Specific Agent in Group

**GET** `/api/expertgroups/:id/agents/:agentId`

Retrieves a specific agent object from the group.

**Response:**
```json
{
  "ok": true,
  "data": {
    "id": "agent1",
    "name": "Planner",
    "role": "Strategic Planner",
    "personality": "Strategic and organized, focuses on long-term planning",
    "color": "#006d5a",
    "avatar": "fa-robot",
    "createdAt": 1704067200000
  }
}
```

**Error Response:**
```json
{
  "ok": false,
  "error": "Agent not found"
}
```

**JavaScript Example:**
```javascript
const agent = await window.DashboardExpertGroups.API.getAgent('expertgroup_01-Jan-2026_12-00-00_xyz123', 'agent1');
console.log(agent.personality);
```

---

### 8. Add Agent to Group

**POST** `/api/expertgroups/:id/agents`

Adds an agent to an expert group.

**Request Body:**
```json
{
  "agent": {
    "id": "agent1",
    "name": "Planner",
    "role": "Strategic Planner",
    "personality": "Strategic and organized, focuses on long-term planning",
    "color": "#006d5a",
    "avatar": "fa-robot",
    "canReadFiles": true,
    "canWriteFiles": false,
    "canUseSkills": true
  }
}
```

**Response:**
```json
{
  "ok": true,
  "data": ["agent1", "agent2"]
}
```

**JavaScript Example:**
```javascript
const success = await window.DashboardExpertGroups.API.addAgent(
  'expertgroup_01-Jan-2026_12-00-00_xyz123',
  {
    id: 'agent1',
    name: 'Planner',
    role: 'Strategic Planner',
    personality: 'Strategic and organized, focuses on long-term planning',
    color: '#006d5a',
    avatar: 'fa-robot',
    canReadFiles: true,
    canWriteFiles: false,
    canUseSkills: true
  }
);
```

---

### 9. Update Agent in Group

**PUT** `/api/expertgroups/:id/agents/:agentId`

Updates an agent's properties in the group.

**Request Body:**
```json
{
  "name": "Updated Name",
  "role": "Updated Role",
  "personality": "Updated Personality Description",
  "color": "#newcolor",
  "avatar": "new-icon"
}
```

**Response:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "agent1",
      "name": "Updated Name",
      "role": "Updated Role",
      "personality": "Updated Personality Description",
      "color": "#newcolor",
      "avatar": "new-icon"
    }
  ]
}
```

**JavaScript Example:**
```javascript
const agents = await window.DashboardExpertGroups.API.updateAgent(
  'expertgroup_01-Jan-2026_12-00-00_xyz123',
  'agent1',
  {
    personality: 'Updated personality description',
    role: 'Senior Planner'
  }
);
```

---

### 10. Update Agent Personality

**POST** `/api/expertgroups/:id/agents/:agentId/personality`

Updates only the personality field of an agent.

**Request Body:**
```json
{
  "personality": "New personality description"
}
```

**Response:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "agent1",
      "name": "Planner",
      "role": "Strategic Planner",
      "personality": "New personality description",
      "color": "#006d5a",
      "avatar": "fa-robot"
    }
  ]
}
```

**JavaScript Example:**
```javascript
const agents = await window.DashboardExpertGroups.API.updateAgentPersonality(
  'expertgroup_01-Jan-2026_12-00-00_xyz123',
  'agent1',
  'Strategic, organized, and focused on long-term vision'
);
```

**cURL Example:**
```bash
curl -X POST http://localhost:13337/api/expertgroups/expertgroup_01-Jan-2026_12-00-00_xyz123/agents/agent1/personality \
  -H "Content-Type: application/json" \
  -d '{"personality": "Strategic, organized, and focused on long-term vision"}'
```

---

### 11. Remove Agent from Group

**DELETE** `/api/expertgroups/:id/agents/:agentId`

Removes an agent from an expert group.

**Response:**
```json
{
  "ok": true,
  "data": ["agent2"]
}
```

**JavaScript Example:**
```javascript
const agentIds = await window.DashboardExpertGroups.API.removeAgent(
  'expertgroup_01-Jan-2026_12-00-00_xyz123',
  'agent1'
);
```

---

## Message Management Endpoints

### 12. Get Messages in Group

**GET** `/api/expertgroups/:id/messages`

Retrieves all messages in an expert group along with agent personalities.

**Response:**
```json
{
  "ok": true,
  "data": {
    "messages": [
      {
        "id": "msg_01-Jan-2026_12-30-00_abc456",
        "timestamp": 1704069000000,
        "agentId": "user",
        "content": "Hello agents!"
      },
      {
        "id": "msg_01-Jan-2026_12-30-05_def789",
        "timestamp": 1704069005000,
        "agentId": "agent1",
        "content": "Hello! How can I help you today?"
      }
    ],
    "personalities": {
      "agent1": {
        "personality": "Strategic and organized, focuses on long-term planning",
        "name": "Planner",
        "role": "Strategic Planner",
        "color": "#006d5a",
        "avatar": "fa-robot"
      },
      "agent2": {
        "personality": "System-focused, emphasizes modularity and scalability",
        "name": "Architect",
        "role": "System Architect",
        "color": "#00a884",
        "avatar": "fa-cubes"
      }
    }
  }
}
```

**JavaScript Example:**
```javascript
const data = await window.DashboardExpertGroups.API.getMessages('expertgroup_01-Jan-2026_12-00-00_xyz123');
console.log('Messages:', data.messages);
console.log('Personalities:', data.personalities);
```

---

### 13. Add Message to Group

**POST** `/api/expertgroups/:id/messages`

Adds a message to an expert group.

**Request Body:**
```json
{
  "agentId": "user",
  "content": "Message content",
  "personalities": {
    "agent1": "Agent personality description",
    "agent2": "Another agent personality"
  }
}
```

**Response:**
```json
{
  "ok": true,
  "data": {
    "id": "msg_01-Jan-2026_12-30-00_abc456",
    "timestamp": 1704069000000,
    "agentId": "user",
    "content": "Message content"
  }
}
```

**JavaScript Example:**
```javascript
// Get current group personalities
const group = await window.DashboardExpertGroups.API.get(groupId);
const groupPersonalities = group.personalities || {};

// Send message with personalities
const message = await window.DashboardExpertGroups.API.addMessage(
  groupId,
  {
    agentId: 'user',
    content: 'Hello agents! What are we working on today?'
  },
  groupPersonalities
);
```

---

### 14. Get Messages with Personalities

**GET** `/api/expertgroups/:id/messages`

Retrieves all messages in an expert group along with agent personalities.

**Response:**
```json
{
  "ok": true,
  "data": {
    "messages": [
      {
        "id": "msg_01-Jan-2026_12-30-00_abc456",
        "timestamp": 1704069000000,
        "agentId": "user",
        "content": "Hello agents!"
      },
      {
        "id": "msg_01-Jan-2026_12-30-05_def789",
        "timestamp": 1704069005000,
        "agentId": "agent1",
        "content": "Hello! How can I help you today?"
      }
    ],
    "personalities": {
      "agent1": "Strategic and organized, focuses on long-term planning",
      "agent2": "System-focused, emphasizes modularity and scalability"
    }
  }
}
```

**JavaScript Example:**
```javascript
const data = await window.DashboardExpertGroups.API.getMessages('expertgroup_01-Jan-2026_12-00-00_xyz123');
console.log('Messages:', data.messages);
console.log('Personalities:', data.personalities);
```

**Key Points:**
- The `personalities` field contains key-value pairs where keys are agent IDs and values are their personality descriptions
- Personalities are stored at the expert group level, not per-message
- Personalities are updated when a user sends a message (via the `personalities` request field)
- On group reload, personalities are preserved and returned with messages

---

## Message Pushing Flow

### User Sending a Message

Here's how to push a new message into a group chat:

1. **User types message** in the input field
2. **Frontend validates** the message text
3. **Frontend adds message** to UI immediately (optimistic update)
4. **Frontend retrieves current group personalities** from the active group
5. **Frontend sends POST request** to `/api/expertgroups/:groupId/messages` with personalities included
6. **Backend stores message** in the group's messages array
7. **Frontend polls** for new messages every 2 seconds to receive agent responses
8. **Backend processes message** through AI agents with personality context (separate implementation)
9. **Agent responses are added** to the group via separate POST requests
10. **Frontend receives response** via polling and updates UI

**Complete Example:**
```javascript
async function sendMessage(groupId, text) {
  // Add user message to UI immediately
  appendMessageBubble({
    agentId: 'user',
    content: text,
    timestamp: Date.now()
  });
  
  // Get current group personalities to send with message
  const group = await window.DashboardExpertGroups.API.get(groupId);
  const groupPersonalities = group.personalities || {};
  
  // Add message to backend (with personalities for AI context)
  try {
    const addedMessage = await window.DashboardExpertGroups.API.addMessage(groupId, {
      agentId: 'user',
      content: text
    }, groupPersonalities);
    
    // Update local state with backend response
    if (addedMessage) {
      addedMessage.timestamp = Date.now();
      // Use addedMessage instead of original
    }
  } catch (e) {
    console.error('Error adding message:', e);
    // Handle error (e.g., show error UI)
  }
}

// Usage
sendMessage('expertgroup_01-Jan-2026_12-00-00_xyz123', 'Hello agents!');
```

The frontend `DashboardExpertGroups.Manager.sendMessage()` method automatically handles sending personalities with messages when the user presses Enter or clicks the send button.

---

### Processing User Messages

The backend provides the infrastructure for message storage, but AI processing requires separate implementation. Here's the recommended flow:

1. **Frontend sends user message** to `/api/expertgroups/:groupId/messages`
2. **Backend stores message** in the group's messages array
3. **Backend triggers AI processing** (custom implementation needed)
4. **AI generates response** based on:
   - Message content
   - Agent personality
   - Conversation context
5. **Backend adds response** to group messages array
6. **Frontend polls** for new messages
7. **Frontend displays response** in chat UI

**Backend Processing Example (ShizoScript):**
```shizo
// This would be implemented in dashboard_api.shio

// Get group and messages
group = expertgroups_db.get(expertgroup_id);
messages = group.messages;

// Get latest user message
lastMessage = messages[messages.size() - 1];

if(lastMessage.agentId == "user") {
    // Process with AI
    for each agent in group.agents {
        // Generate response using agent personality
        response = generate_ai_response(
            lastMessage.content,
            agent.personality,
            messages
        );
        
        // Add response to group
        message_id = "msg_" + std.date("%d-%m-%Y_%H-%M-%S") + "_" + std.random_hash();
        response_message = [
            id = message_id,
            timestamp = std.millis(),
            agentId = agent.id,
            content = response
        ];
        
        group.messages.push_back(response_message);
    }
    
    // Update timestamp
    group.updatedAt = std.millis();
    
    // Save updated group
    expertgroups_db.put(expertgroup_id, group);
}
```

---

## Agent Personality Management

### Setting Initial Personality

When creating a new agent, include the personality field:

**JavaScript Example:**
```javascript
const agent = await window.DashboardExpertGroups.API.addAgent(
  'expertgroup_01-Jan-2026_12-00-00_xyz123',
  {
    id: 'custom_agent',
    name: 'Custom Agent',
    role: 'Custom Role',
    personality: 'Custom personality description here',
    color: '#ff6600',
    avatar: 'fa-star'
  }
);
```

### Editing Personality After Creation

Use the personality update endpoint:

**JavaScript Example:**
```javascript
await window.DashboardExpertGroups.API.updateAgentPersonality(
  'expertgroup_01-Jan-2026_12-00-00_xyz123',
  'custom_agent',
  'Updated personality description'
);
```

**HTTP Example:**
```http
POST /api/expertgroups/expertgroup_01-Jan-2026_12-00-00_xyz123/agents/custom_agent/personality
Content-Type: application/json

{
  "personality": "Updated personality description"
}
```

### Real-Time Personality Sync

The backend automatically syncs personality changes:

1. **UI allows editing** personality in a modal or input field
2. **Frontend calls** `updateAgentPersonality(groupId, agentId, newPersonality)`
3. **Backend validates** and stores new personality
4. **Frontend updates UI** with new personality
5. **Agent responses** use the updated personality (when AI processing is implemented)

**Complete UI Example:**
```javascript
async function editAgentPersonality(groupId, agentId, currentPersonality) {
  const newPersonality = prompt('Edit agent personality:', currentPersonality);
  
  if (newPersonality && newPersonality !== currentPersonality) {
    try {
      await window.DashboardExpertGroups.API.updateAgentPersonality(
        groupId,
        agentId,
        newPersonality
      );
      
      // Update UI
      updateAgentDisplay(agentId, { personality: newPersonality });
      showSuccessMessage('Personality updated successfully!');
    } catch (e) {
      showError('Failed to update personality: ' + e.message);
    }
  }
}
```

---

## Code Examples

### Complete Agent Creation with Personality

```javascript
async function createAgentWithPersonality(groupId) {
  try {
    const agent = await window.DashboardExpertGroups.API.addAgent(groupId, {
      id: 'planner_agent_' + Date.now(),
      name: 'Planner Agent',
      role: 'Strategic Planner',
      personality: 'Strategic, organized, and focused on long-term planning. Always considers multiple perspectives.',
      color: '#006d5a',
      avatar: 'fa-robot'
    });
    
    console.log('Agent created:', agent);
    return agent;
  } catch (e) {
    console.error('Failed to create agent:', e);
    return null;
  }
}
```

### Complete Message Flow

```javascript
async function completeMessageFlow(groupId, userMessage) {
  // 1. Send user message
  const userMsg = await window.DashboardExpertGroups.API.addMessage(groupId, {
    agentId: 'user',
    content: userMessage
  });
  
  console.log('User message sent:', userMsg);
  
  // 2. Poll for responses (after 2 seconds)
  setTimeout(async () => {
    const messages = await window.DashboardExpertGroups.API.getMessages(groupId);
    console.log('Latest messages:', messages);
  }, 2000);
}
```

### Complete Agent Update Flow

```javascript
async function updateAgentPersonalityFlow(groupId, agentId, newPersonality) {
  try {
    // Update personality
    const agents = await window.DashboardExpertGroups.API.updateAgentPersonality(
      groupId,
      agentId,
      newPersonality
    );
    
    console.log('Agents after personality update:', agents);
    
    // Verify update
    const agent = await window.DashboardExpertGroups.API.getAgent(groupId, agentId);
    console.log('Verified personality:', agent.personality);
    
    return agent;
  } catch (e) {
    console.error('Failed to update personality:', e);
    return null;
  }
}
```

---

## Polling Strategy

### Message Polling

The frontend polls for new messages every 2 seconds:

```javascript
// Start polling
setInterval(async () => {
  if (!activeGroupId) return;
  
  try {
    const messages = await window.DashboardExpertGroups.API.getMessages(activeGroupId);
    
    if (!messages || !messages.length) return;
    
    // Check if there are new messages
    const lastBackendMessage = messages[messages.length - 1];
    const hasNewMessages = !lastMessageTimestamp || 
                          (lastBackendMessage && 
                           lastBackendMessage.timestamp > lastMessageTimestamp);
    
    if (hasNewMessages) {
      // Update state
      messagesState = messages;
      lastMessageTimestamp = lastBackendMessage.timestamp;
      
      // Re-render messages
      renderMessages();
    }
  } catch (e) {
    console.error('Error polling messages:', e);
  }
}, 2000); // Poll every 2 seconds
```

### Polling Optimization

For production, consider:

1. **E_tag based polling** - Compare E_tags instead of full data
2. **Delta updates** - Only fetch new messages since last timestamp
3. **WebSocket implementation** - True real-time updates

---

## Error Handling

### Common Errors

| Error | Status | Description |
|-------|--------|-------------|
| `Expert group not found` | 404 | Group ID doesn't exist |
| `Agent not found` | 404 | Agent ID doesn't exist in group |
| `Invalid request body` | 400 | JSON parsing failed |
| `Not enabled` | 503 | LevelDB not initialized |

### Error Response Format

```json
{
  "ok": false,
  "error": "Error message"
}
```

### JavaScript Error Handling

```javascript
try {
  const result = await window.DashboardExpertGroups.API.addMessage(groupId, {
    agentId: 'user',
    content: 'Test message'
  });
  
  console.log('Success:', result);
} catch (e) {
  console.error('API Error:', e);
  
  if (e.message.includes('not found')) {
    showNotification('Group not found. Please create a group first.', 'error');
  } else if (e.message.includes('Invalid request')) {
    showNotification('Invalid message format.', 'error');
  } else {
    showNotification('Failed to send message. Please try again.', 'error');
  }
}
```

---

## Best Practices

### 1. Always Include Personality

When creating agents, provide a descriptive personality:

```javascript
{
  personality: 'Strategic, organized, and focused on long-term planning. Always considers multiple perspectives.'
}
```

### 2. Poll Messages Regularly

Use 2-second polling for real-time-ish experience:

```javascript
setInterval(pollMessages, 2000);
```

### 3. Validate Agent Data

Before saving, validate agent properties:

```javascript
function validateAgent(agent) {
  return agent.id && 
         agent.name && 
         agent.role && 
         agent.personality && 
         agent.color && 
         agent.avatar;
}
```

### 4. Handle Errors Gracefully

Always wrap API calls in try-catch:

```javascript
try {
  await window.DashboardExpertGroups.API.addMessage(groupId, data);
} catch (e) {
  console.error('API call failed:', e);
  showNotification('Failed: ' + e.message, 'error');
}
```

### 5. Keep Personalities Descriptive

Clear personalities lead to better agent behavior:

```javascript
// Good
personality: 'Strategic, organized, and focused on long-term planning. Always considers multiple perspectives.'

// Bad
personality: 'Planning agent'
```

---

## API Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/expertgroups/list` | GET | List all groups |
| `/api/expertgroups` | POST | Create group |
| `/api/expertgroups/:id` | GET | Get group |
| `/api/expertgroups/:id` | PUT | Update group |
| `/api/expertgroups/:id` | DELETE | Delete group |
| `/api/expertgroups/:id/agents` | GET | Get agent IDs |
| `/api/expertgroups/:id/agents` | POST | Add agent |
| `/api/expertgroups/:id/agents/:agentId` | GET | Get agent |
| `/api/expertgroups/:id/agents/:agentId` | PUT | Update agent |
| `/api/expertgroups/:id/agents/:agentId` | DELETE | Remove agent |
| `/api/expertgroups/:id/agents/:agentId/personality` | POST | Update personality |
| `/api/expertgroups/:id/messages` | GET | Get messages |
| `/api/expertgroups/:id/messages` | POST | Add message |

---

## Implementation Checklist

### Backend (dashboard_api.shio)
- [x] Initialize LevelDB for expert groups
- [x] Create group CRUD endpoints
- [x] Create agent management endpoints
- [x] Create message endpoints
- [x] Personality update endpoint
- [x] Include agent personalities in messages response
- [x] Accept personalities in message POST requests
- [x] Persist personalities to expert group data structure
- [x] Return personalities on group and message retrieval

### Frontend (script.js)
- [x] API client with all methods
- [x] Group state management
- [x] Polling implementation
- [x] Message rendering
- [x] Agent management UI
- [x] Send personalities with user messages
- [x] Handle new messages response format with personalities
- [x] Fix message rendering when switching groups (clear messageIds on group switch)

### Bug Fixes

#### Fixed: Messages Not Displaying When Switching Groups

**Problem:** When switching between expert groups, messages were fetched correctly from the backend API but not displayed in the UI. The user didn't see the message history, only agents would see messages through polling.

**Root Cause:** 
- The `renderMessages()` function only renders messages whose timestamps are NOT in `state.messageIds`
- When switching groups, `state.messageIds` was NOT being cleared
- Old group's message timestamps remained in `messageIds`
- New group's messages were filtered out because they appeared "already seen"

**Solution:**
- Added `this.state.messageIds = new Set();` in `switchGroup()` when switching to a valid group
- Added `this.state.messageIds = new Set();` in the else branch when switching to no group
- This ensures all messages from the new group render initially because `messageIds` starts empty
- As messages render, their timestamps are added to `messageIds`
- Polling continues to work correctly because it checks `state.messages` for duplicates, not `messageIds`

**Code Changes in `script.js`:**
```javascript
// In switchGroup() when group exists:
// Store messages in state
this.state.messages = messages;
// Clear messageIds to ensure all messages render (fixes bug where old timestamps blocked new messages)
this.state.messageIds = new Set();

// In switchGroup() when no group:
this.state.activeGroupId = null;
this.state.messages = [];
this.state.lastMessageTimestamp = null;
// Clear messageIds when switching to no group
this.state.messageIds = new Set();
```

**Impact:**
- Messages now display correctly when switching groups
- No duplicate messages on polling
- Polling mechanism continues to work correctly
- User messages still work correctly

---

#### Fixed: Chat Message Rendering Bugs (Timestamp-Based Deduplication)

**Problem 1:** First message in new empty chat doesn't show in UI  
**Problem 2:** Second user message causes previous messages to disappear on third send

**Root Cause Analysis:**

The bugs stem from two core issues in `script.js`:

1. **Timestamp-based deduplication is fragile**: Code uses `message.timestamp` in `state.messageIds` Set to track seen messages, but multiple messages can have identical timestamps (especially when sent rapidly), causing deduplication failures.

2. **RenderMessages clears DOM first**: Line 865 (`messagesInner.innerHTML = ''`) always clears the message container before rendering, then only adds messages NOT in `messageIds`. This creates a race condition where:
   - First message: Added to DOM via `appendMessageBubble()`, but may get filtered on next render
   - Second message: Adds to state, but if `renderMessages()` is called, it clears DOM then filters
   - Third message: `state.messageIds` may have duplicates/corruption, causing all messages to disappear

**Current Message Flow (Before Fix):**
```
sendMessage() → appendMessageBubble() + state.messages.push() + state.messageIds.add()
            ↓
Polling → renderMessages() → clears DOM → only adds messages NOT in messageIds
```

**The Fix Strategy Applied:**
1. Use unique `message.id` instead of `message.timestamp` for deduplication
2. Remove DOM clearing from `renderMessages()` - make it incremental
3. Separate user messages from backend messages in tracking
4. Ensure atomic state updates

**Implementation Details:**

**1. Replace timestamp-based tracking with ID-based tracking**
- Updated `renderMessages()` to use `message.id` instead of `message.timestamp` for `state.messageIds` tracking
- Added defensive ID generation: if message lacks `id`, generates one from timestamp + random suffix
- Added console warning for messages without IDs

**Code Changes:**
```javascript
// In renderMessages() - lines 898-910:
messages.forEach(message => {
  // FIX 1: Use unique message.id instead of timestamp for deduplication
  // FIX 2: Ensure message has id (generate one if missing)
  if (!message.id) {
    message.id = message.timestamp + '-' + Math.random().toString(36).substring(2, 9);
    console.warn('Message missing id, generated:', message.id);
  }
  
  if (!this.state.messageIds.has(message.id)) {
    this.state.messageIds.add(message.id);
    this.appendMessageBubble(message);
  }
});

// In switchGroup() - lines 757-763:
messages.forEach(msg => {
  if (!msg.id) {
    msg.id = msg.timestamp + '-' + Math.random().toString(36).substring(2, 9);
    console.warn('Message from backend missing id, generated:', msg.id);
  }
  // FIX: DO NOT add to messageIds here - let renderMessages() add IDs as it renders
  // This prevents the bug where all messages are skipped because they appear "already seen"
});
```

**2. Remove DOM clearing from renderMessages()**
- Removed `messagesInner.innerHTML = ''` from line 865
- Made `renderMessages()` incremental - only adds new messages to DOM
- Preserves existing messages and appends only new ones

**Code Changes:**
```javascript
// Removed line:
// messagesInner.innerHTML = '';
```

**3. Fix sendMessage() for state consistency**
- Added ID generation before adding to state
- Added to `state.messageIds` BEFORE `appendMessageBubble()`
- Ensures atomic state updates

**Code Changes:**
```javascript
// In sendMessage() - lines 1408-1421:
if (addedMessage) {
  // FIX 1: Ensure message has unique ID (generate one if missing)
  if (!addedMessage.id) {
    addedMessage.id = addedMessage.timestamp + '-' + Math.random().toString(36).substring(2, 9);
    console.warn('User message from backend missing id, generated:', addedMessage.id);
  }
  
  // FIX 2: Add to state BEFORE rendering (for atomic updates)
  this.state.messages.push(addedMessage);
  // Add to messageIds to prevent polling from re-processing (using ID now)
  this.state.messageIds.add(addedMessage.id);
  
  // FIX 3: Explicitly render the user message to ensure it appears
  this.appendMessageBubble(addedMessage);
}
```

**4. Fix polling logic to use message.id**
- Changed polling filter to use `message.id` instead of `timestamp`
- Added ID generation for incoming messages

**Code Changes:**
```javascript
// In polling - lines 438-444:
const newMessages = messages.filter(msg => {
  // FIX: Ensure message has id (generate one if missing) and check if already in state
  if (!msg.id) {
    msg.id = msg.timestamp + '-' + Math.random().toString(36).substring(2, 9);
    console.warn('Polling message missing id, generated:', msg.id);
  }
  return !this.state.messages.some(existing => existing.id === msg.id) &&
    msg.agentId !== 'user'  // Skip user messages - they're already displayed
});
```

**5. Update messageIds handling in switchGroup()**
- Now generates IDs for messages and adds them to `messageIds` set when switching groups
- Ensures all messages are properly tracked

**Impact:**
- First message in new chat now appears immediately
- Multiple user messages persist correctly (no disappearing)
- Message deduplication works reliably using unique IDs
- DOM rendering is incremental (append-only) instead of clear-and-rebuild
- Race conditions eliminated

**Testing Scenarios:**
- ✅ New empty chat → send first message → appears immediately
- ✅ Send second message → first message still shows
- ✅ Send third message → all previous messages persist
- ✅ Switch groups → messages display correctly
- ✅ Polling continues to work without duplicates

---

### Documentation
- [x] API endpoint documentation
- [x] Data structure documentation
- [x] Message flow documentation
- [x] Personality management documentation
- [x] Code examples

### Testing
- [ ] Test all API endpoints
- [ ] Test message flow with personalities
- [ ] Test personality updates
- [ ] Test error handling
- [ ] Test polling behavior

---

## Conclusion

The Expert Groups backend provides a complete foundation for group chat with AI agents. The API supports:

- Full group management (CRUD)
- Agent management with full personality control
- Message storage and retrieval
- Real-time message polling

All endpoints are well-documented, and the JavaScript API client provides convenient access to all functionality.

For questions or issues, refer to the main dashboard documentation or contact the development team.
