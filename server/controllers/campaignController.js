/**
 * Grand Azure Luxury Hotel & Spa - Campaign Controller
 */

const db = require('../db/database');

// GET /api/campaigns
exports.getAllCampaigns = (req, res) => {
  const data = db.read();
  res.json({ success: true, count: data.campaigns.length, campaigns: data.campaigns });
};

// GET /api/campaigns/:id
exports.getCampaignById = (req, res) => {
  const { id } = req.params;
  const data = db.read();
  const camp = data.campaigns.find(c => c.id === id);
  if (!camp) {
    return res.status(404).json({ success: false, message: 'Campaign not found.' });
  }
  res.json({ success: true, campaign: camp });
};

// POST /api/campaigns (Admin only)
exports.createCampaign = (req, res) => {
  const { name, type, budget, startDate, endDate, targetPosts, goal, coverImage, status } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Campaign name is required.' });
  }

  const data = db.read();
  const newCamp = {
    id: 'camp-' + Date.now(),
    name,
    type: type || 'Event Promotion',
    status: status || 'Upcoming',
    startDate: startDate || new Date().toISOString().split('T')[0],
    endDate: endDate || '',
    budget: budget || '$5,000',
    targetPosts: parseInt(targetPosts) || 5,
    completedPosts: 0,
    goal: goal || '',
    coverImage: coverImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  };

  data.campaigns.unshift(newCamp);
  db.write(data);

  res.status(201).json({ success: true, message: 'Campaign created successfully', campaign: newCamp });
};

// PUT /api/campaigns/:id
exports.updateCampaign = (req, res) => {
  const { id } = req.params;
  const data = db.read();
  const index = data.campaigns.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Campaign not found.' });
  }

  data.campaigns[index] = { ...data.campaigns[index], ...req.body, id };
  db.write(data);

  res.json({ success: true, message: 'Campaign updated successfully', campaign: data.campaigns[index] });
};

// DELETE /api/campaigns/:id (Admin only)
exports.deleteCampaign = (req, res) => {
  const { id } = req.params;
  const data = db.read();
  const initial = data.campaigns.length;

  data.campaigns = data.campaigns.filter(c => c.id !== id);
  if (data.campaigns.length === initial) {
    return res.status(404).json({ success: false, message: 'Campaign not found.' });
  }

  db.write(data);
  res.json({ success: true, message: 'Campaign removed successfully.' });
};
