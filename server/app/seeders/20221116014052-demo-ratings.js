'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Ratings', [
      {
        id: '100',
        user_id: '1',
        shop_id: '10',
        comment: 'Good price, place was welcoming.',
        star: 5,
        price: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '200',
        user_id: '2',
        shop_id: '20',
        comment: 'Slow service, prices are decent.',
        star: 3,
        price: 600,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '300',
        user_id: '3',
        shop_id: '20',
        comment: 'Blew up my car!',
        star: 1,
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Ratings', null, {});
  }
};
