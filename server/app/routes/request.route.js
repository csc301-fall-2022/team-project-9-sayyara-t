module.exports = app =>{
    const rating = require ("../controllers/request.controller.js");
    
    var router = require("express").Router();

    router.post("/", request.create);
    //router.get("/", request.findAll);
    router.get("/:id", request.findOne);
    router.put("/:id", request.update);
    router.delete("/:id", request.delete);

    app.use('/api/request', router); //this line might be wrong
}