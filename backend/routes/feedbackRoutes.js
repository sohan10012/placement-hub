// Feedback Routes - defines API endpoints for feedback operations
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// GET all feedback
router.get('/', feedbackController.getAllFeedback);

// GET feedback by ID
router.get('/:id', feedbackController.getFeedbackById);

// POST create new feedback
router.post('/', feedbackController.createFeedback);

// PUT update feedback
router.put('/:id', feedbackController.updateFeedback);

// DELETE feedback
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
