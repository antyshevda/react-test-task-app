var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");
var config = require("./config");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app);

var server = app.listen(config.serverPort, function () {
  console.log("listening: ", server.address().port);
});