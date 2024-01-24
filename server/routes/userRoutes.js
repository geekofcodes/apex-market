// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// // Update user details by ID
// router.put('/:id', userController.updateUserDetails);

// Add other user routes as needed

module.exports = router;
