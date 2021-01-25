---
title: Algoritmos que eu não sabia que queria conhecer
date: "2020-09-15T22:00:00.169Z"
---

Desde que comecei a assistir os vídeos do [Coding Train](https://thecodingtrain.com/) tenho conhecido diversos algoritmos que nunca havia ouvido anteriormente, mas que me chamaram bastante a atenção por serem divertidos de implementar. Em seus vídeos, Daniel Shiffman aplica a maioria destes algoritmos a um canvas, gerando imagens um tanto quanto interessantes.

Selecionei alguns dos algoritmos de seus vídeos para descrever rapidamente aqui.

## Perlin Noise

Perlin Noise é um algoritmo utilizado para geração de ruídos. Ele se diferencia da geração de ruídos aleatórios pois busca fazer isso de forma mais suave, podendo ser utilizado para gerações de elementos visuais mais realista.

Alguns dos vídeos que apresentam exemplos desse algoritmo são o [Flow Field](https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html) e o [Polar Loops](https://thecodingtrain.com/CodingChallenges/136.1-polar-perlin-noise-loops.html)

No background deste artigo faço uma implementação do **Flow Field**, que utiliza bastante o conceito do Perlin Noise para criar os caminhos das linhas.

## Marching Squares

Um outro algoritmo divertido para aplicação em geração de campos procedurais é o [Marching Squares](https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html). Este algoritmo é utilizado para criação de contornos em campos 2D, que podem ser bastante utilizados em criação de terrenos em jogos.

No vídeo do Daniel Shiffman, ele faz uma implementação do Marching Squares utilizando em conjunto com o perlin noise gerando imagens que você pode ver no gif abaixo.

![Marching Squares](/images/fluid/marchingSquares.gif)

## Ray Casting

Este já é um algoritmo um pouco mais conhecido e bastante utilizado na indústria de jogos. O objetivo dele é conseguir encontrar os pontos de colisão de raios saídos de um objeto. Este algoritmo é a base da exibição de iluminações em jogos 3D. No gif abaixo você pode ver um exemplo deste algoritmo em execução.

![Ray Casting](/images/fluid/rayCasting.gif)

Este algoritmo é explicado mais profundamente [neste tutorial](https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html) do Daniel Shiffman.

## Conclusão

A diversão dos algoritmos que descrevi brevemente aqui é que todos podem ser utilizados para geração de imagens, podendo ser utilizado para criação de arte generativa, ou até mesmo no desenvolvimento de jogos.

Algumas recomendações legais caso você deseje continuar a estudar outros algoritmos são os tutoriais de [simulação de fluidos](https://thecodingtrain.com/CodingChallenges/132-fluid-simulation.html) e [simulação de fogo](https://thecodingtrain.com/CodingChallenges/103-fire-effect.html).

{% raw %}
<style>
a {
  font-weight: bold;
}
code, h2, a {
  color: #c9cacc !important;
}
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
  z-index: 200;
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