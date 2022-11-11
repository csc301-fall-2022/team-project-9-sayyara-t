'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShopAdmins', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'Users',
          key: 'id',
        }
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
    await queryInterface.dropTable('ShopAdmins');
  }
};