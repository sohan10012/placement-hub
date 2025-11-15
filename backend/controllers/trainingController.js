// Training Controller - handles HTTP requests for training operations
const Training = require('../models/trainingModel');

// Get all trainings
exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.getAll();
    res.json({ success: true, data: trainings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get training by ID
exports.getTrainingById = async (req, res) => {
  try {
    const training = await Training.getById(req.params.id);
    if (!training) {
      return res.status(404).json({ success: false, message: 'Training not found' });
    }
    res.json({ success: true, data: training });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new training
exports.createTraining = async (req, res) => {
  try {
    const trainingId = await Training.create(req.body);
    res.status(201).json({ success: true, message: 'Training created successfully', id: trainingId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update training
exports.updateTraining = async (req, res) => {
  try {
    const affectedRows = await Training.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Training not found' });
    }
    res.json({ success: true, message: 'Training updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete training
exports.deleteTraining = async (req, res) => {
  try {
    const affectedRows = await Training.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Training not found' });
    }
    res.json({ success: true, message: 'Training deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
