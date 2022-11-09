module.exports = app =>{
    const shops = require ("../controllers/shop.controller.js");
    
    var router = require("express").Router();

    router.post("/", shops.create);
    router.get("/", shops.findAll);
    router.get("/:id", shops.findOne);
    router.put("/:id", shops.update);
    router.delete("/:id", shops.delete);

    app.use('/api/shops', router);
}