/**
 * Grand Azure Luxury Hotel & Spa - Auth & User Controller
 * Handles Login, Registration, and Member 1 (Admin) User Management.
 */

const jwt = require('jsonwebtoken');
const db = require('../db/database');
const { JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/login
exports.login = (req, res) => {
  const { email, password } = req.body;
  const data = db.read();
  
  const user = data.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    message: 'Authentication successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      badgeClass: user.badgeClass
    }
  });
};

// POST /api/auth/register
exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  const data = db.read();
  const existing = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
  }

  const assignedRole = role || 'Content Creator';
  const newUser = {
    id: 'usr-' + Date.now(),
    name,
    email,
    password,
    role: assignedRole,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badgeClass: assignedRole === 'Administrator' ? 'admin' : assignedRole === 'Content Approver' ? 'approver' : 'creator',
    createdAt: new Date().toISOString()
  };

  data.users.push(newUser);
  db.write(data);

  const token = jwt.sign(
    { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: newUser
  });
};

// GET /api/auth/me
exports.getMe = (req, res) => {
  const data = db.read();
  const user = data.users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }
  res.json({ success: true, user });
};

// --------------------------------------------------------------------------
// Member 1 (Admin) User Management Endpoints
// --------------------------------------------------------------------------

// GET /api/auth/users (Admin only)
exports.getAllUsers = (req, res) => {
  const data = db.read();
  const safeUsers = data.users.map(({ password, ...u }) => u);
  res.json({ success: true, users: safeUsers });
};

// PUT /api/auth/users/:id/role (Admin only)
exports.updateUserRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['Administrator', 'Content Creator', 'Content Approver'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role specified.' });
  }

  const data = db.read();
  const user = data.users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  user.role = role;
  user.badgeClass = role === 'Administrator' ? 'admin' : role === 'Content Approver' ? 'approver' : 'creator';
  db.write(data);

  res.json({ success: true, message: `Role updated to ${role}`, user });
};

// DELETE /api/auth/users/:id (Admin only)
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const data = db.read();
  
  if (id === req.user.id) {
    return res.status(400).json({ success: false, message: 'Cannot delete your own administrative account.' });
  }

  const initialCount = data.users.length;
  data.users = data.users.filter(u => u.id !== id);
  
  if (data.users.length === initialCount) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  db.write(data);
  res.json({ success: true, message: 'User account removed successfully.' });
};
