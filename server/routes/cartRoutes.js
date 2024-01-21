// cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get cart by user ID
router.get('/:userId', cartController.getCartByUserId);

// Add other cart routes as needed

module.exports = router;
