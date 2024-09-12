// LOAD LIBS
const jwt = require("jsonwebtoken");
// HELPERS
const { formatResponse } = require("../helpers/utils");
// MODELS
const { User, UserLevel } = require("../models");
// CONFIG
const KEY = process.env.NODE_JWT_KEY || "haha";

/**
 * Middleware for checking authorization and user roles
 *
 * @param {Array<string>} allowedRoles - Array of roles that are allowed to access the route.
 * @returns {Function} - Express middleware function.
 */
const authSocketMiddleware = async (socket, next) => {
  try {
    // Check for Authorization header
    const token = socket.handshake.auth.token;
    if (!token) {
      const err = new Error("unauthorized");
      err.data = { content: "Please provide a valid token." };
      return next(err);
    }

    // Decode JWT token
    try {
      let decoded;
      decoded = jwt.verify(token, KEY);

      // Check expired
      if (decoded.expired < Math.floor(Date.now() / 1000)) {
        const err = new Error("token expired");
        err.data = { content: "Please login again." };
        return next(err);
      }

      // Find user by user_id from the decoded JWT
      const user = await User.findByPk(decoded.user_id, {
        include: [
          {
            model: UserLevel,
            as: "user_level",
          },
        ],
      });
      if (!user) {
        const err = new Error("unauthorized");
        err.data = { content: "Please provide a valid token." };
        return next(err);
      }

      // Attach user to request object
      socket.user = user;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      const err = new Error("unauthorized");
      err.data = { content: "Please provide a valid token." };
      return next(err);
    }
  } catch (error) {
    const err = new Error("Internal server error");
    err.data = { content: error.message };
    next(err);
  }
};

module.exports = authSocketMiddleware;
