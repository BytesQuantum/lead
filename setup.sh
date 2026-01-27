#!/bin/bash

# Lead Tracker - Setup Script
# This script sets up both backend and frontend

echo "🚀 Setting up Lead Management System..."
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"
echo ""

# Setup Frontend
echo "📦 Setting up Frontend..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"
echo ""

echo "======================================"
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Start backend:  cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm start"
echo ""
echo "🌐 Backend will run on: http://localhost:5000"
echo "🌐 Frontend will run on: http://localhost:3000"
echo ""
