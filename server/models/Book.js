const User = require("../models/User");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Book Schema

const bookSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  isbn: String,
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },

  cover: String,
});

module.exports = mongoose.model("Book", bookSchema);
