'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
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
      vehicle_id: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'Vehicles',
          key: 'id',
        }
      },
      quote_id: {
        allowNull: true,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'Quotes',
          key: 'id',
        }
      },
      linked_request_id: {
        allowNull: true,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'Requests',
          key: 'id',
        }
      },
      services: {
        type: Sequelize.JSON,
        allowNull: false
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      new_used: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3
      },
      oem_after: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3
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
    await queryInterface.dropTable('Requests');
  }
};