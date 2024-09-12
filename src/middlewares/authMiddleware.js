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
const authMiddleware = (allowedLevels) => {
  return async (req, res, next) => {
    try {
      // Check for Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return formatResponse(res, 401, "unauthorized");
      }

      // Extract token from header
      const token = authHeader.split(" ")[1];

      // Decode JWT token
      try {
        let decoded;
        decoded = jwt.verify(token, KEY);

        // Check expired
        if (decoded.expired < Math.floor(Date.now() / 1000)) {
          return formatResponse(res, 401, "token expired");
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
          return formatResponse(res, 401, "unauthorized");
        }

        // Check if user's role is in the allowedRoles array
        if (!allowedLevels.includes(user.user_level.name)) {
          return formatResponse(res, 401, "unauthorized");
        }

        // Attach user to request object
        req.login_info = user;

        // Proceed to the next middleware or route handler
        next();
      } catch (error) {
        return formatResponse(res, 401, "unauthorized");
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
};

module.exports = authMiddleware;
