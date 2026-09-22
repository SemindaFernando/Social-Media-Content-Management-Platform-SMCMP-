/**
 * Grand Azure Luxury Hotel & Spa - Social Posts Controller
 * Handles CRUD operations, filtering, and Member 2 (Creator) vs Member 3 (Approver) workflows.
 */

const db = require('../db/database');

// GET /api/posts
exports.getAllPosts = (req, res) => {
  const { status, platform, campaignId, search } = req.query;
  const data = db.read();
  let posts = [...data.posts];

  if (status && status !== 'all') {
    posts = posts.filter(p => p.status === status);
  }
  if (platform && platform !== 'all') {
    posts = posts.filter(p => p.platforms && p.platforms.includes(platform));
  }
  if (campaignId && campaignId !== 'all') {
    posts = posts.filter(p => p.campaignId === campaignId);
  }
  if (search && search.trim() !== '') {
    const q = search.toLowerCase();
    posts = posts.filter(p =>
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.caption && p.caption.toLowerCase().includes(q)) ||
      (p.author && p.author.toLowerCase().includes(q))
    );
  }

  posts.sort((a, b) => new Date(b.scheduledDate || b.createdAt) - new Date(a.scheduledDate || a.createdAt));
  res.json({ success: true, count: posts.length, posts });
};

// GET /api/posts/:id
exports.getPostById = (req, res) => {
  const { id } = req.params;
  const data = db.read();
  const post = data.posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found.' });
  }

  res.json({ success: true, post });
};

// POST /api/posts (Member 2: Creator & Member 1: Admin)
exports.createPost = (req, res) => {
  const { title, caption, image, platforms, campaignId, scheduledDate, scheduledTime, status } = req.body;
  
  if (!title || !caption) {
    return res.status(400).json({ success: false, message: 'Title and caption are required.' });
  }

  const data = db.read();
  const user = req.user || { name: 'Marcus Vance', id: 'usr-creator' };

  // Creators can save as draft or submit for in_review
  let initialStatus = status || 'draft';
  if (user.role === 'Content Creator' && initialStatus === 'published') {
    initialStatus = 'in_review'; // Force review workflow for creators
  }

  const newPost = {
    id: 'post-' + Date.now(),
    title,
    caption,
    image: image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    platforms: Array.isArray(platforms) && platforms.length > 0 ? platforms : ['instagram'],
    status: initialStatus,
    campaignId: campaignId || '',
    scheduledDate: scheduledDate || new Date().toISOString().split('T')[0],
    scheduledTime: scheduledTime || '12:00',
    author: user.name,
    authorId: user.id,
    approver: '',
    approvalNotes: '',
    analytics: {
      likes: initialStatus === 'published' ? Math.floor(Math.random() * 2000) + 500 : 0,
      shares: initialStatus === 'published' ? Math.floor(Math.random() * 400) + 50 : 0,
      comments: initialStatus === 'published' ? Math.floor(Math.random() * 150) + 20 : 0,
      reach: initialStatus === 'published' ? Math.floor(Math.random() * 25000) + 8000 : 0,
      engagementRate: initialStatus === 'published' ? (Math.random() * 5 + 5).toFixed(1) + '%' : '0%'
    },
    createdAt: new Date().toISOString()
  };

  data.posts.unshift(newPost);
  db.write(data);

  res.status(201).json({ success: true, message: 'Post created successfully', post: newPost });
};

// PUT /api/posts/:id
exports.updatePost = (req, res) => {
  const { id } = req.params;
  const data = db.read();
  const index = data.posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Post not found.' });
  }

  data.posts[index] = { ...data.posts[index], ...req.body, id };
  db.write(data);

  res.json({ success: true, message: 'Post updated successfully', post: data.posts[index] });
};

// DELETE /api/posts/:id
exports.deletePost = (req, res) => {
  const { id } = req.params;
  const data = db.read();
  const initialLength = data.posts.length;

  data.posts = data.posts.filter(p => p.id !== id);
  if (data.posts.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Post not found.' });
  }

  db.write(data);
  res.json({ success: true, message: 'Post deleted successfully.' });
};

// PUT /api/posts/:id/review (Member 3: Approver & Member 1: Admin ONLY)
exports.reviewPost = (req, res) => {
  const { id } = req.params;
  const { action, notes } = req.body; // action: 'approve' | 'reject' | 'request_changes'
  
  const data = db.read();
  const post = data.posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found.' });
  }

  const user = req.user || { name: 'Elena Rostova', role: 'Content Approver' };

  if (action === 'approve') {
    post.status = 'scheduled';
    post.approver = user.name;
    post.approvalNotes = notes || 'Approved for broadcast';
  } else if (action === 'reject' || action === 'request_changes') {
    post.status = 'rejected';
    post.approver = user.name;
    post.approvalNotes = notes || 'Revision requested by Approver';
  } else {
    return res.status(400).json({ success: false, message: "Invalid action. Use 'approve' or 'reject'." });
  }

  db.write(data);
  res.json({
    success: true,
    message: `Post ${action === 'approve' ? 'approved and scheduled' : 'returned for revision'}`,
    post
  });
};
