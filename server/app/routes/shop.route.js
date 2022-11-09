module.exports = app =>{
    const shops = require ("../controllers/shop.controller.js");
    
    var router = require("express").Router();

    router.post("/", shops.create);

    app.use('/api/shops', router);
}