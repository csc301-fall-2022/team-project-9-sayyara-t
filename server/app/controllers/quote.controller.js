const db = require("../models");
const Quote = require("../models").Quote;
const Request = require("../models").Request;
const Op = db.Sequelize.Op;

/**
 * Endpoint: /api/quptes/
 * Method: POST
 * Fields: [
 *  labour: @var FLOAT
 *  parts: @var JSON
 *  fees: @var JSON
 *  discount: @var FLOAT
 *  total: @var FLOAT
 *  note: @var STRING
 * ]
 * Description: Creates a Quote model instance with the inputted information
 */

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

/**
 * Endpoint: /api/quotes/:id
 * Method: GET
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: find the quote with the id passed in as a parameter
 */
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

/**
 * Endpoint: /api/quotes/:id
 * Method: PUT
 * Fields: [
 *  labour: @var FLOAT
 *  parts: @var JSON
 *  fees: @var JSON
 *  discount: @var FLOAT
 *  total: @var FLOAT
 *  note: @var STRING
 * ]
 * Description: Update the Quote model instance with the id passed in as a paramter to contain the inputted information
 */
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

/**
 * Endpoint: /api/quotes/:id
 * Method: DELETE
 * Parameters: [
 *  id: @var UUID
 * ]
 * Description: Delete the quote with the id passed in as a parameter
 */
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

/**
 * Endpoint: /api/quotes
 * Method: GET
 * Description: Get all the quotes in the database
 */
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

/**
 * Endpoint: /api/shop/:shop_id
 * Method: GET
 * Parameters: [
 *  shop_id: @var UUID
 * ]
 * Description: Find all quotes for the shop with shop_id
 */
exports.findAllByShopID = async (req, res) => {
    const shop_id = req.params.shop_id;
    const quote_id_query = await Request.findAll({
        attributes: ['quote_id'],
        where: {shop_id: shop_id}
    })
    const quote_ids = []
    quote_id_query.forEach((object) => {
        quote_ids.push(object['quote_id'])
    })
    const data = await Quote.findAll({
        attributes: ['id', 'labour', 'parts', 'fees', 'discount', 'total', 'note', 'createdAt', 'updatedAt'],
        where: {id: quote_ids}
    })
    res.send(data)
}

/**
 * Endpoint: /api/user/:user_id
 * Method: GET
 * Parameters: [
 *  user_id: @var UUID
 * ]
 * Description: Find all quotes for the user with user_id
 */
exports.findAllByUserID = async (req, res) => {
    const user_id = req.params.user_id;
    const quote_id_query = await Request.findAll({
        attributes: ['quote_id'],
        where: {user_id: user_id}
    })
    const quote_ids = []
    quote_id_query.forEach((object) => {
        quote_ids.push(object['quote_id'])
    })
    const data = await Quote.findAll({
        attributes: ['id', 'labour', 'parts', 'fees', 'discount', 'total', 'note', 'createdAt', 'updatedAt'],
        where: {id: quote_ids}
    })
    res.send(data)
}
