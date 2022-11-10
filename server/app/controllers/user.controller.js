const db = require("../models");
const bcrypt = require("bcryptjs");
const User = require("../models").User;
const Op = db.Sequelize.Op;

exports.findSelf = (req, res) => {
    const user_id = req.user_id;

    User.findByPk(user_id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${user_id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + user_id
            });
        });
};

exports.update = (req, res) => {
    const user_id = req.user_id;

    User.update(req.body, {
        where: { id: user_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${user_id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + user_id
            });
        });
};

exports.delete = (req, res) => {
    const user_id = req.user_id;

    User.destroy({
        where: { id: user_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${user_id}. Maybe Shop was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Shop with id=" + user_id
            });
        });
};