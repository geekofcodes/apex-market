// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Refresh Token
router.post('/refresh-token', authController.refreshToken);

// Verify Email
router.post('/verify-email', authController.verifyEmail)

// Logout
router.post('/logout', authController.logout);

// Forgot Password
router.post('/forgot-password', authController.forgotPassword)

// Reset Password
router.post('/reset-password', authController.resetPassword)

// Add other authentication routes as needed

module.exports = router;
