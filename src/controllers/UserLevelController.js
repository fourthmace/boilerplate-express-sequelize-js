// HELPERS
const { formatResponse } = require('../helpers/utils')
// SERVICES
const UserLevelService = require('../services/UserLevelService');

class UserLevelController {
    /**
     * Get All User Level
     */
    static async getAll(req,res) {
        try {
            // service logic
            const dt = await UserLevelService.getAll();

            // response api
            formatResponse(res, dt.code, dt.message, dt.data)
        } catch (error) {
            formatResponse(res, 500, error.message)
        }
    }
}

module.exports = UserLevelController;