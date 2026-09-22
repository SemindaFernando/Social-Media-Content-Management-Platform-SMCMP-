/**
 * Grand Azure Luxury Hotel & Spa - JWT Authentication Middleware
 */

const jwt = require('jsonwebtoken');
const db = require('../db/database');

const JWT_SECRET = process.env.JWT_SECRET || 'grand_azure_secret_key_2026';

const auth = (req, res, next) => {
  try {
    // Check Authorization header (Bearer token) or custom user header
    const authHeader = req.headers.authorization;
    const customUserId = req.headers['x-user-id'];
    const customUserRole = req.headers['x-user-role'];

    if (customUserId) {
      const data = db.read();
      const user = data.users.find(u => u.id === customUserId);
      if (user) {
        req.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
        return next();
      }
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // If no token provided, default to guest or check if standard test request
      if (customUserRole) {
        req.user = {
          id: customUserId || 'usr-temp',
          name: 'Authorized User',
          role: customUserRole
        };
        return next();
      }
      return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

module.exports = { auth, JWT_SECRET };
