// Company Controller - handles HTTP requests for company operations
const Company = require('../models/companyModel');

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.getAll();
    res.json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.getById(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new company
exports.createCompany = async (req, res) => {
  try {
    const companyId = await Company.create(req.body);
    res.status(201).json({ success: true, message: 'Company created successfully', id: companyId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update company
exports.updateCompany = async (req, res) => {
  try {
    const affectedRows = await Company.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.json({ success: true, message: 'Company updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    const affectedRows = await Company.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.json({ success: true, message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
