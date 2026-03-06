const mongoose = require("mongoose");

// create Schema
const noteSchema = new mongoose.Schema(
  { 
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt , updatedAt
  },
);

// create Model
const Note = mongoose.model("Note", noteSchema);
module.exports = Note
