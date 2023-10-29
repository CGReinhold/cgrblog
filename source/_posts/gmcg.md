---
title: Gol, Motoca, Caminhão Game
date: "2020-10-26T22:00:00.169Z"
---

Este "jogo" é uma implementação fajuta e desinteressante de uma ideia do [João Carvalho](https://www.youtube.com/@assimdisseojoao) no podcast Lektronik. Apenas emojis foram utilizados para a arte deste "jogo", o que acabou deixando-o ainda menos elegante.

O "jogo" consistem em três partes:

- __Gol__: Nesta parte o seu objetivo é fazer o gol da partida de futebol. Basta clicar na `barra de espaço` para fazer o gol, não tem segredo.
- __Motoca__: Nesta parte do "jogo" você pode relaxar após a partida de futebol pilotando a sua motoca. Você pode utilizar as setas para cima e para baixo para pilotá-la. Não tem problema se acabar atropelando algo.
- __Caminhão__: Na última etapa, você deve voltar ao trabalho e pegar todas as caixas para o caminhão. Colete todas as caixas com as setas do teclado para conseguir finalizar o "jogo".

Neste "jogo" a única coisa que você perde é o seu tempo.

Para manter a simplicidade do "jogo" (por preguiça mesmo), não é possível jogá-lo com dispositivos touch caso você não tenha um teclado. 

{%raw%}
<div id="gmcg" style="position: relative"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>
<script>
let startedSplash = false;
let showMenu = false;
let runningGame = false;
let button;
let showGol = false;
let showMotoca = false;
let showCaminhao = false;
function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent('gmcg');
  button = createButton('Iniciar jogo');
  button.parent('gmcg');
  button.position(width / 2 - 50000, height / 2 - 50000);
  ballInitialX = width / 2;
  ballInitialY = height / 2 + 150;
}
function draw() {
  if (!startedSplash) {
    splashAnimation();
  }
  if (showMenu) {
    renderMenu();
  }
  if (showGol) {
    renderGol();
  }
  if (showMotoca) {
    renderMotoca();
  }
  if (showCaminhao) {
    renderCaminhao();
  }
}
function splashAnimation() {
  startedSplash = true;
  background(51, 102, 153);
  showCenteredText('⚽ GOL ⚽');
  setTimeout(() => {
    background(51, 102, 153);
    showCenteredText('🏍️ MOTOCA 🏍️');
    setTimeout(() => {
      background(51, 102, 153);
      showCenteredText('🚚 CAMINHÃO 🚚');
      setTimeout(() => {
        background(51, 102, 153);
        showCenteredText('🎮 GAME 🎮');
        setTimeout(() => {
          showMenu = true;
        }, 1000)
      }, 1000)
    }, 1000)
  }, 1000)
}
function keyPressed(e) {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    e.preventDefault();
  }
  if (key === ' ') {
    e.preventDefault();
    if (showGol) {
      let xToHit = golArrowX;
      let yToHit = height / 2;
      let lerpPercentage = 0;
      let gotToMiddle = false;
      let ballKickInterval = setInterval(() => {
        if (!gotToMiddle) {
          ballX = lerp(ballInitialX, xToHit, lerpPercentage);
          ballY = lerp(ballInitialY, yToHit, lerpPercentage);
        } else {
          ballX = lerp(xToHit, width / 2, lerpPercentage);
          ballY = lerp(yToHit, 80, lerpPercentage);
        }
        lerpPercentage += 0.03;
        if (lerpPercentage >= 1) {
          if (!gotToMiddle) {
            gotToMiddle = true;
            lerpPercentage = 0;
          } else {
            clearInterval(ballKickInterval);
            scoredGoal = true;
          }
        }
      }, 10);
    }
  }
}
function showCenteredText(t, c) {
  textAlign(CENTER, CENTER);
  textSize(22);
  textStyle(BOLD);
  strokeWeight(0);
  fill(c || color(0, 0, 0));
  text(t, width / 2, height / 2);
}
function renderMenu() {
  background(100, 100, 100);
  showCenteredText('⚽ GOL ⚽\n🏍️ MOTOCA 🏍️\n🚚 CAMINHÃO 🚚\n🎮 GAME 🎮');
  button.mousePressed(onIniciar);
  button.style("height", "50px");
  button.style("width", "150px");
  button.style("border", "none");
  button.style("border-radius", "10px");
  button.style("outline", "none");
  button.style("font-size", "20px");
  button.style("font-family", '"Consolas", monospace');
  button.position(width/2 - 75, height/2 + 75);
}
function onIniciar() {
  showMenu = false;
  button.position(width / 2 - 50000, height / 2 - 50000);
  showGol = true;
}
/////////
// GOL //
/////////
let golArrowX = 0;
let increaseGolArrow = true;
let ballInitialX;
let ballInitialY;
let ballX = null;
let ballY = null;
let scoredGoal = false;
function renderGol() {
  if (scoredGoal) {
    background(0, 0, 0);
    showCenteredText('⚽ GOL ⚽', color(255, 255, 255));
    setTimeout(() => {
      golArrowX = 0;
      increaseGolArrow = true;
      ballInitialX = null;
      ballInitialY = null;
      ballX = null;
      ballY = null;
      scoredGoal = false;
      showGol = false;
      showMotoca = true;
    }, 1000);
  } else {
    background(130, 209, 115);
    textAlign(CENTER);
    textSize(160);
    text('🥅', width / 2, 80);
    textSize(56);
    push();
    translate(width / 2, 160);
    angleMode(DEGREES);
    rotate(180);
    text('🤸', 0, 0);
    pop();
    drawArrow();
    textSize(30);
    if (ballX === null) {
      text('⚽', ballInitialX, ballInitialY);
    } else {
      text('⚽', ballX, ballY);
    }
    textSize(56);
    text('🏃', width / 2, height / 2 + 200);
    renderGolOpponents();
  }
}
function drawArrow() {
  strokeWeight(5);
  stroke(color(40, 40, 40, 170));
  const golX = getGolArrowX();
  line(width / 2, height / 2 + 150, golX, height / 2);
  push();
  translate(golX, height / 2);
  angleMode(DEGREES);
  rotate(golX / 2.49 + 200);
  line(0, 0, -5, 10);
  line(0, 0, 5, 10);
  line(5, 10, -5, 10);
  pop();
}
function getGolArrowX() {
  if (golArrowX === 0 || golArrowX < width / 2 - 100) {
    increaseGolArrow = true;
    golArrowX = width / 2 - 100;
  } else if (golArrowX > width / 2 + 100) {
    increaseGolArrow = false;
    golArrowX = width / 2 + 100;
  } else if (increaseGolArrow) {
    golArrowX++;
    golArrowX++;
  } else {
    golArrowX--;
    golArrowX--;
  }
  return golArrowX;
}
let golOpponentX = null;
function renderGolOpponents() {
  textSize(56);
  text('🏃🏾', getOpponentPosition(0), height / 2 + 100);
  text('🏃‍♀️', getOpponentPosition(1), height / 2 + 50);
  text('🏃🏿‍♀️', getOpponentPosition(2), height / 2);
  text('🏃🏼', getOpponentPosition(3), height / 2 - 50);
}
function getOpponentPosition(index) {
  if (!golOpponentX) {
    golOpponentX = [{
        x: width / 2 - 200,
        i: true
      },
      {
        x: width / 2 - 100,
        i: true
      },
      {
        x: width / 2 + 200,
        i: false
      },
      {
        x: width / 2,
        i: true
      }
    ];
  }
  if (golOpponentX[index].x === 0 || golOpponentX[index].x < width / 2 - 200) {
    golOpponentX[index].i = true;
    golOpponentX[index].x = width / 2 - 200;
  } else if (golOpponentX[index].x > width / 2 + 200) {
    golOpponentX[index].i = false;
    golOpponentX[index].x = width / 2 + 200;
  } else if (golOpponentX[index].i) {
    golOpponentX[index].x++;
  } else {
    golOpponentX[index].x--;
  }
  return golOpponentX[index].x;
}
////////////
// MOTOCA //
////////////
let motocaX = null;
let motocaY = null;
let sidewalkY = -100;
let lineY = -100;
let streetCars = [];
let iterations = 0;
let timeoutMotoca = null;
function renderMotoca() {
  background(110);
  fill(50);
  noStroke();
  rect(0, height / 4, width, height / 2);
  sidewalk();
  streetLine();
  renderCars();
  motoca();
}
function motoca() {
  if (!timeoutMotoca) {
    timeoutMotoca = setTimeout(() => {
      showMotoca = false;
      motocaX = null;
      motocaY = null;
      sidewalkY = -100;
      lineY = -100;
      streetCars = [];
      iterations = 0;
      timeoutMotoca = null;
      background(0, 0, 0);
      showCenteredText('🏍️ MOTOCA 🏍️', color(255, 255, 255));
      setTimeout(() => {
        showCaminhao = true;
      }, 1000);
      clearTimeout(timeoutMotoca);
    }, 20000);
  }
  if (!motocaY) {
    motocaY = height / 2;
  }
  if (!motocaX) {
    motocaX = width - 100;
  }
  if (keyIsDown(UP_ARROW)) {
    if (showMotoca) {
      if (motocaY > height / 4) {
        motocaY -= 3;
      }
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (showMotoca) {
      if (motocaY < height / 4 * 3 - 20) {
        motocaY += 3;
      }
    }
  }
  textSize(56);
  text('🏍️', motocaX, motocaY);
}
function sidewalk() {
  fill(110);
  stroke(90);
  strokeWeight(1);
  const sidewalkHeight = 20;
  const sidewalkWidth = 100;
  for (let i = sidewalkY; i < width; i += sidewalkWidth) {
    rect(i, height / 4 - sidewalkHeight, width, sidewalkHeight);
  }
  sidewalkY += 5;
  if (sidewalkY > sidewalkWidth) {
    sidewalkY = -100;
  }
}
function streetLine() {
  fill(255);
  noStroke();
  const lineHeight = 20;
  const lineWidth = 100;
  let step = true;
  for (let i = lineY; i < width; i += lineWidth) {
    if (step) {
      rect(i, height / 2.4 - lineHeight, lineWidth, lineHeight);
    }
    step = !step;
  }
  step = true;
  for (let i = lineY; i < width; i += lineWidth) {
    if (step) {
      rect(i, height / 1.65 - lineHeight, lineWidth, lineHeight);
    }
    step = !step;
  }
  lineY += 5;
  if (lineY > lineWidth) {
    lineY = -100;
  }
}
function getCar() {
  const cars = ['🚎', '🚐', '🚑', '🚒', '🚓', '🚕', '🚗', '🚚', '🚛', '🚜', '🚴', '🚶‍♂️', '🚶🏻‍♂️', '🚶🏼‍♂️', '🚶🏽‍♂️', '🚶🏾‍♂️', '🚶🏿‍♂️', '🚶‍♀️', '🚶🏻‍♀️', '🚶🏼‍♀️', '🚶🏽‍♀️', '🚶🏾‍♀️', '🚶🏿‍♀️', '🚧', '👻'];
  return cars[floor(random(cars.length))];
}
function renderCars() {
  if (iterations % 250 === 0) {
    const carY = floor(random(height / 4, (height / 4 * 3) - 20));
    streetCars.push({
      image: getCar(),
      x: -100,
      y: carY
    });
  }
  if (streetCars.length > 5) {
    streetCars.splice();
  }
  for (let i = 0; i < streetCars.length; i++) {
    const car = streetCars[i];
    car.x += 5;
    textSize(56);
    text(car.image, car.x, car.y);
  }
  iterations += 5;
}
//////////////
// CAMINHÃO //
//////////////
let pessoaX = null;
let pessoaY = null;
let validateBoxes = false;
function renderCaminhao() {
  background(50);
  fill(0, 170, 0);
  rect(width / 2 - 100, 0, width, height);
  textSize(200);
  text('🚚', width / 2 - 220, height / 2);
  renderStuff();
  renderBoxes();
  renderPerson();
  if (validateBoxes && !boxes.length) {
    showCaminhao = false;
    pessoaX = null;
    pessoaY = null;
    validateBoxes = false;
    boxes = null;
    stuffs = null;
    background(0, 0, 0);
    showCenteredText('🚚 CAMINHÃO 🚚', color(255, 255, 255));
    setTimeout(() => {
      showMenu = true;
    }, 1000);
  }
}
function renderPerson() {
  if (pessoaX === null) {
    pessoaX = width / 2 + 150
  }
  if (pessoaY === null) {
    pessoaY = height / 2;
  }
  if (keyIsDown(UP_ARROW)) {
    if (pessoaY > 50) {
      pessoaY -= 3;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (pessoaY < height - 20) {
      pessoaY += 3;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (pessoaX < width - 70) {
      pessoaX += 3;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (pessoaX > width / 2 - 100) {
      pessoaX -= 3;
    }
  }
  textSize(56);
  text('🤾', pessoaX, pessoaY);
  if (boxes && boxes.length) {
    let itemToRemove = null;
    for (let i = boxes.length - 1; i >= 0; i--) {
      const distance = dist(pessoaX, pessoaY, boxes[i].x, boxes[i].y);
      if (distance < 30) {
        boxes = boxes.filter(b => b.x !== boxes[i].x && b.y !== boxes[i].y);
      }
    }
    if (itemToRemove != null) {
      boxes.splice(itemToRemove, 1);
    }
  }
}
let boxes = null;
let stuffs = null;
function renderBoxes() {
  if (boxes === null) {
    boxes = [];
    for (let i = 0; i < 10; i++) {
      boxes.push(generateBox());
    }
    validateBoxes = true;
  }
  for (let box of boxes) {
    textSize(34);
    text('📦', box.x, box.y);
  }
}
function renderStuff() {
  if (stuffs === null) {
    stuffs = [];
    for (let i = 0; i < 10; i++) {
      stuffs.push(generateRandomStuff());
    }
  }
  for (let stuff of stuffs) {
    textSize(22);
    text(stuff.text, stuff.x, stuff.y);
  }
}
function generateBox() {
  return {
    x: random(width / 2 - 100, width - 70),
    y: random(100, height - 100)
  };
}
function generateRandomStuff() {
  const randomText = ['🐕', '🦃', '🐢', '🐤', '🍄', '🦚', '🌵', '🌼', '🌻', '🌷', '☘️', '🍀', '🐾'];
  return {
    text: randomText[floor(random(randomText.length))],
    x: random(width / 2 - 100, width - 70),
    y: random(0, height - 40)
  };
}
</script>
{%endraw%}