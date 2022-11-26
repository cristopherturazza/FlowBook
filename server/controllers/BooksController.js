const Book = require("../models/Book");
const validator = require("validator");

const addBook = async (req, res) => {
  const { owner, isbn, title, author, status, category, year, cover } =
    req.body;

  try {
    if (!validator.isISBN(isbn, 13)) {
      throw Error("ISBN non valido");
    }

    const book = await Book.create({
      owner,
      isbn,
      title,
      author,
      status,
      category,
      year,
      cover,
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Book.findOneAndDelete(id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

module.exports = {
  addBook,
  deleteBook,
};
