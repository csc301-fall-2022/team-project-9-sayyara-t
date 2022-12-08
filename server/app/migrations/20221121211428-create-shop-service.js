'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShopServices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      shop_id: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'Shops',
          key: 'id',
        }
      },
      service_id: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'Services',
          key: 'id',
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('ShopServices');
  }
};