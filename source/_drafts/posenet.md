---
title: Posenet
date: "2020-07-14T22:00:00.169Z"
---

{% raw %}
<div id="parent"></div>
<style>
html, body {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.sound.min.js"></script>
<script src="https://unpkg.com/ml5@0.1.3/dist/ml5.min.js"></script>    <link rel="stylesheet" type="text/css" href="style.css">
<script>
let video;
let canvas;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
const nosePositions = [];
function setup() {
  canvas = createCanvas(640, 480);
  canvas.parent('parent');
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPoses);
}
function gotPoses(poses) {
  if (poses.length > 0) {
    let nX = (poses[0].pose.keypoints[0].position.x - video.width) * -1;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = (poses[0].pose.keypoints[1].position.x - video.width) * -1;
    let eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
    let distance = dist(noseX, noseY, eyelX, eyelY) * 0.5;
    if (nosePositions.length > 10000) {
     nosePositions.shift(); 
    }
    nosePositions.push({ noseX, noseY, distance });
  }
}
function draw() {
  image(video, 0, 0);
  push();
  scale(-1.0, 1.0)
  image(video, -video.width, 0);
  pop();
  tint(color(getRandomColor(), 0.5));
  for (let position of nosePositions) {
    const { noseX, noseY, distance } = position;
    const circleColor = getRandomColor();
    fill(circleColor);
    ellipse(noseX, noseY, distance); 
  }
}
function getRandomColor() {
  return color(getRandom(), getRandom(), getRandom());
}
function getRandom(multiply, sum, time) {
  return (Math.round(Math.random() * 255) || 0) + (Math.round(Math.random() * 255) || 255) * sin(millis() / (5));
}
</script>
{% endraw %}