var gamePattern = new Array();
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = new Array();
var level = 0;
$("#level-title").click(function start() {
  if (level == 0) {
    nextSequence();
  }
});
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  makeSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(200)
    .fadeIn(200);
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function () {
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  makeSound(userChoosenColour);
  $(this).addClass("pressed");
  setTimeout(() => {
    $(this).removeClass("pressed");
  }, 200);
  checkAnswer();
  //   console.log(userClickedPattern);
});

function makeSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}


var initialValue = 0;
function checkAnswer() {
  var currentLevel = level - 1;
  if (
    currentLevel == initialValue &&
    userClickedPattern[initialValue] == gamePattern[initialValue]
  ) {
    initialValue = 0;
    userClickedPattern = [];
    setTimeout(() => {
      nextSequence();
    }, 1000);
  } else if (userClickedPattern[initialValue] == gamePattern[initialValue]) {
    initialValue++;
  } else {
    // document.getElementsByTagName("#level-title").innerHTML="Wrong Pattern";
    $("body").addClass("game-over");
    $("#level-title").text("Wrong!");
    setTimeout(() => {
      $("#level-title").text("Start");
      $("body").removeClass("game-over");
    }, 1000);
    makeSound("wrong");
    restart();
  }
}
function restart() {
  initialValue = 0;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}
