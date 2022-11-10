'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Vehicles', 'plate', {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        }),
        queryInterface.changeColumn('Vehicles', 'vin', {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Vehicles', 'plate', {
          type: Sequelize.STRING,
          allowNull: false,
        }),
        queryInterface.changeColumn('Vehicles', 'vin', {
          type: Sequelize.STRING,
          allowNull: false,
        })
      ])
    }) 
  }
};
