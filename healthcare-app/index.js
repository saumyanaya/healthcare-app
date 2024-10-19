const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);

// MongoDB connection

const mongoURI = "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error connecting to MongoDB: ", error));

app.get("/", (req, res) => res.send("Healthcare App API"));
// Routes
app.use("/api/patients", require("./routes/Patient"));
app.use("/api/doctors", require("./routes/Doctor"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
