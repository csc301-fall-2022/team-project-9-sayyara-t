const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({credentials: true, origin: true}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/shop.route")(app);
require("./app/routes/auth.route")(app);
require("./app/routes/user.route.js")(app);
require("./app/routes/user.admin.route.js")(app);
require("./app/routes/service.route")(app);
require("./app/routes/rating.route")(app);
require("./app/routes/shopAdmin.route")(app);
require("./app/routes/vehicle.route")(app);
require("./app/routes/quote.route")(app);
require("./app/routes/request.route")(app);
require("./app/routes/shopService.route")(app);

module.exports = app
