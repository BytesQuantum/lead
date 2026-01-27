# Lead Management System - Architecture Overview

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│                     http://localhost:3000                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │ (Axios)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REACT.JS FRONTEND                             │
├─────────────────────────────────────────────────────────────────┤
│  Components:                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Dashboard    │  │  LeadForm    │  │  LeadTable   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ FilterBar    │  │  StatsCard   │  │    Modal     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  Services:                                                       │
│  └─ leadService.js (API Communication)                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ REST API Calls
                             │ JSON
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXPRESS.JS BACKEND                             │
│                   http://localhost:5000                          │
├─────────────────────────────────────────────────────────────────┤
│  Routes (routes/leadRoutes.js):                                 │
│  ├─ POST   /api/leads          → Create Lead                    │
│  ├─ GET    /api/leads          → Get All Leads                  │
│  ├─ GET    /api/leads/:id      → Get Single Lead                │
│  ├─ PUT    /api/leads/:id      → Update Lead                    │
│  ├─ DELETE /api/leads/:id      → Delete Lead                    │
│  ├─ PATCH  /api/leads/:id/status → Update Status                │
│  └─ GET    /api/leads/stats    → Get Statistics                 │
│                                                                  │
│  Middleware:                                                     │
│  ├─ express-validator (Input Validation)                        │
│  ├─ errorHandler (Error Management)                             │
│  └─ notFound (404 Handler)                                      │
│                                                                  │
│  Controllers (controllers/leadController.js):                   │
│  └─ Business Logic & Data Processing                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Mongoose ODM
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MONGODB DATABASE                            │
│                   mongodb://localhost:27017                      │
├─────────────────────────────────────────────────────────────────┤
│  Database: lead-tracker                                          │
│                                                                  │
│  Collection: leads                                               │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Document Schema (models/Lead.js):                         │ │
│  │                                                            │ │
│  │  {                                                         │ │
│  │    _id: ObjectId,                                         │ │
│  │    fullName: String (required),                           │ │
│  │    phoneNumber: String (required),                        │ │
│  │    email: String (required, unique),                      │ │
│  │    companyName: String (required),                        │ │
│  │    requirement: String,                                   │ │
│  │    status: String (enum),                                 │ │
│  │    createdAt: Date,                                       │ │
│  │    updatedAt: Date                                        │ │
│  │  }                                                         │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Creating a New Lead
```
User Action (Frontend)
    ↓
Fill LeadForm & Submit
    ↓
leadService.createLead(data)
    ↓
POST /api/leads
    ↓
Express Route Handler
    ↓
Input Validation (express-validator)
    ↓
leadController.createLead()
    ↓
Check for duplicate email
    ↓
Lead.create() - Mongoose
    ↓
Save to MongoDB
    ↓
Return Success Response
    ↓
Update UI & Show Toast
    ↓
Refresh Leads List & Stats
```

### Updating Lead Status
```
User clicks Status Dropdown
    ↓
Select new status
    ↓
leadService.updateLeadStatus(id, status)
    ↓
PATCH /api/leads/:id/status
    ↓
leadController.updateLeadStatus()
    ↓
Validate status
    ↓
Lead.findByIdAndUpdate()
    ↓
Update in MongoDB
    ↓
Return Updated Lead
    ↓
Update UI & Show Toast
```

## 📁 File Organization

### Backend (MVC Pattern)
```
backend/
├── Models       → Data structure & validation
├── Controllers  → Business logic
├── Routes       → API endpoint definitions
├── Middleware   → Request/response processing
└── Config       → Database & app configuration
```

### Frontend (Component-Based)
```
frontend/src/
├── components/  → Reusable UI components
├── pages/       → Page-level components
└── services/    → API communication layer
```

## 🔐 Request/Response Flow

### Example: Get All Leads with Filter

**Request:**
```http
GET /api/leads?status=Contacted&search=john HTTP/1.1
Host: localhost:5000
```

**Processing:**
1. Express receives request
2. Route matches GET /api/leads
3. Controller extracts query params
4. Build MongoDB query object
5. Execute Lead.find(query)
6. Sort results
7. Format response

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "fullName": "John Smith",
      "email": "john@example.com",
      "status": "Contacted",
      ...
    }
  ]
}
```

## 🎨 Frontend Component Hierarchy

```
Dashboard (Main Container)
│
├── StatsCard (Statistics Display)
│   └── Individual Stat Cards
│
├── FilterBar (Search & Filter Controls)
│   ├── Search Input
│   └── Status Filter Dropdown
│
├── LeadTable (Data Display)
│   ├── Table Header (Sortable)
│   ├── Table Rows (Each Lead)
│   │   ├── Lead Info
│   │   ├── Status Dropdown
│   │   └── Action Buttons (Edit/Delete)
│   └── Empty State / Loading
│
└── Modal (Dialog Container)
    └── LeadForm (Add/Edit Form)
        ├── Form Fields
        ├── Validation Messages
        └── Submit/Cancel Buttons
```

## 🔄 State Management

### Dashboard State
```javascript
{
  leads: [],              // All leads from API
  filteredLeads: [],      // Filtered/searched leads
  stats: {},              // Statistics data
  loading: boolean,       // Loading state
  showAddModal: boolean,  // Modal visibility
  showEditModal: boolean, // Modal visibility
  currentLead: object,    // Lead being edited
  statusFilter: string,   // Current filter
  searchQuery: string     // Search text
}
```

## 🛠️ Technology Stack

```
┌─────────────────────────────────────────┐
│           FRONTEND STACK                │
├─────────────────────────────────────────┤
│ React.js         → UI Framework         │
│ Axios            → HTTP Client          │
│ React Toastify   → Notifications        │
│ CSS3             → Styling              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           BACKEND STACK                 │
├─────────────────────────────────────────┤
│ Node.js          → Runtime              │
│ Express.js       → Web Framework        │
│ Mongoose         → ODM                  │
│ express-validator→ Validation           │
│ CORS             → Cross-origin         │
│ dotenv           → Environment vars     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           DATABASE                      │
├─────────────────────────────────────────┤
│ MongoDB          → NoSQL Database       │
└─────────────────────────────────────────┘
```

## 📊 Database Schema

```
Lead Collection
├── Indexes
│   ├── email (unique)
│   ├── status + createdAt (compound)
│   └── _id (default)
│
├── Validation Rules
│   ├── Email format & uniqueness
│   ├── Phone format
│   ├── String length limits
│   └── Enum values for status
│
└── Timestamps
    ├── createdAt (automatic)
    └── updatedAt (automatic)
```

## 🚀 Deployment Architecture (Future)

```
┌─────────────────────────────────────────┐
│         Vercel / Netlify                │
│         (Frontend Hosting)              │
│         React App                       │
└────────────┬────────────────────────────┘
             │
             │ HTTPS
             ▼
┌─────────────────────────────────────────┐
│    Heroku / DigitalOcean / AWS          │
│    (Backend Hosting)                    │
│    Express.js API                       │
└────────────┬────────────────────────────┘
             │
             │ Secure Connection
             ▼
┌─────────────────────────────────────────┐
│         MongoDB Atlas                   │
│         (Cloud Database)                │
└─────────────────────────────────────────┘
```

---

## 🎯 Key Design Patterns

1. **MVC Pattern** (Backend)
   - Model: Data structure
   - View: JSON responses
   - Controller: Business logic

2. **Component Pattern** (Frontend)
   - Reusable components
   - Props for data flow
   - State management with hooks

3. **Repository Pattern**
   - Mongoose models abstract database
   - Controllers use models
   - Services call API

4. **Middleware Pattern**
   - Validation middleware
   - Error handling middleware
   - CORS middleware

5. **Separation of Concerns**
   - Routes define endpoints
   - Controllers handle logic
   - Models define data
   - Services handle API calls
   - Components render UI

---

This architecture ensures:
✅ Scalability
✅ Maintainability
✅ Testability
✅ Security
✅ Performance
