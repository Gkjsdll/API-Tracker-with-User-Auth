var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

router.use(authMiddleware);

router.get('/', function(req, res, next) {
  res.render('pokemon', { title: "All Pokémon - Pokémon Team Customizer" });
});

router.get('/:pokeID', function(req, res, next) {
  res.render('pokedetails', { title: "Pokémon Details - Pokémon Team Customizer" });
});

module.exports = router;
