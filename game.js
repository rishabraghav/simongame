var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function(){
if(!started){
    $('.game-text').text(`level ${level}`);
    nextSequence();
    started = true;
}
});

const nextSequence = () => {
    
    userClickedPattern = [];
    level++;
    
    $('.game-text').text(`level ${level}`);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);    

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}
const checkAnswer = currentLevel => {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        console.log("success");
        
        if(gamePattern.length === userClickedPattern.length) {
            
            setTimeout(function(){
                
                nextSequence();
                
            }, 1000);
        }



    } else {
        $("body").addClass("game-over");
        var gameover = new Audio("sounds/wrong.mp3");
        gameover.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $('.game-text').text(`Game Over! Press any key to restart.`);
        startover();
    }

}
const startover = () => {
    level = 0;
    gamePattern = [];
    started = false;
}

$(".boxes").on("click", function(event){
    var userChosenColor = $(event.target).attr("id");
    
    userClickedPattern.push(userChosenColor);
    
    animatedPress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

const playSound = name => {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

const animatedPress = currentColor => {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}