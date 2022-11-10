const db = require("../models");
const Vehicle = require("../models").Vehicle;
const Op = db.Sequelize.Op;

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