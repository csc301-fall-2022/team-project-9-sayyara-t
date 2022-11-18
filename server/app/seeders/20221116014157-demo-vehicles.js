'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Vehicles', [
      {
        id: '10000',
        user_id: '1',
        plate: 'G3C W11',
        model: 'Corolla',
        vin: '12kj4hkf',
        mileage: '100,000 km',
        type: 'Hybrid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '20000',
        user_id: '2',
        plate: 'Q3W VT3',
        model: 'Civic',
        vin: 'f234kj23',
        mileage: '170,000 km',
        type: 'Gas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '30000',
        user_id: '3',
        plate: 'NP1 PT4',
        model: 'F150',
        vin: '124iuhi',
        mileage: '230,000 km',
        type: 'Diesel',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Vehicles', null, {});
  }
};
