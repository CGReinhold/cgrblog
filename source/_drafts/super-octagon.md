---
title: Super Octagon
date: "2020-09-29T22:00:00.169Z"
---

Um clone fajuto do jogo [**SUPER HEXAGON**](https://superhexagon.com/)

{% raw %}
<div id="parent"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>
<script>
class Octagon {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = 0;
    this.c = color(0, 0, 0);
    this.sides = [1, 1, 1, 1, 1, 1, 1, 1];
    this.lines = [];
  }
  setRadius(r) {
    this.r = r;
  }
  setRotation(a) {
    this.a = a;
  }
  setStroke(c) {
    this.c = c;
  }
  show() {
    this.lines = [];
    push();
    translate(this.x, this.y);
    angleMode(DEGREES);
    rotate(this.a);
    angleMode(RADIANS);
    let angle = TWO_PI / 8;
    strokeWeight(10);
    stroke(this.c);
    let bc = color(0, 0, 0, 0);
    fill(bc);
    let counter = 0;
    let prevX = null;
    let prevY = null;
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = 0 + cos(a) * this.r;
      let sy = 0 + sin(a) * this.r;
      if (prevX !== null && prevY !== null && this.sides[counter - 1]) {
        this.lines.push({
          x1: prevX,
          y1: prevY,
          x2: sx,
          y2: sy
        });
        line(prevX, prevY, sx, sy);
      }
      prevX = sx;
      prevY = sy;
      counter++;
    }
    if (this.sides[this.sides.length - 1]) {
      let sx = 0 + cos(0) * this.r;
      let sy = 0 + sin(0) * this.r;
      this.lines.push({
        x1: prevX,
        y1: prevY,
        x2: sx,
        y2: sy
      });
      line(prevX, prevY, sx, sy);
    }
    pop();
  }
}
class DangerousOctagon extends Octagon {
  constructor(x, y, v) {
    super(x, y, 400);
    this.v = v;
    this.generateSides();
  }
  generateSides() {
    this.sides = [];
    while (
      this.sides.filter(s => s).length < 4 ||
      this.sides.filter(s => s).length === 8
    ) {
      this.sides = [
        round(random()),
        round(random()),
        round(random()),
        round(random()),
        round(random()),
        round(random()),
        round(random()),
        round(random()),
      ];
    }
  }
  update() {
    this.r = this.r - this.v;
  }
  getRadius() {
    return this.r;
  } 
  edges(p, a) {
    const py = p.x * sin(a) + p.y * cos(a);
    const px = p.x * cos(a) - p.y * sin(a);
    for (let l of this.lines) {
      const ly1 = l.x1 * sin(this.a) + l.y1 * cos(this.a);
      const lx1 = l.x1 * cos(this.a) - l.y1 * sin(this.a);
      const ly2 = l.x2 * sin(this.a) + l.y2 * cos(this.a);
      const lx2 = l.x2 * cos(this.a) - l.y2 * sin(this.a);
      const lineSize = round(dist(lx1, ly1, lx2, ly2));
      //strokeWeight(1);
      //stroke(color(255,0,0));
      //line(lx1 + centerX, ly1 + centerY, px + centerX, py + centerY);
      //line(lx2 + centerX, ly2 + centerY, px + centerX, py + centerY);
      const dist1 = round(dist(lx1, ly1, px, py));
      const dist2 = round(dist(lx2, ly2, px, py));
      if (lineSize === dist1 + dist2) {
        return true;
      }
    }
    return false;
  }
}
class Background {
    constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = 0;
    this.c = color(0, 0, 0);
  }
  setRadius(r) {
    this.r = r;
  }
  setRotation(a) {
    this.a = a;
  }
  setColor(c) {
    console.log(c.levels)
    this.c = color(c.levels[0], c.levels[1], c.levels[2], 90);
  }
  show() {
    push();
    translate(this.x, this.y);
    angleMode(DEGREES);
    rotate(this.a);
    angleMode(RADIANS);
    let angle = TWO_PI / 8;
    fill(this.c);
    noStroke();
    let counter = 0;
    let prevX1 = null;
    let prevY1 = null;
    let prevX2 = null;
    let prevY2 = null;
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx1 = 0 + cos(a) * this.r;
      let sy1 = 0 + sin(a) * this.r;
      let sx2 = 0 + cos(a) * this.r * 100;
      let sy2 = 0 + sin(a) * this.r * 100;
      if (counter % 2 !== 0) {
        beginShape();
        vertex(prevX1, prevY1);
        vertex(sx1, sy1);
        vertex(sx2, sy2);
        vertex(prevX2, prevY2);
        endShape(CLOSE);
      }
      prevX1 = sx1;
      prevY1 = sy1;
      prevX2 = sx2;
      prevY2 = sy2;
      counter++;
    }
    pop();
  }
}
let octagon;
let dangerousOctagon;
let backgroundOctagon;
let dangerousVelocity;
let radius;
let radiusThreshold;
let increased;
let rotation;
let increasedRotation;
let mouseRotation;
let defaultColor;
let defaultColorLight;
let centerX;
let centerY;
let playing;
let button;
let startTime;
let label;
function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent('parent');
  radius = 40;
  radiusThreshold = 40;
  increased = false;
  rotation = 0;
  increasedRotation = false;
  dangerousVelocity = 1;
  mouseRotation = 0;
  centerX = width / 2;
  centerY = height / 2;
  playing = false;
  generateColors();
  button = createButton('Iniciar jogo');
  button.parent('parent');
  configureButton();
  button.mousePressed(onIniciar);
  octagon = new Octagon(centerX, centerY, radius);
  dangerousOctagon = new DangerousOctagon(centerX, centerY, dangerousVelocity);
  backgroundOctagon = new Background(centerX, centerY, radius);
}
function draw() {
  if (playing) {
    background(defaultColor);
    if (radius === radiusThreshold) {
      newRadiusThreshold();
    }
    if (radius < radiusThreshold) {
      radius += 0.5;
    } else {
      radius -= 0.5;
    }
    if (increasedRotation) {
      rotation += 0.5;
    } else {
      rotation -= 0.5;
    }
    if (keyIsDown(LEFT_ARROW)) {
      mouseRotation--;
    } else if (keyIsDown(RIGHT_ARROW)) {
      mouseRotation++;
    }
    octagon.setStroke(defaultColorLight);
    octagon.setRadius(radius);
    octagon.setRotation(rotation);
    octagon.show();
    dangerousOctagon.setStroke(defaultColorLight);
    dangerousOctagon.update();
    dangerousOctagon.setRotation(rotation);
    dangerousOctagon.show();
    if (dangerousOctagon.getRadius() <= radius) {
      generateColors();
      dangerousVelocity += 0.025
      dangerousOctagon = new DangerousOctagon(centerX, centerY, dangerousVelocity);
      dangerousOctagon.setStroke(defaultColorLight);
      octagon.setStroke(defaultColorLight);
    }
    backgroundOctagon.setColor(defaultColorLight);
    backgroundOctagon.setRadius(radius);
    backgroundOctagon.setRotation(rotation);
    backgroundOctagon.show();
    const points = createTriangle(radius - 45, mouseRotation);
    for (let point of points) {
      const collides = dangerousOctagon.edges(point, mouseRotation);
      if (collides) {
        playing = false;
        configureButton();
      }
    }
    let timeRun = (new Date() - startTime) / 1000;
    textSize(32);
    fill(defaultColorLight)
    text(timeRun, 10, 35);
  }
}
function generateColors() {
  const r = random(0, 100);
  const g = random(0, 100);
  const b = random(0, 100);
  defaultColor = color(r, g, b);
  defaultColorLight = color(r + 80, g + 80, b + 80);
}
function newRadiusThreshold() {
  if (increased) {
    radiusThreshold = round(random(25, radiusThreshold - 50));
    increasedRotation = !increasedRotation;
  } else {
    radiusThreshold = round(random(radiusThreshold + 50, 100));
  }
  increased = !increased;
}
function createTriangle(radius, a) {
  push();
  translate(centerX, centerY);
  angleMode(DEGREES);
  rotate(a);
  noStroke();
  fill(defaultColorLight);
  const pointA = {
    x: -6,
    y: -60 - radius
  };
  const pointB = {
    x: 6,
    y: -60 - radius
  };
  const pointC = {
    x: 0,
    y: -75 - radius
  };
  triangle(pointA.x, pointA.y, pointB.x, pointB.y, pointC.x, pointC.y);
  pop();
  return [
    pointA,
    pointB,
    pointC
  ];
}
function onIniciar() {
  button.position(-500, -500);
  playing = true;
  dangerousOctagon = new DangerousOctagon(centerX, centerY, dangerousVelocity);
  dangerousOctagon.setStroke(defaultColorLight);
  generateColors();
  startTime = new Date();
}
function configureButton() {
  button.style("height", "50px");
  button.style("width", "150px");
  button.style("border", "none");
  button.style("border-radius", "10px");
  button.style("outline", "none");
  button.style("font-size", "20px");
  button.style("font-family", '"Consolas", monospace');
  button.style("color", `rgb(${defaultColor.levels[0]},${defaultColor.levels[1]},${defaultColor.levels[2]})`)
  button.style("background-color", `rgb(${defaultColorLight.levels[0]},${defaultColorLight.levels[1]},${defaultColorLight.levels[2]})`);
  button.position(centerX - 75, centerY + 25);
}
</script>
{% endraw %}