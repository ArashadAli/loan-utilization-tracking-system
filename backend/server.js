// server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import connectDB from './src/config/connectDB.js';
import apiRouter from './src/routes/index.js';

// ────────────────────────────────────────────────
// Load environment variables
// ────────────────────────────────────────────────
dotenv.config({
  path: './src/config/.env',
});

const app = express();

// ────────────────────────────────────────────────
// Middlewares
// ────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4200',
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());

// ────────────────────────────────────────────────
// Routes
// ────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Mount all API routes
app.use('/api/v1', apiRouter);// If you want explicit version in URL:
// app.use('/api/v1', apiRouter);

// ────────────────────────────────────────────────
// 404 Not Found handler
// ────────────────────────────────────────────────
// IMPORTANT: No path ('*') here — this is the correct way in Express 5+
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl} — route not found`,
  });
});

// ────────────────────────────────────────────────
// Global error handler (must be last)
// ────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Global Error Handler]', err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  const response = {
    success: false,
    error: message,
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.details = err;
  }

  res.status(statusCode).json(response);
});

// ────────────────────────────────────────────────
// Start server
// ────────────────────────────────────────────────
const PORT = Number(process.env.PORT) || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('┌──────────────────────────────────────────────────────┐');
      console.log(`│  Server running → http://localhost:${PORT}               │`);
      console.log(`│  Health check   → http://localhost:${PORT}/health        │`);
      console.log(`│  Environment    → ${process.env.NODE_ENV || 'development'}     │`);
      console.log('└──────────────────────────────────────────────────────┘');
    });
  })
  .catch((err) => {
    console.error('Failed to start server - database connection error:');
    console.error(err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception! Shutting down...');
  console.error(err);
  process.exit(1);
});