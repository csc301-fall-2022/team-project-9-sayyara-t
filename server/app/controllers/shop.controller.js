const { sequelize } = require("../models");
const db = require("../models");
const Shop = require("../models").Shop
const ShopAdmin = require("../models").ShopAdmin
const Rating = require("../models").Rating
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

exports.findAll = async (req, res)=>{ 
  search = req.params.search == "null" ? "" : req.params.search;
  sort = req.params.sort
  // List shops in order of their average price, based on their price
  const totalAmount = await Rating.findAll({
    attributes: [
      'shop_id', [sequelize.fn('avg', sequelize.col(sort)), 'average_' + sort]
    ],
    group: ['shop_id'],
    order: [['average_' + sort, sort == "price" ? 'ASC' : 'DESC']]
  })
  shopOrder = []
  // Push Shops with ratings into array by order of their average 
  for (var i = 0; i < totalAmount.length; i++){
    shopOrder.push(totalAmount[i].shop_id)
  }
  // Shops that do not have ratings get pushed to the end
  const allShops = await Shop.findAll()
  for (var i = 0; i < allShops.length; i++){
    // If the id of a shop is not in the array already, push it to the end of the array
    if (shopOrder.indexOf(allShops[i].id) === -1){
      shopOrder.push(allShops[i].id)
    }
  }

  actualResponse = []

  for (var i = 0; i < shopOrder.length; i++){
    shopObject = await Shop.findOne({where: {name : {[Op.like]: '%' + search + '%'}, id : shopOrder[i]}})
    if (shopObject != null){
      averageValue = 0
      if (sort == 'price'){
        averageValue = i < totalAmount.length ? parseInt(totalAmount[i]['dataValues']['average_price']) : 0
      } else{
        averageValue = i < totalAmount.length ? parseInt(totalAmount[i]['dataValues']['average_star']) : 0
      }
      shopObject['dataValues']['average_' + sort] = averageValue
      actualResponse.push(shopObject)
    }
  }
  console.log(totalAmount)
  console.log(shopOrder)
  console.log(actualResponse)
  res.send(actualResponse)
}

exports.findAllByUserID = async (req, res) =>{
  const user_id = req.params.user_id;
  // Get all ShopAdmin models, an array of dicts
  const shopAdminModels = await ShopAdmin.findAll({attributes:  ['id', 'user_id', 'shop_id', 'createdAt', 'updatedAt'], 
  where: {user_id:user_id}})
  shopIDs = [];
  // Iterate through all dicts of shopAdminModels
  for (var i = 0; i < shopAdminModels.length; i++){
    shopIDs.push(await Shop.findByPk(shopAdminModels[i].shop_id))
  }
  res.send(shopIDs)
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