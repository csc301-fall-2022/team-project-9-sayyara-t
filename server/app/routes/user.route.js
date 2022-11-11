const {authJwt} = require("../middleware");
const users = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/user/details",
        [authJwt.verifyToken],
        users.findSelf
    )

    app.put(
        "/api/user/update",
        [authJwt.verifyToken],
        users.update
    )

    app.delete(
        "/api/user/delete",
        [authJwt.verifyToken],
        users.delete
    )
};