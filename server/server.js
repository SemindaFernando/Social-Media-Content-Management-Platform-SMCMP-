/**
 * Grand Azure Luxury Hotel & Spa - Node.js Express Backend Server
 * 3-Member Role-Based Architecture:
 * 👨‍💻 Member 1: Administrator (Victoria Sterling)
 * 👩‍💻 Member 2: Content Creator (Marcus Vance)
 * 👨‍💻 Member 3: Content Approver (Elena Rostova)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const consentRoutes = require('./routes/consentRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route - redirect directly to login page
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '..')));

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/consents', consentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Grand Azure SMCMP Backend API (Node.js + Express)',
    version: '1.0.0',
    rbacRoles: ['Administrator', 'Content Creator', 'Content Approver'],
    database: 'Cloud Firestore & JSON Engine (hotel-smcmp)'
  });
});

// Database Reset endpoint for grading / demonstration
const db = require('./db/database');
app.post('/api/reset', (req, res) => {
  const data = db.reset();
  res.json({ success: true, message: 'Database reset to default 18+ hotel records.' });
});

// Global Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log('================================================================');
  console.log(`🏨 Grand Azure Hotel SMCMP Backend is running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`👨‍💻 Member 1 (Admin): http://localhost:${PORT}/users.html`);
  console.log(`👩‍💻 Member 2 (Creator): http://localhost:${PORT}/create-post.html`);
  console.log(`👨‍💻 Member 3 (Approver): http://localhost:${PORT}/approval-workflow.html`);
  console.log('================================================================');
});
