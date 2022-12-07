const db = require("../models");
const shopAdmin = require("../models").ShopAdmin
const Op = db.Sequelize.Op;

/**
 * Endpoint: /api/shopadmins/
 * Method: POST
 * Fields: [
 *  user_id: @var UUID
 *  shop_id: @var UUID
 * ]
 * Description: Creates a ShopAdmin model instance with the inputted information
 */
exports.create = (req, res)=>{
    const newShopAdmin = {
      user_id: req.body.user_id,
      shop_id: req.body.shop_id
    }
    console.log(newShopAdmin);

    shopAdmin.create(newShopAdmin).then(data=>{res.send(data)})
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating a ShopAdmin."
        });
      });
}

/**
 * Endpoint: /api/shopadmins
 * Method: GET
 * Description: find all ShopAdmin model instances in the database
 */
exports.findAll = (req, res)=>{
    shopAdmin.findAll({attributes: ['id', 'user_id', 'shop_id', 'createdAt', 'updatedAt']}).then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ShopAdmins."
    });
  });
}

/**
 * Endpoint: /api/shopadmins/user/:user_id
 * Method: GET
 * Parameters: [
 *  user_id: @var UUID
 * ]
 * Description: find all ShopAdmin model instances associated with the user with the user_id passed in as a paramter
 */
exports.findAllByUserID = (req, res)=>{
  const user_id = req.params.user_id;
  shopAdmin.findAll({attributes:  ['id', 'user_id', 'shop_id', 'createdAt', 'updatedAt'], where: {user_id:user_id}})
  .then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ShopAdmins."
    });
  });
}

/**
 * Endpoint: /api/shopadmins/shop/:shop_id
 * Method: GET
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: find all ShopAdmin model instances associated with the shop with the shop_id passed in as a paramter
 */
exports.findAllByShopID = (req, res)=>{
  const shop_id = req.params.shop_id;
  shopAdmin.findAll({attributes:  ['id', 'user_id', 'shop_id', 'createdAt', 'updatedAt'], where: {shop_id:shop_id}})
  .then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ShopAdmins."
    });
  });
}

/**
 * Endpoint: /api/shopadmins/:id
 * Method: GET
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: find the ShopAdmin model instance with the id passed in as a paramter
 */
exports.findOne = (req, res) => {
  const id = req.params.id;

  shopAdmin.findByPk(id, {attributes: ['id', 'user_id', 'shop_id', 'createdAt', 'updatedAt']})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ShopAdmin with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ShopAdmin with id=" + id
      });
    });
};

/**
 * Endpoint: /api/shopadmins/:id
 * Method: UPDATE
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: Update the ShopAdmin model instance with the id passed in as a paramter to contain the inputted information
 */
exports.update = (req, res) => {
  const id = req.params.id;

  shopAdmin.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ShopAdmin was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ShopAdmin with id=${id}. Maybe ShopAdmin was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ShopAdmin with id=" + id
      });
    });
};

/**
 * Endpoint: /api/shopadmins/:id
 * Method: DELETE
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: delete the ShopAdmin model instance with the id passed in as a paramter
 */
exports.delete = (req, res) => {
  const id = req.params.id;

  shopAdmin.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ShopAdmin was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ShopAdmin with id=${id}. Maybe ShopAdmin was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ShopAdmin with id=" + id
      });
    });
};