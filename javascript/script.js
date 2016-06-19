function attack(player){
  //hp - defending player's pokemon value
  //attack - attacking player's pokemon value
  //defend - defending player's pokemon value

  //player 1
  let $hpPlayer1 = $('.hp1').val()
  let $attackPlayer1 = $('.attack1').val()
  let $defendPlayer1 = $('.defense1').val()

  //player 2 values for calculation
  let $hpPlayer2 =  $('.hp2').val()
  let $attackPlayer2 =  $('.attack2').val()
  let $defendPlayer2 =$('.defense2').val()

  console.log($hpPlayer1, $attackPlayer2, $defendPlayer1)

  if(player === 'Player1Button'){
    let reduceHP1 = $hpPlayer2 - (($attackPlayer1/$defendPlayer2)*10)
    $('.hp2').attr('value', reduceHP1)
  }else{
    let reduceHP2 = $hpPlayer1 - (($attackPlayer2/$defendPlayer1)*10)
    $('.hp1').attr('value', reduceHP2)
  }

}

function toggleModal(){
  $('#myModal').toggle('fast');
}

function switchAttacker(){
  $('.attackButton').on('click',function(){
    var $playerClass = $(this).attr('id');
    console.log($playerClass);
    attack($playerClass);
    checkHealth();
  })

  // if(counter%2 === 0){
  //   $('.attackButton1').on('click',function(){
  //   var $playerClass = $(this).attr('id');
  //   console.log($playerClass);
  //   attack($playerClass);
  //   checkHealth();
  // })
  // }else{
  //   $('.attackButton2').on('click',function(){
  //   var $playerClass = $(this).attr('id');
  //   console.log($playerClass);
  //   attack($playerClass);
  //   checkHealth();
  // })
  // }

}

function checkHealth(){
  let $hpPlayer2 =  $('.hp2').val()
  let $player2Name = $('.name2').val()

  let $hpPlayer1 = $('.hp1').val()
  let $player1Name = $('.name1').val()

  if($hpPlayer1 <= 0){
    console.log($player1Name+" Lost the awesome Battle!!")
    toggleModal();
    $('.attackButton').off();
    $('.winner').text($player2Name + " Won the battle")
    $('.battleStatus').text("Game Over")
    $('.battleStatus').css('background-color','red')
  }else if($hpPlayer2 <= 0){
    console.log($player2Name +" Lost the awesome Battle!!")
    toggleModal();
    $('.attackButton').off();
    $('.winner').text($player1Name + " Won the battle")
    $('.battleStatus').text("Game Over")
    $('.battleStatus').css('background-color','red')

  }else{
    $('.battleStatus').text("Active")
    console.log("Keep fighting, Game is not over yet")
  }
}


function appendPokemon(url, speed, defense, attack, hp, name){
  var players = $( "select option:selected" ).val();
  if(players === "player1"){
    $('.pokemon1').attr('src', url)
    $('.speed1').attr('value',speed)
    $('.defense1').attr('value',defense)
    $('.attack1').attr('value',attack)
    $('.hp1').attr('value',hp)
    $('.name1').attr('value', name)
  }else{
    $('.pokemon2').attr('src', url)
    $('.speed2').attr('value',speed)
    $('.defense2').attr('value',defense)
    $('.attack2').attr('value',attack)
    $('.hp2').attr('value',hp)
    $('.name2').attr('value', name)
  }
}

var getData = function(character){
  var $url = 'https://pokeapi.co/api/v2/pokemon/' +character;
  console.log($url);
  $.ajax({
    url: $url,
    method: 'GET',
    dataType: 'json'
  })
  .done(function(data){
    var $pokemonName = data.name;
    var $pokemonImage = data.sprites.front_shiny;
    var $speed = data.stats[0].base_stat;
    var $defense = data.stats[3].base_stat;
    var $attack = data.stats[4].base_stat;
    var $hp = data.stats[5].base_stat;

    console.log(data);
    console.log($pokemonImage,$pokemonName,$speed,$defense,$attack, $hp);
    appendPokemon($pokemonImage,$speed, $defense, $attack, $hp, $pokemonName);
  })

}

$(document).ready(function($) {
  console.log("connected");
  // getData(player1);

  $('.myChar').on('click',function(){
    var player1 = $('.character').val();
    console.log(player1)
    getData(player1);
  });

  switchAttacker();
  $('.close').click(toggleModal);

});
