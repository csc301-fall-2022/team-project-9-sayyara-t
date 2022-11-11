const db = require("../models");
const shopAdmin = require("../models").ShopAdmin
const Op = db.Sequelize.Op;

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

exports.findAll = (req, res)=>{
    shopAdmin.findAll({attributes: ['id', 'user_id', 'shop_id', 'createdAt', 'updatedAt']}).then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ShopAdmins."
    });
  });
}

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