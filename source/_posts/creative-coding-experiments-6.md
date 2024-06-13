---
title: Campo de Fluxo - Experimentos em Programação Criativa - 6
date: "2023-09-21T22:00:00.169Z"
---

Essa é mais uma tentativa de reproduzir uma imagem utilizando computação criativa, puramente para aprender coisas novas e passar o tempo. Esses artigos são principalmente criados como uma forma de catalogar o processo de implementação para referencia futura quando eu estiver desenvolvendo novas coisas.

## Inspiração

A imagem que tentei replicar através de código desta vez é a seguinte:

![Linhas rotacionadas em um fluxo direcional dentro de um círculo](/images/creative-coding/part-6/cc-1.png)

E o meu resultado é o seguinte:

![Linhas rotacionadas em um fluxo direcional dentro de um círculo de forma parecida](/images/creative-coding/part-6/cc-2.png)

## Implementação

Usarei novamento o [editor do p5](https://editor.p5js.org) para essa implementação.

## Passo 1

Seguindo a mesma onde do artigo anterior, utilizei como base o código do Daniel Shiffman ensinado [neste vídeo](https://thecodingtrain.com/challenges/24-perlin-noise-flow-field). No vídeo, um algoritmo para _flow fields_ é ensinado, e essa é a principal parte necessária para o resultado final.

Seguindo o tutorial, conseguimos o seguinte código como base para o nosso projeto:

```js
const inc = 0.02
const scl = 10
let cols, rows

function setup() {
  createCanvas(600, 600)
  cols = floor(width / scl)
  rows = floor(height / scl)
  
  background(0)
  noLoop()
}

function draw() {
  noStroke()
  let yoff = 0
  for (let y = 0; y < rows; y++) {
    let xoff = 0
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols
      const angle = noise(xoff, yoff) * TWO_PI * 4
      const v = p5.Vector.fromAngle(angle)
      xoff += inc
      stroke(255)
      strokeWeight(2)
      push();
      translate(x * scl, y * scl)
      rotate(v.heading())
      line(0, 0, scl, 0)
      pop()
    }
    yoff += inc
  }
}
```

Retornando esse resultado

![Linhas rotacionadas em um fluxo direcional](/images/creative-coding/part-6/cc-3.png)

## Passo 2

Na sequência podemos adicionar as cores e ajustar um pouco as linhas.

Começando pelas cores, podemos adicionar cores aleatórias para as linhas com base em uma lista de cores pré-selecionadas, e atualizar o background

```js
const colors = ['#ff0026', '#ff3400', '#ea3d96', '#7a62a4', '#ffea00', '#98398f', '#839db2', '#0ead00', '#578400']


function setup() {
  ...  
  background('#ffd000')
}

function draw() {
  ...
  for (let y = 0; y < rows; y++) {
    ...
    for (let x = 0; x < cols; x++) {
      ...
      
      const c = colors[int(random(0, colors.length))]
      stroke(c)
      fill(c)
      strokeWeight(2)

      ...
    }
    ...
  }
}
```

![Linhas coloridas rotacionadas em um fluxo direcional](/images/creative-coding/part-6/cc-4.png)

Podemos também alterar a função que desenha a linha para adicionar algumas colas e um pouco de aleatoriedade em quando as linhas devem ou não aparecer

```js
function draw() {
  ...
  for (let y = 0; y < rows; y++) {
    ...
    for (let x = 0; x < cols; x++) {
      ...
      drawLine(scl)
      ...
    }
    ...
  }
}

function drawLine(size) {
  if (random() < 0.9) {
    line(0, 0, size, 0)
  }
  
  if (random() < 0.7) {
    circle(0, 0, 2)
  }
}
```

![Linhas coloridas rotacionadas em um fluxo direcional](/images/creative-coding/part-6/cc-5.png)

## Passo 3

Agora, vamos adicionar uma máscara para que o _flow field_ apareça apenas dentro de um círculo, e não on canvas inteiro.

O p5.js não possui nenhuma função específica para isso, mas como o código é executado em um canvas HTML, podemos utilizar a própria função dele para isso. [Essa discussão](https://github.com/processing/p5.js/issues/3998#issuecomment-670270414) nas issues do p5.js explica melhor como isso pode ser usado.

No nosso código, podemos adicionar da seguinte forma:

```js
function draw() {
  drawingContext.save()  
  fill('#bfc187')
  circle(width / 2, height / 2, height / 1.5)
  drawingContext.clip()

  ...
}
```

Obtendo esse resultado:

![Linhas coloridas rotacionadas em um fluxo direcional dentro de um círculo](/images/creative-coding/part-6/cc-6.png)

## Passo 4

O último passo é adicionar uma granularidade para a tela, assim como na imagem original. 

Para isso, trapaceei pedindo ao ChatGPT para gerar um código que "granule" o canvas. O resultado foi esse:

```js
function draw() {
  ...
  applyGrainyFilter()
}

function applyGrainyFilter() {
  loadPixels();
  const length = 20
  for (let i = 0; i < pixels.length; i += 4) {
    // Add random noise to the red, green, and blue channels
    pixels[i] += random(-length, length);
    pixels[i + 1] += random(-length, length);
    pixels[i + 2] += random(-length, length);
  }
  updatePixels();
}
```

![Linhas coloridas rotacionadas em um fluxo direcional dentro de um círculo em um canvas granulado](/images/creative-coding/part-6/cc-7.png)

## Próximos passos

Algumas ideias para avançar mais nesse projeto seriam brincar com a função de _drawLine_ para chegar mais próximo do resultado original, ou tentar encontrar uma paleta de cores mais semelhantes.

<details>
  <summary>
    Código completo
  </summary>
  <p>
    ```js
const inc = 0.02
const scl = 10
let cols, rows
const colors = ['#ff0026', '#ff3400', '#ea3d96', '#7a62a4', '#ffea00', '#98398f', '#839db2', '#0ead00', '#578400']

function setup() {
  createCanvas(600, 600)
  cols = floor(width / scl)
  rows = floor(height / scl)
  
  background('#ffd000')
  noLoop()
}

function draw() {
  noStroke()
  
  // https://github.com/processing/p5.js/issues/3998#issuecomment-670270414
  drawingContext.save()  
  fill('#bfc187')
  circle(width / 2, height / 2, height / 1.5)
  drawingContext.clip()

  // https://thecodingtrain.com/challenges/24-perlin-noise-flow-field
  let yoff = 0
  for (let y = 0; y < rows; y++) {
    let xoff = 0
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols
      const angle = noise(xoff, yoff) * TWO_PI * 4
      const v = p5.Vector.fromAngle(angle)
      xoff += inc
      
      const c = colors[int(random(0, colors.length))]
      stroke(c)
      fill(c)
      strokeWeight(2)

      push();
      translate(x * scl, y * scl)
      rotate(v.heading())
      drawLine(scl)
      pop()
    }
    yoff += inc
  }
  
  applyGrainyFilter()
}

function drawLine(size) {
  if (random() < 0.9) {
    line(0, 0, size, 0)
  }
  
  if (random() < 0.7) {
    circle(0, 0, 2)
  }
}

function applyGrainyFilter() {
  loadPixels();
  const length = 20
  for (let i = 0; i < pixels.length; i += 4) {
    // Add random noise to the red, green, and blue channels
    pixels[i] += random(-length, length);
    pixels[i + 1] += random(-length, length);
    pixels[i + 2] += random(-length, length);
  }
  updatePixels();
}
```
  </p>
</details>
