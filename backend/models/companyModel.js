// Company Model - handles all company database operations
const db = require('../config/db');

const Company = {
  // Get all companies
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM companies ORDER BY company_id DESC');
    return rows;
  },

  // Get company by ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM companies WHERE company_id = ?', [id]);
    return rows[0];
  },

  // Create new company
  create: async (companyData) => {
    const { name, location, domain } = companyData;
    const [result] = await db.query(
      'INSERT INTO companies (name, location, domain) VALUES (?, ?, ?)',
      [name, location, domain]
    );
    return result.insertId;
  },

  // Update company
  update: async (id, companyData) => {
    const { name, location, domain } = companyData;
    const [result] = await db.query(
      'UPDATE companies SET name = ?, location = ?, domain = ? WHERE company_id = ?',
      [name, location, domain, id]
    );
    return result.affectedRows;
  },

  // Delete company
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM companies WHERE company_id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Company;
