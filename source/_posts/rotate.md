---
title: Rotate
date: "2020-04-14T05:00:00.169Z"
---

{% raw %}
<style>
body {
  overflow: hidden;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

#digite {
  display: flex;
  justify-content: center;
  margin-top: 60px;
  color: #bebebe;
  font-size: large;
}
</style>
<div id="digite">Digite...</div>
<script>
function setup() {
  createCanvas(displayWidth, displayHeight);
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if (iterations > 0) {
    document.getElementById("digite").style.display = 'none';
    const hue = Math.floor(Math.random() * 360);
    const pastel = 'hsl(' + hue + ', 100%, 80%)';
    background(pastel);
  }
  angleMode(DEGREES);
  document.querySelector('article').style.transform = `rotate(${iterations*3}deg) scale(${1 - iterations/100}, ${1 - iterations/100})`;
  document.querySelector('article').style.transformOrigin = 'bottom right';
  document.querySelector('footer').style.transform = `rotate(${iterations}deg) scale(${1 - iterations/100}, ${1 - iterations/100})`;
  document.getElementById('header-post').style.transform = `rotate(${iterations}deg)`;
  translate(width / 2, height / 2);
  for (let i = 0; i < iterations; i++) {
    rotate((i / 10) + getRandom(365, 0, 100));
    line(0, 1 + i, 1 + i, 1 + i);
  }
}

function getRandom(multiply, sum, time) {
  return (sum || 0) + (multiply || 255) * sin(millis() / (time||5));
}

function isTouchDevice() {
	const supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	return supportsTouch;
}

let iterations = 0;

document.addEventListener('keypress', () => {
  iterations++;
  redraw();
});

document.addEventListener('click', () => {
  iterations++;
  redraw();
});

if (isTouchDevice()) {
  document.getElementById('digite').innerText = 'Aperte aqui...';
}
</script>
<script src="https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js"></script>
{% endraw %}