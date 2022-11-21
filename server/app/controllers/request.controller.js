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
  const byName = await User.findAll({attributes: ['id'], where: {name : {[Op.like]: '%' + name_filter + '%'}}})

  const service_filter = req.body.service // a service name
  const byService = await Service.findAll({attributes: ['id'], where: {name : {[Op.like]: '%' + service_filter + '%'}}})

  const state_filter = req.body.state; // state int
  const rework_filter = req.body.rework; // true/false

  const where = {} // list of conditions to match

  if (byName || byService || state_filter || rework_filter) {
    where[Op.and] = []
    where[Op.or] = []

    if (byName != null) {
      for (var i = 0; i < byName.length; i++) {
        where[Op.or].push({
          user_id: {
            [Op.eq]: byName[i]['id']
          }
        })
      }
    }
    if (byService != null) {
      for (var i = 0; i < byService.length; i++) {
        where[Op.or].push({
          service_id: {
            [Op.eq]: byService[i]['id']
          }
        })
      }
    }
    if (state_filter != null) {
      where[Op.and].push({
        state: {
          [Op.eq]: state_filter
        }
      })
    }
    if (rework_filter != null) {
      if (rework_filter) {
        where[Op.and].push({
          state: {
            [Op.not]: null
          }
        })
      } else {
        where[Op.and].push({
          state: {
            [Op.is]: null
          }
        })
      }
    }
    
    const responseItems = await Request.findAll({where: where})
    res.send(responseItems)
  }
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