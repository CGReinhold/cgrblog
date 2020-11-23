---
title: Pac-snake
date: "2020-11-24T22:00:00.169Z"
---

Uma mistura dos jogos `Pacman` e `Snake`

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
const gameMap = [
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', 1, 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 1],
  [1, 'e', 3, 0, 2, 'e', 3, 0, 0, 2, ' ', 1, ' ', 3, 0, 0, 2, 'e', 3, 0, 2, 'e', 1],
  [1, ' ', 5, 0, 4, ' ', 5, 0, 0, 4, 'e', 1, 'e', 5, 0, 0, 4, ' ', 5, 0, 4, ' ', 1],
  [1, 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', 1],
  [1, ' ', 0, 0, 0, ' ', 1, ' ', 0, 0, 0, 6, 0, 0, 0, ' ', 1, ' ', 0, 0, 0, ' ', 1],
  [1, 'e', ' ', 'e', ' ', 'e', 1, 'e', ' ', 'e', ' ', 1, ' ', 'e', ' ', 'e', 1, 'e', ' ', 'e', ' ', 'e', 1],
  [5, 0, 0, 0, 2, ' ', 9, 0, 0, 0, 'e', 1, 'e', 0, 0, 0, 8, ' ', 3, 0, 0, 0, 4],
  ['e', 'e', 'e', 'e', 1, 'e', 1, 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', 1, 'e', 1, 'e', 'e', 'e', 'e'],
  ['e','e','e','e', 1, ' ', 1, ' ', 3, 0, 0, 0, 0, 0, 2, ' ', 1, ' ', 1, 'e','e','e','e'],
  ['e', 'e', 'e', 'e', 1, 'e', ' ', 'e', 1, 'e', 'e', 'e', 'e', 'e', 1, 'e', ' ', 'e', 1, 'e', 'e', 'e', 'e'],
  ['e','e','e','e', 1, ' ', 1, ' ', 5, 0, 0, 0, 0, 0, 4, ' ', 1, ' ', 1, 'e','e','e','e'],
  ['e', 'e', 'e', 'e', 1, 'e', 1, 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', 1, 'e', 1, 'e', 'e', 'e', 'e'],
  [3, 0, 0, 0, 4, ' ', 1, ' ', 0, 0, 0, 6, 0, 0, 0, ' ', 1, ' ', 5, 0, 0, 0, 2],
  [1, 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 1, ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', 1],
  [1, ' ', 0, 0, 2, ' ', 0, 0, 0, 0, 'e', ' ', 'e', 0, 0, 0, 0, ' ', 3, 0, 0, ' ', 1],
  [1, 'e', ' ', 'e', 1, 'e', ' ', 'e', ' ', 'e', ' ', 'e', 'e', ' ', ' ', 'e', ' ', 'e', 1, 'e', ' ', 'e', 1],
  [9, 0, 0, ' ', 1, ' ', 1, ' ', 0, 0, 0, 6, 0, 0, 0, ' ', 1, ' ', 1, ' ', 0, 0, 8],
  [1, 'e', ' ', 'e', ' ', 'e', 1, 'e', ' ', 'e', ' ', 1, ' ', 'e', ' ', 'e', 1, 'e', ' ', 'e', ' ', 'e', 1],
  [1, ' ', 0, 0, 0, 0, 7, 0, 0, 0, 'e', 1, 'e', 0, 0, 0, 7, 0, 0, 0, 0, ' ', 1],
  [1, 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e', 1],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
];

let w, h;
let dir;
let snake = [
  [11, 16],
  [10, 16]
];

function setup() {
  const canvas = createCanvas(600, 620);
  canvas.parent('#game');
  w = width / gameMap[0].length;
  h = height / gameMap.length;
  dir = 'RIGHT';
}

function draw() {
  frameRate(2);
  background(3);
  stroke(0);
  strokeWeight(1);
  for (let row = 0; row < gameMap.length; row++) {
    for (let col = 0; col < gameMap[row].length; col++) {
      stroke(0);
      drawWall(gameMap[row][col], col, row);
    }
  }
  updateSnake();
  eatFood();
  drawSnake();
  drawScore();
  if (gameWon()) {
    drawGameWon();
  }
  if (gameOver()) {
    drawGameOver();
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
  let willWalk = false;
  if (dir === 'RIGHT') {
    const nextSpot = gameMap[snakeHead[1]][(snakeHead[0]+1)];
    if (isValidNextSpot(nextSpot)) {
      nextValue[0]++;
      willWalk = true;
    }
  } else if (dir === 'LEFT') {
    const nextSpot = gameMap[snakeHead[1]][(snakeHead[0]-1)];
    if (isValidNextSpot(nextSpot)) {
      nextValue[0]--;
      willWalk = true;
    }
  } else if (dir === 'UP') {
    const nextSpot = gameMap[snakeHead[1]-1][(snakeHead[0])];
    if (isValidNextSpot(nextSpot)) {
      nextValue[1]--;
      willWalk = true;
    }
  } else {
    const nextSpot = gameMap[snakeHead[1]+1][(snakeHead[0])];
    if (isValidNextSpot(nextSpot)) {
      nextValue[1]++;
      willWalk = true;
    }
  }
  
  if (willWalk) {
    for (let i = 0; i < snake.length; i++) {
      const prevValue = snake[i];
      snake[i] = nextValue;
      nextValue = prevValue;
    }
  }
}

function eatFood() {
  const snakeHead = snake[0];
  const nextSpot = gameMap[snakeHead[1]][snakeHead[0]];
  if (nextSpot === ' ') {
    gameMap[snakeHead[1]][snakeHead[0]] = 'e';
    snake.push([]);
  }
}

function isValidNextSpot(nextSpot) {
  return nextSpot === ' ' || nextSpot === 'e';
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

function drawFood(val, row, col) {
  fill(254, 255, 170);
  noStroke();
  circle(row * w + (w / 2), col * h + (h / 2), 12);
}

function drawWall(val, row, col) {
  stroke(92, 91, 254);
  if (val === 0) {
    line((row * w), (col * h) + (h / 3), (row * w) + w, (col * h) + (h / 3));
    line((row * w), (col * h) + (h / 3 * 2), (row * w) + w, (col * h) + (h / 3 * 2));
  } else if (val === 1) {
    line((row * w) + (w / 3), (col * h), (row * w) + (w / 3), (col * h) + h);
    line((row * w) + (w / 3 * 2), (col * h), (row * w) + (w / 3 * 2), (col * h) + h);
  } else if (val === 2) {
    line((row * w), (col * h) + (h / 3), (row * w) + (w / 3 * 2), (col * h) + (h / 3));
    line((row * w), (col * h) + (h / 3 * 2), (row * w) + (w / 3), (col * h) + (h / 3 * 2));
    line((row * w) + (w / 3), (col * h) + (h / 3 * 2), (row * w) + (w / 3), (col * h) + h);
    line((row * w) + (w / 3 * 2), (col * h) + (h / 3), (row * w) + (w / 3 * 2), (col * h) + h);
  } else if (val === 3) {
    line((row * w) + (w / 3), (col * h) + (h / 3), (row * w) + w, (col * h) + (h / 3));
    line((row * w) + (w / 3 * 2), (col * h) + (h / 3 * 2), (row * w) + w, (col * h) + (h / 3 * 2));
    line((row * w) + (w / 3), (col * h) + (h / 3), (row * w) + (w / 3), (col * h) + h);
    line((row * w) + (w / 3 * 2), (col * h) + (h / 3 * 2), (row * w) + (w / 3 * 2), (col * h) + h);
  } else if (val === 4) {
    line((row * w), (col * h) + (h / 3), (row * w) + (w / 3), (col * h) + (h / 3));
    line((row * w), (col * h) + (h / 3 * 2), (row * w) + (w / 3 * 2), (col * h) + (h / 3 * 2));
    line((row * w) + (w / 3), (col * h), (row * w) + (w / 3), (col * h) + (h / 3));
    line((row * w) + (w / 3 * 2), (col * h), (row * w) + (w / 3 * 2), (col * h) + (h / 3 * 2));
  } else if (val === 5) {
    line((row * w) + (w / 3 * 2), (col * h) + (h / 3), (row * w) + w, (col * h) + (h / 3));
    line((row * w) + (w / 3), (col * h) + (h / 3 * 2), (row * w) + w, (col * h) + (h / 3 * 2));
    line((row * w) + (w / 3), (col * h), (row * w) + (w / 3), (col * h) + (h / 3 * 2));
    line((row * w) + (w / 3 * 2), (col * h), (row * w) + (w / 3 * 2), (col * h) + (h / 3));
  } else if (val === 6) {
    line((row * w), (col * h) + (h / 3), (row * w) + w, (col * h) + (h / 3));
    line((row * w) + (w / 3 * 2), (col * h) + (h / 3 * 2), (row * w) + w, (col * h) + (h / 3 * 2));
    line((row * w) + (w / 3 * 2), (col * h) + (h / 3 * 2), (row * w) + (w / 3 * 2), (col * h) + h);
    line((row * w), (col * h) + (h / 3 * 2), (row * w) + (w / 3), (col * h) + (h / 3 * 2));
    line((row * w) + (w / 3), (col * h) + (h / 3 * 2), (row * w) + (w / 3), (col * h) + h);
  } else if (val === 7) {
    line((row * w), (col * h) + (h / 3 * 2), (row * w) + w, (col * h) + (h / 3 * 2));
    line((row * w), (col * h) + (h / 3), (row * w) + (w / 3), (col * h) + (h / 3));
    line((row * w) + (w / 3), (col * h), (row * w) + (w / 3), (col * h) + (h / 3));
    line((row * w) + (w / 3 * 2), (col * h) + (h / 3), (row * w) + w, (col * h) + (h / 3));
    line((row * w) + (w / 3 * 2), (col * h), (row * w) + (w / 3 * 2), (col * h) + (h / 3));
  } else if (val === 8) {
    line((row * w) + (w / 3 * 2), (col * h), (row * w) + (w / 3 * 2), (col * h) + h);
    line((row * w), (col * h) + (h / 3 * 2), (row * w) + (w / 3), (col * h) + (h / 3 * 2));
    line((row * w) + (w / 3), (col * h) + (h / 3 * 2), (row * w) + (w / 3), (col * h) + h);
    line((row * w), (col * h) + (h / 3), (row * w) + (w / 3), (col * h) + (h / 3));
    line((row * w) + (w / 3), (col * h), (row * w) + (w / 3), (col * h) + (h / 3));
  } else if (val === 9) {
    line((row * w) + (w / 3), (col * h), (row * w) + (w / 3), (col * h) + h);
    line((row * w) + (w / 3 * 2), (col * h) + (h / 3), (row * w) + w, (col * h) + (h / 3));
    line((row * w) + (w / 3 * 2), (col * h), (row * w) + (w / 3 * 2), (col * h) + (h / 3));
    line((row * w) + (w / 3 * 2), (col * h) + (h / 3 * 2), (row * w) + w, (col * h) + (h / 3 * 2));
    line((row * w) + (w / 3 * 2), (col * h) + (h / 3 * 2), (row * w) + (w / 3 * 2), (col * h) + h);
  } else if (val === ' ') {
    drawFood(val, row, col)
  }
}

function drawScore() {
  stroke(255);
  strokeWeight(2);
  textAlign(CENTER, CENTER);
  textSize(31);
  text('' + snake.length, 11 * w + (w / 2), 10 * h + (h / 2), 12);
}

function gameOver() {
  const snakeHead = snake[0];
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
  text('GAME OVER', 11 * w + (w / 2), 9 * h + (h / 2), 12);
  noLoop(); 
}

function gameWon() {
  for (let row = 0; row < gameMap.length; row++) {
    for (let col = 0; col < gameMap[row].length; col++) {
      if (gameMap[row][col] === ' ') return false;
    }
  }
  
  return true;
}

function drawGameWon() {
  stroke(255, 255, 255);
  strokeWeight(3);
  textAlign(CENTER, CENTER);
  textSize(52);
  text('YOU WON', 11 * w + (w / 2), 9 * h + (h / 2), 12);
  noLoop();
}
</script>
{%endraw%}