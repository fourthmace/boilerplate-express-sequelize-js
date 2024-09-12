// HELPERS
const { formatResponse } = require('../helpers/utils')
// SERVICES
const AuthService = require('../services/AuthService');

class AuthController {
    /**
     * Login
     */
    static async login(req,res) {
        try {
            // request body
            let {email,password} = req.body;

            // service logic
            const dtLogin = await AuthService.login(email, password);

            // response api
            formatResponse(res, dtLogin.code, dtLogin.message, dtLogin.data)
        } catch (error) {
            formatResponse(res, 500, error.message)
        }
    }
}

module.exports = AuthController;