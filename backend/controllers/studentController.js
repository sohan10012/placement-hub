const Student = require('../models/studentModel');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAll();
    res.json({ success: true, data: students });
  } catch (error) {
    console.error("GET ALL STUDENTS ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.getById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    console.error("GET STUDENT BY ID ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new student
exports.createStudent = async (req, res) => {
  try {
    console.log("📥 Incoming Student:", req.body);

    const studentId = await Student.create(req.body);
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      id: studentId
    });
  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const affectedRows = await Student.update(req.params.id, req.body);

    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, message: "Student updated successfully" });
  } catch (error) {
    console.error("UPDATE STUDENT ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const affectedRows = await Student.delete(req.params.id);

    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
