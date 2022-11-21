module.exports = app =>{
    const quote = require ("../controllers/quote.controller.js");
    
    var router = require("express").Router();

    router.post("/", quote.create);
    // router.get("/", quote.findAll);
    // router.get("/shop/:shop_id", quote.findAllByShopID);
    // router.get("/user/:user_id", quote.findAllByUserID);
    router.get("/:id", quote.findOne);
    router.put("/:id", quote.update);
    router.delete("/:id", quote.delete);

    app.use('/api/quotes', router);
}