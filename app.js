// app.js

// @imports
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const redis = require("redis");
const routes = require("./api/routes/index");

// port
const port = 3000;

// init app
const app = express();

// body psrser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// logger
app.use(logger("dev"));

// routes
app.use("/", routes);

app.listen(port, (req, res, next) => {
  console.log("Live at http://localhost:" + port);
});
