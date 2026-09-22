/**
 * Grand Azure Luxury Hotel & Spa - Role-Based Access Control (RBAC) Middleware
 * Enforces strict rules across the 3 Team Member Roles:
 * 👨‍💻 Member 1: Administrator (Full access, User management)
 * 👩‍💻 Member 2: Content Creator (Drafts, schedules, cannot approve own posts)
 * 👨‍💻 Member 3: Content Approver (Reviews, approves/rejects, cannot manage users)
 */

const db = require('../db/database');

// Member 1 - Admin Guard
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'Administrator') {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Administrator role (Member 1) is required for this operation.'
    });
  }
  next();
};

// Member 2 - Content Creator Guard
const requireCreator = (req, res, next) => {
  if (!req.user || (req.user.role !== 'Content Creator' && req.user.role !== 'Administrator')) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Content Creator or Administrator role is required.'
    });
  }
  next();
};

// Member 3 - Content Approver Guard
const requireApprover = (req, res, next) => {
  if (!req.user || (req.user.role !== 'Content Approver' && req.user.role !== 'Administrator')) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Content Approver role (Member 3) is required to approve/reject posts.'
    });
  }
  next();
};

// Strict Rule: Content Creator CANNOT approve posts
const preventSelfApproval = (req, res, next) => {
  if (req.user.role === 'Content Creator') {
    return res.status(403).json({
      success: false,
      message: 'Security Policy Violation: Content Creators are strictly prohibited from approving posts.'
    });
  }
  next();
};

// Post Ownership Verification (Content Creator can only edit/delete their own posts; Admin can edit all)
const checkPostOwnership = (req, res, next) => {
  const { id } = req.params;
  const data = db.read();
  const post = data.posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found.' });
  }

  if (req.user.role === 'Administrator') {
    return next(); // Admin has full access
  }

  if (req.user.role === 'Content Creator' && post.authorId && post.authorId !== req.user.id && post.author !== req.user.name) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Content Creators can only edit or delete their own posts.'
    });
  }

  next();
};

module.exports = {
  requireAdmin,
  requireCreator,
  requireApprover,
  preventSelfApproval,
  checkPostOwnership
};
