const {authJwt} = require("../middleware");
const controller = require("../controllers/user.admin.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/user/admin/create",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.create
    );

    app.get(
        "/api/user/admin/all",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.findAll
    );

    app.get(
        "/api/user/admin/details/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.findOne
    );

    app.put(
        "/api/user/admin/update/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.update
    )

    app.delete(
        "/api/user/admin/delete/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.delete
    );
};