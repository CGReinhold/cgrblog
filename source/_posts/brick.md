---
title: Brick game
date: "2020-07-28T22:00:00.169Z"
---

{% raw %}
<meta property="og:title" content="CGReinhold" />
<meta property="og:description" content="Relembre como é jogar com o brick game">
<meta property="og:image" content="/images/brick/brickgame.png"/>
<meta name="description" content="Agora você pode finalmente relembrar como é jogar o melhor jogo de corrida já feito!">
<div id="brick-game" class="brick-game">
    <div class="upper-part">
        <div class="filler">
        </div>
        <div class="screen">
            <div id="grid" class="grid"></div>
            <div id="screen-message" class="screen-message">
              <span class="title">Kart Run</span>
              <span class="score">Score</span>
              <span id="score">0</span>
            </div>
        </div>
        <div class="filler">
        </div>
    </div>
    <div class="bump"></div>
    <div class="lower-part">
        <div class="button-row">
            <div class="button-container">
                <button class="button" onclick="start()"></button>
                <span class="button-title">On/Off</span>
            </div>
            <div class="button-container">
                <button class="button" onclick="play()"></button>
                <span class="button-title">Start</span>
            </div>
            <div class="button-container">
                <button class="button" onclick="reset()"></button>
                <span class="button-title">Reset</span>
            </div>
            <div class="button-container">
                <button class="button" onclick="sound()"></button>
                <span class="button-title">Sound</span>
            </div>
        </div>
        <div class="actions">
            <div class="arrows">
                <div><button class="button action"></button></div>
                <div>
                    <button class="button action" onclick="left()"></button>
                    <div class="arrows">
                    <svg viewBox="0 0 512 512" class="arrows-svg"><path fill="currentColor" d="M352.201 425.775l-79.196 79.196c-9.373 9.373-24.568 9.373-33.941 0l-79.196-79.196c-15.119-15.119-4.411-40.971 16.971-40.97h51.162L228 284H127.196v51.162c0 21.382-25.851 32.09-40.971 16.971L7.029 272.937c-9.373-9.373-9.373-24.569 0-33.941L86.225 159.8c15.119-15.119 40.971-4.411 40.971 16.971V228H228V127.196h-51.23c-21.382 0-32.09-25.851-16.971-40.971l79.196-79.196c9.373-9.373 24.568-9.373 33.941 0l79.196 79.196c15.119 15.119 4.411 40.971-16.971 40.971h-51.162V228h100.804v-51.162c0-21.382 25.851-32.09 40.97-16.971l79.196 79.196c9.373 9.373 9.373 24.569 0 33.941L425.773 352.2c-15.119 15.119-40.971 4.411-40.97-16.971V284H284v100.804h51.23c21.382 0 32.09 25.851 16.971 40.971z" class=""></path></svg>
                    </div>
                    <button class="button action" onclick="right()"></button>
                </div>
                <div><button class="button action"></button></div>
            </div>
            <div class="rotate">
                <div class="button-container">
                    <button class="button big" onclick="rotate()"></button>
                    <span class="button-title">Rotate</span>
                </div>
            </div>
        </div>
        <div class="labels"></div>
    </div>
</div>
<style>
  .rotated {
    transform: rotate(180deg);
  }
  .content {
      align-items: center;
  }
  .brick-game {
      height: 100vh;
      width: 50vh;
      display: flex;
      flex-direction: column;
      border-radius: 25px;
      overflow: hidden;
      background-color: #12171d;
  }
  .upper-part {
      background-color: #21262a;
      box-shadow: inset 20px 10px 10px 2px #12171d;
      flex: 6;
      display: flex;
  }
  .filler {
      flex: 1;
  }
  .screen {
      background-color: #77a090;
      margin: 30px 15px;
      height: 32vh;
      width: 27vh;
      border-width: 20px;
      border-top-color: #3f484f;
      border-left-color: #425158;
      border-right-color: #2b323c;
      border-bottom-color: #252b33;
      border-style: solid;
      padding: 10px;
      display: flex;
  }
  .screen-message {
    width: 30%;
    padding: 5px;
    text-align: center;
    color: black;
    font-family: "Lucida Console", Monaco, monospace;
    letter-spacing: -1px;
    display: none;
  }
  .title {
    font-weight: bold;
    font-size: 1.6vh;
    margin-bottom: 15px;
    text-transform: uppercase;
  }
  .score {
    display: block;
    margin-top: 10px;
    font-size: 1.2vh;
  }
  .grid {
      display: grid;
      width: 70%;
      height: 100%;
  }
  .bump {
      background-image: linear-gradient(#12171d, #141c1f, #21262a, #12171d);
      box-shadow: inset 13px -9px 10px 6px #12171d;
      flex: 2;
      border-radius: 15px;
  }
  .lower-part {
      background-color: #21262a;
      box-shadow: inset 20px 0 10px 2px #12171d;
      flex: 8;
      display: flex;
      flex-direction: column;
  }
  .button-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 30px;
      justify-content: center;
  }
  .button-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 15px;
  }
  .button {
      height: 20px;
      width: 20px;
      border-radius: 10px;
      background-color: #f9d93d;
      border: none;
      box-shadow: 0px 0px 8px black;
      cursor: pointer;
  }
  .actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin-top: 10px;
  }
  .arrows div:nth-child(1) {
      display: flex;
      justify-content: center;
  }
  .arrows div:nth-child(2) {
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .arrows div:nth-child(3) {
      display: flex;
      justify-content: center;
  }
  .action {
      height: 40px;
      width: 40px;
      border-radius: 20px;
  }
  .arrows-svg {
      margin: 15px;
      height: 40px;
      width: 40px;
  }
  .big {
      height: 60px;
      width: 60px;
      border-radius: 30px;
  }
  .square {
      border: 1px solid #80a393;
  }
  .selected {
      background-color: black;
  }
</style>
<script>
let isOn = false;
let end = false;
let intervalMiliseconds = 100;
let cont = 0;
let kartPosition = 0;
let grid = [];
let interval = null;
let audio = null;
let stoppedSoundOnce = false;
const borders = [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1];
let opponents = [];
const clearGrid = () => {
  grid = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ];
};
const setBorders = () => {
  grid = grid.map((r, index) => {
    return [borders[index], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], borders[index]];
  });
  const lastValue = borders.pop();
  borders.unshift(lastValue);
};
const setKartPosition = () => {
  grid[16][3] = Number(!kartPosition);
  grid[16][6] = Number(kartPosition);
  grid[17][2] = Number(!kartPosition);
  grid[17][3] = Number(!kartPosition);
  grid[17][4] = Number(!kartPosition);
  grid[17][5] = Number(kartPosition);
  grid[17][6] = Number(kartPosition);
  grid[17][7] = Number(kartPosition);
  grid[18][3] = Number(!kartPosition);
  grid[18][6] = Number(kartPosition);
  grid[19][2] = Number(!kartPosition);
  grid[19][4] = Number(!kartPosition);
  grid[19][5] = Number(kartPosition);
  grid[19][7] = Number(kartPosition);
};
const setOpponents = () => {
  opponents = opponents
                    .map(o => [o[0] + 1, o[1]])
                    .filter(o => o[0] < 25);
  opponents.forEach(opponent => {
    const isLeft = !opponent[1];
    const y = opponent[0];
    if (y < 20) {
      const x1 = isLeft ? 2 : 5;
      const x2 = isLeft ? 4 : 7;
      grid[y][x1] = 1;
      grid[y][x2] = 1;
    }
    if (y < 21 && y > 0) {
      const x = isLeft ? 3 : 6;
      grid[y - 1][x] = 1;
    }
    if (y < 22 && y > 1) {
      const x1 = isLeft ? 2 : 5;
      const x2 = isLeft ? 3 : 6;
      const x3 = isLeft ? 4 : 7;
      grid[y - 2][x1] = 1;
      grid[y - 2][x2] = 1;
      grid[y - 2][x3] = 1;
    }
    if (y < 23 && y > 2) {
      const x = isLeft ? 3 : 6;
      grid[y - 3][x] = 1;
    }
  });
}
const addOpponent = () => {
  opponents.push([0, Math.round(Math.random())]);
};
const setScore = () => {
  document.getElementById("score").innerText = cont.toString();
}
const render = () => {
  if (grid.length) {
    const gameDiv = document.getElementById('grid');
    gameDiv.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.gridArea = `${i+1} / ${j+1} / ${i+2} / ${j+2}`;
        if (grid[i][j]) {
          square.className += ' selected';
        }
        gameDiv.appendChild(square);
      }
    }
  }
};
const checkCollision = () => {
  if (opponents.find(o => o[0] > 15 && o[1] === kartPosition)) {
    if (interval) {
      clearInterval(interval);
      grid = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,1,0,1,0,1,0,0,1],
        [1,0,0,0,1,0,1,1,1,1],
        [1,,0,0,1,0,1,0,0,1],
        [1,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,1,0,1,0,0,1],
        [1,0,0,0,1,0,1,0,0,1],
        [1,0,0,0,1,0,1,0,0,1],
        [1,0,0,0,1,0,1,0,0,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
      ];
      render();
      cont = 0;
      opponents = [];
      end = true;
      intervalMiliseconds = 100;
    }
  }
};
function sound(forceStart = false) {
  if (!forceStart) {
    stoppedSoundOnce = true;
  }
  if (forceStart || !audio) {
    if (audio) {
      audio.pause();
      audio = null;
    }
    audio = new Audio('/sounds/game-music.mp3');
    audio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    audio.play();
  } else {
    audio.pause();
    audio = null;
  }
}
function left() {
  kartPosition = 0;
  setKartPosition();
  render();
}
function right() {
  kartPosition = 1;
  setKartPosition();
  render();
}
function setOn() {
  const screenMessage = document.getElementById("screen-message");
  screenMessage.style.display = "block";
  const gameDiv = document.getElementById('grid');
  gameDiv.style.display = "grid";
  grid = [
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,1],
    [0,0,1,1,1,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0],
    [1,0,1,0,1,0,0,0,0,1],
  ];
  render();
  isOn = true;
}
function setOff() {
  const screenMessage = document.getElementById("screen-message");
  screenMessage.style.display = "none";
  const gameDiv = document.getElementById('grid');
  gameDiv.style.display = "none";
  isOn = false;
}
function start() {
  if (isOn) {
    setOff();
  } else {
    setOn();
  }
}
function reset() {
  cont = 0;
  opponents = [];
  end = true;
  intervalMiliseconds = 100;
  play();
}
function play() {
  if (isOn) {
    if (!stoppedSoundOnce) {
      sound(true);
    }
    end = false;
    grid = [
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,1,0,0,0,0,0,1],
      [0,0,1,1,1,0,0,0,0,0],
      [0,0,0,1,0,0,0,0,0,0],
      [1,0,1,0,1,0,0,0,0,1],
    ];
    render();
    startTimeout();
  }
}
const iterate = () => {
  clearGrid();
  setBorders();
  setKartPosition();
  setOpponents();
  setScore();
  if (cont % 15 === 0) {
    addOpponent();
  }
  checkCollision();
  cont++;
  render();
}
const startTimeout = () => {
  if (interval) {
    clearTimeout(interval);
  }
  if (!end) {
    interval = setTimeout(() => {
      if (intervalMiliseconds > 20 && cont % 30 === 0) {
        intervalMiliseconds -= (10 / 100) * intervalMiliseconds;
      }
      iterate();
      startTimeout();
    }, intervalMiliseconds);
  }
}
function rotate() {
  const brickGame = document.getElementById("brick-game");
  brickGame.classList.toggle("rotated");
}
window.addEventListener('load', function() {
  document.onkeydown = key => {
    if (key.key === "ArrowRight") {
      right();
    } else if (key.key === "ArrowLeft") {
      left();
    } else if (key.key === " " && key.key === "Enter") {
      if (end) {
        play();
      }
    }
  };
  render();
});
</script>
{% endraw %}
Música por [Eric Skiff](https://ericskiff.com/music/)
Fontes deste projeto [disponíveis aqui](https://codepen.io/cgreinhold/pen/wvMOZyr)