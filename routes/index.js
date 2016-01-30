var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  var usertoken = req.cookies.usertoken;
  if(usertoken){
    return res.redirect('team');
  }
  res.render('index', { title: "Pokemon Team Customizer"});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

module.exports = router;
