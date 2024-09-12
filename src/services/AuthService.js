// LIBRARIES
require("dotenv").config();
// MODELS
const { User } = require("../models");
// HELPERS
const { compareText } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class AuthService {
  /**
   * Login Service
   *
   * @param {string} email
   * @param {string} password
   *
   * @returns {Promise<{
   *    code: number,
   *    message:
   *    string,
   *    data: any
   * }>}
   */
  async login(email, password) {
    try {
      // get user by email
      const dtUser = await User.findOne({
        where: {
          email,
        },
      });

      if (dtUser == null) {
        return {
          code: 401,
          message: "wrong email or password",
          data: null,
        };
      } else {
        // compare password
        const passIsCorrect = compareText(password, dtUser.password);

        if (!passIsCorrect) {
          return {
            code: 401,
            message: "wrong email or password",
            data: null,
          };
        } else {
          // generate token
          let payload = {
            user_id: dtUser.user_id,
            email: dtUser.email,
            expired:
              Math.floor(Date.now() / 1000) +
              parseInt(process.env.NODE_JWT_EXPIRED),
          };

          return {
            code: 200,
            message: "login success",
            data: {
              expired: payload.expired,
              token: generateToken(payload),
            },
          };
        }
      }
    } catch (error) {
      return {
        code: 500,
        message: "Error - Auth Service - login : " + error.message,
        data: null,
      };
    }
  }
}

module.exports = new AuthService();
