const db = require("../models");
const Shop = require("../models").Shop
const Op = db.Sequelize.Op;

exports.create = (req, res)=>{
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    };

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