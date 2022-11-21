'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Requests', [
      {
        id: '1000000',
        user_id: '1',
        shop_id: '30',
        vehicle_id: '10000',
        quote_id: '100000',
        linked_request_id: null,
        services: [],
        state: 2,
        description: 'Liquid constantly dripping from car',
        new_used: 3,
        oem_after: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}, {services: {type: new Sequelize.JSON()}});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Requests', null, {});
  }
};
