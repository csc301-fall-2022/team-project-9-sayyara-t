const db = require("../models");
const Shop = require("../models").Shop
const Op = db.Sequelize.Op;

exports.create = (req, res)=>{
    const newShop = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      time: req.body.time,
      description: req.body.description
    }
    console.log(newShop);

    Shop.create(newShop).then(data=>{res.send(data)})
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Shop."
        });
      });
}

exports.findAll = (req, res)=>{
  Shop.findAll().then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Shops."
    });
  });
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  Shop.findByPk(id)
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

  Shop.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Shop was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Shop with id=${id}. Maybe Shop was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Shop with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Shop.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Shop was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Shop with id=${id}. Maybe Shop was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Shop with id=" + id
      });
    });
};