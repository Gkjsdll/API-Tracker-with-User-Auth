'use strict';

var Firebase = require("firebase");
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;
var ref = new Firebase('https://gkjsdll-api-tracker.firebaseio.com');
var User = require('../models/user');

var authMiddleware = function(req, res, next) {

  try {
    var payload = jwt.decode(req.cookies.usertoken, JWT_SECRET);
  } catch(err) {
    return res.status(401).redirect('/login');
  }

  req.user = payload;

  User.findOne({uid: req.user.uid}, function(err, user) {
    console.log("Mongo user is:", user);
  });

  next();
};

module.exports = authMiddleware;
