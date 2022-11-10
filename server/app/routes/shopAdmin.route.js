module.exports = app =>{
    const shopAdmins = require ("../controllers/shopAdmin.controller");
    
    var router = require("express").Router();

    router.post("/", shopAdmins.create);
    router.get("/", shopAdmins.findAll);
    router.get("/:id", shopAdmins.findOne);
    router.put("/:id", shopAdmins.update);
    router.delete("/:id", shopAdmins.delete);

    app.use('/api/shopadmins', router);
}