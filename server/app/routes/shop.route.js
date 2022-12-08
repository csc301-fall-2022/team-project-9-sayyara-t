const {authJwt} = require("../middleware");
module.exports = app =>{
    const shops = require ("../controllers/shop.controller.js");
    
    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken, authJwt.isShopOwnerOrAdmin], shops.create);
    router.get("/:sort/:search", shops.findAll);
    router.get("/user/getBy/:user_id", shops.findAllByUserID);
    router.get("/:id", [authJwt.verifyToken, authJwt.isShopOwnerOrAdmin], shops.findOne);
    router.put("/:id", [authJwt.verifyToken, authJwt.isShopOwnerOrAdmin], shops.update);
    router.delete("/:id", [authJwt.verifyToken, authJwt.isShopOwnerOrAdmin], shops.delete);

    app.use('/api/shops', router);
}