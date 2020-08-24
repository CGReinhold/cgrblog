---
title: Quadrinhos
date: "2020-09-01T22:00:00.169Z"
---

Esta página é apenas um teste de estilo para uma página. Você pode ver como esse estilo afeta alguém abaixo.

{%raw%}
<style>
* {
  cursor: crosshair;
}
body {
  background-color: white;
  color: black;
  background-image: -webkit-repeating-radial-gradient( center center, black, black 1px, white 1px, white 100% );
  background-size: 8px 8px;
}
article {
  background-color: white;
  border: 4px black solid;
  box-shadow: 10px 8px 0px  black;
}
header {
  padding: 15px 15px 5px 15px;
  border-bottom: 4px black solid;
  background-color: lightgray;
}
#header-post {
  display: none;
}
.posttitle,
.author *,
.postdate * {
  color: black !important;
}
article .content {
  padding: 0 15px;
  text-align: center;
}
.py4 {
  padding-bottom: 8rem;
}
.footer-right {
  border: 4px solid black;
  padding: 0.5rem;
  background: linear-gradient( -45deg, white, white 25%, black 25%, black 50%, white 50%, white 75%, black 75%, black 100% );
  background-size: 40px 40px;
  -webkit-animation: scrolling-gradient 2s linear infinite;
  animation: scrolling-gradient 2s linear infinite;
}
.footer-right nav {
  background-color: white;
  padding: 10px;
  border: 4px black solid;
  font-size: 1rem;
}
#footer a {
  color: black;
}
@keyframes scrolling-gradient {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 40px;
  }
}
</style>
<div id="camera"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.min.js"></script>
<script>
let capture;
function setup() { 
  const canvas = createCanvas(550, 400);
  canvas.parent('camera');
  capture = createCapture(VIDEO);
  capture.size(550, 400);
  capture.hide();
}
function draw() { 
  background(0);
  capture.loadPixels();
  let stepSize = 4;
  for (let x = 0; x < capture.width; x += stepSize) {
    for (let y = 0; y < capture.height; y += stepSize) {
      let index = ((y*capture.width) + x) * 4;
      let redVal = capture.pixels[index];
      let greenVal = capture.pixels[index + 1];
      let blueVal = capture.pixels[index + 2];
      fill(redVal, blueVal, greenVal); //yes, inverted
      circle(x, y, stepSize);
    }
  }
}
</script>
{%endraw%}