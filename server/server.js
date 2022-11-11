const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Bypass CORS request?
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});


const db = require("./app/models");
const requireDirectory = require("require-directory");
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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});