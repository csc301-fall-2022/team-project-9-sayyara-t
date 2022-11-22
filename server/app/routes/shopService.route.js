module.exports = app =>{
  const ShopServices = require ("../controllers/shopService.controller");
  
  var router = require("express").Router();

  router.post("/", ShopServices.create);
  router.get("/", ShopServices.findAll);
  router.get("/shop/:shop_id", ShopServices.findAllByShopID);
  router.get("/service/:service_id", ShopServices.findAllByServiceID);
  router.get("/:id", ShopServices.findOne);
  router.put("/:id", ShopServices.update);
  router.delete("/:id", ShopServices.delete);

  app.use('/api/shopservices', router);
}