module.exports = app =>{
    const vehicles = require ("../controllers/vehicle.controller.js");
    
    var router = require("express").Router();

    router.post("/", vehicles.create);
    router.get("/:id", vehicles.findOne);
    router.put("/:id", vehicles.update);
    router.delete("/:id", vehicles.delete);
    router.get("/user/:user_id", vehicles.findAllByUserID);

    app.use('/api/vehicles', router); 
}