// Server starter

const server = require("./app");
const database = require("./database");
require("dotenv").config();

database.connectDB();

server.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
