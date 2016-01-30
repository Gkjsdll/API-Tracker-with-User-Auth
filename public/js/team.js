"use strict";

$(document).ready(function(){
  $.get("/users/profile")
  .success(function(data){
    $("#loading").hide();
    for(var pokemonIndex in data.pokemon){
      getPokeData(data.pokemon[pokemonIndex].poketype);
    }
    $("#teamContainer").show();
  })
})

function getPokeData(which){
  $.get(`http://pokeapi.co/api/v1/pokemon/${which}`)
  .success(function(pokedata){
    var $pokemon = $("<div>").addClass("pokemon col-xs-2")
    $pokemon.append($("<p>").text(pokedata.name));
    $pokemon.append($("<button>").addClass("btn btn-default").text("Release Pokémon"));
    $pokemon.data("apidata", pokedata)
    $.get(`http://www.pokeapi.co${pokedata.sprites[0].resource_uri}`)
    .success(function(data){
      $pokemon.prepend($("<img>").attr("src", `http://www.pokeapi.co${data.image}`));
      $("#team").append($pokemon);
    })
  });
}
