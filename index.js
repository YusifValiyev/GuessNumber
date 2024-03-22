'use strict';

// Select elements
const gameContainer = document.querySelector('.game-container');
const gameAgainBtn = document.querySelector('.again');
const gameNumberBox = document.querySelector('.game-number');
const gameInput = document.querySelector('.guest-input');
const gameCheckBtn = document.querySelector('.check');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');

// Create Random Number
const guessNumber = Math.trunc(Math.random() * 20) + 1;

//Declare Score and HighScore
let defaultScore = 20;
let defaultHighScore = sessionStorage.getItem('highscore') ? sessionStorage.getItem('highscore') : 0;

// Initialization
init();

// Main Function
function init() {
    CheckGuessNumber();
    RestartGame();
    setHighScore();
    CheckInputCorrect();
}

function CheckGuessNumber() {
    gameCheckBtn.addEventListener('click', CompareNumbers);
}

function CompareNumbers() {
    if (gameInput.valueAsNumber > guessNumber) {
        message.textContent = '📉 Too high!';
        LoseGame();
    } else if (gameInput.valueAsNumber < guessNumber) {
        message.textContent = '📈 Too low!';
        LoseGame();
    } else if (gameInput.valueAsNumber == guessNumber) {
        message.textContent = '🎉 Correct number!';
        WinGame();
    }
    ShowScore();
}

function WinGame() {
    gameContainer.style.backgroundColor = '#60b347';
    if (defaultHighScore < defaultScore) {
        defaultHighScore = defaultScore;
    }
    sessionStorage.setItem('highscore', defaultHighScore)
    highScore.textContent = defaultHighScore;
    ShowGuessNumber();
}

function setHighScore() {
    highScore.textContent = defaultHighScore;
}

function ShowGuessNumber() {
    gameNumberBox.innerText = guessNumber;
}

function RestartGame() {
    gameAgainBtn.addEventListener('click', function () {
        location.reload();
    })
}

function LoseGame() {
    if (defaultScore > 0) {
        DecreaseScore();
    }
    if (defaultScore == 0) {
        gameContainer.style.backgroundColor = '#c80000';
        ShowGuessNumber();
        message.textContent = '😓 Try again!';
    }
}

function DecreaseScore() {
    defaultScore--;
}

function ShowScore() {
    score.textContent = defaultScore;
}

function CheckInputCorrect() {
    gameInput.addEventListener('input', function (e) {
        if (gameInput.valueAsNumber > 20 || gameInput.valueAsNumber < 0) {
            e.target.value = '';
        }
    })
}





