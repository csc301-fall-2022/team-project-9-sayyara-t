const db = require("../models");
const Quote = require("../models").Quote;
const Request = require("../models").Request;
const Op = db.Sequelize.Op;

exports.create = (req, res)=>{
    const newQuote = {
      labour: req.body.labour,
      parts: req.body.parts,
      fees: req.body.fees,
      discount: req.body.discount,
      total: req.body.total,
      note: req.body.note
    }
    console.log(newQuote);

    Quote.create(newQuote).then(data=>{res.send(data)})
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Quote."
        });
      });
}

exports.findOne = (req, res) => {
    const id = req.params.id; 
  
    Quote.findByPk(id, {attributes: ['id', 'labour', 'parts', 'fees', 'discount', 'total', 'note', 'createdAt', 'updatedAt']})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Quote with id=${id}.`
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

  Quote.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Quote was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Quote with id=${id}. Maybe Quote was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Quote with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Quote.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Quote was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Quote with id=${id}. Maybe Quote was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Quote with id=" + id
      });
    });
};

exports.findAll = (req, res) => {
    Quote.findAll({
        attributes: ['id', 'labour', 'parts', 'fees', 'discount', 'total', 'note', 'createdAt', 'updatedAt']
    })
        .then(data=>{res.send(data)})
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Quotes."
            });
        });
};

exports.findAllByShopID = async (req, res) => {
    const shop_id = req.params.shop_id;
    const quote_ids = await Request.findAll({
        attributes: ['quote_id'],
        where: {shop_id: shop_id}
    })
    const data = await Quote.findAll({
        attributes: ['id', 'labour', 'parts', 'fees', 'discount', 'total', 'note', 'createdAt', 'updatedAt'],
        where: {id: quote_ids}
    })
    res.send(data)
}

exports.findAllByUserID = async (req, res) => {
    const user_id = req.params.user_id;
    const quote_ids = await Request.findAll({
        attributes: ['quote_id'],
        where: {user_id: user_id}
    })
    const data = await Quote.findAll({
        attributes: ['id', 'labour', 'parts', 'fees', 'discount', 'total', 'note', 'createdAt', 'updatedAt'],
        where: {id: quote_ids}
    })
    res.send(data)
}
