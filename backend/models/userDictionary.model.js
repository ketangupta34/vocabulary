const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  definitions: {
    type: String,
    required: true,
  },
});

const words = mongoose.model("words", wordSchema);

module.exports = words;
