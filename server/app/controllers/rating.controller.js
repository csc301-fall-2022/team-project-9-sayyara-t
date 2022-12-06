const db = require("../models");
const Rating = require("../models").Rating
const Op = db.Sequelize.Op;

/**
 * Endpoint: /api/ratings/
 * Method: POST
 * Fields: [
 *  user_id: @var UUID
 *  shop_id: @var UUID
 *  comment: @var STRING
 *  star: @var INTEGER
 *  price: @var INTEGER
 * ]
 * Description: Creates a Rating model instance with the inputted information
 */
exports.create = (req, res)=>{
    const newRating = {
      user_id: req.body.user_id,
      shop_id: req.body.shop_id,
      comment: req.body.comment,
      star: req.body.star,
      price: req.body.price,
    }
    console.log(newRating);

    Rating.create(newRating).then(data=>{res.send(data)})
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating a Rating."
        });
      });
}

exports.findAll = (req, res)=>{
    Rating.findAll({attributes: ['id', 'user_id', 'shop_id', 'comment', 'star', 'price', 'createdAt', 'updatedAt']}).then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Ratings."
    });
  });
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  Rating.findByPk(id, {attributes: ['id', 'user_id', 'shop_id', 'comment', 'star', 'price', 'createdAt', 'updatedAt']})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Rating with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Rating with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Rating.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Rating was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Rating with id=${id}. Maybe Rating was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Rating with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Rating.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Rating was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Rating with id=${id}. Maybe Rating was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Rating with id=" + id
      });
    });
};

exports.findAverage = async (req, res) => {
  const shop_id = req.params.shop_id

  allShopRatings = await Rating.findAll( {attributes: ['id', 'shop_id', 'star', 'price'], where: {shop_id: shop_id}})

  average_price = 0
  average_stars = 0

  for (var i=0; i < allShopRatings.length; i++){
    average_price = average_price + allShopRatings[i].price
    average_stars = average_stars + allShopRatings[i].star
  }

  average_price = (average_price/allShopRatings.length)
  average_stars = (average_stars/allShopRatings.length)
  average_price = average_price.toFixed(2)
  average_stars = average_stars.toFixed(2)

  res.send({
    "average_price": average_price,
    "average_stars" : average_stars
  })

}