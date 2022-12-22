// Array with the colours
var buttonColours =  ['red', 'blue', 'green', 'yellow'];

// Array with the sounds
var sounds = ['sounds/red.mp3', 'sounds/blue.mp3', 'sounds/green.mp3', 'sounds/yellow.mp3', 'sounds/wrong.mp3'];

// Empty Array with game pattern
var gamePattern = [];
// Empty Array with game user pattern
userClickedPattern = [];

// Level
var level = 0;

function playSound(key) {

    switch (key) {
        case 0:
        case 'red':
            var audio = new Audio(sounds[0]);
            audio.loop = false;
            audio.play();  
        break;

        case 1:
        case 'blue':  
            var audio = new Audio(sounds[1]);
            audio.loop = false;
            audio.play();  
        break;

        case 2:
        case 'green':  
            var audio = new Audio(sounds[2]);
            audio.loop = false;
            audio.play();   
        break;

        case 3:
        case 'yellow':
            var audio = new Audio(sounds[3]);
            audio.loop = false;
            audio.play();    
        break;
    
    }
}

function nextSequence() {

    userClickedPattern = [];

    // Generating random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChousenColour = $('.btn')[randomNumber].id;

    playSound(randomChousenColour);

    gamePattern.push(randomChousenColour);

    $(`#${randomChousenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    level += 1;
    $('h1').html(`Level ${level}`);
    
}

$('.btn').on('click', function() {
    var userChosenColour = this.id;

    playSound(userChosenColour);

    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

})

function animatePress(currentColour) {

    $(`#${currentColour}`).addClass('pressed');

    setTimeout(function(){
        $(`#${currentColour}`).removeClass('pressed');
    },100);
}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('Success');

        if (userClickedPattern.length === gamePattern.length){
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }

    } else {
        console.log('Wrong');

        $('body').addClass('game-over');
        $('h1').html('Game Over, Press Any Key to Restart');

        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);

        var audio = new Audio(sounds[4]);
        audio.loop = false;
        audio.play();  
        
        startOver();
    }

}

function startOver() {
    gamePattern = [];
}

$(window).bind('keypress', function() {
    if(gamePattern.length === 0) {
        nextSequence();
        level = 0;
        $('h1').html(`Level ${level}`);
    }
    
})