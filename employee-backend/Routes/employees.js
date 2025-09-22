const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

// MySQL connection
const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "employee_db",
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET all employees
router.get("/", (req, res) => {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET single employee
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM employees WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Employee not found" });
    res.json(results[0]);
  });
});

// POST add employee
router.post("/", upload.single("photo"), (req, res) => {
  const { name, email, position, salary, department } = req.body;
  const photo = req.file ? req.file.filename : null;
  const sql = "INSERT INTO employees (name, email, position, salary, department, photo) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, email, position, salary, department, photo], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, email, position, salary, department, photo });
  });
});

// PUT update employee
router.put("/:id", upload.single("photo"), (req, res) => {
  const { id } = req.params;
  const { name, email, position, salary, department } = req.body;
  const photo = req.file ? req.file.filename : null;

  let sql = "UPDATE employees SET name=?, email=?, position=?, salary=?, department=?";
  const params = [name, email, position, salary, department];
  if (photo) {
    sql += ", photo=?";
    params.push(photo);
  }
  sql += " WHERE id=?";
  params.push(id);

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee updated successfully" });
  });
});

// DELETE employee
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employees WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee deleted successfully" });
  });
});

module.exports = router;
