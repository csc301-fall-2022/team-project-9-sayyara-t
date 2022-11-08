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
      allowNull: false,
      unique: true 
    },
    user_id: {type: DataTypes.UUID, allowNull: false,
      references:{
        model: User,
        key: 'id'
      }},
    shop_id: {type: DataTypes.UUID, allowNull: false,
      references:{
        model: Shop,
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