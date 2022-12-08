'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Quotes', [
      {
        id: '100000',
        labour: 500,
        parts: {'Pipe': 2, 'Wheel': 1},
        fees: {'GST': 80, 'HST': 50},
        discount: 75,
        total: 1000,
        note: 'Car was leaky',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}, 
    {
      parts: {type: new Sequelize.JSON()},
      fees: {type: new Sequelize.JSON()}
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Quotes', null, {});
  }
};
