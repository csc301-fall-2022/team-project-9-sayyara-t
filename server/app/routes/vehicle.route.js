const {authJwt} = require("../middleware");
module.exports = app =>{
    const vehicles = require ("../controllers/vehicle.controller.js");
    
    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken, authJwt.isVehicleOwnerOrAdmin], vehicles.create);
    router.get("/:id", vehicles.findOne);
    router.put("/:id", [authJwt.verifyToken, authJwt.isVehicleOwnerOrAdmin], vehicles.update);
    router.delete("/:id", [authJwt.verifyToken, authJwt.isVehicleOwnerOrAdmin], vehicles.delete);
    router.get("/user/:user_id", [authJwt.verifyToken], vehicles.findAllByUserID);

    app.use('/api/vehicles', router); 
}