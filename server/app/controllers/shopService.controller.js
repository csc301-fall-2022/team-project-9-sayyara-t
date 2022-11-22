const db = require("../models");
const ShopService = require("../models").ShopService
const Op = db.Sequelize.Op;

exports.create = (req, res)=>{
  const newShopService = {
    shop_id: req.body.shop_id,
    service_id: req.body.service_id,
    description: req.body.description,
    price: req.body.price,
  }
  console.log(newShopService);

  ShopService.create(newShopService).then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating a ShopService."
    });
  });
}

exports.findAll = (req, res)=>{
  ShopService.findAll({
      attributes: ['id', 'shop_id', 'service_id', 'description', 'price', 'createdAt', 'updatedAt']
  })
  .then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
    message:
        err.message || "Some error occurred while retrieving ShopServices."
    });
  });
}

exports.findAllByShopID = (req, res)=>{
  const shop_id = req.params.shop_id;
  ShopService.findAll({
    attributes: ['id', 'shop_id', 'service_id', 'description', 'price', 'createdAt', 'updatedAt'], 
    where: {shop_id: shop_id}
  })
  .then(data=>{res.send(data)})
    .catch(err => {
        res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving ShopServices."
    });
  });
}

exports.findAllByServiceID = (req, res)=>{
  const service_id = req.params.service_id;
  ShopService.findAll({
    attributes: ['id', 'shop_id', 'service_id', 'description', 'price', 'createdAt', 'updatedAt'], 
    where: {service_id: service_id}
  })
  .then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving ShopServices."
    });
  });
}

exports.findOne = (req, res) => {
const id = req.params.id;

  ShopService.findByPk(id, {
    attributes: ['id', 'shop_id', 'service_id', 'description', 'price', 'createdAt', 'updatedAt']
  })
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find ShopService with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
        message: "Error retrieving ShopService with id=" + id
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ShopService.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "ShopService was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update ShopService with id=${id}. Maybe ShopService was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating ShopService with id=" + id
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ShopService.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "ShopService was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete ShopService with id=${id}. Maybe ShopService was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete ShopService with id=" + id
    });
  });
};