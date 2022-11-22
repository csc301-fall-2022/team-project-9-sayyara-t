'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShopService.init({
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true 
    },
    shop_id: {
      type: DataTypes.UUID, 
      allowNull: false,
      references:{
        model: 'User',
        key: 'id'
      }
    },
    service_id: {
      type: DataTypes.UUID, 
      allowNull: false,
      references:{
        model: 'Service',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ShopService',
  });
  return ShopService;
};