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
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true 
    },
    labour: {type: DataTypes.FLOAT, allowNull: false},
    parts: {type: DataTypes.JSON, allowNull: false},
    fees: {type: DataTypes.JSON, allowNull: false},
    discount: {type: DataTypes.FLOAT, allowNull: false},
    total: {type: DataTypes.FLOAT, allowNull: false},
    note: {type: DataTypes.STRING, allowNull: true}
  }, {
    sequelize,
    modelName: 'Quote',
  });
  return Quote;
};