const {authJwt} = require("../middleware");
module.exports = app =>{
    const rating = require ("../controllers/rating.controller.js");
    
    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken, authJwt.isVehicleOwnerOrAdmin], rating.create);
    router.get("/", rating.findAll);
    router.get("/shop/:shop_id", rating.findAverage);
    router.get("/:id", rating.findOne);
    router.put("/:id", [authJwt.verifyToken, authJwt.isVehicleOwnerOrAdmin], rating.update);
    router.delete("/:id", [authJwt.verifyToken, authJwt.isVehicleOwnerOrAdmin], rating.delete);

    app.use('/api/ratings', router);
}