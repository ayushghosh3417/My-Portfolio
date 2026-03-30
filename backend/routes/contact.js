const express = require('express');
const router = express.Router();
const { submitContact, getAllMessages } = require('../controllers/contactController');

// Public routes
router.post('/', submitContact);
router.get('/', getAllMessages);

module.exports = router;
