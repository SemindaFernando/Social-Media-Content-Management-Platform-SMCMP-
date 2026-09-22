/**
 * Grand Azure Luxury Hotel & Spa - Privacy & Consent Routes
 */

const express = require('express');
const router = express.Router();
const consentController = require('../controllers/consentController');
const { auth } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/rbac');

router.get('/', consentController.getAllConsents);
router.post('/', auth, requireAdmin, consentController.createConsent);
router.delete('/:id', auth, requireAdmin, consentController.deleteConsent);

module.exports = router;
