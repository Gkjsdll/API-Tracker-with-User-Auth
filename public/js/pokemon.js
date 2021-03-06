"use strict";

var $mainContainer;

$(document).ready(init);

function init(){
  $mainContainer = $("#mainContainer");
  $mainContainer.on("click", ".pokemon a", viewPokemon);

  $.get("http://pokeapi.co/api/v1/pokedex/1/")
  .done(function(data) {
    data.pokemon.forEach(function(pokemon){
      $.get(`http://pokeapi.co/${pokemon.resource_uri}`)
      .done(function(data){
        var listEntry = $('<div>').addClass("col-xs-3 col-sm-2 pokemon");
        var listLink = $('<a>').attr('id', data.resource_uri).text(data.name).data('poke_uri', data.resource_uri);
        listEntry.append(listLink);
        $mainContainer.append(listEntry);
      });
      $("#loading").remove();
    })
  });
}

function viewPokemon(){
  var pokeID = $(this).data("poke_uri");
  pokeID = pokeID.slice(0, pokeID.length-1);
  pokeID = pokeID.slice(pokeID.lastIndexOf("/")+1);
  location.href = `/pokemon/${pokeID}`;
}
