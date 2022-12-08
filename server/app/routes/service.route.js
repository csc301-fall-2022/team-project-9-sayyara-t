const {authJwt} = require("../middleware");
module.exports = app =>{
    const services = require ("../controllers/service.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", [authJwt.verifyToken], services.create);
    router.put("/:id", [authJwt.verifyToken], services.update);
    router.delete("/:id", [authJwt.verifyToken], services.delete);
    router.get("/:id", services.findOne);
    router.get("/", services.findAll);
    router.get("/type/:type", services.findAllByType);
    router.get("/name/:name", services.findAllByName);

    app.use('/api/services', router);
}