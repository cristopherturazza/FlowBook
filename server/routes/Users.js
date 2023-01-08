const express = require("express");

const router = express.Router();
const authChecker = require("../middleware/authChecker");

const {
  signupUser,
  loginUser,
  getUserData,
  updateUserData,
  updateUserPassword,
  getUserAlert,
  resetUserAlert,
} = require("../controllers/UsersController");

// Signup/Login Route

router.post("/login", loginUser);

router.post("/signup", signupUser);

// Protected Routes

router.use(authChecker);

// Get user profile

router.get("/:id", getUserData);

// Update user profile

router.patch("/:id", updateUserData);

// Change password

router.patch("/:id/password", updateUserPassword);

// Alerts

// Fetch user alert status
router.get("/alert/:id", getUserAlert);

// Reset user alert status

router.patch("/alert/reset/:id", resetUserAlert);

module.exports = router;
