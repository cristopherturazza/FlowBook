const express = require("express");

const router = express.Router();
const authChecker = require("../middleware/authChecker");

const {
  addBook,
  deleteBook,
  getUserBooks,
} = require("../controllers/BooksController");

// Free routes

// Protected Routes

router.use(authChecker);

router.get("/user/:id", getUserBooks);

router.post("/", addBook);

router.delete("/:id", deleteBook);

module.exports = router;
