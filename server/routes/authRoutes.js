/**
 * Grand Azure Luxury Hotel & Spa - Auth Routes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/rbac');

// Public
router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected
router.get('/me', auth, authController.getMe);

// Member 1 (Admin) User Management
router.get('/users', auth, requireAdmin, authController.getAllUsers);
router.put('/users/:id/role', auth, requireAdmin, authController.updateUserRole);
router.delete('/users/:id', auth, requireAdmin, authController.deleteUser);

module.exports = router;
