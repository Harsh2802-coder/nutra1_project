const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const nutraRoutes = require("./routes/nutraRoutes");
const proxyRoutes = require("./routes/proxyRoutes");

const app = express();

/* ===== CORS (CORRECT & SAFE) ===== */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// IMPORTANT: handle preflight safely
app.use(express.json());

/* ===== ROUTES ===== */
app.get("/", (req, res) => {
  res.send("Nutraceutical Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/nutra", nutraRoutes);
app.use("/api/proxy", proxyRoutes);


/* ===== DB + SERVER ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
    app.listen(5001, () => {
      console.log("Server running on port 5001");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌:", err.message);
  });
