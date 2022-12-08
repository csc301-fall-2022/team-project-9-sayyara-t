'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ShopServices', [
      {
        id: '100000000',
        shop_id: '10',
        service_id: 'abc1',
        description: 'some interesting stuff here',
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '200000000',
        shop_id: '20',
        service_id: 'abc1',
        description: 'some boring stuff here',
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
