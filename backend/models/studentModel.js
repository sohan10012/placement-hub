// Student Model - handles all student DB operations
const db = require('../config/db');

const Student = {
  // Get all students
  getAll: async () => {
    try {
      const [rows] = await db.query(
        'SELECT * FROM students ORDER BY student_id DESC'
      );
      return rows;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Get student by ID
  getById: async (id) => {
    try {
      const [rows] = await db.query(
        'SELECT * FROM students WHERE student_id = ?',
        [id]
      );
      return rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Create new student
  create: async (data) => {
    try {
      const { name, branch, email, phone, cgpa } = data;

      if (!name || !branch || !email || !phone || !cgpa) {
        throw new Error("All fields (name, branch, email, phone, cgpa) are required");
      }

      const [result] = await db.query(
        'INSERT INTO students (name, branch, email, phone, cgpa) VALUES (?, ?, ?, ?, ?)',
        [name, branch, email, phone, cgpa]
      );
      return result.insertId;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Update student
  update: async (id, data) => {
    try {
      const { name, branch, email, phone, cgpa } = data;

      const [result] = await db.query(
        'UPDATE students SET name=?, branch=?, email=?, phone=?, cgpa=? WHERE student_id=?',
        [name, branch, email, phone, cgpa, id]
      );

      return result.affectedRows;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Delete student
  delete: async (id) => {
    try {
      const [result] = await db.query(
        'DELETE FROM students WHERE student_id = ?',
        [id]
      );
      return result.affectedRows;
    } catch (err) {
      throw new Error(err.message);
    }
  }
};

module.exports = Student;
