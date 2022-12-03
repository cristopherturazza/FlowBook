const express = require("express");

const router = express.Router();
const authChecker = require("../middleware/authChecker");

const {
  addBook,
  deleteBook,
  getBooks,
  getUserBooks,
  getSingleBook,
} = require("../controllers/BooksController");

// Free routes

router.get("/", getBooks);
router.get("/:id", getSingleBook);

// Protected Routes

router.use(authChecker);

// Get the logged in user books

router.get("/user/:id", getUserBooks);

// Add books

router.post("/", addBook);

// Remove books

router.delete("/:id", deleteBook);

module.exports = router;
