const express = require("express");

const router = express.Router();
const authChecker = require("../middleware/authChecker");

const {
  signupUser,
  loginUser,
  getUserData,
} = require("../controllers/UsersController");

// Signup/Login Route

router.post("/login", loginUser);

router.post("/signup", signupUser);

// Protected Routes

router.use(authChecker);

router.get("/:id", getUserData);

module.exports = router;
