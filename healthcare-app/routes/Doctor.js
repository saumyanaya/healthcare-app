// routes/doctorRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../modals/Doctor");
const router = express.Router();

// Register Doctor
router.post("/register", async (req, res) => {
  const { name, email, password, specialization, experience } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience,
    });
    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error registering doctor" });
  }
});

// Login Doctor
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email });
  if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
