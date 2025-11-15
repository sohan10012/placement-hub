// Student Model - handles all student database operations
const db = require('../config/db');

const Student = {
  // Get all students
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM students ORDER BY student_id DESC');
    return rows;
  },

  // Get student by ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM students WHERE student_id = ?', [id]);
    return rows[0];
  },

  // Create new student
  create: async (studentData) => {
    const { name, branch, email, phone, cgpa } = studentData;
    const [result] = await db.query(
      'INSERT INTO students (name, branch, email, phone, cgpa) VALUES (?, ?, ?, ?, ?)',
      [name, branch, email, phone, cgpa]
    );
    return result.insertId;
  },

  // Update student
  update: async (id, studentData) => {
    const { name, branch, email, phone, cgpa } = studentData;
    const [result] = await db.query(
      'UPDATE students SET name = ?, branch = ?, email = ?, phone = ?, cgpa = ? WHERE student_id = ?',
      [name, branch, email, phone, cgpa, id]
    );
    return result.affectedRows;
  },

  // Delete student
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM students WHERE student_id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Student;
