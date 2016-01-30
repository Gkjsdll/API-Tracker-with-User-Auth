'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({
  uid: String,
  pokemon: [{
    poke1: {id: String, name: String},
    poke2: {id: String, name: String},
    poke3: {id: String, name: String},
    poke4: {id: String, name: String},
    poke5: {id: String, name: String},
    poke6: {id: String, name: String}
  }]
});

// instance method
userSchema.methods.generateToken = function() {
  var payload = {
    uid: this.uid,
    _id: this._id
  };
  var token = jwt.encode(payload, JWT_SECRET);

  return token;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
