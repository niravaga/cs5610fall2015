var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var mongo_url = process.env.MONGODB_URI || 'mongodb://localhost/cs5610';
console.log(mongo_url);
mongoose.connect(mongo_url);
var db = mongoose.connection;


require("./public/experiments/mongo/server/app.js")(app, mongoose, db);
require("./public/assignment/server/app.js")(app, mongoose, db);
require("./public/project/server/app.js")(app, mongoose, db, passport, LocalStrategy);

app.listen(port, ipaddress);
