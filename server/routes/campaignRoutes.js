/**
 * Grand Azure Luxury Hotel & Spa - Campaign Routes
 */

const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const { auth } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/rbac');

router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaignById);

// Member 1 (Admin) Only
router.post('/', auth, requireAdmin, campaignController.createCampaign);
router.put('/:id', auth, requireAdmin, campaignController.updateCampaign);
router.delete('/:id', auth, requireAdmin, campaignController.deleteCampaign);

module.exports = router;
