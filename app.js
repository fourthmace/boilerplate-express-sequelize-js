// LOAD LIBS
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const express = require("express");
// SOCKET
const { setupSocket } = require("./src/pkg/socket/socket");

// ROUTES
const AuthRoute = require("./src/routes/AuthRoute");
const UserLevelRoute = require("./src/routes/UserLevelRoute");
const UserRoute = require("./src/routes/UserRoute");

// LOAD CONFIGS
const port = process.env.NODE_PORT || 4000;

// EXPRESS - SETUP
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EXPRESS - ROUTE DEFINE
const apiPrefix = process.env.NODE_API_PREFIX || 4000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "FOURTHMACE IS HERE" });
});
app.use(apiPrefix, AuthRoute);
app.use(apiPrefix, UserLevelRoute);
app.use(apiPrefix, UserRoute);

// SOCKET.IO - SETUP
const server = http.createServer(app);
setupSocket(server);

// EXPRESS - LISTEN PORT
server.listen(port, () => {
  console.log(`App listening at port:${port}`);
});

module.exports = app;
