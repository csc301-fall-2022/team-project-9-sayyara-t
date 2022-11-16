'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: '1',
        role_id: 0,
        username: 'JoeMama',
        password: 'abc123',
        name: 'Joe',
        email: 'joe@testmail.com',
        phone: '123-456-7890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        role_id: 0,
        username: 'BobbyMcGee',
        password: 'pass321',
        name: 'Bob',
        email: 'bobby@mail.com',
        phone: '111-222-3333',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        role_id: 0,
        username: 'JohnSnow',
        password: 'secretpass',
        name: 'John',
        email: 'jony@snow.com',
        phone: '123-123-1234',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
