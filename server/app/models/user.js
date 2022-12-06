'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    /**
     * Model for User
     * 
     * This model represents a user of the application. The User model has a OneToMany relationship with Vehicle models and a ManyToMany
     * relationship with Shop models
     */
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
    /** 
     * The ID of the model isntance. The ID is autogenerated when a new model is created and is default UUID
     * @var UUID
     */
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true 
    },
    /**
     * The role id of the user, used to represent if they are a vehicle owner or a shop owner. Represented as 
     * an integer which is tied to a string value in a dict
     * @var INTEGER
     */
    role_id: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    /**
     * Username of the user
     * @var STRING
     */
    username: {type: DataTypes.STRING, allowNull: false},
    /**
     * Password of the user, hased on user creation
     * @var STRING
     */
    password:  {type: DataTypes.STRING, allowNull: false},
    /**
     * Name of the user
     * @var STRING
     */
    name:  {type: DataTypes.STRING, allowNull: false},
    /**
     * Email of the user
     * @var STRING
     */
    email:  {type: DataTypes.STRING, allowNull: false},
    /**
     * Phone number of the user
     * @var STRING
     */
    phone:  {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};