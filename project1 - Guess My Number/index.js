'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message
};


console.log(secretNumber)

document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);
    console.log(typeof guess, guess);

    // When there is no input
    if(!guess) {
        // document.querySelector('.message').textContent = 'No Number!';
        displayMessage('No Number!')
    
    // If you win the game
    } else if (guess === secretNumber) {  
        displayMessage('Correct Number');
        document.querySelector("body").style.backgroundColor = "#60b347"
        document.querySelector('.number').style.width = '30rem'
        document.querySelector('.number').textContent = secretNumber;
        
        // Highscore
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore
        };

    // When guess is wrong
    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? 'Too High!' : 'Too Low!');
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('You Lost The Game!');
            document.querySelector('.score').textContent = '0';
        }
    }
});

//     // If the guess is too high
//     } else if (guess > secretNumber) {
//         if (score > 1) {
//             document.querySelector('.message').textContent = 'Too High!'
//             score--
//             document.querySelector('.score').textContent = score
//         } else {
//             document.querySelector('.message').textContent = 'You lost the game!'
//         };
    
//     // If the guess is too Low
//     } else if (guess < secretNumber) {
//         if (score > 1) {
//             document.querySelector('.message').textContent = 'To Low!'
//             score--
//             document.querySelector('.score').textContent = score
//         } else {
//             document.querySelector('.message').textContent = 'You lost the game!'
//         };
//     };
// });

// Reset button
document.querySelector('.again').addEventListener('click', function() {
    // console.log('reset');

    secretNumber = Math.trunc(Math.random() * 20) + 1;
    console.log(secretNumber);
    score = 20;
    document.querySelector('body').style.backgroundColor = "#222";
    document.querySelector('.number').style.width = '15rem';
    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    document.querySelector('.number').textContent = '?';
})







































