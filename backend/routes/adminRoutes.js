// Admin Routes - defines API endpoints for admin operations
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// POST create new admin
router.post('/register', adminController.createAdmin);

// POST admin login
router.post('/login', adminController.loginAdmin);

module.exports = router;
