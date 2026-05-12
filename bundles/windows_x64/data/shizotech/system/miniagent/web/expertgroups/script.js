/* ── Expert Groups Dashboard Logic ── */

// ════════════════════════════════════════════
//  Expert Groups Module IIFE
// ════════════════════════════════════════════

(function() {
  // Use DashboardExpertGroups namespace to avoid global conflicts
  window.DashboardExpertGroups = window.DashboardExpertGroups || {};

  // ════════════════════════════════════════════
  //  Backend API Client
  // ════════════════════════════════════════════

  window.DashboardExpertGroups.API = {
    baseUrl: 'http://localhost:13337',
    
    // Fetch all expert groups from backend
    async list() {
      try {
        const response = await fetch(`${this.baseUrl}/api/expertgroups/list`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.ok) return data.data || [];
        throw new Error(data.error || 'Failed to fetch expert groups');
      } catch (e) {
        console.error('Error fetching expert groups:', e);
        return [];
      }
    },
    
    // Fetch specific expert group by ID
    async get(groupId) {
      try {
        const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.ok) return data.data || null;
        throw new Error(data.error || 'Expert group not found');
      } catch (e) {
        console.error('Error fetching expert group:', e);
        return null;
      }
    },
    
    // Create new expert group
    async create(groupData) {
      try {
        const response = await fetch(`${this.baseUrl}/api/expertgroups`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(groupData)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.ok) return data.data || null;
        throw new Error(data.error || 'Failed to create expert group');
      } catch (e) {
        console.error('Error creating expert group:', e);
        return null;
      }
    },
    
    // Update expert group
    async update(groupId, updates) {
      try {
        const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.ok) return data.data || null;
        throw new Error(data.error || 'Failed to update expert group');
      } catch (e) {
        console.error('Error updating expert group:', e);
        return null;
      }
    },
    
    // Delete expert group
    async delete(groupId) {
      try {
        const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data.ok || false;
      } catch (e) {
        console.error('Error deleting expert group:', e);
        return false;
      }
    },
    
    // Get agents in expert group
  async getAgents(groupId) {
    try {
      const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}/agents`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.ok) {
        // Handle both old format (array of IDs) and new format (object with agentIds and agents)
        if (data.data && Array.isArray(data.data)) {
          // Old format: just return agent IDs
          return data.data;
        } else if (data.data && data.data.agentIds) {
          // New format: return object with both agentIds and agents
          return data.data;
        }
        return [];
      }
      throw new Error(data.error || 'Failed to fetch agents');
    } catch (e) {
      console.error('Error fetching agents:', e);
      return [];
    }
  },
  
  // Get specific agent in expert group
  async getAgent(groupId, agentId) {
    try {
      const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}/agents/${encodeURIComponent(agentId)}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.ok) return data.data || null;
      throw new Error(data.error || 'Agent not found');
    } catch (e) {
      console.error('Error fetching agent:', e);
      return null;
    }
  },
  
  // Add agent to expert group
  async addAgent(groupId, agentData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent: agentData })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.ok) return data.data || null;
      throw new Error(data.error || 'Failed to add agent');
    } catch (e) {
      console.error('Error adding agent:', e);
      return null;
    }
  },
  
  // Update agent in expert group
  async updateAgent(groupId, agentId, updates) {
    try {
      const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}/agents/${encodeURIComponent(agentId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.ok) return data.data || null;
      throw new Error(data.error || 'Failed to update agent');
    } catch (e) {
      console.error('Error updating agent:', e);
      return null;
    }
  },
  
  // Update agent personality in expert group
  async updateAgentPersonality(groupId, agentId, personality) {
    try {
      const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}/agents/${encodeURIComponent(agentId)}/personality`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personality: personality })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.ok) return data.data || null;
      throw new Error(data.error || 'Failed to update agent personality');
    } catch (e) {
      console.error('Error updating agent personality:', e);
      return null;
    }
  },
  
  // Remove agent from expert group
  async removeAgent(groupId, agentId) {
    try {
      const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}/agents/${encodeURIComponent(agentId)}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data.ok || false;
    } catch (e) {
      console.error('Error removing agent:', e);
      return false;
    }
  },
  
  // Get messages for an expert group
    async getMessages(groupId) {
        try {
          const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}/messages`);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          if (data.ok) {
            // New response format: { messages: [...], personalities: {...} }
            if (data.data && data.data.messages !== undefined) {
              // Ensure messages is always an array
              if (!Array.isArray(data.data.messages)) {
                return { messages: [], personalities: {} };
              }
              return data.data;
            }
            // Fallback for backward compatibility: just an array of messages
            if (Array.isArray(data.data)) {
              return { messages: data.data, personalities: {} };
            }
            return { messages: [], personalities: {} };
          }
          throw new Error(data.error || 'Failed to fetch messages');
        } catch (e) {
          console.error('Error fetching messages:', e);
          return { messages: [], personalities: {} };
        }
      },
    
    // Add message to expert group
     async addMessage(groupId, messageData, personalities = {}) {
       try {
         const requestBody = {
           ...messageData,
           personalities: personalities
         };
         const response = await fetch(`${this.baseUrl}/api/expertgroups/${encodeURIComponent(groupId)}/messages`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(requestBody)
         });
         if (!response.ok) throw new Error(`HTTP ${response.status}`);
         const data = await response.json();
         if (data.ok) return data.data || null;
         throw new Error(data.error || 'Failed to add message');
       } catch (e) {
         console.error('Error adding message:', e);
         return null;
       }
     }
   };

   // ════════════════════════════════════════════
   //  Markdown Renderer
   // ════════════════════════════════════════════

   // Initialize markdownit if available (loaded via CDN in index.html)
   const md = window.markdownit ? window.markdownit({ html: false, linkify: true, breaks: true }) : null;

   // Render markdown text to HTML safely
    window.DashboardExpertGroups.renderMarkdown = function(text) {
      // Input validation: ensure text is a string
      if (text === null || text === undefined) {
        return '';
      }
      // Convert to string if not already a string
      text = String(text);
      
      if (!md) {
        // Fallback: simple markdown conversion without markdownit
        return window.DashboardExpertGroups.escapeHtml(text);
      }
      
      try {
        return md.render(text);
      } catch (e) {
        console.error('Markdown rendering error:', e);
        return window.DashboardExpertGroups.escapeHtml(text);
      }
    };

   // ════════════════════════════════════════════
   //  Expert Group Store
   // ════════════════════════════════════════════

   window.DashboardExpertGroups.Store = {
    storageKey: 'dashboard_expertgroups',
    activeStorageKey: 'dashboard_expertgroups_active',
    
    // Load groups from backend
    async load() {
      try {
        const groups = await window.DashboardExpertGroups.API.list();
        return groups;
      } catch {
        return [];
      }
    },
    
    // Save groups to storage (fallback)
    save(groups) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(groups));
      } catch (e) {
        console.error('Error saving groups:', e);
      }
    },
    
    // Add a group
     async add(group) {
       const newGroup = await window.DashboardExpertGroups.API.create({
         ...group,
         createdAt: Date.now(),
         updatedAt: Date.now(),
         agentIds: group.agentIds || ['planner', 'architect', 'coder1', 'coder2', 'coder3', 'researcher', 'designer', 'reviewer', 'skeptic'],
         personalities: group.personalities || {},
         messages: []
       });
       return newGroup;
     },
    
    // Update a group
    async update(id, updates) {
      const updated = await window.DashboardExpertGroups.API.update(id, updates);
      return updated;
    },
    
    // Delete a group
    async delete(id) {
      const result = await window.DashboardExpertGroups.API.delete(id);
      return result;
    },
    
    // Get a group by ID
    async getById(id) {
      const group = await window.DashboardExpertGroups.API.get(id);
      return group || null;
    },
    
    // Get active group ID
    getActiveId() {
      try {
        return localStorage.getItem(this.activeStorageKey);
      } catch {
        return null;
      }
    },
    
    // Set active group ID
    setActiveId(id) {
      try {
        localStorage.setItem(this.activeStorageKey, id);
      } catch (e) {
        console.error('Error setting active group ID:', e);
      }
    }
  };

  // ════════════════════════════════════════════
  //  Expert Group Manager
  // ════════════════════════════════════════════

  window.DashboardExpertGroups.Manager = {
     state: {
       groups: [],
       activeGroupId: null,
       polling: null,
       lastMessageTimestamp: null,
       isSidebarVisible: true,
       isMobile: false,
       messages: [],
       messageIds: new Set()
     },

    // Initialize expert group manager
    async init() {
      this.state.groups = [];
      this.state.activeGroupId = window.DashboardExpertGroups.Store.getActiveId();
      this.state.isMobile = window.innerWidth <= 992;
      
      this.setupEventListeners();
      
      // Load initial groups from backend
      await this.loadGroups();
      
      // Set up active group
      if (this.state.activeGroupId && this.state.groups.find(g => g.id === this.state.activeGroupId)) {
        this.switchGroup(this.state.activeGroupId);
      } else if (this.state.groups.length > 0) {
        this.switchGroup(this.state.groups[0].id);
      } else {
        // Create default group if none exists
        await this.createDefaultGroup();
      }
      
      this.renderGroupList();
      this.renderParticipants();
      this.renderMessages();
      
      // Start polling for new messages
      this.startPolling();
      
      // Notify dashboard of loaded groups
      this.notifyDashboard('expertgroupsLoaded', { count: this.state.groups.length });
    },

    // Create default group
    async createDefaultGroup() {
      const group = await window.DashboardExpertGroups.Store.add({
        name: 'Default Group',
        agentIds: ['planner', 'architect', 'coder1', 'coder2', 'coder3', 'researcher', 'designer', 'reviewer', 'skeptic'],
        personalities: {
          planner: 'You are a strategic planner and team lead. You coordinate the team, break down complex tasks into actionable phases, and ensure goals are achievable and measurable. You keep the group focused on priorities and timelines.',
          architect: 'You are a system architect. You emphasize modularity, scalability, maintainability, and technical debt management. You consider long-term system evolution and integration patterns.',
          coder1: 'You are a lead implementation engineer. You focus on clean, efficient code, best practices, and robust solutions. You ensure implementations follow architectural guidelines and coding standards.',
          coder2: 'You are a performance and security specialist. You analyze code for optimization opportunities, identify potential security vulnerabilities, and ensure systems can handle scale and security requirements.',
          coder3: 'You are an integration and consistency engineer. You ensure seamless system integration, data consistency, and interoperability between components. You focus on APIs, protocols, and data flow.',
          researcher: 'You are a deep researcher and context specialist. You gather information, analyze context, and provide data-driven insights. You help the team stay informed with relevant research and findings.',
          designer: 'You are a UI/UX and frontend experience specialist. You focus on user-centered design, accessibility, visual hierarchy, and user satisfaction. You ensure products are intuitive and delightful to use.',
          reviewer: 'You are a quality assurance and code review expert. You critically evaluate work, identify edge cases, and ensure high standards of quality. You provide constructive feedback and champion testing.',
          skeptic: 'You are a critical thinking specialist and assumption challenger. You question assumptions, identify potential flaws, and explore alternative approaches. You ensure robust decision-making by playing devil\'s advocate.'
        }
      });
      
      if (group) {
        this.state.activeGroupId = group.id;
        window.DashboardExpertGroups.Store.setActiveId(group.id);
      }
    },

    // Start polling for new messages
      startPolling() {
        if (this.state.polling) {
          clearInterval(this.state.polling);
        }
        
        this.state.polling = setInterval(async () => {
          if (!this.state.activeGroupId) return;
          
          // Track the activeGroupId at the start of this polling cycle
          const currentGroupId = this.state.activeGroupId;
          
          try {
            const messagesData = await window.DashboardExpertGroups.API.getMessages(this.state.activeGroupId);
             const messages = Array.isArray(messagesData.messages) ? messagesData.messages : [];
            
            if (!messages || !messages.length) return;
            
            // FIX 1: Race condition check - verify activeGroupId hasn't changed during request
            // If it has changed, ignore this response to prevent appending to wrong chat
            if (this.state.activeGroupId !== currentGroupId) {
              return;
            }
            
            // Check if there are new messages from backend (compare timestamps)
            const lastBackendMessage = messages[messages.length - 1];
            const hasNewMessages = !this.state.lastMessageTimestamp || 
                                  (lastBackendMessage && lastBackendMessage.timestamp > this.state.lastMessageTimestamp);
            
            if (hasNewMessages) {
                // Find messages that are not yet in our state
                // FIX 2: Only append messages from agents, not from user (user messages are already in UI)
                const newMessages = messages.filter(msg => {
                  // FIX: Ensure message has id (generate one if missing) and check if already in state
                  if (!msg.id) {
                    msg.id = msg.timestamp + '-' + Math.random().toString(36).substring(2, 9);
                    console.warn('Polling message missing id, generated:', msg.id);
                  }
                  return !this.state.messages.some(existing => existing.id === msg.id) &&
                    msg.agentId && msg.agentId !== 'user'  // Skip user messages and ensure agentId exists
                });
               
               if (newMessages.length > 0) {
                 // Append only new messages
                 this.state.messages.push(...newMessages);
                 
                 if (lastBackendMessage) {
                   this.state.lastMessageTimestamp = lastBackendMessage.timestamp;
                 }
                 
                 // Render only new messages
                 this.renderMessages();
                 this.updateGroupList(); // Update previews in sidebar
                 this.notifyDashboard('newMessages', { count: newMessages.length });
               }
             }
          } catch (e) {
            console.error('Error polling messages:', e);
          }
        }, 2000); // Poll every 2 seconds
      },

    // Stop polling
    stopPolling() {
      if (this.state.polling) {
        clearInterval(this.state.polling);
        this.state.polling = null;
      }
    },

    // Load groups from backend
    async loadGroups() {
      try {
        const groups = await window.DashboardExpertGroups.API.list();
        this.state.groups = groups;
      } catch (e) {
        console.error('Failed to load groups:', e);
        this.state.groups = [];
      }
    },

    // Update group list in sidebar (partial update for performance)
    updateGroupList() {
      this.renderGroupList();
    },

    // Setup event listeners
    setupEventListeners() {
      // New group button
      document.getElementById('btnNewGroup')?.addEventListener('click', () => {
        this.openNewGroupModal();
      });
      
      // Delete group button
      document.getElementById('btnDeleteGroup')?.addEventListener('click', () => {
        this.deleteCurrentGroup();
      });
      
      // Toggle sidebar buttons
      document.getElementById('btnToggleGroupSidebar')?.addEventListener('click', () => {
        this.toggleGroupSidebar();
      });
      
      document.getElementById('btnToggleSidebar')?.addEventListener('click', () => {
        this.toggleParticipantsSidebar();
      });
      
      document.getElementById('sidebarOverlay')?.addEventListener('click', () => {
        this.closeSidebars();
      });
      
      // Modal button handlers
      document.getElementById('btnCancelGroup')?.addEventListener('click', () => {
        this.closeModals();
      });
      
      document.getElementById('btnSubmitGroup')?.addEventListener('click', () => {
        const name = document.getElementById('groupNameInput')?.value?.trim();
        if (name) {
          this.createGroup(name);
        }
      });
      
      document.getElementById('btnCancelDelete')?.addEventListener('click', () => {
        this.closeConfirmDeleteModal();
      });
      
      document.getElementById('btnConfirmDelete')?.addEventListener('click', () => {
        this.executeDelete();
      });
      
      // Add Agent Modal button handlers
      document.getElementById('btnCancelAddAgent')?.addEventListener('click', () => {
        this.closeAddAgentModal();
      });
      
      document.getElementById('btnSubmitAddAgent')?.addEventListener('click', () => {
        this.addSelectedAgents();
      });
      
      // Edit Personality Modal button handlers
      document.getElementById('btnCancelEditPersonality')?.addEventListener('click', () => {
        this.closeEditPersonalityModal();
      });
      
      document.getElementById('btnSavePersonality')?.addEventListener('click', () => {
        this.savePersonality();
      });
      
      // Modal close buttons (x buttons)
      document.querySelectorAll('.ui-modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
          this.closeModals();
          this.closeAddAgentModal();
          this.closeEditPersonalityModal();
        });
      });
      
      // Message input
      const groupMessageInput = document.getElementById('groupMessageInput');
      if (groupMessageInput) {
        groupMessageInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
          }
        });
      }
      
      document.getElementById('btnSendMessage')?.addEventListener('click', () => {
        this.sendMessage();
      });
      
      // Auto-resize textarea
      const autoResize = () => {
        const input = document.getElementById('groupMessageInput');
        if (input) {
          input.style.height = 'auto';
          input.style.height = Math.min(input.scrollHeight, 160) + 'px';
        }
      };
      
      document.getElementById('groupMessageInput')?.addEventListener('input', autoResize);
    },

    // Open new group modal
    openNewGroupModal() {
      const modal = document.getElementById('addGroupModal');
      if (modal) {
        modal.classList.add('active');
        const input = document.getElementById('groupNameInput');
        if (input) {
          input.value = '';
          input.focus();
        }
      }
    },

    // Close all modals
    closeModals() {
      document.querySelectorAll('.ui-modal-overlay').forEach(overlay => {
        overlay.classList.remove('active');
      });
      
      // Restore confirm delete modal to its default state
      const confirmModal = document.getElementById('confirmDeleteModal');
      if (confirmModal) {
        confirmModal.classList.remove('active');
        
        const header = confirmModal.querySelector('.ui-modal-header');
        const body = confirmModal.querySelector('.ui-modal-body');
        const title = header ? header.querySelector('.ui-modal-title') : null;
        const cancelBtn = confirmModal.querySelector('#btnCancelDelete');
        const confirmBtn = confirmModal.querySelector('#btnConfirmDelete');
        
        if (title) title.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Confirm Delete';
        if (body) body.innerHTML = '<p>Are you sure you want to delete this group? This action cannot be undone.</p>';
        if (cancelBtn) cancelBtn.style.display = 'block';
        if (confirmBtn) confirmBtn.textContent = 'Delete Group';
      }
    },

    // Close all modals including add agent modal
    closeAllModals() {
      this.closeModals();
      this.closeAddAgentModal();
      this.closeEditPersonalityModal();
    },

    // Open confirm delete modal
    openConfirmDeleteModal(groupId) {
      const modal = document.getElementById('confirmDeleteModal');
      if (modal) {
        modal.dataset.groupId = groupId;
        modal.classList.add('active');
      }
    },

    // Close confirm delete modal
    closeConfirmDeleteModal() {
      const modal = document.getElementById('confirmDeleteModal');
      if (modal) {
        modal.classList.remove('active');
      }
    },

    // Execute delete after confirmation
    async executeDelete() {
      const modal = document.getElementById('confirmDeleteModal');
      const groupId = modal.dataset.groupId;
      
      if (groupId) {
        await window.DashboardExpertGroups.Store.delete(groupId);
        
        this.closeModals();
        
        // Refresh from backend
        await this.loadGroups();
        this.renderGroupList();
        
        // Switch to another group if current was deleted
        if (this.state.activeGroupId === groupId || !this.state.groups.find(g => g.id === this.state.activeGroupId)) {
          if (this.state.groups.length > 0) {
            this.switchGroup(this.state.groups[0].id);
          } else {
            this.switchGroup(null);
          }
        }
        
        this.notifyDashboard('groupDeleted', { groupId });
      }
    },

    // Create a new group (using prompt for name input)
    async createGroup(name) {
      const group = {
        name: name,
        agentIds: ['planner', 'architect', 'coder1', 'coder2', 'coder3', 'researcher', 'designer', 'reviewer', 'skeptic'],
        personalities: {
          planner: 'You are a strategic planner and team lead. You coordinate the team, break down complex tasks into actionable phases, and ensure goals are achievable and measurable. You keep the group focused on priorities and timelines.',
          architect: 'You are a system architect. You emphasize modularity, scalability, maintainability, and technical debt management. You consider long-term system evolution and integration patterns.',
          coder1: 'You are a lead implementation engineer. You focus on clean, efficient code, best practices, and robust solutions. You ensure implementations follow architectural guidelines and coding standards.',
          coder2: 'You are a performance and security specialist. You analyze code for optimization opportunities, identify potential security vulnerabilities, and ensure systems can handle scale and security requirements.',
          coder3: 'You are an integration and consistency engineer. You ensure seamless system integration, data consistency, and interoperability between components. You focus on APIs, protocols, and data flow.',
          researcher: 'You are a deep researcher and context specialist. You gather information, analyze context, and provide data-driven insights. You help the team stay informed with relevant research and findings.',
          designer: 'You are a UI/UX and frontend experience specialist. You focus on user-centered design, accessibility, visual hierarchy, and user satisfaction. You ensure products are intuitive and delightful to use.',
          reviewer: 'You are a quality assurance and code review expert. You critically evaluate work, identify edge cases, and ensure high standards of quality. You provide constructive feedback and champion testing.',
          skeptic: 'You are a critical thinking specialist and assumption challenger. You question assumptions, identify potential flaws, and explore alternative approaches. You ensure robust decision-making by playing devil\'s advocate.'
        },
        messages: []
      };

      const newGroup = await window.DashboardExpertGroups.Store.add(group);

      // Close modal first
      this.closeModals();

      // Refresh groups from backend to include the new group
      await this.loadGroups();

      // Explicitly render group list to show the new group immediately
      this.renderGroupList();

      // Switch to new group
      if (newGroup) {
        this.switchGroup(newGroup.id);
      }

      this.notifyDashboard('groupAdded', { group: newGroup });
    },

    // Submit group form (deprecated, kept for compatibility)
    async submitGroup() {
      // Use openNewGroupModal instead of prompt for sandbox compatibility
      this.openNewGroupModal();
    },

    // Delete current group (using custom modal for confirmation)
    async deleteCurrentGroup() {
      const group = this.getActiveGroup();
      if (!group) return;
      
      // Open confirmation modal instead of using confirm()
      const modal = document.getElementById('confirmDeleteModal');
      if (modal) {
        modal.dataset.groupId = group.id;
        modal.classList.add('active');
      }
    },

    // Get active group
    getActiveGroup() {
      return this.state.groups.find(g => g.id === this.state.activeGroupId) || null;
    },

    // Switch active group
      async switchGroup(groupId) {
        this.state.activeGroupId = groupId;
        window.DashboardExpertGroups.Store.setActiveId(groupId);
        
        const group = this.getActiveGroup();
        
        if (group) {
          // Update title
          const title = document.getElementById('currentGroupTitle');
          if (title) title.textContent = group.name;
          
          // Fetch messages from backend API
           const messagesData = await window.DashboardExpertGroups.API.getMessages(groupId);
           const messages = Array.isArray(messagesData.messages) ? messagesData.messages : [];
           const personalities = messagesData.personalities || {};
          
          // Update group with fetched messages and personalities
          group.messages = messages;
          group.personalities = personalities;
          
          // Store messages in state
            this.state.messages = messages;
            // FIX: Clear messageIds to ensure all messages render (using IDs now instead of timestamps)
            // Also generate IDs for messages that might be missing them (for backward compatibility)
            this.state.messageIds = new Set();
            messages.forEach(msg => {
              if (!msg.id) {
                msg.id = msg.timestamp + '-' + Math.random().toString(36).substring(2, 9);
                console.warn('Message from backend missing id, generated:', msg.id);
              }
            });
          
          this.state.lastMessageTimestamp = messages.length > 0 
            ? messages[messages.length - 1].timestamp 
            : null;
          
          // Clear previous messages from DOM before rendering new group's messages
          const messagesInner = document.getElementById('chatMessages')?.querySelector('.messages-inner');
          if (messagesInner) {
            messagesInner.innerHTML = '';
          }
          
          this.renderMessages();
          this.renderParticipants();
          
          // Update group list
          this.renderGroupList();
        
         this.notifyDashboard('groupSwitched', { groupId });
        } else {
          this.state.activeGroupId = null;
          this.state.messages = [];
          this.state.lastMessageTimestamp = null;
          // Clear messageIds when switching to no group
          this.state.messageIds = new Set();
          this.renderMessages();
          this.renderParticipants();
          this.renderGroupList();
        }
     },

    // Render group list
    renderGroupList() {
      const groupList = document.getElementById('groupList');
      if (!groupList) return;
      
      groupList.innerHTML = '';
      
      if (!this.state.groups.length) {
        groupList.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="fa-solid fa-robot"></i></div>
            <p>No groups yet</p>
            <p style="margin-top:8px;font-size:12px">Click "New Group" to create one</p>
          </div>
        `;
        return;
      }
      
      this.state.groups.forEach(group => {
        const item = document.createElement('div');
        item.className = 'group-item' + (group.id === this.state.activeGroupId ? ' active' : '');
        item.dataset.groupId = group.id;
        
        // Get last message preview
          const messages = Array.isArray(group.messages) ? group.messages : [];
          const lastMessage = messages[messages.length - 1];
          const preview = lastMessage && lastMessage.agentId && lastMessage.content 
            ? `${this.getMessageAgentName(lastMessage.agentId)}: ${String(lastMessage.content).substring(0, 40) + (String(lastMessage.content).length > 40 ? '...' : '')}`
            : 'No messages yet';
        
        // Get agent count
        const agentIds = group.agentIds || [];
        
        item.innerHTML = `
          <div class="group-icon"><i class="fa-solid fa-robot"></i></div>
          <div class="group-info">
            <div class="group-name">${this.escapeHtml(group.name)}</div>
            <div class="group-preview">${this.escapeHtml(preview)}</div>
          </div>
          <div class="group-meta">
            <div class="group-count">${agentIds.length} agents</div>
            <div class="group-time">${this.formatTime(group.updatedAt || group.createdAt)}</div>
          </div>
          <div class="group-actions">
            <button class="group-action-btn btn-add-agent" title="Add Agent">
              <i class="fa-solid fa-user-plus"></i>
            </button>
            <button class="group-action-btn btn-delete-group" title="Delete Group">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `;
        
        item.addEventListener('click', (e) => {
          // Only switch group if not clicking on action buttons
          if (e.target.closest('.group-action-btn')) return;
          this.switchGroup(group.id);
        });
        
        // Add delete button handler
        const deleteBtn = item.querySelector('.btn-delete-group');
        if (deleteBtn) {
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openConfirmDeleteModal(group.id);
          });
        }
        
        // Add add agent button handler
        const addAgentBtn = item.querySelector('.btn-add-agent');
        if (addAgentBtn) {
          addAgentBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openAddAgentModal(group.id);
          });
        }
        
        groupList.appendChild(item);
      });
    },

    // Render messages (incremental - only adds new messages)
     renderMessages() {
       const messagesInner = document.getElementById('chatMessages')?.querySelector('.messages-inner');
       const emptyChatState = document.getElementById('emptyChatState');
       
       if (!messagesInner) return;
      
      // Always hide emptyChatState initially, we'll show it if needed
      if (emptyChatState) {
        emptyChatState.style.display = 'none';
      }
      
      if (!this.state.activeGroupId) {
        if (emptyChatState) {
          emptyChatState.style.display = 'block';
          messagesInner.appendChild(emptyChatState);
        }
        return;
      }
      
      if (!this.state.messages || !this.state.messages.length) {
         if (emptyChatState) {
           emptyChatState.style.display = 'block';
           messagesInner.appendChild(emptyChatState);
         }
         return;
       }
       
       // Render all messages from state.messages (source of truth)
        // FIX: Only render messages that aren't already in the DOM (using message.id for deduplication)
        const messages = Array.isArray(this.state.messages) ? this.state.messages : [];
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
      
      this.scrollToBottom();
    },

    // Append message bubble
      appendMessageBubble(message) {
        const messagesInner = document.getElementById('chatMessages')?.querySelector('.messages-inner');
        if (!messagesInner) return;
        
        const agent = this.getAgentById(message.agentId);
        const agentName = message.agentId === 'user' ? 'You' : this.getCleanAgentName(message.agentId);
        
        // Use markdown rendering for agent messages, plain text for user messages
        const contentHtml = message.agentId === 'user' 
          ? this.escapeHtml(message.content)
          : window.DashboardExpertGroups.renderMarkdown(message.content);
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble ' + (message.agentId === 'user' ? 'user' : 'agent');
        bubble.innerHTML = `
          <div class="message-wrapper">
            <div class="message-avatar">
              <i class="fa-solid ${agent ? agent.avatar : 'fa-user'}"></i>
            </div>
            <div class="message-content">${contentHtml}</div>
          </div>
          <div class="message-meta">
            <span class="agent-name">${agentName}</span>
            <span>•</span>
            <span>${this.formatTime(message.timestamp)}</span>
          </div>
        `;
        
        messagesInner.appendChild(bubble);
        this.scrollToBottom();
      },

    // Render participants
    renderParticipants() {
      const participantsList = document.getElementById('participantsList');
      const onlineCount = document.getElementById('onlineCount');
      const totalAgents = document.getElementById('totalAgents');
      
      if (!participantsList) return;
      
      participantsList.innerHTML = '';
      
      if (!this.state.activeGroupId) {
        participantsList.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="fa-solid fa-user-astronaut"></i></div>
            <p>No active participants</p>
          </div>
        `;
        if (onlineCount) onlineCount.textContent = 0;
        if (totalAgents) totalAgents.textContent = 0;
        return;
      }
      
      const group = this.getActiveGroup();
       if (!group) return;
       
       const agentIds = Array.isArray(group.agentIds) ? group.agentIds : [];
       let onlineCountValue = agentIds.length;
      
      agentIds.forEach(agentId => {
         const agent = this.getAgentById(agentId);
         const personality = group.personalities?.[agentId] || '';
         const cleanName = this.getCleanAgentName(agentId);
         
         const item = document.createElement('div');
         item.className = 'participant-item';
         item.dataset.agentId = agentId;
         item.innerHTML = `
           <div class="participant-avatar" style="background: linear-gradient(135deg, ${agent ? agent.color : '#006d5a'} 0%, #00c498 100%);">
             <i class="fa-solid ${agent ? agent.avatar : 'fa-robot'}"></i>
           </div>
           <div class="participant-info">
             <div class="participant-name">${cleanName}</div>
             <div class="participant-role">${agent ? agent.role : ''}</div>
             <div class="participant-personality">${this.escapeHtml(personality)}</div>
           </div>
           <button class="btn-edit-personality" title="Edit Personality">
             <i class="fa-solid fa-pen"></i>
           </button>
           <div class="participant-status"></div>
         `;
        
        // Add edit personality button handler
         const editBtn = item.querySelector('.btn-edit-personality');
         if (editBtn) {
           editBtn.addEventListener('click', (e) => {
             e.stopPropagation();
             this.openEditPersonalityModal(group.id, agentId, personality);
           });
         }
        
        participantsList.appendChild(item);
      });
      
      if (onlineCount) onlineCount.textContent = onlineCountValue;
      if (totalAgents) totalAgents.textContent = agentIds.length;
    },

    // Available agents for adding
    availableAgents: [
      { id: 'planner', name: 'Planner', role: 'Strategic Planner / Team Lead', color: '#006d5a', avatar: 'fa-robot' },
      { id: 'architect', name: 'Architect', role: 'System Architect', color: '#00a884', avatar: 'fa-cubes' },
      { id: 'coder1', name: 'Coder #1', role: 'Lead Implementation Engineer', color: '#005c4b', avatar: 'fa-code' },
      { id: 'coder2', name: 'Coder #2', role: 'Performance & Security Specialist', color: '#004a3d', avatar: 'fa-shield-alt' },
      { id: 'coder3', name: 'Coder #3', role: 'Integration & Consistency Engineer', color: '#003b2f', avatar: 'fa-plug' },
      { id: 'researcher', name: 'Researcher', role: 'Knowledge & Context Specialist', color: '#007a71', avatar: 'fa-microscope' },
      { id: 'designer', name: 'Designer', role: 'UI/UX & Frontend Experience Specialist', color: '#009a8c', avatar: 'fa-palette' },
      { id: 'reviewer', name: 'Reviewer', role: 'Quality Assurance & Code Review Expert', color: '#00b09d', avatar: 'fa-check-circle' },
      { id: 'skeptic', name: 'Skeptic', role: 'Critical Thinking & Assumption Challenger', color: '#6b4b7a', avatar: 'fa-lightbulb' }
    ],

    // Generate unique agent ID for duplicate types
    generateUniqueAgentId: function(agentId, existingAgentIds) {
      // Check if original ID is already used
      if (!existingAgentIds.includes(agentId)) {
        return agentId;
      }
      
      // Find the next available numbered suffix
      let counter = 2;
      while (existingAgentIds.includes(`${agentId}#${counter}`)) {
        counter++;
      }
      return `${agentId}#${counter}`;
    },

    // Get clean display name for agent ID (e.g., "coder#2" -> "Coder #2")
    getCleanAgentName: function(agentId) {
      // Extract base agent ID if it has a suffix
      const match = agentId.match(/^(.+?)#(\d+)$/);
      if (match) {
        const baseId = match[1];
        const suffix = match[2];
        const baseAgent = this.availableAgents.find(a => a.id === baseId);
        const baseName = baseAgent ? baseAgent.name : baseId.charAt(0).toUpperCase() + baseId.slice(1);
        return `${baseName} #${suffix}`;
      }
      
      // No suffix, get original name
      const agent = this.availableAgents.find(a => a.id === agentId);
      return agent ? agent.name : agentId.charAt(0).toUpperCase() + agentId.slice(1);
    },

    // Currently selected agents for add modal
    selectedAgentsForAdd: [],
    
    // Current personality for editing
    currentEditingPersonality: '',
    
    // Current editing group and agent IDs
    currentEditingPersonalityGroupId: null,
    currentEditingPersonalityAgentId: null,

    // Open add agent modal
     openAddAgentModal(groupId) {
       const modal = document.getElementById('addAgentModal');
       const agentsGrid = document.getElementById('availableAgentsList');
       
       if (modal && agentsGrid) {
         this.selectedAgentsForAdd = [];
         this.currentAddingAgentsToId = groupId;
         
         // Clear existing agents
         agentsGrid.innerHTML = '';
         
         // Clear personality input
         const personalityInput = document.getElementById('agentPersonalityInput');
         if (personalityInput) personalityInput.value = '';
         
         // Clear permission checkboxes
          const permReadFiles = document.getElementById('permReadFiles');
          if (permReadFiles) permReadFiles.checked = false;
          const permWriteFiles = document.getElementById('permWriteFiles');
          if (permWriteFiles) permWriteFiles.checked = false;
          const permUseSkills = document.getElementById('permUseSkills');
          if (permUseSkills) permUseSkills.checked = false;
         
         // Get current agents in group
         const group = this.state.groups.find(g => g.id === groupId);
         const currentAgentIds = group?.agentIds || [];
         
         // Render available agents
          this.availableAgents.forEach(agent => {
            const agentOption = document.createElement('div');
            agentOption.className = 'agent-option';
            agentOption.dataset.agentId = agent.id;
           
           // Custom agent gets different avatar and no role display
            const isCustom = agent.id === 'custom';
            const avatarIcon = isCustom ? 'fa-user-plus' : 
              agent.id === 'planner' ? 'fa-robot' : 
              agent.id === 'architect' ? 'fa-cubes' : 
              agent.id === 'coder1' ? 'fa-code' : 
              agent.id === 'coder2' ? 'fa-shield-alt' : 
              agent.id === 'coder3' ? 'fa-plug' : 
              agent.id === 'researcher' ? 'fa-microscope' : 
              agent.id === 'designer' ? 'fa-palette' : 
              agent.id === 'reviewer' ? 'fa-check-circle' : 
              agent.id === 'skeptic' ? 'fa-lightbulb' : 'fa-robot';
           
           const roleHtml = isCustom ? '' : `<div class="agent-role">${agent.role}</div>`;
           
           agentOption.innerHTML = `
             <div class="agent-avatar" style="background: linear-gradient(135deg, ${agent.color} 0%, #00c498 100%);">
               <i class="fa-solid ${avatarIcon}"></i>
             </div>
             <div class="agent-name">${agent.name}</div>
             ${roleHtml}
           `;
           
           agentOption.addEventListener('click', () => {
             agentOption.classList.toggle('selected');
             if (agentOption.classList.contains('selected')) {
               this.selectedAgentsForAdd.push(agent.id);
             } else {
               this.selectedAgentsForAdd = this.selectedAgentsForAdd.filter(id => id !== agent.id);
             }
           });
           
           agentsGrid.appendChild(agentOption);
         });
         
         modal.classList.add('active');
       }
     },

    // Close add agent modal
    closeAddAgentModal() {
      const modal = document.getElementById('addAgentModal');
      if (modal) {
        modal.classList.remove('active');
      }
    },

    // Add selected agents to group
      async addSelectedAgents() {
        const groupId = this.currentAddingAgentsToId;
        const personality = document.getElementById('agentPersonalityInput')?.value?.trim() || '';
        const canReadFiles = document.getElementById('permReadFiles')?.checked || false;
        const canWriteFiles = document.getElementById('permWriteFiles')?.checked || false;
        const canUseSkills = document.getElementById('permUseSkills')?.checked || false;
        
        if (!groupId || this.selectedAgentsForAdd.length === 0) {
          this.closeAddAgentModal();
          return;
        }
        
        // Update group with new agents
         const group = this.state.groups.find(g => g.id === groupId);
         if (group) {
           const newAgentIds = Array.isArray(group.agentIds) ? [...group.agentIds] : [];
           const addedIds = [];
           
           // Initialize agents array if it doesn't exist
           if (!group.agents) group.agents = [];
           
           // Add each selected agent with unique ID
           this.selectedAgentsForAdd.forEach(agentId => {
             const uniqueId = this.generateUniqueAgentId(agentId, newAgentIds);
             newAgentIds.push(uniqueId);
             addedIds.push({ originalId: agentId, uniqueId: uniqueId });
             
             // Add full agent object with permissions
             const agent = this.availableAgents.find(a => a.id === agentId);
             if (agent) {
               const agentObj = {
                 id: uniqueId,
                 name: agent.name,
                 role: agent.role,
                 personality: personality,
                 color: agent.color,
                 avatar: agent.avatar,
                 canReadFiles: canReadFiles,
                 canWriteFiles: canWriteFiles,
                 canUseSkills: canUseSkills,
                 createdAt: Date.now()
               };
               group.agents.push(agentObj);
             }
           });
           
           // Initialize personalities object if it doesn't exist
             if (!group.personalities || typeof group.personalities !== 'object' || Array.isArray(group.personalities)) {
               group.personalities = {};
             }
             
             // Add personality for each newly added agent
             addedIds.forEach(item => {
               group.personalities[item.uniqueId] = personality;
             });
             
             // Update local state
             group.agentIds = newAgentIds;
             group.updatedAt = Date.now();
             
             // Update backend with full group data
             try {
               await window.DashboardExpertGroups.API.update(groupId, { 
                 agentIds: newAgentIds,
                 agents: group.agents,
                 personalities: group.personalities
               });
             } catch (e) {
               console.error('Error updating group agents:', e);
             }
             
             this.closeAddAgentModal();
             this.renderParticipants();
             this.renderGroupList();
             
             this.notifyDashboard('agentsAdded', { groupId, count: addedIds.length });
           }
         },

    // Open edit personality modal
    openEditPersonalityModal(groupId, agentId, personality) {
      const modal = document.getElementById('editPersonalityModal');
      const input = document.getElementById('editPersonalityInput');
      
      if (modal && input) {
        this.currentEditingPersonalityGroupId = groupId;
        this.currentEditingPersonalityAgentId = agentId;
        this.currentEditingPersonality = personality;
        
        input.value = personality;
        modal.classList.add('active');
      }
    },

    // Close edit personality modal
    closeEditPersonalityModal() {
      const modal = document.getElementById('editPersonalityModal');
      if (modal) {
        modal.classList.remove('active');
      }
    },

    // Save personality
    async savePersonality() {
      const groupId = this.currentEditingPersonalityGroupId;
      const agentId = this.currentEditingPersonalityAgentId;
      const personality = document.getElementById('editPersonalityInput')?.value?.trim() || '';
      
      if (!groupId || !agentId) {
        this.closeEditPersonalityModal();
        return;
      }
      
      // Update group in local state
       const group = this.state.groups.find(g => g.id === groupId);
       if (group) {
         if (!group.personalities || typeof group.personalities !== 'object' || Array.isArray(group.personalities)) {
           group.personalities = {};
         }
         
         group.personalities[agentId] = personality;
         group.updatedAt = Date.now();
        
        // Update backend
        try {
          await window.DashboardExpertGroups.API.updateAgentPersonality(groupId, agentId, personality);
        } catch (e) {
          console.error('Error updating agent personality:', e);
          // Fallback to group update
          try {
            await window.DashboardExpertGroups.API.update(groupId, {
              personalities: group.personalities
            });
          } catch (updateError) {
            console.error('Error updating group:', updateError);
          }
        }
        
        this.closeEditPersonalityModal();
        this.renderParticipants();
        this.renderGroupList();
        
        this.notifyDashboard('personalityUpdated', { groupId, agentId });
      }
    },

    // Helper functions
      getAgentById(id) {
        // Extract base agent ID if it has a suffix (e.g., "coder#2" -> "coder")
        const match = id.match(/^(.+?)#(\d+)$/);
        const baseId = match ? match[1] : id;
        
        // Default agent personalities
        const agentPersonalities = [
          { id: 'planner', name: 'Planner', role: 'Strategic Planner / Team Lead', avatar: 'fa-robot', color: '#006d5a' },
          { id: 'architect', name: 'Architect', role: 'System Architect', avatar: 'fa-cubes', color: '#00a884' },
          { id: 'coder1', name: 'Coder #1', role: 'Lead Implementation Engineer', avatar: 'fa-code', color: '#005c4b' },
          { id: 'coder2', name: 'Coder #2', role: 'Performance & Security Specialist', avatar: 'fa-shield-alt', color: '#004a3d' },
          { id: 'coder3', name: 'Coder #3', role: 'Integration & Consistency Engineer', avatar: 'fa-plug', color: '#003b2f' },
          { id: 'researcher', name: 'Researcher', role: 'Knowledge & Context Specialist', avatar: 'fa-microscope', color: '#007a71' },
          { id: 'designer', name: 'Designer', role: 'UI/UX & Frontend Experience Specialist', avatar: 'fa-palette', color: '#009a8c' },
          { id: 'reviewer', name: 'Reviewer', role: 'Quality Assurance & Code Review Expert', avatar: 'fa-check-circle', color: '#00b09d' },
          { id: 'skeptic', name: 'Skeptic', role: 'Critical Thinking & Assumption Challenger', avatar: 'fa-lightbulb', color: '#6b4b7a' }
        ];
        
        return agentPersonalities.find(a => a.id === baseId);
      },

    getMessageAgentName(agentId) {
       if (agentId === 'user') return 'You';
       const cleanName = this.getCleanAgentName(agentId);
       return cleanName !== agentId ? cleanName : 'Unknown';
     },

    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },

    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },

    scrollToBottom() {
      const chatMessages = document.getElementById('chatMessages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    },

    // Toggle sidebar
    toggleGroupSidebar() {
      const groupSidebar = document.getElementById('groupSidebar');
      const sidebarOverlay = document.getElementById('sidebarOverlay');
      
      if (groupSidebar && sidebarOverlay) {
        groupSidebar.classList.toggle('collapsed');
        sidebarOverlay.classList.toggle('visible', !groupSidebar.classList.contains('collapsed'));
        this.state.isSidebarVisible = !groupSidebar.classList.contains('collapsed');
      }
    },

    toggleParticipantsSidebar() {
      const participantsSidebar = document.getElementById('participantsSidebar');
      const sidebarOverlay = document.getElementById('sidebarOverlay');
      
      if (participantsSidebar && sidebarOverlay) {
        participantsSidebar.classList.toggle('collapsed');
        sidebarOverlay.classList.toggle('visible', !participantsSidebar.classList.contains('collapsed'));
      }
    },

    closeSidebars() {
      const groupSidebar = document.getElementById('groupSidebar');
      const participantsSidebar = document.getElementById('participantsSidebar');
      const sidebarOverlay = document.getElementById('sidebarOverlay');
      
      if (groupSidebar) groupSidebar.classList.add('collapsed');
      if (participantsSidebar) participantsSidebar.classList.add('collapsed');
      if (sidebarOverlay) sidebarOverlay.classList.remove('visible');
      this.state.isSidebarVisible = false;
    },

    // Send message
     async sendMessage() {
       if (!this.state.activeGroupId) {
         // Use custom modal instead of alert() for sandbox compatibility
         const modal = document.getElementById('confirmDeleteModal'); // Reusing confirm modal for simplicity
         if (modal) {
           modal.dataset.groupId = '';
           const header = modal.querySelector('.ui-modal-header');
           const body = modal.querySelector('.ui-modal-body');
           const title = modal.querySelector('.ui-modal-title');
           const confirmBtn = modal.querySelector('#btnConfirmDelete');
           
           if (title) title.innerHTML = '<i class="fa-solid fa-circle-info"></i> Information';
           if (body) body.innerHTML = '<p>Please select or create a group first</p>';
           if (confirmBtn) confirmBtn.textContent = 'OK';
           
           // Remove cancel button or hide it
           const cancelBtn = modal.querySelector('#btnCancelDelete');
           if (cancelBtn) cancelBtn.style.display = 'none';
           
           modal.classList.add('active');
           
           // Override the confirm button handler temporarily
           const originalConfirmHandler = window.DashboardExpertGroups.Manager.closeConfirmDeleteModal.bind(window.DashboardExpertGroups.Manager);
           const tempConfirmHandler = () => {
             window.DashboardExpertGroups.Manager.closeConfirmDeleteModal();
             // Restore original button
             if (title) title.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Confirm Delete';
             if (body) body.innerHTML = '<p>Are you sure you want to delete this group? This action cannot be undone.</p>';
             if (cancelBtn) cancelBtn.style.display = 'block';
             if (confirmBtn) confirmBtn.textContent = 'Delete Group';
             // Reattach original confirm button handler
             document.getElementById('btnConfirmDelete')?.addEventListener('click', () => {
               window.DashboardExpertGroups.Manager.executeDelete();
             });
           };
           // Replace the click handler
           confirmBtn.onclick = tempConfirmHandler;
         }
         return;
       }
       
       const groupMessageInput = document.getElementById('groupMessageInput');
       if (!groupMessageInput) return;
       
       const text = groupMessageInput.value.trim();
        if (!text) return;
        
        // Clear input
        groupMessageInput.value = '';
        groupMessageInput.style.height = 'auto';
        
        // Get current group personalities to send with message
          const group = this.getActiveGroup();
          const groupPersonalities = group ? group.personalities : {};
          
          // Add message to backend
           try {
             const addedMessage = await window.DashboardExpertGroups.API.addMessage(this.state.activeGroupId, {
               agentId: 'user',
               content: text
             }, groupPersonalities);
           
            // Add message to state so it's available for rendering
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
               // This bypasses any potential issues with renderMessages() filtering
               this.appendMessageBubble(addedMessage);
             }
          } catch (e) {
            console.error('Error adding message:', e);
          }
       },

    // Notify dashboard of events
    notifyDashboard(eventType, payload = {}) {
      if (window.parent && window.parent.postMessage) {
        window.parent.postMessage({
          type: eventType,
          module: 'expertgroups',
          payload
        }, '*');
      }
    }
  };

  // ════════════════════════════════════════════
  //  Initialize Expert Group Manager
  // ════════════════════════════════════════════

  document.addEventListener('DOMContentLoaded', () => {
    window.DashboardExpertGroups.Manager.init();
  });

})();
