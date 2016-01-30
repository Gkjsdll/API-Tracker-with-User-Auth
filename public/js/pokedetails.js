"use strict";

$(document).ready(init);

function init(){
  popData();
}



function checkTeam(){
  console.log("Clicky Clicky");
  console.log(document.cookie);
  $.get("/team/size")
  .success(function(data){
    console.log(data);
  })
  .fail(function(err){
    return console.error(err);
  })
}

function addPokemon(){
  //swal the user for a name
  //add pokemon to mongo with custom name
  //swal the user for redirecting to Team or Pokémon
}

function popData(){
  $.get(`http://pokeapi.co/api/v1/pokemon${location.pathname.slice(location.pathname.lastIndexOf("/"))}`)
  .done(function(data){
    var pokemon = $("<div>");
    pokemon.append($("<p>").text(data.name));
    var types = $("<ul>");
    // console.log(data);
    pokemon.append($("<h4>").text("Types:"));
    data.types.forEach(function(type){
      types.append($("<li>").text(type.name));
    })
    pokemon.append(types);
    pokemon.append($("<h3>").text("Moves:"));
    var moves = $("<div>").addClass("col-xs-12");
    data.moves.forEach(function(move){
      moves.append($("<div>").text(move.name).addClass("col-xs-3"));
    })
    pokemon.append(moves);

    $.get(`http://pokeapi.co${data.sprites[data.sprites.length - 1].resource_uri}`)
    .done(function(data){
      pokemon.prepend($("<img>").attr("src", `http://www.pokeapi.co${data.image}`));
    })
    pokemon.append($("<button>").addClass("btn btn-default").text("Add to Team").attr("id", "addPokemon"));
    $("#mainContainer").append(pokemon);
    $("#loading").remove();
    $("#addPokemon").click(checkTeam);
  });
}
