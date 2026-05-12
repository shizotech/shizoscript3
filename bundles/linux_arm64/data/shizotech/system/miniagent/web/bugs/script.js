/* ── Bug Tracker Dashboard Logic ── */

// ════════════════════════════════════════════
//  Bug Module IIFE
// ════════════════════════════════════════════

(function() {
  // Use DashboardBugs namespace to avoid global conflicts
  window.DashboardBugs = window.DashboardBugs || {};

  // ════════════════════════════════════════════
  //  Backend API Client
  // ════════════════════════════════════════════

  window.DashboardBugs.API = {
    baseUrl: 'http://localhost:13337',
    
    // Fetch all bugs from backend
    async list() {
      try {
        const response = await fetch(`${this.baseUrl}/api/bugs/list`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.ok) return data.data || [];
        throw new Error(data.error || 'Failed to fetch bugs');
      } catch (e) {
        console.error('Error fetching bugs:', e);
        return [];
      }
    },
    
    // Fetch specific bug by ID
    async get(bugId) {
      try {
        const response = await fetch(`${this.baseUrl}/api/bugs/${encodeURIComponent(bugId)}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.ok) return data.data || null;
        throw new Error(data.error || 'Bug not found');
      } catch (e) {
        console.error('Error fetching bug:', e);
        return null;
      }
    },
    
    // Create new bug
    async create(bugData) {
      try {
        const response = await fetch(`${this.baseUrl}/api/bugs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bugData)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.ok) return data.data || null;
        throw new Error(data.error || 'Failed to create bug');
      } catch (e) {
        console.error('Error creating bug:', e);
        return null;
      }
    },
    
    // Update bug
    async update(bugId, updates) {
      try {
        const response = await fetch(`${this.baseUrl}/api/bugs/${encodeURIComponent(bugId)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.ok) return data.data || null;
        throw new Error(data.error || 'Failed to update bug');
      } catch (e) {
        console.error('Error updating bug:', e);
        return null;
      }
    },
    
    // Delete bug
    async delete(bugId) {
      try {
        const response = await fetch(`${this.baseUrl}/api/bugs/${encodeURIComponent(bugId)}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data.ok || false;
      } catch (e) {
        console.error('Error deleting bug:', e);
        return false;
      }
    }
  };

  // ════════════════════════════════════════════
  //  Bug Store
  // ════════════════════════════════════════════

  window.DashboardBugs.Store = {
    storageKey: 'dashboard_bugs',
    
    // Load bugs from backend
    async load() {
      try {
        const bugs = await window.DashboardBugs.API.list();
        return bugs.map(bug => this.normalizeBug(bug));
      } catch {
        return [];
      }
    },
    
    // Save bugs to storage (fallback)
    save(bugs) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(bugs));
      } catch (e) {
        console.error('Error saving bugs:', e);
      }
    },
    
    // Add a bug
    async add(bug) {
      const newBug = await window.DashboardBugs.API.create({
        ...bug,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: 'new',
        progress: 0
      });
      return newBug;
    },
    
    // Update a bug
    async update(id, updates) {
      const updated = await window.DashboardBugs.API.update(id, updates);
      return updated;
    },
    
    // Delete a bug
    async delete(id) {
      const result = await window.DashboardBugs.API.delete(id);
      return result;
    },
    
    // Get a bug by ID
    async getById(id) {
      const bug = await window.DashboardBugs.API.get(id);
      return bug ? this.normalizeBug(bug) : null;
    },
    
    // Get bugs by filter
    getByFilter(bugs, filters = {}) {
      if (filters.status && filters.status !== 'all') {
        bugs = bugs.filter(b => b.status === filters.status);
      }
      
      if (filters.priority && filters.priority !== 'all') {
        bugs = bugs.filter(b => b.priority === filters.priority);
      }
      
      if (filters.source && filters.source !== 'all') {
        bugs = bugs.filter(b => b.source === filters.source);
      }
      
      return bugs;
    },
    
    // Update progress
    async updateProgress(id, progress) {
      return this.update(id, { progress: Math.min(100, Math.max(0, progress)) });
    },
    
    // Normalize bug data to ensure progress field exists
    normalizeBug(bug) {
      return { ...bug, progress: bug.progress ?? 0 };
    }
  };

  // ════════════════════════════════════════════
  //  Bug Manager
  // ════════════════════════════════════════════

  window.DashboardBugs.Manager = {
    state: {
      filters: {
        status: 'all',
        priority: 'all',
        source: 'all'
      },
      bugs: [],
      polling: null,
      lastUpdate: null
    },

    // Initialize bug manager
    async init() {
      this.state.bugs = [];
      this.setupEventListeners();
      await this.loadBugs(); // Initial fetch from backend
      this.renderBugs();
      this.updateCount();
      
      // Start polling backend every 2 seconds
      this.startPolling();
      
      // Notify dashboard of loaded bugs
      this.notifyDashboard('bugsLoaded', { count: this.state.bugs.length });
    },
    
    // Start polling for updates
    startPolling() {
      if (this.state.polling) {
        clearInterval(this.state.polling);
      }
      
      this.state.polling = setInterval(async () => {
        try {
          const bugs = await window.DashboardBugs.API.list();
          if (JSON.stringify(bugs) !== JSON.stringify(this.state.bugs)) {
            this.state.bugs = bugs;
            this.renderBugs();
            this.updateCount();
            this.state.lastUpdate = Date.now();
          }
        } catch (e) {
          console.error('Error polling bugs:', e);
        }
      }, 10000); // Poll every 10 seconds
    },
    
    // Stop polling
    stopPolling() {
      if (this.state.polling) {
        clearInterval(this.state.polling);
        this.state.polling = null;
      }
    },
    
    // Load bugs from backend
    async loadBugs() {
      try {
        const bugs = await window.DashboardBugs.API.list();
        this.state.bugs = bugs.map(bug => window.DashboardBugs.Store.normalizeBug(bug));
      } catch (e) {
        console.error('Failed to load bugs:', e);
        this.state.bugs = [];
      }
    },

    // Setup event listeners
    setupEventListeners() {
      // Filter buttons
      document.querySelectorAll('.filter-chips button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const chips = btn.closest('.filter-chips');
          const filterType = chips.id;
          
          // Remove active class from all buttons in this group
          chips.querySelectorAll('.ui-filter-chip').forEach(b => b.classList.remove('active'));
          
          // Add active class to clicked button
          btn.classList.add('active');
          
          // Update filter
          const value = btn.dataset[filterType];
          this.state.filters[filterType] = value;
          
          // Re-render bugs
          this.renderBugs();
        });
      });

      // Modal close buttons
      document.querySelectorAll('.ui-modal-close, [data-modal-action="cancel"]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.closeModals();
        });
      });

      // Click outside modals
      document.querySelectorAll('.ui-modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
            this.closeModals();
          }
        });
      });

      // Add bug button
      document.getElementById('btnAddBug')?.addEventListener('click', () => {
        this.openAddModal();
      });

      // Submit bug form
      document.getElementById('btnSubmitBug')?.addEventListener('click', () => {
        this.submitBug();
      });

      // Delete bug button
      document.getElementById('btnDeleteBug')?.addEventListener('click', () => {
        this.deleteCurrentBug();
      });

      // Close bug details button
      document.getElementById('btnCloseBugDetails')?.addEventListener('click', () => {
        this.closeModals();
      });

      // Confirm delete modal buttons
      document.getElementById('btnCancelDelete')?.addEventListener('click', () => {
        this.closeConfirmDeleteModal();
      });

      document.getElementById('btnConfirmDelete')?.addEventListener('click', () => {
        this.executeDelete();
      });
    },

    // Open add bug modal
    openAddModal() {
      document.getElementById('addBugModal').style.display = 'flex';
      document.getElementById('bugTitle').focus();
    },

    // Close all modals
    closeModals() {
      document.querySelectorAll('.ui-modal-overlay').forEach(overlay => {
        overlay.style.display = 'none';
      });
    },

    // Open confirm delete modal
    openConfirmDeleteModal(itemId, eventType, idKey) {
      const modal = document.getElementById('confirmDeleteModal');
      modal.dataset.itemId = itemId;
      modal.dataset.eventType = eventType;
      modal.dataset.idKey = idKey;
      modal.style.display = 'flex';
    },

    // Close confirm delete modal
    closeConfirmDeleteModal() {
      const modal = document.getElementById('confirmDeleteModal');
      modal.style.display = 'none';
    },

    // Execute delete after confirmation
     async executeDelete() {
       const modal = document.getElementById('confirmDeleteModal');
       const itemId = modal.dataset.itemId;
       const eventType = modal.dataset.eventType;
       const idKey = modal.dataset.idKey;

       if (itemId && eventType) {
         if (eventType === 'bugDeleted') {
           await window.DashboardBugs.Store.delete(itemId);
           
           this.closeModals();
           
           // Notify dashboard
           this.notifyDashboard(eventType, { [idKey]: itemId });
           
           // Refresh from backend
           await this.loadBugs();
           await this.renderBugs();
           this.updateCount();
         }
       }
     },

    // Submit bug form
     async submitBug() {
       const title = document.getElementById('bugTitle').value.trim();
       const description = document.getElementById('bugDescription').value.trim();
       const priority = document.getElementById('bugPriority').value;
       const source = document.getElementById('bugSource').value;
       const environment = document.getElementById('bugEnvironment').value;

       if (!title) {
         alert('Please enter a bug title');
         return;
       }

       const bug = {
         title,
         description,
         priority,
         source,
         environment,
         status: 'new',
         progress: 0,
         history: [
           {
             status: 'new',
             timestamp: Date.now(),
             notes: 'Bug reported'
           }
         ]
       };

       const newBug = await window.DashboardBugs.Store.add(bug);
       
       // Reset form
       document.getElementById('addBugForm').reset();
       this.closeModals();

       // Notify dashboard
       this.notifyDashboard('bugAdded', { bug: newBug });
       
       // Refresh from backend
       await this.loadBugs();
       await this.renderBugs();
       this.updateCount();
     },

    // Delete current bug
    async deleteCurrentBug() {
      const modal = document.getElementById('bugDetailsModal');
      const bugId = modal.dataset.bugId;
      
      if (bugId) {
        this.openConfirmDeleteModal(bugId, 'bugDeleted', 'bugId');
      }
    },

    // Delete bug directly from card
    async deleteBugFromCard(bugId) {
      this.openConfirmDeleteModal(bugId, 'bugDeleted', 'bugId');
    },

    // Open bug details modal
    async openBugDetails(bugId) {
      const bug = await window.DashboardBugs.Store.getById(bugId);
      if (!bug) return;

      const modal = document.getElementById('bugDetailsModal');
      modal.dataset.bugId = bugId;
      
      // Format dates
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      };

      modal.querySelector('.ui-modal-title').textContent = bug.title;
      modal.querySelector('.ui-modal-body').innerHTML = `
        <div class="bug-details-content">
          <div class="bug-details-header">
            <div class="bug-details-title">
              <h2>${this.escapeHtml(bug.title)}</h2>
              <div class="bug-details-title-meta">
                <span class="status-badge ${bug.status}">${this.escapeHtml(bug.status)}</span>
                <span class="priority-badge ${bug.priority}">
                  <span class="priority-dot"></span>
                  ${this.escapeHtml(bug.priority)}
                </span>
                <span class="priority-badge ${bug.priority === 'critical' ? 'critical' : ''}" style="margin-left: 4px;">
                  Source: ${this.escapeHtml(bug.source)}
                </span>
              </div>
            </div>
          </div>

          <div class="bug-details-desc">
            ${this.escapeHtml(bug.description || 'No description provided.')}
          </div>

          <div class="bug-details-meta">
            <div class="bug-details-meta-item">
              <span class="bug-details-meta-label">Priority</span>
              <span class="bug-details-meta-value priority-${bug.priority}">${this.escapeHtml(bug.priority)}</span>
            </div>
            <div class="bug-details-meta-item">
              <span class="bug-details-meta-label">Source</span>
              <span class="bug-details-meta-value">${this.escapeHtml(bug.source)}</span>
            </div>
            <div class="bug-details-meta-item">
              <span class="bug-details-meta-label">Environment</span>
              <span class="bug-details-meta-value">${this.escapeHtml(bug.environment)}</span>
            </div>
            <div class="bug-details-meta-item">
              <span class="bug-details-meta-label">Created</span>
              <span class="bug-details-meta-value">${formatDate(bug.createdAt)}</span>
            </div>
            <div class="bug-details-meta-item">
              <span class="bug-details-meta-label">Last Updated</span>
              <span class="bug-details-meta-value">${formatDate(bug.updatedAt)}</span>
            </div>
            <div class="bug-details-meta-item">
              <span class="bug-details-meta-label">Progress</span>
              <span class="bug-details-meta-value">${bug.progress}%</span>
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar-label">Bug Progress</div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: ${bug.progress}%"></div>
            </div>
          </div>

          ${this.renderStatusWorkflow(bug.status)}
            ${bug.history ? this.renderStatusHistory(bug.history) : ''}

            ${bug.status !== 'closed' ? this.renderProgressControls(bug.id) : ''}
          </div>
        `;

        modal.style.display = 'flex';
        
        // Setup progress update buttons
         modal.querySelectorAll('.progress-update-btn').forEach(btn => {
           btn.addEventListener('click', async (e) => {
             e.stopPropagation();
             const increment = parseInt(btn.dataset.increment);
             const bug = await window.DashboardBugs.Store.getById(bugId);
             const newProgress = bug.progress + increment;
             await window.DashboardBugs.Store.updateProgress(bugId, newProgress);
             await this.loadBugs();
             await this.renderBugs();
           });
         });
      },

    // Render status workflow
    renderStatusWorkflow(currentStatus) {
      const workflow = ['new', 'investigating', 'fixing', 'verified', 'closed'];
      const currentStatusIndex = workflow.indexOf(currentStatus);
      
      let html = '<div class="status-workflow">';
      
      workflow.forEach((status, index) => {
        const isCompleted = currentStatusIndex >= index;
        const isActive = currentStatus === status;
        
        html += `
          <div class="status-workflow-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
            <div class="status-dot"></div>
            <span class="status-label">${this.escapeHtml(status)}</span>
          </div>
        `;
      });
      
      html += '</div>';
      return html;
    },

    // Render status history
    renderStatusHistory(history) {
      let html = '<div class="bug-details-meta-item"><span class="bug-details-meta-label">Status History</span><ul class="bug-details-meta-value" style="padding-left: 20px; margin-top: 8px;">';
      
      history.forEach(item => {
        html += `
          <li>
            <span class="status-badge ${item.status}">${this.escapeHtml(item.status)}</span>
            <span class="bug-details-meta-value" style="margin-left: 8px; color: var(--text-secondary);">${item.notes || 'No notes'}</span>
            <span class="bug-details-meta-value" style="margin-left: 12px; color: var(--text-secondary);">${new Date(item.timestamp).toLocaleDateString()}</span>
          </li>
        `;
      });
      
      html += '</ul></div>';
      return html;
    },

    // Render verification interface
    renderVerificationInterface(bugId) {
      return `
        <div class="verification-interface">
          <h3><i class="fa-solid fa-user-check"></i> Human Verification</h3>
          <div class="verification-actions">
            <button class="ui-btn ui-btn-success" id="btnVerifyBug">
              <i class="fa-solid fa-check"></i>
              Verified - Fix Deployed
            </button>
            <button class="ui-btn ui-btn-reject" id="btnRejectBug">
              <i class="fa-solid fa-xmark"></i>
              Reject - Requires Fixes
            </button>
          </div>
        </div>
      `;
    },

    // Render progress controls
    renderProgressControls(bugId) {
      return `
        <div class="progress-controls">
          <h3><i class="fa-solid fa-chart-line"></i> Update Progress</h3>
          <div class="progress-actions" style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
            <button class="ui-btn ui-btn-secondary progress-update-btn" data-increment="-10" style="flex: 1; min-width: 60px;">-10%</button>
            <button class="ui-btn ui-btn-secondary progress-update-btn" data-increment="-5" style="flex: 1; min-width: 60px;">-5%</button>
            <button class="ui-btn ui-btn-success progress-update-btn" data-increment="+5" style="flex: 1; min-width: 60px;">+5%</button>
            <button class="ui-btn ui-btn-success progress-update-btn" data-increment="+10" style="flex: 1; min-width: 60px;">+10%</button>
          </div>
        </div>
      `;
    },

    // Update bug status
     async updateBugStatus(bugId, newStatus, notes = null) {
       const bug = await window.DashboardBugs.Store.getById(bugId);
       if (!bug) return;

       await window.DashboardBugs.Store.update(bugId, {
         status: newStatus,
         history: [...(bug.history || []), {
           status: newStatus,
           timestamp: Date.now(),
           notes: notes || `Status updated to ${newStatus}`
         }]
       });

       // Notify dashboard
       this.notifyDashboard('bugUpdated', { bug: await window.DashboardBugs.Store.getById(bugId) });
       
       // Refresh modal
       this.openBugDetails(bugId);
       
       // Refresh from backend
       await this.loadBugs();
       await this.renderBugs();
     },

    // Render bugs
    renderBugs() {
      const container = document.getElementById('bugGrid');
      const emptyState = document.getElementById('emptyState');
      
      const bugs = this.getFilteredBugs();
      
      if (bugs.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
      }
      
      emptyState.style.display = 'none';
      
      const html = bugs.map(b => this.renderBugCard(b)).join('');
      container.innerHTML = html;

      // Setup card action buttons
        for (const btn of container.querySelectorAll('.bug-card-action-btn')) {
          btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const card = btn.closest('.bug-card');
            const bugId = card.dataset.bugId;
            
            if (btn.dataset.action === 'view') {
              this.openBugDetails(bugId);
            } else if (btn.dataset.action === 'progress') {
              const bug = await window.DashboardBugs.Store.getById(bugId);
              const increment = parseInt(btn.dataset.increment) || 0;
              const newProgress = bug.progress + increment;
              await window.DashboardBugs.Store.updateProgress(bugId, newProgress);
              await this.renderBugs();
              this.updateCount();
            } else if (btn.dataset.action === 'priority-up') {
              this.updateBugPriority(bugId, 'up');
            } else if (btn.dataset.action === 'priority-down') {
              this.updateBugPriority(bugId, 'down');
            } else if (btn.dataset.action === 'delete') {
              this.deleteBugFromCard(bugId);
            }
          });
        }
    },

    // Render bug card
    renderBugCard(bug) {
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
      };

      const getPriorityClass = (priority) => {
        return priority === 'critical' ? 'critical' : '';
      };

      return `
        <div class="bug-card ${getPriorityClass(bug.priority)}" data-bug-id="${bug.id}">
          <div class="bug-card-header">
            <div class="bug-card-category ${bug.source}">
              ${this.escapeHtml(bug.source)}
            </div>
            <div class="bug-card-title">
              ${this.escapeHtml(bug.title)}
            </div>
            <div class="bug-card-actions">
              <button class="bug-card-action-btn" data-action="delete" title="Delete">
                <i class="fa-solid fa-trash"></i>
              </button>
              <button class="bug-card-action-btn" data-action="view" title="View Details">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="bug-card-action-btn" data-action="progress" data-increment="0" title="Reset Progress">
                <i class="fa-solid fa-rotate-left"></i>
              </button>
            </div>
          </div>
          <div class="bug-card-body" style="padding: 12px 16px;">
            <div class="bug-card-desc">
              ${this.escapeHtml(bug.description || 'No description provided.')}
            </div>
            <div class="bug-card-meta" style="display: flex; justify-content: space-between; margin-top: 12px;">
              <div class="bug-card-meta-left" style="display: flex; gap: 8px;">
                <span class="priority-badge ${bug.priority}">
                  <span class="priority-dot"></span>
                  ${this.escapeHtml(bug.priority)}
                </span>
                <span class="status-badge ${bug.status}">
                  ${this.escapeHtml(bug.status)}
                </span>
              </div>
              <div class="bug-card-meta-right" style="display: flex; gap: 8px;">
                <span style="font-size: 11px; color: var(--text-secondary);">Updated: ${formatDate(bug.updatedAt)}</span>
              </div>
            </div>
            <div class="progress-bar-container" style="margin-top: 12px;">
               <div class="progress-bar-label">Bug Progress</div>
               <div class="progress-bar-track">
                 <div class="progress-bar-fill" style="width: ${bug.progress}%"></div>
               </div>
               <div class="progress-bar-text" style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">${bug.progress}% Complete</div>
             </div>
          </div>
        </div>
      `;
    },

    // Update bug priority
    async updateBugPriority(bugId, direction) {
      const bug = await window.DashboardBugs.Store.getById(bugId);
      if (!bug) return;

      const priorities = ['low', 'medium', 'high', 'critical'];
      const currentIndex = priorities.indexOf(bug.priority);
      
      if (direction === 'up' && currentIndex < priorities.length - 1) {
        await window.DashboardBugs.Store.update(bugId, {
          priority: priorities[currentIndex + 1],
          history: [...(bug.history || []), {
            status: bug.status,
            timestamp: Date.now(),
            notes: `Priority increased to ${priorities[currentIndex + 1]}`
          }]
        });
      } else if (direction === 'down' && currentIndex > 0) {
        await window.DashboardBugs.Store.update(bugId, {
          priority: priorities[currentIndex - 1],
          history: [...(bug.history || []), {
            status: bug.status,
            timestamp: Date.now(),
            notes: `Priority decreased to ${priorities[currentIndex - 1]}`
          }]
        });
      }

      // Refresh modal if open
       const modal = document.getElementById('bugDetailsModal');
       if (modal.dataset.bugId === bugId) {
         this.openBugDetails(bugId);
       }

       // Refresh from backend
       await this.loadBugs();
       await this.renderBugs();
     },

    // Get filtered bugs
    getFilteredBugs() {
      return window.DashboardBugs.Store.getByFilter(this.state.bugs, this.state.filters);
    },

    // Update bug count
    updateCount() {
      const count = this.state.bugs.length;
      const el = document.getElementById('bugCount');
      if (el) {
        el.textContent = count;
      }
    },

    // Notify dashboard of events
    notifyDashboard(eventType, payload = {}) {
      window.parent.postMessage({
        type: eventType,
        module: 'bugs',
        payload
      }, '*');
    },

    // Escape HTML for security
    escapeHtml(s) {
      const d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }
  };

  // ════════════════════════════════════════════
  //  Initialize Bug Manager
  // ════════════════════════════════════════════

  document.addEventListener('DOMContentLoaded', () => {
    window.DashboardBugs.Manager.init();
  });

})();
