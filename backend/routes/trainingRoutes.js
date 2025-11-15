// Training Routes - defines API endpoints for training operations
const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');

// GET all trainings
router.get('/', trainingController.getAllTrainings);

// GET training by ID
router.get('/:id', trainingController.getTrainingById);

// POST create new training
router.post('/', trainingController.createTraining);

// PUT update training
router.put('/:id', trainingController.updateTraining);

// DELETE training
router.delete('/:id', trainingController.deleteTraining);

module.exports = router;
