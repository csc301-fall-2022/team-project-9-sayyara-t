const db = require("../models");
const config = require("../config/auth.config");
const User = require("../models").User;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        role_id: req.body.role_id,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        phone: req.body.phone
    })
        .then(() => {
            res.status(200).send({
                message: "User was registered successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                phone: user.phone,
                role_id: user.role_id,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// COMMENT THIS OUT ON PROD
exports.createTestAdmin = (req, res) => {
    User.findOrCreate({
        where: {
            role_id: 1,
            username: "testadmin",
            email: "test@admin.com",
            password: bcrypt.hashSync(TestAdminPassword, 8),
            name: test,
            phone: 123 - 456 - 7890
        },
    })
        .then(([user, created]) => {
            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};