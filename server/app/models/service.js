'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.belongsTo(models.Shop)
    }
  }
  Service.init({
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true 
    },
    type: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};