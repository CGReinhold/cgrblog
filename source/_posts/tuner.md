---
title: Afinador para Ukulele
date: "2020-08-04T22:00:00.169Z"
---

{% raw %}
<meta property="og:title" content="CGReinhold" />
<meta property="og:description" content="Afine seu ukulele com machine learning">
<meta name="description" content="Afine seu ukulele com machine learning">
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"></script>
<script src="https://unpkg.com/ml5@0.3.1/dist/ml5.min.js"></script>
<div id="tuner"></div>
<p>Este afinador foi construído utilizando as bibliotecas p5.js e ml5.js, baseando-se <a href="https://www.youtube.com/watch?v=F1OkDTUkKFo">neste vídeo</a> do Daniel Shiffman.</p>
<script>
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let mic;
let freq = 0;
let threshold = 1;
let loaded = false;
let freqHistory = [];
let textColor = "black";
let bodyColor = "white";
let notes = [
  { note: 'A', freq: 440 },
  { note: 'E', freq: 329.6276 },
  { note: 'C', freq: 261.6256 },
  { note: 'G', freq: 391.9954 }
];
function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent('tuner');
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
  textColor = window.getComputedStyle(document.querySelector("body")).getPropertyValue('color');
  bodyColor = window.getComputedStyle(document.querySelector("body")).getPropertyValue('background-color');
}
function listening() {
  pitch = ml5.pitchDetection(
    model_url,
    audioContext,
    mic.stream,
    modelLoaded
  );
}
function getClosestNote() {
    let closestNote = -1;
    let recordDiff = Infinity;
    for (let i = 0; i < notes.length; i++) {
      let diff = freq - notes[i].freq;
      if (abs(diff) < abs(recordDiff)) {
        closestNote = notes[i];
        recordDiff = diff;
      }
    }
    return { closestNote, recordDiff };
}
function writeFrequency() {
  textAlign(CENTER, CENTER);
  fill(textColor);
  textSize(32);
  text(freq.toFixed(2), width / 2, height - 100);
}
function writeNote(note) {
  textSize(64);
  text(note, width / 2, height - 150);
}
function draw() {
  background(bodyColor);
  if (loaded) {
    writeFrequency();
    const { closestNote, recordDiff } = getClosestNote();
    writeNote(closestNote.note);
    let diff = recordDiff;
    stroke(textColor);
    strokeWeight(4);
    line(400, 100, 400, 400);
    noStroke();
    let col = color(255, 0, 0);
    if (abs(diff) < threshold) {
        col = color(0, 255, 0);
    }
    let radius = map(abs(diff), 0, 100, 100, 10);
    freqHistory.push({ diff, color: col, radius });
    if (freqHistory.length > 20) {
        freqHistory.shift();
    }
    for (let i = 0; i < freqHistory.length; i++) {
        let alpha = abs(map(i, 0, freqHistory.length, 0, 255));
        const history = freqHistory[i];
        const levels = history.color.levels;
        fill(levels[0], levels[1], levels[2], alpha);
        circle(400 + history.diff, 250, history.radius);
    }
  } else {
    textAlign(CENTER, CENTER);
    fill(textColor);
    textSize(64);
    text("Carregando...", width / 2, height / 2);
  }
}
function modelLoaded() {
  pitch.getPitch(gotPitch);
}
function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    if (frequency) {
      loaded = true;
      freq = frequency;
    }
    pitch.getPitch(gotPitch);
  }
}
</script>
{% endraw %}