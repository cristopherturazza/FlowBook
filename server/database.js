// MongoDB database connection controllers

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

//dotenv for db uri
require("dotenv").config();

//connect to the db with mongoose

let mongoMock = null; // create dummy version for testing

const connectDB = async () => {
  try {
    let dbUrl = process.env.DB_URI;
    if (process.env.NODE_ENV === "test") {
      mongoMock = await MongoMemoryServer.create();
      dbUrl = mongoMock.getUri();
    }
    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongoMock) {
      await mongoMock.stop();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectDB, disconnectDB };
