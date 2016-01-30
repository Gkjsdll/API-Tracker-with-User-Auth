var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

router.use(authMiddleware);

router.get('/', function(req, res, next) {
  res.render('team', { title: "My Team - Pokémon Team Customizer" });
});

router.get("/size", function(req, res, next){
  //retrieve current size of team
  res.send("Mongo not yet connected.")
})

router.post('/', function(req, res, next) {
  // add pokemon to team
});


module.exports = router;
