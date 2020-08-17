---
title: Algoritmos que eu não sabia que queria conhecer
date: "2020-09-08T22:00:00.169Z"
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend scelerisque mi, eu laoreet lectus aliquam at. Maecenas dolor magna, pellentesque eu urna et, tempor rutrum est. Donec eget varius lorem. Aliquam pretium, ligula nec molestie vestibulum, nulla dolor faucibus est, scelerisque convallis mauris enim et tortor. Etiam vitae ultrices risus. Aenean vel diam non enim ultrices ultrices. Fusce quis odio vitae risus faucibus tempor. Maecenas non egestas lacus, vel aliquam eros. Integer ultricies tempus cursus. Proin vestibulum, urna quis iaculis molestie, ex est laoreet dolor, et suscipit odio justo et metus. Nulla tincidunt urna vel tellus pharetra ultricies. Nulla tristique metus sollicitudin tortor iaculis eleifend. Aenean auctor justo ac nibh condimentum, laoreet tempus tortor consequat. Integer a nunc felis. Sed eget tristique mauris.

Vivamus et eleifend mauris, sed vestibulum dolor. Duis suscipit, augue ac auctor iaculis, risus quam pretium neque, nec vestibulum sem turpis quis libero. Cras sit amet felis odio. Vestibulum pretium mattis eros, in iaculis mi viverra sit amet. Praesent sapien enim, mollis sit amet ante eu, facilisis tincidunt sem. Ut commodo magna diam, eu consectetur felis ullamcorper a. Aenean in tempor dolor. Pellentesque sodales commodo sem, sit amet vulputate nisl vehicula sed. Vestibulum ac lacinia eros. Suspendisse at ante maximus, maximus ex in, euismod nulla. Integer molestie et sem condimentum varius. Donec pretium dapibus feugiat. Maecenas placerat, libero vel scelerisque vulputate, neque orci ornare velit, ac malesuada turpis diam in massa. In ac dictum quam. Vestibulum ut leo a orci blandit dignissim in vitae eros. Praesent mattis euismod erat nec pretium.

Donec aliquam tincidunt suscipit. Proin mi eros, auctor sit amet dolor ut, dapibus iaculis neque. Nulla mollis lectus in odio pulvinar mollis. Phasellus eget justo sollicitudin, rutrum nunc ac, vehicula nulla. Ut rutrum, magna et lobortis imperdiet, dolor nisi gravida libero, ut volutpat orci orci sit amet dui. Nunc faucibus lacus nec varius mollis. Sed et faucibus purus. Sed hendrerit felis quis bibendum sollicitudin. Morbi accumsan fermentum elit, et pulvinar lorem gravida nec.

Ut ac sapien laoreet, laoreet sapien nec, laoreet risus. Aenean tempor at nisl vitae faucibus. Ut tellus elit, ullamcorper nec leo sit amet, aliquam porta felis. Aliquam a elementum purus, nec malesuada tortor. Cras maximus arcu tortor, et tincidunt justo laoreet at. Pellentesque dictum in enim sed fringilla. Ut vestibulum tincidunt dolor, vel tincidunt felis. Maecenas fermentum tortor ut eros semper, quis consectetur dui fringilla.

Mauris sit amet metus orci. Nunc semper enim sit amet massa pellentesque, sit amet faucibus orci laoreet. Pellentesque tincidunt aliquet leo eu iaculis. Integer id pulvinar nunc. Quisque nec nunc bibendum, bibendum orci vitae, imperdiet purus. Cras at eros non ex tincidunt mollis vel sit amet sapien. Aliquam in orci quam. Phasellus sit amet condimentum diam, in mollis metus. Donec rhoncus gravida mauris id porttitor. 


{% raw %}
<style>
#parent {
  position: fixed;
  top: 0;
  left: 0;
}
p {
  color: #c9cacc !important;
}
p:after {
  color: rgb(30, 30, 30); 
  mix-blend-mode: difference;
}
.py4 {
  background-color: rgba(30,30,30,0.95);
  padding-right: 20px;
  padding-left: 20px;
  margin-top: 10px;
}
#footer {
  padding-right: 40px;
}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>
<script>
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.prevPos = this.pos.copy();
    this.color = color(random(255),random(255),random(255))
  }
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  show() {
    stroke(this.color);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }
  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
let inc = 0.1;
let scl = 10;
let cols, rows;
let zoff = 0;
let particles = [];
let flowfield = [];
function createParent() {
  const parent = document.createElement('div');
  parent.id = 'parent';
  const menu = document.getElementById('header-post');
  const body = document.querySelector("body");
  body.insertBefore(parent, menu);
}
function setup() {
  createParent();
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('parent');
  cols = floor(width / scl);
  rows = floor(height / scl);
  for (let i = 0; i < 500; i++) {
    particles[i] = new Particle();
  }
  background(30);
}
function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
    }
    yoff += inc;
    zoff += 0.0003;
  }
  for (let particle of particles) {
    particle.follow(flowfield);
    particle.update();
    particle.edges();
    particle.show();
  }
}
</script>
{% endraw %}