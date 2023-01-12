const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

// check empty objects
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// schema for GeoJSON search

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

// User Schema

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
  fullname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  city: {
    place_id: { type: String, required: true },
    city: { type: String, required: true },
    county_code: { type: String, required: true },
  },
  location: {
    type: pointSchema,
    required: true,
  },
  hasAlert: Boolean,
});

//static signup methods

userSchema.statics.signup = async function (
  email,
  password,
  fullname,
  gender,
  birthdate,
  city,
  location
) {
  const reqUser = await this.findOne({ email });

  if (!email || !password || !fullname) {
    throw Error("Si prega di riempire tutti i campi obbligatori");
  }

  if (!city || !location) {
    throw Error(
      "Selezionare una città tra quelle suggerite nel menu a tendina"
    );
  }
  if (
    !city.hasOwnProperty("county_code") ||
    !city.hasOwnProperty("city") ||
    !city.hasOwnProperty("place_id")
  ) {
    throw Error(
      "Selezionare una città tra quelle suggerite nel menu a tendina"
    );
  }

  if (!validator.isEmail(email)) {
    throw Error("Si prega di inserire una email in formato valido");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "La password deve essere lunga almeno 8 caratteri e contenere almeno un numero e almneno un simbolo"
    );
  }

  if (reqUser) {
    throw Error("L'email inserita è già in uso");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    fullname,
    gender,
    birthdate,
    city,
    location: { type: "Point", coordinates: location },
  });

  return user;
};

userSchema.statics.updateUser = async function (
  id,
  fullname,
  gender,
  birthdate,
  city,
  location
) {
  const user = await this.updateOne(
    { _id: id },
    {
      fullname,
      gender,
      birthdate,
      city,
      location: { type: "Point", coordinates: location },
    }
  );

  return user;
};
userSchema.statics.updatePassword = async function (id, password) {
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "La password deve essere lunga almeno 8 caratteri e contenere almeno un numero e almneno un simbolo"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.updateOne(
    { _id: id },
    {
      password: hash,
    }
  );

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Si prega di riempire tutti i campi obbligatori");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email errata o utente non registrato");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Password errata");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
