require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const leadRoutes = require('./routes/leadRoutes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS for frontend
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request Logger (Development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Health Check Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Lead Tracker API is running',
    version: '1.0.0',
    endpoints: {
      leads: '/api/leads',
      stats: '/api/leads/stats',
    },
  });
});

// API Routes
app.use('/api/leads', leadRoutes);

// Error Handling Middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('=================================');
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log('=================================');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

module.exports = app;
