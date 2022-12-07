const db = require("../models");
const Service = require("../models").Service
const Shop = require("../models").Shop
const Op = db.Sequelize.Op;

/**
 * Endpoint: /api/services/
 * Method: POST
 * Fields: [
 *  type: @var STRING
 *  name: @var STRING
 * ]
 * Description: Creates a Service model instance with the inputted information
 * Note: a service here is for the fixed service list for shops to choose from, not for the services belonging to a shop profile. For those, see ShopService.controller.js
 */
exports.create = (req, res)=>{
  const newService = {
    type: req.body.type,
    name: req.body.name,
  }

  Service.create(newService).then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Service."
    });
  });
}

/**
 * Endpoint: /api/services
 * Method: GET
 * Description: final all Service model instances in the database
 */
exports.findAll = (req, res)=>{
  Service.findAll({
    attributes: ['id', 'type', 'name', 'createdAt', 'updatedAt']
  })
  .then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Services."
    });
  });
}

/**
 * Endpoint: /api/services/name/:name
 * Method: GET
 * Parameters: [
 *  name: @var STRING
 * ]
 * Description: find all Service model instance with the name passed in as a paramter
 */
exports.findAllByName = (req, res)=>{
  const name = req.params.name;

  Service.findAll({
    attributes: ['id', 'type', 'name', 'createdAt', 'updatedAt'], 
    where: {name : {[Op.like]: '%' + name + '%'}}
  })
  .then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Services."
    });
  });
}

/**
 * Endpoint: /api/services/type/:type
 * Method: GET
 * Parameters: [
 *  type: @var STRING
 * ]
 * Description: find all Service model instances with the type passed in as a paramter
 */
exports.findAllByType = (req, res)=>{
  const type = req.params.type;

  Service.findAll({
    attributes: ['id', 'type', 'name', 'createdAt', 'updatedAt'], 
    where: {type: type}
  })
  .then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Services."
    });
  });
}

/**
 * Endpoint: /api/services/:id
 * Method: GET
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: find the Service model instance with the id passed in as a paramter
 */
exports.findOne = (req, res) => {
    const id = req.params.id;

    Service.findByPk(id, {
      attributes: ['id', 'type', 'name', 'createdAt', 'updatedAt']
    })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Shop with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Shop with id=" + id
      });
    });
};

/**
 * Endpoint: /api/services/:id
 * Method: UPDATE
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: Update the Service model instance with the id passed in as a paramter to contain the inputted information
 */
exports.update = (req, res) => {
  const id = req.params.id;
  
  Service.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Service was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Service with id=" + id
    });
  });
};

/**
 * Endpoint: /api/services/:id
 * Method: DELETE
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: delete the Service model instance with the id passed in as a paramter
 */
exports.delete = (req, res) => {
  const id = req.params.id;

  Service.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Service was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Service with id=" + id
    });
  });
};
  