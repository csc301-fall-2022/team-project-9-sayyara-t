module.exports = app =>{
    const services = require ("../controllers/service.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", services.create);
    router.put("/:id", services.update);
    router.delete("/:id", services.delete);
    router.get("/:id", services.findOne);
    router.get("/", services.findAll);

    app.use('/api/services', router);
}