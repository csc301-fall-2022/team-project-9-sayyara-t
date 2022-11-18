'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Shops', [
      {
        id: '10',
        name: 'Bobs Trucks',
        address: '325 Yonge St.',
        phone: '123-456-7890',
        email: 'bob@trucks.com',
        time: {'start': '9:00 AM', 'end': '5:00 PM'},
        description: 'This place sells trucks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '20',
        name: 'Joes Bikes',
        address: '123 Real Rd.',
        phone: '111-222-3333',
        email: 'joe@bikes.com',
        time: {start: '9:00 AM', end: '5:00 PM'},
        description: 'This place sells bikes!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '30',
        name: 'Macs Cars',
        address: '333 Road Ave.',
        phone: '987-6543-210',
        email: 'mac@cars.com',
        time: {start: '9:00 AM', end: '5:00 PM'},
        description: 'This place sells cars!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}, {time: {type: new Sequelize.JSON()}});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Shops', null, {});
  }
};
