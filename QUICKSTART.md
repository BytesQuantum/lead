# Lead Tracker - Quick Start Commands

## Start Backend Server
```bash
cd backend
npm install
npm run dev
```

Backend runs on: http://localhost:5000

## Start Frontend App (in a new terminal)
```bash
cd frontend
npm install
npm start
```

Frontend runs on: http://localhost:3000

## MongoDB Setup

### Local MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Check MongoDB is running
```bash
mongosh
# or
mongo
```

## Quick Test API (without frontend)

### Create a Lead
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "phoneNumber": "123-456-7890",
    "email": "test@example.com",
    "companyName": "Test Company",
    "requirement": "Testing the API",
    "status": "Contacted"
  }'
```

### Get All Leads
```bash
curl http://localhost:5000/api/leads
```

### Get Statistics
```bash
curl http://localhost:5000/api/leads/stats
```

## Useful MongoDB Commands

```bash
# Connect to MongoDB
mongosh

# Use the database
use lead-tracker

# View all leads
db.leads.find().pretty()

# Count leads
db.leads.countDocuments()

# Delete all leads (for testing)
db.leads.deleteMany({})
```

## Development Workflow

1. Start MongoDB
2. Start backend (terminal 1): `cd backend && npm run dev`
3. Start frontend (terminal 2): `cd frontend && npm start`
4. Open browser to http://localhost:3000
5. Start managing leads!

## Troubleshooting

### Port 5000 already in use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Port 3000 already in use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB not running
```bash
# Start MongoDB
brew services start mongodb-community
```

### Cannot connect to MongoDB
- Check if MongoDB is running
- Verify connection string in backend/.env
- For Atlas, check network access settings

## Project Structure Overview

```
lead tracker/
├── backend/           # Node.js/Express API
│   ├── config/        # Database config
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── server.js      # Entry point
│
├── frontend/          # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── services/    # API service
│   └── public/
│
└── README.md          # Full documentation
```
