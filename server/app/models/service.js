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
      allowNull: false,
      unique: true 
    },
    shop_id: {type: DataTypes.UUID, allowNull: false,
      references:{
        model: Shop,
        key: 'id'
      }},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false}
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};