// Feedback Model - handles all feedback database operations
const db = require('../config/db');

const Feedback = {
  // Get all feedback with student details
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT f.*, s.name as student_name 
      FROM feedback f
      JOIN students s ON f.student_id = s.student_id
      ORDER BY f.feedback_id DESC
    `);
    return rows;
  },

  // Get feedback by ID
  getById: async (id) => {
    const [rows] = await db.query(`
      SELECT f.*, s.name as student_name 
      FROM feedback f
      JOIN students s ON f.student_id = s.student_id
      WHERE f.feedback_id = ?
    `, [id]);
    return rows[0];
  },

  // Create new feedback
  create: async (feedbackData) => {
    const { student_id, comments, rating } = feedbackData;
    const [result] = await db.query(
      'INSERT INTO feedback (student_id, comments, rating) VALUES (?, ?, ?)',
      [student_id, comments, rating]
    );
    return result.insertId;
  },

  // Update feedback
  update: async (id, feedbackData) => {
    const { student_id, comments, rating } = feedbackData;
    const [result] = await db.query(
      'UPDATE feedback SET student_id = ?, comments = ?, rating = ? WHERE feedback_id = ?',
      [student_id, comments, rating, id]
    );
    return result.affectedRows;
  },

  // Delete feedback
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM feedback WHERE feedback_id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Feedback;
