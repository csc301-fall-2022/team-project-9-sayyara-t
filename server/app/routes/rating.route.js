module.exports = app =>{
    const rating = require ("../controllers/rating.controller.js");
    
    var router = require("express").Router();

    router.post("/", rating.create);
    router.get("/", rating.findAll);
    router.get("/:id", rating.findOne);
    router.put("/:id", rating.update);
    router.delete("/:id", rating.delete);

    app.use('/api/rating', router);
}