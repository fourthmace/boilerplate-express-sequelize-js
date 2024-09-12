'use strict';

// MODEL
const { User } = require('../models');
// HELPERS
const { generateAutoIncrement } = require('../helpers/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let user_id = await generateAutoIncrement('user', ['user_id']);

    return User.bulkCreate([
      {
        user_id: user_id++,
        email: 'superadmin1@gmail.com',
        password: 'superadmin1',
        user_level_id: 1,
      },
      {
        user_id: user_id++,
        email: 'client1@gmail.com',
        password: 'client1',
        user_level_id: 2,
      },
    ], {
      individualHooks: true
    });
  },

  async down (queryInterface, Sequelize) {
    return User.destroy({ where: {}, truncate: true });
  }
};
