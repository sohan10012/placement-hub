// Admin Model - handles admin authentication operations
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Admin = {
  // Create new admin
  create: async (adminData) => {
    const { name, email, password } = adminData;
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO admin (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result.insertId;
  },

  // Find admin by email
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM admin WHERE email = ?', [email]);
    return rows[0];
  },

  // Verify password
  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};

module.exports = Admin;
