const express = require("express"); // similar to import express from 'express'
const cors = require('cors')
const dotenv = require("dotenv").config();
const path = require("path")
const fs = require("fs")
const app = express();
const connectDB = require("./config/db");
const notesRoutes = require("./routes/notesRoutes");
const rateLimiter = require("./middleware/rateLimiter");
const PORT = process.env.PORT || 5001;

const frontendDist = path.join(__dirname, "../../frontend/dist");

if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: /^http:\/\/localhost:\d+$/,
  }));
} 
app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`Request method is ${req.method} and url is ${req.url}`);
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", notesRoutes);

// Serve frontend in production (if dist exists)
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  app.get("/{*path}", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on portNumber : ", PORT);
  });
});
