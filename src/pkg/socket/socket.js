// LOAD LIBS
const socketIo = require("socket.io");

// MIDDLEWARES
const authSocketMiddleware = require("../../middlewares/authSocketMiddleware");

// SERVICES
const UserService = require("../../services/UserService");

let io;

// INIT
const setupSocket = (server) => {
  try {
    io = socketIo(server);

    // middleware
    io.use(authSocketMiddleware);

    // connection
    io.on("connection", async (socket) => {
      console.log("Socket.IO - success: client connected");

      // on disconnect
      socket.on("disconnect", () => {
        console.log("Socket.IO - success: client disconnected");
      });

      // set room
      let user = socket.user;
      let userLevel = user.user_level.name;
      if (userLevel == "client") {
        socket.join(`room:${user.user_id}`);
      } else if (userLevel == "superadmin") {
        let dtUsers = await UserService.getAll(null, user);

        dtUsers.data.forEach((row) => {
          socket.join(`room:${row.user_id}`);
        });
      }
    });
  } catch (error) {
    console.error("Socket.IO - error:", error.message);
  }
};

// GET IO
const getSocket = () => io;

module.exports = {
  setupSocket,
  getSocket,
};
