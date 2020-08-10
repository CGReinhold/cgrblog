---
title: Bounce
date: "2020-09-01T22:00:00.169Z"
---

{% raw %}
<div id="bouncer"></div>
<style>
#bouncer {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>
<script>
let x;
let y;
let xSpeed = 5;
let ySpeed = 5;
let img;
let imgWidth = 80;
let imgHeight = 80;
let r,g,b;
let rotation = 0;
function preload() {
  img = loadImage("/images/logo.png");
}
function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('bouncer');
  x = random(width);
  y = random(height);
  randomColor();
  newXSpeed();
  newYSpeed();
}
function randomColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}
function newXSpeed() {
  const newX = random(4,10);
  const isPositive = xSpeed > 0;
  xSpeed = newX;
  if (isPositive) {
    xSpeed *= -1;
  }
}
function newYSpeed() {
  const newY = random(4, 10);
  const isPositive = ySpeed > 0;
  ySpeed = newY;
  if (isPositive) {
    ySpeed *= -1;
  }
}
function draw() {
  background(0,0,0,0);
  tint(r,g,b);
  rotation += 0.05;
  push();
  translate(x + imgWidth / 2, y + imgHeight / 2);
  rotate(rotation);
  image(img, 0, 0, imgWidth, imgHeight);
  pop();
  x += xSpeed;
  y += ySpeed;
  if (x < 0) {
    newXSpeed();
    x = 0;
    randomColor();
  } else if (x + imgWidth >= width) {
    newXSpeed();
    x = width - imgWidth;
    randomColor();
  }
  if (y < 0) {
    newYSpeed();
    y = 0;
    randomColor();
  } else if (y + imgHeight >= height) {
    newYSpeed();
    y = height - imgHeight;
    randomColor();
  }
}
</script>
{% endraw %}