'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehicle.belongsTo(models.User)
    }
  }
  Vehicle.init({
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true 
    },
    plate: {type: DataTypes.STRING, allowNull: false, unique: true},
    model: {type: DataTypes.STRING, allowNull: false},
    vin:  {type: DataTypes.STRING, allowNull: false, unique: true},
    mileage:  {type: DataTypes.STRING, allowNull: false},
    type:  {type: DataTypes.STRING, allowNull: false},
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'user',
            key: 'id',
        }
    }
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};