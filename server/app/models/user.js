'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Vehicle, {onDelete: 'CASCADE'})
      User.belongsToMany(models.Shop, {through: 'ShopAdmin'}) 
      User.belongsToMany(models.Shop, {through: 'Rating'})
    }
  }
  User.init({
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true 
    },
    role_id: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    username: {type: DataTypes.STRING, allowNull: false},
    password:  {type: DataTypes.STRING, allowNull: false},
    name:  {type: DataTypes.STRING, allowNull: false},
    email:  {type: DataTypes.STRING, allowNull: false},
    phone:  {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};