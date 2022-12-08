'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Model for Vehicles
   * 
   * This model is used to represent the vehicles that vehicle owners want to be serviced on. 
   * The Vehicle model has a ManyToOne relationship with the User model, as vehicles owners can own multiple vehicles.
   */

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
     * The plate of the vehicle
     * @var STRING
     */
    plate: {type: DataTypes.STRING, allowNull: false, unique: true},
    /**
     * The model of the vehicle
     * @var STRING
     */
    model: {type: DataTypes.STRING, allowNull: false},
    /**
     * The vehicle's VIN (vehicle insurance number)
     * @var STRING
     */
    vin:  {type: DataTypes.STRING, allowNull: false, unique: true},
    /**
     * The mileage of the vehicle
     * @var STRING
     */
    mileage:  {type: DataTypes.STRING, allowNull: false},
    /**
     * The type of the vehicle
     * @var STRING
     */
    type:  {type: DataTypes.STRING, allowNull: false},
    /**
     * A foreign key pointing to the User model that owns this vehicle
     * @var UUID
     */
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