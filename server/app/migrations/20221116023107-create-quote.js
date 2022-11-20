'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quotes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      labour: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      parts: {
        type: Sequelize.JSON,
        allowNull: false
      },
      fees: {
        type: Sequelize.JSON,
        allowNull: false
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      note: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quotes');
  }
};