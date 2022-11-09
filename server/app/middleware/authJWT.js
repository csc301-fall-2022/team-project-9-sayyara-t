const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const model_constants = require("../models/constants.js")
const db = require("../models");
const User = db.user;

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
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (model_constants.RoleList[user.role_id] === "Admin"){
            return;
        }

        res.status(403).send({
            message: "Requires Admin Role!"
        });
    });
};

isShopOwner = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (model_constants.RoleList[user.role_id] === "Shop_Owner"){
            return;
        }

        res.status(403).send({
            message: "Requires Shop Owner Role!"
        });
    });
};

isVehicleOwner = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (model_constants.RoleList[user.role_id] === "Vehicle_Owner"){
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