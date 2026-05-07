# Dashboard Backend API Design

## Project: ShizoGPT Dashboard API

## Summary

This document outlines the comprehensive RESTful API design for dashboard module communication (Features, Bugs, History) with the backend. The backend is implemented in ShizoScript using LevelDB for persistence and the built-in webserver module.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (web/)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Features │  │   Bugs   │  │  History │  │  Chat    │        │
│  │  Module  │  │  Module  │  │  Module  │  │  Module  │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│         │            │            │            │                 │
│         └────────────┴────────────┴────────────┘                 │
│                      │                                           │
│              HTTP Polling (2s)                                   │
└──────────────────────┼───────────────────────────────────────────┘
                       │
┌──────────────────────┼───────────────────────────────────────────┐
│                  Web Server (port 13337)                        │
│  ┌──────────────────┴──────────────────┐                        │
│  │          /api/ endpoints            │                        │
│  └──────────────────┬──────────────────┘                        │
└──────────────────────┼───────────────────────────────────────────┘
                       │
┌──────────────────────┼───────────────────────────────────────────┐
│                  LevelDB Persistence                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │ features │  │  bugs    │  │  history │                      │
│  │   .db    │  │   .db    │  │   .db    │                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
└───────────────────────────────────────────────────────────────────┘
```

## Polling Strategy

### Initial Load
- Frontend fetches **all entries** once on module initialization
- Returns complete dataset for immediate rendering

### Regular Updates
- Frontend polls server **every 2 seconds** for updates
- Returns only current state (full refresh)
- Backend handles all changes (AI agents add/remove/update)

### Benefits
- Simple frontend logic (no diffing needed)
- Consistent data state across modules
- Low complexity and maintenance

## API Endpoints

### Common Response Format

All responses follow this structure:

```json
{
  "ok": true/false,
  "data": { ... },      // Optional: Response data for successful requests
  "error": "..."        // Optional: Error message for failed requests
}
```

### Features Module

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/features/list` | Get all features | - | `data: [feature, ...]` |
| GET | `/api/features/:id` | Get specific feature | - | `data: feature` |
| POST | `/api/features` | Create new feature | Feature object | `data: created_feature` |
| PUT | `/api/features/:id` | Update feature | Feature updates | `data: updated_feature` |
| DELETE | `/api/features/:id` | Delete feature | - | `ok: true` |

**Feature Object Structure:**
```json
{
  "id": "feature_...",
  "title": "string",
  "description": "string",
  "priority": "low|medium|high|critical",
  "category": "string",
  "status": "planned|in-progress|completed",
  "progress": 0-100,
  "targetDate": "2024-01-01",  // Optional
  "createdAt": 1234567890,
  "updatedAt": 1234567890,
  "history": [ ... ]  // Optional
}
```

### Bugs Module

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/bugs/list` | Get all bugs | - | `data: [bug, ...]` |
| GET | `/api/bugs/:id` | Get specific bug | - | `data: bug` |
| POST | `/api/bugs` | Create new bug | Bug object | `data: created_bug` |
| PUT | `/api/bugs/:id` | Update bug | Bug updates | `data: updated_bug` |
| DELETE | `/api/bugs/:id` | Delete bug | - | `ok: true` |

**Bug Object Structure:**
```json
{
  "id": "bug_...",
  "title": "string",
  "description": "string",
  "priority": "low|medium|high|critical",
  "source": "user|testing|monitoring",
  "environment": "development|staging|production",
  "status": "new|investigating|fixing|verified|closed",
  "createdAt": 1234567890,
  "updatedAt": 1234567890,
  "history": [ ... ]  // Optional
}
```

### History Module

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/history/list` | Get all history entries | - | `data: [entry, ...]` |
| GET | `/api/history/:id` | Get specific entry | - | `data: entry` |
| POST | `/api/history` | Create history entry | Entry object | `data: created_entry` |
| PUT | `/api/history/:id` | Update entry | Entry updates | `data: updated_entry` |
| DELETE | `/api/history/:id` | Delete entry | - | `ok: true` |

**History Entry Structure:**
```json
{
  "id": "history_...",
  "timestamp": 1234567890,
  "type": "feature|bug|chat|revert",
  "description": "string",
  "data": { ... },  // Optional: Additional data specific to entry type
  "revertAction": { ... }  // Optional: Function data for reverting
}
```

## Implementation Details

### Backend (ShizoScript)

**File:** `dashboard_api.shio`

**Key Components:**
1. **Database Initialization:**
   - `features_db` - LevelDB at `agent_space/dashboard/features.db`
   - `bugs_db` - LevelDB at `agent_space/dashboard/bugs.db`
   - `history_db` - LevelDB at `agent_space/dashboard/history.db`

2. **Helper Functions:**
   - `format_api_response(ok, data, error)` - Standardizes responses
   - `parse_request_body(body)` - Parses JSON from request

3. **Endpoint Implementation:**
   - All endpoints use regex patterns for ID matching
   - Error handling with try/catch blocks
   - Automatic JSON serialization

### Frontend Integration

**Polling Example (JavaScript):**
```javascript
// Initial fetch
fetch('/api/features/list')
  .then(r => r.json())
  .then(data => {
    if(data.ok) {
      window.DashboardFeatures.Store.load(data.data);
    }
  });

// Polling for updates (every 2 seconds)
setInterval(() => {
  fetch('/api/features/list')
    .then(r => r.json())
    .then(data => {
      if(data.ok) {
        // Compare and update local store
        window.DashboardFeatures.Store.sync(data.data);
      }
    });
}, 2000);
```

### Database Schema

All data is stored as JSON strings in LevelDB with the following key patterns:

- Features: `feature_<timestamp>_<hash>` → JSON
- Bugs: `bug_<timestamp>_<hash>` → JSON
- History: `history_<timestamp>_<hash>` → JSON

## Benefits of This Design

1. **Backend-Managed:** Backend controls all data changes
2. **Simple Frontend:** No complex synchronization logic needed
3. **Consistent Data:** All modules see same data state
4. **Extensible:** Easy to add new endpoints or fields
5. **Persistent:** LevelDB ensures data survives restarts
6. **Reliable:** Standardized response format

## Future Enhancements

1. **Delta Updates:** Support for only sending changed entries
2. **Filtering:** Query parameters for filtering lists
3. **Pagination:** For very large datasets
4. **Event Streaming:** WebSocket support for real-time updates
5. **Caching:** Redis/memcached for performance

## Error Handling

All errors return:
```json
{
  "ok": false,
  "error": "descriptive error message"
}
```

Common errors:
- Feature/Bug/History not found (404)
- Invalid request body (400)
- Database error (500)
