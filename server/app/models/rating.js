'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rating.init({
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
      }},
    comment: {type: DataTypes.STRING, allowNull: false},
    star: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};