// Placement Controller - handles HTTP requests for placement operations
const Placement = require('../models/placementModel');

// Get all placements
exports.getAllPlacements = async (req, res) => {
  try {
    const placements = await Placement.getAll();
    res.json({ success: true, data: placements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get placement by ID
exports.getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.getById(req.params.id);
    if (!placement) {
      return res.status(404).json({ success: false, message: 'Placement not found' });
    }
    res.json({ success: true, data: placement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new placement
exports.createPlacement = async (req, res) => {
  try {
    const placementId = await Placement.create(req.body);
    res.status(201).json({ success: true, message: 'Placement created successfully', id: placementId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update placement
exports.updatePlacement = async (req, res) => {
  try {
    const affectedRows = await Placement.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Placement not found' });
    }
    res.json({ success: true, message: 'Placement updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete placement
exports.deletePlacement = async (req, res) => {
  try {
    const affectedRows = await Placement.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Placement not found' });
    }
    res.json({ success: true, message: 'Placement deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
