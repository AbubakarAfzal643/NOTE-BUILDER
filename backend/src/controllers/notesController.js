const Note = require("../models/Note");

const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSpecificNote = async (req, res) => {
  try {
    const foundedNote = await Note.findById(req.params.id);
    if (!foundedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(foundedNote);
  } catch (error) {
    console.log("Error in getSpecificNote controller : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
        received: req.body,
      });
    }
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote controller : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateNote controller : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id, {
      new: true,
    });

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully " });
  } catch (error) {
    console.log("Error in deleteNote controller : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllNotes,
  getSpecificNote,
  createNote,
  updateNote,
  deleteNote,
};
