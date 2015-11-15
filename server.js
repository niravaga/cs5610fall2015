var bodyParser = require('body-parser');
var express = require('express');
var app = express();
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/cs5610example');
// var db = mongoose.connection;


app.use(express.static(__dirname + '/public'));
// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


// require("./public/experiments/mongo/server/app.js")(app, mongoose, db);
require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);
