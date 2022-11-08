'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shop.belongsToMany(models.User, {through: 'ShopAdmin'})
      Shop.belongsToMany(models.User, {through: 'Rating'})
    }
  }
  Shop.init({
    id: {
      type:DataTypes.UUID,
      allowNull: false,
      unique: true 
    },
    name: {type: DataTypes.STRING, allowNull: false},
    address:  {type: DataTypes.STRING, allowNull: false},
    phone:  {type: DataTypes.STRING, allowNull: false},
    email:  {type: DataTypes.STRING, allowNull: false},
    time:  {type: DataTypes.JSON, allowNull: false},
    description:  {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};