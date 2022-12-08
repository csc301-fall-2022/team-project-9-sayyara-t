const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = require("../models").User;

/**
 *
 * @param req  x-access-token: @var STRING as a header containing the JWT access token
 * @param res
 * @param next
 * @returns {*}
 *
 * Checks to see if the JTW token passed is valid, and if so sets the decoded user id and goes to the next middleware method.
 */
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

/**
 *
 * @param req user_id: @var describing a user id
 * @param res
 * @param next
 *
 * Checks if the user_id in the req is an admin
 */
isAdmin = (req, res, next) => {
    User.findByPk(req.user_id).then(user => {
        if (user.role_id === 1){
            console.log("Admin Check Passed")
            next();
            return;
        }

        res.status(403).send({
            message: "Requires Admin Role!"
        });
    });
};

/**
 *
 * @param req user_id: @var describing a user id
 * @param res
 * @param next
 *
 * Checks if the user_id in the req is a shop owner
 */
isShopOwner = (req, res, next) => {
    User.findByPk(req.user_id).then(user => {
        if (user.role_id === 3){
            next();
            return;
        }

        res.status(403).send({
            message: "Requires Shop Owner Role!"
        });
    });
};

/**
 *
 * @param req user_id: @var describing a user id
 * @param res
 * @param next
 *
 * Checks if the user_id in the req is a vehicle owner
 */
isVehicleOwner = (req, res, next) => {
    User.findByPk(req.user_id).then(user => {
        if (user.role_id === 2){
            next();
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