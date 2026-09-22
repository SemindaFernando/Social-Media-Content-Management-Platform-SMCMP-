/**
 * Grand Azure Luxury Hotel & Spa - Post Routes
 */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { auth } = require('../middleware/auth');
const { requireCreator, requireApprover, preventSelfApproval, checkPostOwnership } = require('../middleware/rbac');

// Read posts (Public / Authenticated)
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Member 2 (Creator) & Member 1 (Admin) - Create Post
router.post('/', auth, requireCreator, postController.createPost);

// Edit & Delete with Ownership check (Creators can only edit own posts)
router.put('/:id', auth, checkPostOwnership, postController.updatePost);
router.delete('/:id', auth, checkPostOwnership, postController.deletePost);

// Member 3 (Approver) & Member 1 (Admin) - Review & Approve Posts
router.put('/:id/review', auth, requireApprover, preventSelfApproval, postController.reviewPost);

module.exports = router;
