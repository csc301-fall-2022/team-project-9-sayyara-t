const db = require("../models");
const Request = require("../models").Request;
const Op = db.Sequelize.Op;

exports.create = (req, res)=>{
    const newRequest = {
      id: req.body.id,
      user_id: req.body.user_id,
      shop_id: req.body.shop_id,
      vehicle_id: req.body.vehicle_id,
      services: req.body.services,
      state: req.body.state,
      description: req.body.description,
      new_used: req.body.new_used,
      oem_after: req.body.oem_after
      }
    console.log(newRequest);

    Vehicle.create(newRequest).then(data=>{res.send(data)})
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Request."
        });
      });
}

// this is where findAll would go. need to figure out sorting

exports.findOne = (req, res) => {
    const id = req.params.id; 
  
    Request.findByPk(id, {attributes: ['id', 'user_id', 'shop_id', 'vehicle_id', 'services', 'state', 'description', 'new_used', 'oem_after']})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Request with id=${id}.`
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

  Request.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Request was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Request with id=${id}. Maybe Request was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Request with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Request.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Request was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Request with id=${id}. Maybe Request was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Request with id=" + id
      });
    });
};