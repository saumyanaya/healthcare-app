// models/Patient.js
const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  medicalHistory: { type: String },
});

module.exports = mongoose.model("Patient", PatientSchema);
