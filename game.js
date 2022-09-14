buttonColours = ["red","blue","green","yellow"];
gamepattern = [];
userClickedPattern = [];

started = false;
level = 0;
$( document ).keypress(function(event) {
  if(!started)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
  }
});



function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamepattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

$( ".row" ).click(function(event) {
      userChosenColour=event.target.id;
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      $("#"+event.target.id).addClass("pressed");
      setTimeout(function() {
            $("#"+event.target.id).removeClass("pressed");
      }, 100);
      checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(index) {
  if(userClickedPattern[index] === gamepattern[index] )
  {
    console.log("Success");
    if (userClickedPattern.length === gamepattern.length){


      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else
  {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $(".body").addClass("game-over");
    setTimeout(function() {
          $(".body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover();
    console.log("Wrong");
  }

}
function startover() {
  gamepattern = [];
  started = false;
  level = 0;
}
