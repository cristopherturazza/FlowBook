// Server starter

const server = require("./app");
const database = require("./database");

database.connectDB();

server.listen(3000, () => console.log("Server is listening on port 3000"));
