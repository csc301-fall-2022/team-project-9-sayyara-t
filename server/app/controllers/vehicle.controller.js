const db = require("../models");
const Vehicle = require("../models").Vehicle;
const Op = db.Sequelize.Op;

/**
 * Endpoint: /api/vehicles
 * Method: POST
 * Fields: [
 *  plate: @var STRING
 *  model: @var STRING
 *  vin: @var STRING
 *  mileage: @var STRING
 *  type: @var STRING
 *  user_id: @var UUID
 * ]
 * Description: Creates a Vehicle model instance with the inputted information
 */
exports.create = (req, res)=>{
    const newVehicle = {
      plate: req.body.plate,
      model: req.body.model,
      vin: req.body.vin,
      mileage: req.body.mileage,
      type: req.body.type,
      user_id: req.body.user_id
      }
    console.log(newVehicle);

    Vehicle.create(newVehicle).then(data=>{res.send(data)})
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Vehicle."
        });
      });
}

/**
 * Endpoint: /api/vehicles/user/:user_id
 * Method: GET
 * Parameters: [
 *  user_id: @var UUID
 * ]
 * Description: Finds all vehicles with the user_id passed in as a parameter
 */
exports.findAllByUserID = (req, res)=>{
  const user_id = req.params.user_id;
  Vehicle.findAll({attributes: ['id', 'user_id', 'plate', 'model', 'vin', 'mileage', 'type', 'createdAt', 'updatedAt'], where: {user_id:user_id}})
  .then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Services."
    });
  });
}

/**
 * Endpoint: /api/vehicles/:id
 * Method: GET
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: find the vehicle with the id passed in as a parameter
 */
exports.findOne = (req, res) => {
    const id = req.params.id; 
  
    Vehicle.findByPk(id, {attributes: ['id', 'user_id', 'plate', 'model', 'vin', 'mileage', 'type', 'createdAt', 'updatedAt']})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Vehicle with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message
        });
      });
  };

/**
 * Endpoint: /api/vehicles/:id
 * Method: PUT
 * Paramters: [
 *  id: @var UUID
 * ]
 * Fields: [
 *  plate: @var STRING
 *  model: @var STRING
 *  vin: @var STRING
 *  mileage: @var STRING
 *  type: @var STRING
 *  user_id: @var USER
 * ]
 * Description: Update the Vehicle model instance with the id passed in as a paramter to contain the inputted information
 */
  exports.update = (req, res) => {
const id = req.params.id;

  Vehicle.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vehicle was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Vehilce with id=${id}. Maybe Vehicle was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Vehicle with id=" + id
      });
    });
};

/**
 * Endpoint: /api/vehicles/:id
 * Method: DELETE
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: Delete the vehicle with the id passed in as a parameter
 */
exports.delete = (req, res) => {
  const id = req.params.id;

  Vehicle.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vehicle was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Vehicle with id=" + id
      });
    });
};