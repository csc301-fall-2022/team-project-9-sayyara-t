const db = require("../models");
const {ShopService} = require("../models");
const Request = require("../models").Request;
const User = require("../models").User
const Service = require("../models").Service
const Shop = require("../models").Shop
const Op = db.Sequelize.Op;

/**
 * Endpoint: /api/requests/
 * Method: POST
 * Fields: [
 *  user_id: @var UUID
 *  shop_id: @var UUID
 *  vehicle_id: @var UUID
 *  quote_id: @var UUID
 *  linked_request_id: @var UUID
 *  services: @var JSON
 *  state: @var INTEGER
 *  description: @var STRING
 *  new_used: @var INTEGER
 *  oem_after: @var INTEGER
 * ]
 * Description: Creates a Request model instance with the inputted information
 */
exports.create = (req, res)=>{
    const newRequest = {
      user_id: req.body.user_id,
      shop_id: req.body.shop_id,
      vehicle_id: req.body.vehicle_id,
      quote_id: req.body.quote_id,
      linked_request_id: req.body.linked_request_id,
      services: req.body.services,
      state: req.body.state,
      description: req.body.description,
      new_used: req.body.new_used,
      oem_after: req.body.oem_after
    }

    Request.create(newRequest).then(data=>{res.send(data)})
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Request."
        });
      });
}

exports.findAll = (req, res)=>{
  Request.findAll({attributes: ['id', 'user_id', 'shop_id', 'vehicle_id', 'quote_id', 'linked_request_id', 
  'services', 'state', 'description', 'new_used', 'oem_after', 'createdAt', 'updatedAt']}).then(data=>{res.send(data)})
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Requests."
    });
  });
}

exports.findAllFilter = async (req, res)=>{
  const name_filter = req.body.name; // name of user
  var user_ids
  if (name_filter == null) {
    user_ids = []
  } else {
    user_ids = await User.findAll({attributes: ['id'], where: {name : {[Op.like]: '%' + name_filter + '%'}}})
  }

  const service_filter = req.body.service // a service name
  var services
  if (service_filter == null) {
    services = []
  } else {
    services = await Service.findAll({attributes: ['id'], where: {name : {[Op.like]: '%' + service_filter + '%'}}})
  }

  const state_filter = req.body.state; // state int
  const rework_filter = req.body.rework; // true/false
  const shop_id = req.body.shop_id; // shop_id of the shop we're looking at. From the implementation described we assume that a shop_id is always passed

  const conditions = {} // list of conditions to match
  var other_cond = false

  if (name_filter != null || state_filter != null || rework_filter != null || shop_id != null) {
    conditions[Op.and] = []
    other_cond = true

    if (user_ids.length != 0) {
      conditions[Op.or] = []
      for (var i = 0; i < user_ids.length; i++) {
        conditions[Op.or].push({
          user_id: {
            [Op.eq]: user_ids[i]['id']
          }
        })
      }
    } else {
      if (name_filter != null) {
        res.send([])
      return
      }
    }
    if (shop_id != null) {
      conditions[Op.and].push({
        shop_id: {
          [Op.eq]: shop_id
        }
      })
    }
    if (state_filter != null) {
      conditions[Op.and].push({
        state: {
          [Op.eq]: state_filter
        }
      })
    }
    if (rework_filter != null) {
      if (rework_filter) {
        conditions[Op.and].push({
          linked_request_id: {
            [Op.not]: null
          }
        })
      } else {
        conditions[Op.and].push({
          linked_request_id: {
            [Op.is]: null
          }
        })
      }
    }
  }

  var responseItems = null
  if (other_cond) {
    responseItems = await Request.findAll({attributes: ['id', 'user_id', 'shop_id', 'vehicle_id', 'quote_id', 'linked_request_id', 
  'services', 'state', 'description', 'new_used', 'oem_after', 'createdAt', 'updatedAt'], where: conditions})
  } else {
    responseItems = await Request.findAll()
  }

  if (service_filter) {
    actualResponse = []
    for (var i = 0; i < responseItems.length; i++) {
      for (var j = 0; j < services.length; j++) {
        if (responseItems[i]['dataValues']['services'].includes(services[j]['dataValues']['id'])) {
          actualResponse.push(responseItems[i])
          break;
        }
      }
    }
    res.send(actualResponse)
  } else {
    res.send(responseItems)
  }
}

exports.findOne = (req, res) => {
    const id = req.params.id; 
  
    Request.findByPk(id, {attributes: ['id', 'user_id', 'shop_id', 'vehicle_id', 'quote_id', 'linked_request_id', 
    'services', 'state', 'description', 'new_used', 'oem_after', 'createdAt', 'updatedAt']})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Request with id=${id}.`
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

  Request.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Request was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Request with id=${id}. Maybe Request was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Request with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Request.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Request was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Request with id=${id}. Maybe Request was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Request with id=" + id
      });
    });
};

exports.findAllByShopID = (req, res)=>{
  const shop_id = req.params.shop_id;
  Request.findAll({
    attributes: ['id', 'user_id', 'shop_id', 'vehicle_id', 'quote_id', 'linked_request_id',
      'services', 'state', 'description', 'new_used', 'oem_after', 'createdAt', 'updatedAt'],
    where: {shop_id: shop_id}
  })
      .then(data=>{res.send(data)})
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving Requests."
        });
      });
};


exports.findAllByUserID = (req, res)=>{
  const user_id = req.params.user_id;
  Request.findAll({
    attributes: ['id', 'user_id', 'shop_id', 'vehicle_id', 'quote_id', 'linked_request_id',
      'services', 'state', 'description', 'new_used', 'oem_after', 'createdAt', 'updatedAt'],
    where: {user_id: user_id}
  })
      .then(data=>{res.send(data)})
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving Requests."
        });
      });
};