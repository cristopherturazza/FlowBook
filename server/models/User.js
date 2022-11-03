const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

//static signup methods

userSchema.statics.signup = async function (
  email,
  password,
  name,
  lastname,
  age,
  gender
) {
  const reqUser = await this.findOne({ email });

  if (!email || !password || !name || !lastname) {
    throw Error("All required fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please insert a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must be minimum 8 charachters and must contain one uppercase, one number and one symbol"
    );
  }

  if (reqUser) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    name,
    lastname,
    age,
    gender,
  });

  return user;
};

//static signup methods

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All required fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect or unregistered email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
