---
title: Snake
date: "2021-01-21T22:00:00.169Z"
---

{%raw%}
<style>
#game {
  margin: auto;
}
.commands {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
.commands button {
  margin: 5px;
  height: 50px;
  width: 50px;
  font-size: 2rem;
  background-color: black;
  color: rgb(92, 91, 254);
  border: 1px double rgb(92, 91, 254);
}
</style>
<div id="game"></div>
<div id="input"></div>
<div class="commands">
  <div><button onclick="moveSnake(38)">🠕</button></div>
  <div>
    <button onclick="moveSnake(37)">🠔</button>
    <button onclick="moveSnake(40)">🠗</button>
    <button onclick="moveSnake(39)">➞</button>
  </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.dom.min.js"></script>

<script>

let w, h;
let dir;
let xCount = 100;
let yCount = 100;
// let dir;
let snake = [
  [11, 16],
  [10, 16]
];

let font;
let food;
let label;
let input;

function preload() {
  font = loadFont('https://cgreinhold.dev/font/AvenirNextLTPro-Demi.otf');
}

function setup() {
  w = width/xCount;
  h = height/yCount;
  dir = 'RIGHT';
  const canvas = createCanvas(600, 620);
  canvas.parent('#game');
  label = createElement('span', 'Seu texto:');
  label.parent('#input');
  const initialText = 'Seu texto';
  input = createInput(initialText);
  input.parent('#input');
  input.input(handleInput);
  food = [];
  writeWord(initialText);
}

function splitWord(word) {
  return word.split('').reduce((acc, character) => {
    if (acc.length === 0) {
      return [character];
    }
    if (acc[acc.length - 1].length === 7) {
      return [...acc, character];
    }
    acc[acc.length - 1] += character;
    return acc;
  }, []);
}

function writeWord(word) {
  textSize(150);
  fill(255);
  food = [];
  const splittedWord = splitWord(word);
  for (let j = 0; j < splittedWord.length; j++) {
    const splitted = splittedWord[j];
    const points = font.textToPoints(splitted, 20, 120 * (j + 1));
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      food.push(pt);
    }
  }
}

function handleInput() {
  writeWord(input.value());
}

function draw() {
  frameRate(50);
  background(3);
  drawFood();

  updateSnake();
  eatFood();
  drawSnake();
  drawScore();
  if (gameOver()) {
    drawGameOver();
  }
}

function drawFood() {
  fill(255);
  noStroke();
  for (let i = 0; i < food.length; i++) {
    const pt = food[i];
    circle(pt.x, pt.y, 8);
  }
}

function keyPressed() {
  moveSnake(keyCode);
}

function moveSnake(direction) {
  if (direction === LEFT_ARROW) {
    if (dir === 'RIGHT') return;
    dir = 'LEFT';
  } else if (direction === RIGHT_ARROW) {
    if (dir === 'LEFT') return;
    dir = 'RIGHT';
  } else if (direction === UP_ARROW) {
    if (dir === 'DOWN') return;
    dir = 'UP';
  } else if (direction === DOWN_ARROW) {
    if (dir === 'UP') return;
    dir = 'DOWN';
  }
}

function updateSnake() {
  const snakeHead = snake[0];
  let nextValue = [...snakeHead];
  if (dir === 'RIGHT') {
    nextValue[0]++;
  } else if (dir === 'LEFT') {
    nextValue[0]--;
  } else if (dir === 'UP') {
    nextValue[1]--;
  } else {
    nextValue[1]++;
  }
  
  for (let i = 0; i < snake.length; i++) {
    const prevValue = snake[i];
    snake[i] = nextValue;
    nextValue = prevValue;
  }
}

function eatFood() {

  const snakeHead = snake[0];
  for (let i = food.length - 1; i >= 0; i--) {
    const foodBall = food[i];
    if (dist(snakeHead[0], snakeHead[1], foodBall.x, foodBall.y) < 10) {
      food.splice(i, 1);
      snake.push([]);
    }
  }
}

function drawSnake() {
  noFill();
  stroke(0, 255, 0)
  strokeWeight(14);
  beginShape();
  for (let i = 0; i < snake.length; i++) {
    vertex(snake[i][0] * w + (w / 2), snake[i][1] * h + (h / 2));
  }
  endShape();
}

function drawScore() {
  stroke(255);
  strokeWeight(2);
  textAlign(CENTER, CENTER);
  textSize(31);
  text('' + snake.length, 25 + (w / 2), 20 + (h / 2), 12);
}

function gameOver() {
  const snakeHead = snake[0];
  if (snakeHead[0] < 0 || snakeHead[0] > width || snakeHead[1] < 0 || snakeHead[1] > height) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i][0] === snakeHead[0] && snake[i][1] === snakeHead[1]) {
      return true;
    }
  }
  return false;
}

function drawGameOver() {
  stroke(255, 0, 0);
  strokeWeight(3);
  textAlign(CENTER, CENTER);
  textSize(52);
  text('GAME OVER', (width / 2), (height / 2) - 50, 12);
  noLoop(); 
}
</script>
{%endraw%}