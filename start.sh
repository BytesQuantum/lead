#!/bin/bash

# Lead Tracker - Startup Script
# Checks prerequisites and provides guidance

echo "🚀 Lead Management System - Startup Helper"
echo "==========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "   Install from: https://nodejs.org/"
    exit 1
else
    echo "✅ Node.js $(node -v) installed"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
else
    echo "✅ npm $(npm -v) installed"
fi

# Check MongoDB
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed"
else
    echo "⚠️  MongoDB not found in PATH"
    echo "   You can use MongoDB Atlas instead"
fi

echo ""
echo "==========================================="
echo "📁 Project Directory"
echo "==========================================="
echo "Location: $(pwd)"
echo ""

# Check if dependencies are installed
if [ -d "backend/node_modules" ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend dependencies not installed"
    echo "   Run: cd backend && npm install"
fi

if [ -d "frontend/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend dependencies not installed"
    echo "   Run: cd frontend && npm install"
fi

echo ""
echo "==========================================="
echo "🎯 Next Steps"
echo "==========================================="
echo ""
echo "1️⃣  Install dependencies (if not already done):"
echo "   ./setup.sh"
echo ""
echo "2️⃣  Start MongoDB (if using local):"
echo "   brew services start mongodb-community"
echo ""
echo "3️⃣  Start Backend (Terminal 1):"
echo "   cd backend && npm run dev"
echo ""
echo "4️⃣  Start Frontend (Terminal 2):"
echo "   cd frontend && npm start"
echo ""
echo "5️⃣  Open Browser:"
echo "   http://localhost:3000"
echo ""
echo "==========================================="
echo "📚 Quick Reference"
echo "==========================================="
echo "• Full Documentation: README.md"
echo "• Quick Start Guide: QUICKSTART.md"
echo "• Project Summary: PROJECT_SUMMARY.md"
echo "• Sample Data: sample-data.js"
echo ""
echo "Happy Lead Tracking! 📊"
echo ""
