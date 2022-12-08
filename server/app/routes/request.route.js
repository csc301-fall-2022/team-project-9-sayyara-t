module.exports = app =>{
    const request = require ("../controllers/request.controller.js");
    
    var router = require("express").Router();

    router.post("/", request.create);
    router.get("/", request.findAll);
    router.post("/filter", request.findAllFilter);
    router.get("/shop/:shop_id", request.findAllByShopID);
    router.get("/user/:user_id", request.findAllByUserID);
    router.get("/:id", request.findOne);
    router.put("/:id", request.update);
    router.delete("/:id", request.delete);

    app.use('/api/requests', router);
}