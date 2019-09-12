
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = []; //se crea arreglo vacio
var userClickedPattern = [];
var starter = false;
var level = 0;

$(document).keydown(function(){ //cuando se presiona una tecla
if(!starter){ //si sterter es falso
  $("#level-title").text("level " + level);//cambia el texto
  nextSequence();
  starter = true; //toglea starter
}}
);


$(".btn").click(function(){ //cuando se detecta un boton presionado
 var userChosenColor = $(this).attr("id"); //obtenemos su id
 userClickedPattern.push(userChosenColor); //añadimos el id al arreglo userClickedPattern
 console.log(userClickedPattern);
 playSound(userChosenColor);
 animatePress(userChosenColor);
 checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    playSound("wrong");
    // var audio = new Audio("sounds/wrong.mp3");
    // audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart ");
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  starter = false;

}

function nextSequence(){ //funcion para crear numeros aleatorios entre 0 y 3
  userClickedPattern = [];
    level ++;
    $("#level-title").text("level " + level);

  var n = Math.random();
  var randomNumber=Math.floor(n*4); //numeros entre cero y cuatro
  //console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber]; //seleccionamos un elemnto del arreglo
  gamePattern.push(randomChosenColour); //añadimos el elemeto anterior al arreglo gamepattern
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //agregamos una animacion ccuando se presiona el boton
  playSound(randomChosenColour);
}





 function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3");//activamos el audio
   audio.play();
 }


function animatePress(currentColour){ //el parametro userChosenColor ahora es currentColour
  $("#" + currentColour).addClass("pressed"); //añadimos la clase pressed al boton presionado
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}
