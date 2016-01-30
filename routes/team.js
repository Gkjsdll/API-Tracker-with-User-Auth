var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../models/user');

router.use(authMiddleware);

router.get('/', function(req, res, next) {
  res.render('team', { title: "My Team - Pokémon Team Customizer" });
});

router.post('/', function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) return res.status(500).send(err);
    res.send(user.pokemon.length.toString());
  });
});


module.exports = router;
