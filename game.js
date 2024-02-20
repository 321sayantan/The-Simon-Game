const buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started=false;
var level = 0;


$(".btn").click((e)=>{
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);
});

$(document).keypress(()=>{
    if(!started)
    {
        // $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
})

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    level++;
    $("#level-title").text("Level " + level);
    
    playSound(randomChosenColour);
    
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function playSound(sounds){
    var audio = new Audio("sounds/" + sounds + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(()=>{
        $("#"+currentColor).removeClass("pressed");
   }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
