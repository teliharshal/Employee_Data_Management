const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "employee_db",
});

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, hashedPassword, role || "user"], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User registered successfully" });
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email=?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ error: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });
});

// Check if user exists
router.post("/check-user", (req, res) => {
  const { email } = req.body;
  const sql = "SELECT * FROM users WHERE email=?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ exists: results.length > 0 });
  });
});

module.exports = router;
