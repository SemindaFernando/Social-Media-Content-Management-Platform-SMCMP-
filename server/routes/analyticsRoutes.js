/**
 * Grand Azure Luxury Hotel & Spa - Analytics Routes
 */

const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/summary', analyticsController.getSummary);

module.exports = router;
