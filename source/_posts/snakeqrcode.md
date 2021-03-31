---
title: QRCode Snake
date: "2021-04-01T22:00:00.169Z"
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
  border: 2px double black;
  border-radius: 5px;
  background-color: white;
}
.play {
  font-size: 22px;
  width: 100px;
  height: 50px;
  align-self: center;
  border: 2px double black;
  border-radius: 5px;
  margin-top: 20px;
  background-color: white;
}
</style>
<div id="game"></div>
<button class="play" onclick="start()">Play</button>
<div class="commands">
  <div><button onclick="moveSnake(38)">↑</button></div>
  <div>
    <button onclick="moveSnake(37)">←</button>
    <button onclick="moveSnake(40)">↓</button>
    <button onclick="moveSnake(39)">→</button>
  </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.dom.min.js"></script>

<script>

let size = 15;
let dir;
let snake = [
  [16, 16],
  [15, 16]
];
let gameRunning = false;

const MAP = [
[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
[2,0,0,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,2],
[2,0,0,1,0,0,0,0,0,1,0,1,1,0,1,1,1,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,2],
[2,0,0,1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,0,0,0,1,1,0,1,0,1,1,1,0,1,0,0,2],
[2,0,0,1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,0,2],
[2,0,0,1,0,1,1,1,0,1,0,0,0,1,0,1,1,0,0,1,0,0,1,1,0,1,0,1,1,1,0,1,0,0,2],
[2,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,1,0,0,2],
[2,0,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0,2],
[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,2],
[2,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,1,0,0,0,2],
[2,0,0,0,0,0,1,1,0,0,1,0,1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,0,0,0,1,0,0,2],
[2,0,0,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,1,1,0,1,0,0,1,1,1,1,0,0,0,0,0,0,2],
[2,0,0,0,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,1,0,1,0,1,0,0,1,1,1,0,1,0,0,0,2],
[2,0,0,1,0,0,0,0,1,1,0,0,1,0,1,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,2],
[2,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,2],
[2,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,1,1,0,0,0,0,2],
[2,0,0,0,1,1,0,0,1,0,1,0,1,1,0,1,0,1,1,0,0,1,1,1,1,1,0,1,0,0,1,0,0,0,2],
[2,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1,1,0,1,1,1,1,1,0,0,0,1,0,1,1,0,0,0,0,2],
[2,0,0,1,0,0,1,1,0,0,0,1,0,1,0,0,1,0,0,0,0,0,1,0,1,1,1,1,0,1,0,1,0,0,2],
[2,0,0,1,0,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,0,1,0,0,1,1,1,0,0,1,0,0,0,0,2],
[2,0,0,1,0,1,1,1,1,0,1,1,1,0,1,0,0,1,1,0,0,0,0,1,1,0,1,1,0,0,1,0,0,0,2],
[2,0,0,1,0,0,1,0,1,1,1,0,1,0,1,0,0,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,0,2],
[2,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,1,1,0,1,0,0,0,1,1,1,1,1,0,0,2],
[2,0,0,1,1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,1,0,1,1,0,1,0,1,1,1,0,0,0,0,2],
[2,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,1,0,0,1,1,0,0,0,1,0,0,0,0,0,0,2],
[2,0,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,1,1,1,1,0,1,1,1,0,0,2],
[2,0,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,2],
[2,0,0,1,0,1,1,1,0,1,0,1,0,0,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,2],
[2,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,1,1,0,1,0,1,0,1,1,0,1,0,1,0,0,0,2],
[2,0,0,1,1,1,1,1,1,1,0,1,0,1,1,0,0,0,1,1,1,1,1,0,0,1,0,1,0,1,0,0,0,0,2],
[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

let gameMap = [...MAP.map(line => [...line])];

function setup() {
  dir = 'RIGHT';
  const canvas = createCanvas(gameMap.length * size, gameMap[0].length * size);
  canvas.parent('#game');
  food = [];
}

function draw() {
  frameRate(10)
  background(255);
  drawMap();

  if (gameRunning) {
    updateSnake();
    eatFood();
    drawSnake();
  }
  if (gameWon()) {
    gameRunning = false;
    drawWon();
  }
  if (gameOver()) {
    gameRunning = false;
    drawGameOver();
  }
}

function start() {
  gameMap = [...MAP.map(line => [...line])];
  snake = [
    [16, 16],
    [15, 16]
  ];
  gameRunning = true;
  loop();
}

function drawMap() {
  fill(0);
  noStroke();
  for (let i = 0; i < gameMap.length; i++) {
    for (let j = 0; j < gameMap[i].length; j++) {
      const value = gameMap[i][j];
      if (value) {
        if (value === 1) {
          fill(0);
        } else if (value === 2) {
          fill(0, 255, 0);
        }
        rect(j * size, i * size, size, size);
      }
    }
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
  const nextSpot = gameMap[snakeHead[1]][snakeHead[0]];
  if (nextSpot === 1) {
    gameMap[snakeHead[1]][snakeHead[0]] = 0;
    snake.push([]);
  }
}

function drawSnake() {
  noFill();
  stroke(0, 255, 0)
  strokeWeight(14);
  beginShape();
  for (let i = 0; i < snake.length; i++) {
    vertex(snake[i][0] * size + (size / 2), snake[i][1] * size + (size / 2));
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
  if (gameMap[snakeHead[0]][snakeHead[1]] === 2) {
    return true;
  }

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

function gameWon() {
  const stillNotWon = gameMap.some(line => line.some(cell => cell === 1));
  return !stillNotWon;
}

function drawWon() {
  stroke(0, 0, 255);
  strokeWeight(3);
  textAlign(CENTER, CENTER);
  textSize(52);
  text('YOU WON', (width / 2), (height / 2) - 50, 12);
  noLoop();
}
</script>
{%endraw%}