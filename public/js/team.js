"use strict";

$.get("/users/profile")
.success(function(data){
  console.log(data.pokemon);
  $("#loading").hide();
  for(var pokemonIndex in data.pokemon){
    console.log(`pokemon${pokemonIndex}`);
    console.log(data.pokemon[pokemonIndex]);
  }
})
