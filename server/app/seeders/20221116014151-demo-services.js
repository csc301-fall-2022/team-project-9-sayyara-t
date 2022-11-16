'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Services', [
      {
        id: '1000',
        shop_id: '20',
        name: 'Oil Change',
        description: 'Check oil health and change if required',
        price: 250,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2000',
        shop_id: '30',
        name: 'Suspension Tuning',
        description: 'Tune misaligned and broken suspension',
        price: 750,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3000',
        shop_id: '30',
        name: 'Vinyl Wrap',
        description: 'Wrap your car in a custom vinyl',
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Services', null, {});
  }
};
