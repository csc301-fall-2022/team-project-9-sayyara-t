const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = require("../models").User;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.user_id = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.user_id).then(user => {
        if (user.role_id === 1){
            return;
        }

        res.status(403).send({
            message: "Requires Admin Role!"
        });
    });
};

isShopOwner = (req, res, next) => {
    User.findByPk(req.user_id).then(user => {
        if (user.role_id === 3){
            return;
        }

        res.status(403).send({
            message: "Requires Shop Owner Role!"
        });
    });
};

isVehicleOwner = (req, res, next) => {
    User.findByPk(req.user_id).then(user => {
        if (user.role_id === 2){
            return;
        }

        res.status(403).send({
            message: "Requires Shop Owner Role!"
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isShopOwner: isShopOwner,
    isVehicleOwner: isVehicleOwner
};

module.exports = authJwt;