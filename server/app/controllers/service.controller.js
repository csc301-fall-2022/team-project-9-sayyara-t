const db = require("../models");
const Service = require("../models").Service
const Shop = require("../models").Shop
const Op = db.Sequelize.Op;

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
  