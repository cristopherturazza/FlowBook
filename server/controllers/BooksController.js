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
    const deleted = await Book.findByIdAndDelete(id);
    res.status(204).json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

const getUserBooks = async (req, res) => {
  const { id } = req.params;

  try {
    const userBooks = await Book.find({ owner: id });
    res.status(200).json(userBooks);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate({
      path: "owner",
      select: "_id fullname city",
    });
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

const getSingleBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).populate({
      path: "owner",
      select: "_id fullname city",
    });
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};
module.exports = {
  addBook,
  deleteBook,
  getBooks,
  getUserBooks,
  getSingleBook,
};
