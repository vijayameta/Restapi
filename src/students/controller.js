const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, phone, message } = req.body;

  // Check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;

    if (results.rows.length) {
      res.status(400).send("Email already exists.");
    } else {
      // Add student to the database
      pool.query(
        queries.addStudent,
        [name, email, phone, message],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("STUDENT CREATED SUCCESSFULLY!");
        }
      );
    }
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;

    if (!results.rows.length) {
      res.status(404).send("Student does not exist in the database.");
    } else {
      pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Student removed successfully!");
      });
    }
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;

    if (!results.rows.length) {
      res.status(404).send("Student does not exist in the database.");
    } else {
      pool.query(queries.updateStudent, [name, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Student updated successfully!");
      });
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
