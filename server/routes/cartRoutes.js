// cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get cart by user ID
router.get('/:userId', cartController.getCartByUserId);

// Add product to cart
router.post('/:userId', cartController.addToCart);

// Get cart count by user ID
router.get('/count/:userId', cartController.getCartCount);

// Add other cart routes as needed

module.exports = router;
