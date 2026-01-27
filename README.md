# 📋 Lead Management System (CRM Mini-Module)

A complete full-stack Lead Management System built with **React.js** and **Node.js/Express.js** with **MongoDB**.

## ✨ Features

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ Complete CRUD operations for leads
- ✅ Status management (Contacted, Followed Up, On Hold, Dropped, Meeting, Done)
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ MVC architecture
- ✅ Statistics endpoint

### Frontend
- ✅ Modern React.js with hooks
- ✅ Professional dashboard UI
- ✅ Add/Edit/Delete leads
- ✅ Filter by status
- ✅ Search functionality
- ✅ Real-time status updates
- ✅ Statistics cards
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Modal dialogs

## 📁 Project Structure

```
lead tracker/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── leadController.js    # Business logic
│   ├── middleware/
│   │   ├── errorHandler.js      # Error handling
│   │   └── notFound.js          # 404 handler
│   ├── models/
│   │   └── Lead.js              # Lead schema
│   ├── routes/
│   │   └── leadRoutes.js        # API routes
│   ├── .env                     # Environment variables
│   ├── .env.example             # Example env file
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── FilterBar.js     # Search & filter
    │   │   ├── LeadForm.js      # Add/Edit form
    │   │   ├── LeadTable.js     # Leads table
    │   │   ├── Modal.js         # Modal wrapper
    │   │   └── StatsCard.js     # Statistics
    │   ├── pages/
    │   │   └── Dashboard.js     # Main page
    │   ├── services/
    │   │   └── leadService.js   # API calls
    │   ├── index.css
    │   └── index.js
    ├── .env                     # Environment variables
    ├── .gitignore
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or use MongoDB Atlas)
- npm or yarn

### Installation

#### 1️⃣ Clone/Navigate to the project

```bash
cd "/Users/muhammadsahilamaan/Desktop/lead tracker"
```

#### 2️⃣ Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file if needed (MongoDB URI, PORT, etc.)

# Start the backend server
npm run dev
# or
npm start
```

The backend will run on **http://localhost:5000**

#### 3️⃣ Setup Frontend

```bash
# Open a new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```

The frontend will run on **http://localhost:3000**

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```
3. The default connection string in `.env` is:
   ```
   MONGODB_URI=mongodb://localhost:27017/lead-tracker
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lead-tracker?retryWrites=true&w=majority
   ```

## 📡 API Endpoints

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leads` | Create a new lead |
| GET | `/api/leads` | Get all leads (supports filtering) |
| GET | `/api/leads/:id` | Get a single lead |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |
| PATCH | `/api/leads/:id/status` | Update lead status |
| GET | `/api/leads/stats` | Get lead statistics |

### Query Parameters

- `status` - Filter by status (e.g., `?status=Contacted`)
- `search` - Search across name, email, company (e.g., `?search=john`)
- `sort` - Sort results (e.g., `?sort=name`)

### Example Request (Create Lead)

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "phoneNumber": "+1 234 567 8900",
    "email": "john.doe@example.com",
    "companyName": "Acme Corp",
    "requirement": "Website development",
    "status": "Contacted"
  }'
```

## 🎨 Lead Status Options

- **Contacted** - Initial contact made
- **Followed Up** - Follow-up completed
- **On Hold** - Temporarily paused
- **Dropped** - No longer pursuing
- **Meeting** - Meeting scheduled/in progress
- **Done** - Successfully completed

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **express-validator** - Input validation
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **CSS3** - Styling

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lead-tracker
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing the Application

1. **Start both servers** (backend on :5000, frontend on :3000)
2. **Open browser** to http://localhost:3000
3. **Add a new lead** using the "Add New Lead" button
4. **View statistics** in the dashboard cards
5. **Filter leads** by status or search
6. **Update status** directly from the table dropdown
7. **Edit or delete** leads using the action buttons

## 🎯 Key Features Walkthrough

### 1. Dashboard Overview
- Statistics cards showing total leads and breakdown by status
- Color-coded status indicators
- Real-time updates

### 2. Add/Edit Leads
- Comprehensive form with validation
- Required fields marked with *
- Modal-based interface
- Success/error notifications

### 3. Lead Management
- Sortable table columns
- Quick status updates
- Inline edit and delete actions
- Responsive design for mobile

### 4. Search & Filter
- Real-time search across name, email, and company
- Filter by status
- Combined filtering capabilities

## 🔒 Production Considerations

Before deploying to production:

1. **Environment Variables**
   - Use production MongoDB URI
   - Set `NODE_ENV=production`
   - Use secure environment variable management

2. **Security**
   - Add authentication/authorization
   - Implement rate limiting
   - Add HTTPS
   - Sanitize inputs
   - Add CORS restrictions

3. **Performance**
   - Enable compression
   - Add caching
   - Optimize database queries
   - Add pagination for large datasets

4. **Monitoring**
   - Add logging (Winston, Morgan)
   - Error tracking (Sentry)
   - Performance monitoring

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

### Port Already in Use
- Change PORT in backend `.env`
- Kill process using the port:
  ```bash
  # macOS/Linux
  lsof -ti:5000 | xargs kill -9
  ```

### CORS Errors
- Verify backend CORS configuration
- Check frontend API URL in `.env`

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ as a complete Lead Management System demonstration.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Happy Lead Tracking! 📊**
