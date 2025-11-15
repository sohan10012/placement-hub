// Placement Model - handles all placement database operations
const db = require('../config/db');

const Placement = {
  // Get all placements with student and company details
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT p.*, s.name as student_name, c.name as company_name 
      FROM placements p
      JOIN students s ON p.student_id = s.student_id
      JOIN companies c ON p.company_id = c.company_id
      ORDER BY p.placement_id DESC
    `);
    return rows;
  },

  // Get placement by ID
  getById: async (id) => {
    const [rows] = await db.query(`
      SELECT p.*, s.name as student_name, c.name as company_name 
      FROM placements p
      JOIN students s ON p.student_id = s.student_id
      JOIN companies c ON p.company_id = c.company_id
      WHERE p.placement_id = ?
    `, [id]);
    return rows[0];
  },

  // Create new placement
  create: async (placementData) => {
    const { student_id, company_id, date_placed, package: pkg } = placementData;
    const [result] = await db.query(
      'INSERT INTO placements (student_id, company_id, date_placed, package) VALUES (?, ?, ?, ?)',
      [student_id, company_id, date_placed, pkg]
    );
    return result.insertId;
  },

  // Update placement
  update: async (id, placementData) => {
    const { student_id, company_id, date_placed, package: pkg } = placementData;
    const [result] = await db.query(
      'UPDATE placements SET student_id = ?, company_id = ?, date_placed = ?, package = ? WHERE placement_id = ?',
      [student_id, company_id, date_placed, pkg, id]
    );
    return result.affectedRows;
  },

  // Delete placement
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM placements WHERE placement_id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Placement;
