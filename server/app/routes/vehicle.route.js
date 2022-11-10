module.exports = app =>{
    const vehicles = require ("../controllers/vehicle.controller.js");
    
    var router = require("express").Router();

    router.post("/", vehicles.create);
    router.get("/:id", vehicles.findOne);
    router.put("/:id", vehicles.update);
    router.delete("/:id", vehicles.delete);

    app.use('/api/vehicles', router); //not sure if I need this line
}