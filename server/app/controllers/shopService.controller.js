const db = require("../models");
const ShopService = require("../models").ShopService
const Op = db.Sequelize.Op;

/**
 * Endpoint: /api/shopservices/
 * Method: POST
 * Fields: [
 *  shop_id: @var UUID
 *  service_id: @var UUID
 *  description: @var STRING
 *  price: @var INTEGER
 * ]
 * Description: Creates a Shop Service model instance with the inputted information
 * Note: a service here is for a service as listen in a shop profile, not the fixed list of services for shops to choose from (as dealt with in service.controller.js)
 */
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

/**
 * Endpoint: /api/shopservices/
 * Method: GET
 * Description: find all ShopService model instances in the database
 */
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

/**
 * Endpoint: /api/shopservices/shop/:shop_id
 * Method: GET
 * Parameters: [
 *  shop_id: @var UUID
 * ]
 * Description: find all ShopService model instances associated with the shop with the shop_id passed in as a paramter
 */
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

/**
 * Endpoint: /api/shopservices/service/:service_id
 * Method: GET
 * Parameters: [
 *  service_id: @var UUID
 * ]
 * Description: find all the Shop model instances associated with the Service model instance with the service_id passed in as a paramter
 */
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

/**
 * Endpoint: /api/shopservices/:id
 * Method: GET
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: find the ShopService model instance with the id passed in as a paramter
 */
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

/**
 * Endpoint: /api/shopservices/:id
 * Method: UPDATE
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: Update the Service model instance with the id passed in as a paramter to contain the inputted information
 */
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

/**
 * Endpoint: /api/shopservices/:id
 * Method: DELETE
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: delete the ShopService model instance with the id passed in as a paramter
 */
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