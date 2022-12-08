const { v4: uuidv4 } = require('uuid');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Services', [
      {
        id: 'abc1',
        type: 'test',
        name: 'test service 1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Services', null, {});
  }
};
