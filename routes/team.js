var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

router.use(authMiddleware);

router.get('/', function(req, res, next) {
  res.render('team', { title: "My Team - Pokémon Team Customizer" });
});

router.post('/', function(req, res, next) {
  // add pokemon to team
});

router.put('/', function(req, res, next) {
  // change moves of pokemon in team
});

module.exports = router;
