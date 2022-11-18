'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Quote.init({
    labour: DataTypes.FLOAT,
    parts: DataTypes.JSON,
    fees: DataTypes.JSON,
    discount: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Quote',
  });
  return Quote;
};