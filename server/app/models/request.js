'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Request.init({
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
    vehicle_id: {type: DataTypes.UUID, allowNull: false,
      references:{
        model: 'vehicle',
        key: 'id'
      }},
    services: {type: DataTypes.JSON, allowNull: false},
    state: {type: DataTypes.INTEGER, defaultValue: 0},
    description: {type:DataTypes.STRING, allowNull: false},
    new_used: {type: DataTypes.INTEGER, allowNull:false, defaultValue: 3},
    oem_after: {type: DataTypes.INTEGER, allowNull:false, defaultValue: 3}
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};