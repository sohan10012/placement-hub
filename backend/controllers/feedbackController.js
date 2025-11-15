// Feedback Controller - handles HTTP requests for feedback operations
const Feedback = require('../models/feedbackModel');

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.getAll();
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.getById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const feedbackId = await Feedback.create(req.body);
    res.status(201).json({ success: true, message: 'Feedback created successfully', id: feedbackId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const affectedRows = await Feedback.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    res.json({ success: true, message: 'Feedback updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const affectedRows = await Feedback.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    res.json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
