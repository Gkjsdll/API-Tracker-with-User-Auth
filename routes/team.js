var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../models/user');

router.use(authMiddleware);

router.get('/', function(req, res, next) {
  res.render('team', { title: "My Team - Pokémon Team Customizer" });
});

router.get('/size', function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) return res.status(500).send(err);
    res.send(user.pokemon.length.toString());
  });
});

router.post("/", function(req, res, next){
  User.findById(req.user._id, function(err, user) {
    if(err) return res.status(500).send(err);
    var pokemon = {};
    if(req.body.name) pokemon.name = req.body.name;
    pokemon.poketype = req.body.poketype;
    user.pokemon.push(pokemon);
    // console.log("user.pokemon:", user.pokemon);
    user.save();
  });
})


module.exports = router;
