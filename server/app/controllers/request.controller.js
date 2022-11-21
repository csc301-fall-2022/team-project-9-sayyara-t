const db = require("../models");
const Request = require("../models").Request;
const User = require("../models").User
const Service = require("../models").Service
const Op = db.Sequelize.Op;

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
    console.log(newRequest);

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
  const user_ids = await User.findAll({attributes: ['id'], where: {name : {[Op.like]: '%' + name_filter + '%'}}})

  const service_filter = req.body.service // a service name
  const services = await Service.findAll({attributes: ['id'], where: {name : {[Op.like]: '%' + service_filter + '%'}}})

  const state_filter = req.body.state; // state int
  const rework_filter = req.body.rework; // true/false

  const conditions = {} // list of conditions to match
  var other_cond = false

  if (user_ids.length != 0 || state_filter || rework_filter) {
    conditions[Op.and] = []
    conditions[Op.or] = []
    other_cond = true

    if (user_ids != null) {
      for (var i = 0; i < user_ids.length; i++) {
        conditions[Op.or].push({
          user_id: {
            [Op.eq]: user_ids[i]['id']
          }
        })
      }
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
          state: {
            [Op.not]: null
          }
        })
      } else {
        conditions[Op.and].push({
          state: {
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
    
    actualResponse = []
    for (var i = 0; i < responseItems.length; i++) {
      if (responseItems[i]['dataValues']['services'].includes(services[i]['dataValues']['id'])) {
        actualResponse.push(responseItems[i])
      }
    }
    res.send(actualResponse)
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