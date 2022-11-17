const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_PHRASE, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const id = user._id;

    const token = createToken(id);

    res.status(200).json({ email, token, id });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

const signupUser = async (req, res) => {
  const { email, password, fullname, gender, birthdate, city } = req.body;

  try {
    const user = await User.signup(
      email,
      password,
      fullname,
      gender,
      birthdate,
      city
    );
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

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

const updateUserData = async (req, res) => {
  const id = req.params.id;
  const { fullname, gender, birthdate, city } = req.body;
  try {
    const user = await User.updateUser(id, fullname, gender, birthdate, city);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

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

module.exports = {
  signupUser,
  loginUser,
  getUserData,
  updateUserData,
  updateUserPassword,
};
