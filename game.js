
var audio;
var buttonColors = ["red", "blue", "green", "yellow"];

var randomChosenColor;
var userChosenColor;

var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;

var counter = 0;
function update() {
    $("h2").removeClass("hide")
    $("h2").text(counter + "/" + level);
}
function x() {
    if (!started) {
        $("h2").addClass("hide")
    }
}
x();

$(document).on("keydown", function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    ++level;
    counter = 0;
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    update();
}


$(".btn").click(function () {
    if (started) {
        userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        ++counter;
        update();
        if (level === userClickedPattern.length) {
            checkAnswer(userClickedPattern.length - 1);
        }
    }
    else alert("Start the game first!");
})

function playSound(name) {
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    var match = true;
    for (let i = 0; i < currentLevel + 1; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            match = false;
            break;
        }
    }
    if (match) {
        console.log("Success");
        userClickedPattern = [];
        setTimeout(() => {
            nextSequence();
        }, 1000);
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    x();
}