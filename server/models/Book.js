const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
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
