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

router.get("/:id", getUserData);

router.patch("/:id", updateUserData);

router.patch("/:id/password", updateUserPassword);

// Alerts

router.get("/alert/:id", getUserAlert);

router.patch("/alert/reset/:id", resetUserAlert);

module.exports = router;
