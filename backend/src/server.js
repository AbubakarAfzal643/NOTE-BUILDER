const express = require("express"); // similar to import express from 'express'
const cors = require('cors')
const dotenv = require("dotenv").config();
const path = require("path")
const app = express();
const connectDB = require("./config/db");
const notesRoutes = require("./routes/notesRoutes");
const rateLimiter = require("./middleware/rateLimiter");
const PORT = process.env.PORT || 5001;


if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: /^http:\/\/localhost:\d+$/,
  }));
} 
app.use(express.json());
app.use(rateLimiter);

  // Rate Limiting : Only 100 requests per user every 1 minute
app.use((req, res, next) => {
  console.log(`Request method is ${req.method} and url is ${req.url}`);
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.get("/{*path}",(req,res) =>{
  res.sendFile(path.join(__dirname, "../../frontend" , "dist" , "index.html"))
})
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on portNumber : ", PORT);
  });
});
