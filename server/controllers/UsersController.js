const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Create a new token with jwt
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_PHRASE, { expiresIn: 60 });
};

// Login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const id = user._id;

    const location = user.location;

    const token = createToken(id);

    res.status(200).json({ email, token, id, location });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

// Signup controller

const signupUser = async (req, res) => {
  const { email, password, fullname, gender, birthdate, city, location } =
    req.body;

  try {
    const user = await User.signup(
      email,
      password,
      fullname,
      gender,
      birthdate,
      city,
      location
    );
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

// Get user profile

const getUserData = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

// Update user profile

const updateUserData = async (req, res) => {
  const id = req.params.id;
  const { fullname, gender, birthdate, city, location } = req.body;
  try {
    const user = await User.updateUser(
      id,
      fullname,
      gender,
      birthdate,
      city,
      location
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

// Update user password

const updateUserPassword = async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  try {
    const newPassword = await User.updatePassword(id, password);
    res.status(200).json({ message: "Password modificata" });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

// Fetch user alert status

const getUserAlert = async (req, res) => {
  const { id } = req.params;

  try {
    const status = await User.findOne({ _id: id }).select("hasAlert").lean();
    res.status(200).json(status.hasAlert);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

// Reset user alert status

const resetUserAlert = async (req, res) => {
  const { id } = req.params;

  try {
    const reset = await User.updateOne({ _id: id }, { hasAlert: false });
    res.status(200).json(reset);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUserData,
  updateUserData,
  updateUserPassword,
  getUserAlert,
  resetUserAlert,
};
