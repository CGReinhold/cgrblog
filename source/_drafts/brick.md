---
title: Brick game
date: "2020-08-04T22:00:00.169Z"
---

{% raw %}
<div class="brick-game">
    <div class="upper-part">
        <div class="tetris">
        </div>
        <div class="screen">
            <div id="grid" class="grid">
            </div>
        </div>
        <div class="tetris">
        </div>
    </div>
    <div class="bump"></div>
    <div class="lower-part">
        <div class="button-row">
            <div class="button-container">
                <button class="button"></button>
                <span class="button-title">On/Off</span>
            </div>
            <div class="button-container">
                <button class="button" onclick="start()"></button>
                <span class="button-title">Start</span>
            </div>
            <div class="button-container">
                <button class="button"></button>
                <span class="button-title">Reset</span>
            </div>
            <div class="button-container">
                <button class="button"></button>
                <span class="button-title">Sound</span>
            </div>
        </div>
        <div class="actions">
            <div class="arrows">
                <div><button class="button action"></button></div>
                <div>
                    <button class="button action"></button>
                    <div class="arrows">
                    <svg viewBox="0 0 512 512" class="arrows-svg"><path fill="currentColor" d="M352.201 425.775l-79.196 79.196c-9.373 9.373-24.568 9.373-33.941 0l-79.196-79.196c-15.119-15.119-4.411-40.971 16.971-40.97h51.162L228 284H127.196v51.162c0 21.382-25.851 32.09-40.971 16.971L7.029 272.937c-9.373-9.373-9.373-24.569 0-33.941L86.225 159.8c15.119-15.119 40.971-4.411 40.971 16.971V228H228V127.196h-51.23c-21.382 0-32.09-25.851-16.971-40.971l79.196-79.196c9.373-9.373 24.568-9.373 33.941 0l79.196 79.196c15.119 15.119 4.411 40.971-16.971 40.971h-51.162V228h100.804v-51.162c0-21.382 25.851-32.09 40.97-16.971l79.196 79.196c9.373 9.373 9.373 24.569 0 33.941L425.773 352.2c-15.119 15.119-40.971 4.411-40.97-16.971V284H284v100.804h51.23c21.382 0 32.09 25.851 16.971 40.971z" class=""></path></svg>
                    </div>
                    <button class="button action"></button>
                </div>
                <div><button class="button action"></button></div>
            </div>
            <div class="rotate">
                <div class="button-container">
                    <button class="button big"></button>
                    <span class="button-title">Rotate</span>
                </div>
            </div>
        </div>
        <div class="labels"></div>
    </div>
</div>
<style>
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
      background-image: linear-gradient(to right, #12171d 5%, #141c1f 10%, #21262a 20%, #21262a 85%, #141c1f 95%, #12171d 100%);
      flex: 6;
      display: flex;
  }
  .tetris {
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
  }
  .grid {
      display: grid;
      width: 60%;
      height: 100%;
  }
  .bump {
      background-image: linear-gradient(#12171d, #141c1f, #21262a, #12171d);
      flex: 2;
      border-radius: 15px;
  }
  .lower-part {
      background-image: linear-gradient(to right, #12171d 5%, #141c1f 10%, #21262a 20%, #21262a 85%, #141c1f 95%, #12171d 100%);
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
let grid = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
const render = () => {
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
};
function start() {
    grid = [
        [1,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,1,1,1,0,1],
        [0,0,0,0,0,0,1,0,0,0],
        [0,0,0,0,0,1,0,1,0,0],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,0,0,0,1],
        [1,0,1,1,1,0,0,0,0,1],
        [0,0,0,1,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,1],
        [0,0,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,1,0,0,0],
        [1,0,0,0,0,1,0,1,0,1],
    ];
    render();
}
window.addEventListener('load', function() {
    render();
});
</script>
{% endraw %}