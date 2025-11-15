// Placement Routes - defines API endpoints for placement operations
const express = require('express');
const router = express.Router();
const placementController = require('../controllers/placementController');

// GET all placements
router.get('/', placementController.getAllPlacements);

// GET placement by ID
router.get('/:id', placementController.getPlacementById);

// POST create new placement
router.post('/', placementController.createPlacement);

// PUT update placement
router.put('/:id', placementController.updatePlacement);

// DELETE placement
router.delete('/:id', placementController.deletePlacement);

module.exports = router;
