//THIS IS WHAT MAKES THE BACKGROUND MOVE CONTIONUSSLY BY TRACKING POSTION OF IMG & APPENDING A DUPLICATE

const gameContainer = document.querySelector('#game-container');
const bg1 = document.createElement('div');
const bg2 = document.createElement('div');
bg1.classList.add('bg');
bg2.classList.add('bg');
bg1.style.backgroundImage = 'url(game-bg.png)';
bg2.style.backgroundImage = 'url(game-bg.png)';
gameContainer.appendChild(bg1);
gameContainer.appendChild(bg2);

let xPos = 0;

function moveBackground() {
  xPos -= 1;
  bg1.style.backgroundPosition = `${xPos}px 0px`;
  bg2.style.backgroundPosition = `${xPos + 5000}px 0px`;
  if (xPos < -5000) {
    xPos = 0;
  }
  requestAnimationFrame(moveBackground);
}

moveBackground();

//THIS IS WHERE THE CHARACTER IS DEVEOPLED AND HOW IT'S FUNCTIONALITY IS IMPLEMENTED
class Character {
    constructor(position) {
        this.position = position;
        this.speed = {
          x: 0,
          y: 1,
        }
        this.x = position.x;
        this.y = position.y;
        this.friction = 0.95;
        this.acceleration = {
          x: 0,
          y: 0,
        }
      }
      moveLeft() {
        
        this.position.x -= this.speed.x;
        this.updatePosition();
      }
      
      moveRight() {
        this.position.x += this.speed.x;
        this.updatePosition();
      }
      
      moveUp() {
        this.position.y -= this.speed.y;
        this.updatePosition();
      }
      
      moveDown() {
        this.position.y += this.speed.y;
        this.updatePosition();
      }
      
    updatePosition() {
      const characterElement = document.querySelector('.character')
        
      
      characterElement.style.top = this.position.y + '5px';
      characterElement.style.left = this.position.x + '5px';
    }

    update() {
        // Apply friction
        this.speed *= this.friction;
    
        // Update position based on speed and acceleration
        this.position.x += this.speed.x * this.acceleration.x;
        this.position.y += this.speed.y * this.acceleration.y;

        
        playerBounds();
        // Update position on screen
        this.updatePosition();
        console.log(character.x)
        console.log(character.y)
        console.log(character.speed)
        console.log(character.acceleration)
        console.log(character.friction)
        console.log(`Character position: (${this.position.x}, ${this.position.y})`);

    }
    
  }
  
  const character = new Character({
    x: 20,
    y: 20,
  })


  
  document.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.code);
    if (event.code === 'ArrowLeft') {
      character.moveLeft()
      console.log('key presses', event.code);
    } else if (event.code === 'ArrowRight') {
      character.moveRight()
    } else if (event.code === 'ArrowUp') {
      character.moveUp()
    } else if (event.code === 'ArrowDown') {
      character.moveDown()
    }
    
  })
  

  // outside of playerBounds function
// stored in a variable so this doesn't have to be recalculated every time
var rightBorder = gameContainer.width - character.width;

function playerBounds() {
    if (character.x < 0) {
        character.x = 0;
    }

    if (character.x > rightBorder) {
        character.x = rightBorder;
    }
}
  
  const gamecontainer = document.getElementById('game-container');
  const characterElement = document.createElement('div');
  characterElement.classList.add('character');
  gameContainer.appendChild(characterElement);

  // Set up the game
const questions = [
  { question: '0 + 1', answer: '1' },
  { question: '4 - 2', answer: '2' },
  { question: '2 + 4', answer: '6' },
  { question: '6 - 2', answer: '4' },
  { question: '4 - 1', answer: '3' },
  { question: '5 + 0', answer: '5' },
  { question: '9 - 2', answer: '7' },
  { question: '7 - 3', answer: '4' },
  { question: '8 + 1', answer: '9' },
  { question: '9 + 1', answer: '10' },

];

for (let i = questions.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [questions[i], questions[j]] = [questions[j], questions[i]];
}


let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let cowCount = 0;

// Display the current question
function displayQuestion() {
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next-button');
const tryAgainButton = document.getElementById('try-again-button');

// Enable the Next Question button if the user has tried three times or less
if (numTries < 3) {
  nextButton.disabled = true;
} else {
  nextButton.disabled = false;
  
}

// Display the current question and choices
const currentQuestion = questions[currentQuestionIndex];
questionElement.textContent = currentQuestion.question;
choicesElement.innerHTML = '';
currentQuestion.choices.forEach(choice => {
  const choiceElement = document.createElement('button');
  choiceElement.textContent = choice;
  choiceElement.onclick = checkAnswer;
  choicesElement.appendChild(choiceElement);
});
}


let numTries = 0; // variable to keep track of number of tries

function checkAnswer() {
const answerElement = document.getElementById('answer');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const cowCountElement = document.getElementById('cow-count');
const livesElement = document.getElementById('lives');
const successAudio = new Audio('audio/success.mp3');
const tryagainAudio = new Audio('audio/try-again3.mp3');
const failAudio = new Audio('audio/fail.mp3');

const userAnswer = answerElement.value.trim();

if (userAnswer === questions[currentQuestionIndex].answer) {
  feedbackElement.textContent = 'Correct!';
  feedbackElement.classList.add('success');
  successAudio.play();
  score++;
  cowCount++;
  numTries = 0; // reset number of tries if answer is correct
} else {
  numTries++;
  if (numTries >= 3) {
    feedbackElement.textContent = 'Incorrect. You have reached the maximum number of tries for this question.';
    feedbackElement.classList.remove('success');
    failAudio.play();
    numTries = 0; // reset number of tries
    lives--;
    
    if (lives <= -1) { // check if lives is less than or equal to 1
      endGame(); // call endGame function to end the game
      return; // exit the function
    }
  
  } else {
    feedbackElement.textContent = 'Incorrect. Try again!';
    feedbackElement.classList.remove('success');
    tryagainAudio.play();
    return; // exit the function early and don't update the currentQuestionIndex
  }
}

// Show feedback and update score
answerElement.value = '';
feedbackElement.style.display = 'block';
scoreElement.textContent = score;
cowCountElement.textContent = '🐄'.repeat(cowCount);


var livesText = '';
for (var i = 0; i < lives; i++) {
livesText += '❤️ ';
}
livesElement.innerHTML = livesText;


// Go to the next question or end the game
currentQuestionIndex++;
if (currentQuestionIndex === questions.length) {
  endGame();
} else {
  displayQuestion();
}
}





function endGame() {
const storyTextElement = document.getElementById('story-text');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const gameElement = document.getElementById('game');
const storyElement = document.getElementById('story');
const ufoElement = document.getElementById('ufo');
const cowElement = document.getElementById('cow');

const accuracy = Math.round((score / questions.length) * 100);

// Check if the user has passed or failed the game
if (accuracy >= 70) {
  storyTextElement.textContent = `Great job! You answered ${score} out of ${questions.length} questions correctly (${accuracy}%). You helped the aliens save their cow friend.`;
  storyTextElement.classList.add('success');
} else {
  storyTextElement.textContent = `Oh no! You answered only ${score} out of ${questions.length} questions correctly (${accuracy}%). The aliens were unable to save their cow friend.`;
  storyTextElement.classList.add('fail');
}

feedbackElement.style.display = 'none';
scoreElement.style.display = 'none';

// Animate victory or defeat sign
const resultElement = document.createElement('div');
resultElement.classList.add('result');
if (accuracy >= 70) {
  resultElement.textContent = 'Victory!';
  resultElement.classList.add('success');
} else {
  resultElement.textContent = 'Defeat!';
  resultElement.classList.add('fail');
}
storyElement.appendChild(resultElement);

// Activate the beam
gameElement.style.display = 'none';
storyElement.style.display = 'flex';
ufoElement.classList.add('beam');
cowElement.classList.add('beam');

// Wait 3 seconds and reload the page to play again
setTimeout(() => location.reload(), 3000);
}

// Display the first question
displayQuestion();

async function loadParticles(options) {
await loadFireworksPreset(tsParticles);

await tsParticles.load(options);
}

const configs = { preset: "fireworks" };

loadParticles(configs);

  