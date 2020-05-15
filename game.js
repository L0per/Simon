var gamePattern = [];

var userClickedPattern =[];

var randomColors = ["red", "blue", "green", "yellow"];

var levelCount = 0;

var clickCount = 0;

// Detect button press to start
$(document).keydown(() => {
    if (gamePattern.length < 1) {
        $("h1").text("Level 0");
        setTimeout(() => gameSequence(), 500);
    }
})

// Pick a random color
function randomColor() {
    let randomColor = randomColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    return randomColor
}

// Play game sequence
function gameSequence() {

    // Get random Color
    randomColor();

    // Play game pattern for user
    for (let i in gamePattern) {
        setTimeout(() => {
            playSound(gamePattern[i]);
            $("." + gamePattern[i]).fadeOut(200).fadeIn(200);
        }, 500 * i);
    }

    // Update level heading
    $("h1").text("Level " + levelCount);
    levelCount += 1;
}

// User sequence input
$(".btn").click((e) => {

    console.log("click")

    // Capture user click color
    let userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    console.log(clickCount)
    console.log(userClickedPattern)
    console.log(gamePattern)

    
    if (userClickedPattern[clickCount] !== gamePattern[clickCount]) {
        gameOver();
    } else if (userClickedPattern.length === gamePattern.length) {
        // Reset click count and user pattern
        userClickedPattern = [];
        clickCount = 0;
        setTimeout(() => gameSequence(), 1000);
    } else {
        // Increment click count
        clickCount += 1;
        console.log(clickCount)
    }

})

// Gameover and reset
function gameOver() {
    $("h1").text("Game Over! Press A Key to Reset.")
    createjs.Sound.play("gameover");
    gamePattern =[];
    userClickedPattern = [];
    clickCount = 0;
    levelCount = 0;
}

// Sound
var soundPath = "sounds/";
var sounds = [
    {src:"blue.mp3", id:"blue"},
    {src:"green.mp3", id:"green"},
    {src:"red.mp3", id:"red"},
    {src:"yellow.mp3", id:"yellow"},
    {src:"gameover.mp3", id:"gameover"},
];
createjs.Sound.alternateExtensions = ["mp3"];
createjs.Sound.registerSounds(sounds, soundPath);

function playSound(currentColor) {
    createjs.Sound.play(currentColor)
}

// User button animation
function animatePress(currentColor) {
    $("#" + currentColor).toggleClass('pressed');
    setTimeout(() => {$("#" + currentColor).toggleClass('pressed')}, 100);
}






