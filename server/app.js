// Main handler

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRoute = require("./routes/Users");

const app = express();

require("dotenv").config();

// logger
app.use(morgan("dev"));

// body parser and query parameters
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// security middlewares
app.use(helmet());

// sanitize filter
mongoose.set("sanitizeFilter", true);

// routes

app.use("/api/users", usersRoute);

// error 404
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

module.exports = app;
