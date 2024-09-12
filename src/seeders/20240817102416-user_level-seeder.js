'use strict';

// MODEL
const { UserLevel } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return UserLevel.bulkCreate([
      {
        name: 'superadmin',
      },
      {
        name: 'client',
      },
    ], {
    });
  },

  async down (queryInterface, Sequelize) {
    return UserLevel.destroy({ where: {}, truncate: true });
  }
};
