"use strict";

$(document).ready(init);

function init(){
  popData();
  $.get("/users/profile")
  .success(function(data){
    console.log(data);
  })
}



//swal the user for a name
//add pokemon to mongo with custom name
//swal the user for redirecting to Team or Pokémon

function addPokemon(){
  $.get("/team/size")
  .success(function(data){
    console.log(`Team currently has ${data} pokémon.`);
    var teamSize = data;
    if(teamSize >= 6){
      swal({
        title: "Team Full",
        text: "Release a pokémon to continue"
      })
    }
    else{
      swal({
        title: "Name Your Pokémon",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
      }, function(pokeName){
        var pokeId = location.pathname.slice(location.pathname.lastIndexOf("/")).slice(1);
        $.post(`/team`, {slot: teamSize, poketype: pokeId, name: pokeName})
        .success(function(){
          console.log("Make this redirect to /team once it is fully funcitonal.");
          swal.close();
        })
        swal.close();
      })
    }
  })
  .fail(function(err){
    return console.error(err);
  })
}


function popData(){
  $.get(`http://pokeapi.co/api/v1/pokemon${location.pathname.slice(location.pathname.lastIndexOf("/"))}`)
  .done(function(data){
    var pokemon = $("<div>");
    pokemon.append($("<p>").text(data.name));
    var types = $("<ul>");
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
    $("#addPokemon").click(addPokemon);
  });
}
