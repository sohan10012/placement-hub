// Training Model - handles all training database operations
const db = require('../config/db');

const Training = {
  // Get all trainings
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM trainings ORDER BY training_id DESC');
    return rows;
  },

  // Get training by ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM trainings WHERE training_id = ?', [id]);
    return rows[0];
  },

  // Create new training
  create: async (trainingData) => {
    const { topic, trainer, date, duration } = trainingData;
    const [result] = await db.query(
      'INSERT INTO trainings (topic, trainer, date, duration) VALUES (?, ?, ?, ?)',
      [topic, trainer, date, duration]
    );
    return result.insertId;
  },

  // Update training
  update: async (id, trainingData) => {
    const { topic, trainer, date, duration } = trainingData;
    const [result] = await db.query(
      'UPDATE trainings SET topic = ?, trainer = ?, date = ?, duration = ? WHERE training_id = ?',
      [topic, trainer, date, duration, id]
    );
    return result.affectedRows;
  },

  // Delete training
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM trainings WHERE training_id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Training;
