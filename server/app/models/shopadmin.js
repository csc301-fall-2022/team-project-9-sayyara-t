'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShopAdmin.init({
    id: {
      type:DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true 
    },
    user_id: {type: DataTypes.UUID, allowNull: false,
      references:{
        model: 'user',
        key: 'id'
      }},
    shop_id: {type: DataTypes.UUID, allowNull: false,
      references:{
        model: 'shop',
        key: 'id'
      }}
  }, {
    sequelize,
    modelName: 'ShopAdmin',
  });
  return ShopAdmin;
};