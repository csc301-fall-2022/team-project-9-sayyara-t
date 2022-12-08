const {authJwt} = require("../middleware");
module.exports = app =>{
    const shopAdmins = require ("../controllers/shopAdmin.controller");
    
    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken, authJwt.isShopOwnerOrAdmin], shopAdmins.create);
    router.get("/", shopAdmins.findAll);
    router.get("/shop/:shop_id", shopAdmins.findAllByShopID);
    router.get("/user/:user_id", shopAdmins.findAllByUserID);
    router.get("/:id", [authJwt.verifyToken, authJwt.isShopOwnerOrAdmin], shopAdmins.findOne);
    router.put("/:id", [authJwt.verifyToken, authJwt.isShopOwnerOrAdmin], shopAdmins.update);
    router.delete("/:id", [authJwt.verifyToken, authJwt.isShopOwnerOrAdmin], shopAdmins.delete);

    app.use('/api/shopadmins', router);
}