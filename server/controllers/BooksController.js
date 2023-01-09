const Book = require("../models/Book");
const validator = require("validator");

// Query word escaping function

function escapeRegExp(string) {
  const sanitized = string ? string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : "";
  return sanitized;
}

// Add a new book

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

// Delete a book

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

// Get all the user books

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

// Fetch books in the database, with pagination and filters

const getBooks = async (req, res) => {
  //default value if not provided

  const pageSkip = req.query.pageSkip ? parseInt(req.query.pageSkip) : 0;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12;
  const radius = req.query.radius ? parseFloat(req.query.radius) : 0;
  const lon = req.query.lon ? parseFloat(req.query.lon) : 0;
  const lat = req.query.lat ? parseFloat(req.query.lat) : 0;
  const category = req.query.category;
  const status = req.query.status;

  // regexp for substring search

  const substring = new RegExp(escapeRegExp(req.query.q), "i");

  let query = {
    category: category ? category : /.*/,
    title: substring,
    status:
      status === "perfect"
        ? "Come Nuovo"
        : status === "good"
        ? { $in: ["Come Nuovo", "Leggeri Segni di Usura"] }
        : /.*/,
  };

  // check if there is geo search request

  if (lon && lat & radius)
    query["owner.location"] = {
      $geoWithin: {
        $centerSphere: [[lon, lat], radius / 6378.14],
      },
    };

  try {
    const books = await Book.aggregate()
      .lookup({
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      })
      .match(query)
      .project({
        "owner.email": 0,
        "owner.password": 0,
        "owner.gender": 0,
        "owner.birthdate": 0,
      })
      .sort({ _id: -1 })
      .skip(pageSkip)
      .limit(pageSize);

    // Total books counter for pagination ending

    const totalBooks = await Book.countDocuments().exec();
    const response = {
      books: books,
      totalBooks: totalBooks,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

// Fetch book details

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
