
// MODELS
const { UserLevel } = require('../models');

class UserLevelService {
    /**
     * Get All User Level
     * 
     * @returns {Promise<{
     *    code: number, 
     *    message: string, 
     *    data: {user_level_id: number, name: string}[] | null
     * }>} 
     */
    async getAll() {
        try {
            const dtUserLevels = await UserLevel.findAll({
                attributes: ['user_level_id', 'name'],
            });

            return {
                code: 200,
                message: 'user level get all',
                data: dtUserLevels
            };
        } catch (error) {
            return {
                code: 500,
                message: 'Error - UserLevelService - getAll: ' + error.message,
                data: null
            }; 
        }
    }
}

module.exports = new UserLevelService();
