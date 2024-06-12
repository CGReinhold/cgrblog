---
title: Experimentos em Programação Criativa - 2
date: "2023-08-17T22:00:00.169Z"
---

Essa é mais uma tentativa de reproduzir uma imagem utilizando computação criativa, puramente para aprender coisas novas e passar o tempo. Esses artigos são principalmente criados como uma forma de catalogar o processo de implementação para referencia futura quando eu estiver desenvolvendo novas coisas.

## Inspiração

A imagem que tentei replicar através de código desta vez é a seguinte:

![Grid de pontos com uma linha ligando ](/images/creative-coding/part-2/cc-1.png)

E o meu resultado é o seguinte:

![Um parecido nonagono com pontos conectando as extremidades](/images/creative-coding/part-2/cc-2.png)

Bastante diferente do original, minha ideia era de fazer algo que a cada atualização mudasse o estilo, com quadrados e pontos maiores ou menores aleatóriamente.

## Implementação

Usarei novamento o [editor do p5](https://editor.p5js.org) para essa implementação.

## Passo 1

Começando de forma simples, vamos apenas adicionar a borda. Adicionei um cógigo boilerplate de início, definindo as corees do fundo e stroke, o tamanho da margem.

```js
let strokeColor = 10
let backgroundColor = 245
let frameMargin // distância entre o quadro e a borda do canvas

function setup() {
  createCanvas(windowWidth, windowHeight)
  frameMargin = round(random(50, 150))
}

function draw() {
  background(backgroundColor)
  drawFrame()
  noLoop()
}

function drawFrame() {
  noFill()
  strokeWeight(4)
  stroke(strokeColor)
  const startAt = [frameMargin, frameMargin]
  const size = [windowWidth - frameMargin * 2, windowHeight - frameMargin * 2]

  rect(...startAt, ...size)
  
  return [startAt, size]
}
```

![Canvas com apenas um quadrado](/images/creative-coding/part-2/cc-3.png)

## Passo 2

O segundo passo foi adicionar os pontos dentro do quadro. Criei primeiro uma função para gerar os pontos, utilizando alguns parâmetros para configurar os posicionamentos e tamanho dos pontos.

```js
let padding // distância entre o quadro e os pontos
let dotRadius // tamanho dos pontos
let dotPadding // distância entre os ponto

function setup() {
  ...
  padding = round(random(-100, 100))
  dotRadius = random(0.1, 10)
  dotPadding = round(random(15, 30))
}

function getDots(frameBorders) {
  const startAt = [
    frameBorders[0][0] + padding,
    frameBorders[0][1] + padding
  ]
  const endAt = [
    frameBorders[0][0] + frameBorders[1][0] - padding,
    frameBorders[0][1] + frameBorders[1][1] - padding
  ]
  
  let curLine = startAt[0]
  let col = startAt[1]
  const dots = []
  
  while (curLine < endAt[0]) {
    const columns = []
    while (col < endAt[1]) {
      const x = curLine + dotRadius / 2
      const y = col + dotRadius / 2
      columns.push(createVector(x, y))
      col += dotPadding
    }
    curLine += dotPadding
    col = startAt[1]
    dots.push(columns)
  }
  
  return dots
}
```

E com esses pontos, podemos fácilmente desenhá-los na tela. Adicionei também um parâmetro para definir se os círculos devem ser preenchidos ou não.

```js
let shouldFill // os pontos devem ser preenchidos?

function setup() {
  ...
  shouldFill = random() > 0.5
}

function draw() {
  ...
  const dots = getDots(frameBorders)
  drawDots(dots)
  ...
}

function drawDots(dots) {
  if (shouldFill) fill(strokeColor)
  
  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots[i].length; j++) {
      circle(dots[i][j].x, dots[i][j].y, dotRadius)
    }
  }
}
```

Assim podemos ter alguns resultados diferentes, como os seguintes

![Canvas pontos variante 1](/images/creative-coding/part-2/cc-4.png)
![Canvas pontos variante 2](/images/creative-coding/part-2/cc-5.png)
![Canvas pontos variante 3](/images/creative-coding/part-2/cc-6.png)

## Passo 3

O terceiro e último passo é desenhar a linha que atravessa o centro do quadro. O algoritmo para esse foi algo bem simples:

1. Primeiro encontramos o centro da tela e selecionamos o ponto da primeira coluna;
2. Enquanto tiver uma coluna a direita, escolhemos aleatóriamente um ponto acima ou abaixo;
3. Desenhamos uma linha entre os dois pontos

O código para isso pode ser visto abaixo

```
let lineRadius // largura da linha

function setup() {
  ...
  lineRadius = random(1, 20)
}

function draw() {
  ...
  drawWalker(dots)
  ...
}

function drawWalker(dots, startAtLine) {
  stroke(strokeColor)
  noFill()
  strokeWeight(lineRadius)
  strokeCap(ROUND) // para evitar que a linha fique com as pontas quadradas
  strokeJoin(ROUND) // para evitar que a linha fique com as juntas quadradas
  
  const middle = Math.round(dots[0].length / 2)
  let selectedLine = middle
  let selectedCol = 0
  let previousLine = middle
    
  beginShape()
  while (selectedCol < dots.length) {
    if (!dots[selectedCol] || !dots[selectedCol][selectedLine]) break
    const dot = dots[selectedCol][selectedLine]
    
    if (previousLine !== selectedLine) {
      const prevDot = dots[selectedCol][previousLine]
      vertex(prevDot.x, prevDot.y) // precisamos disso para que os pontos não sejam conectados diretamente, mas em 90º
    }
    
    vertex(dot.x, dot.y)

    previousLine = selectedLine
    const next = Math.round(random(-3, 3))
    selectedLine += next

    
    if (selectedLine < 0) selectedLine = 0
    if (selectedLine === dots[0].length) selectedLine = dots[0].length -1

    selectedCol++
  }
  endShape()
}
```

![Canvas com linha](/images/creative-coding/part-2/cc-7.png)

## Próximos passos

Algumas outras ideias para evoluir essa brincadeira seriam:

- Adicionar fendas ou laços como na imagem original, onde aleatóriamente poderiams quebrar a linha
- Usar uma biblioteca, como o [dat.gui](https://github.com/dataarts/dat.gui) para configurar as variáveis em tempo real, sem precisar executar o algoritmo múltiplas vezes para novos resultados


<details>
  <summary>
    Código completo
  </summary>
  <p>
    ```js
let strokeColor = 10
let backgroundColor = 245
let frameMargin // distância entre o quadro e a borda do canvas
let padding // distância entre o quadro e os pontos
let dotRadius // tamanho dos pontos
let dotPadding // distância entre os ponto
let shouldFill // os pontos devem ser vazados?
let lineRadius // largura da linha

function setup() {
  createCanvas(windowWidth, windowHeight)
  frameMargin = round(random(50, 150))
  padding = round(random(-100, 100))
  dotRadius = random(0.1, 10)
  dotPadding = round(random(15, 30))
  shouldFill = random() > 0.5
  lineRadius = random(1, 20)
}

function draw() {
  background(backgroundColor)
  const frameBorders = drawFrame()
  const dots = getDots(frameBorders)
  drawDots(dots)
  drawWalker(dots)
  noLoop()
}

function drawFrame() {
  noFill()
  strokeWeight(4)
  stroke(strokeColor)
  const startAt = [frameMargin, frameMargin]
  const size = [windowWidth - frameMargin * 2, windowHeight - frameMargin * 2]

  rect(...startAt, ...size)
  
  return [startAt, size]
}

function getDots(frameBorders) {
  const startAt = [
    frameBorders[0][0] + padding,
    frameBorders[0][1] + padding
  ]
  const endAt = [
    frameBorders[0][0] + frameBorders[1][0] - padding,
    frameBorders[0][1] + frameBorders[1][1] - padding
  ]
  
  let curLine = startAt[0]
  let col = startAt[1]
  const dots = []
  
  while (curLine < endAt[0]) {
    const columns = []
    while (col < endAt[1]) {
      const x = curLine + dotRadius / 2
      const y = col + dotRadius / 2
      columns.push(createVector(x, y))
      col += dotPadding
    }
    curLine += dotPadding
    col = startAt[1]
    dots.push(columns)
  }
  
  return dots
}

function drawDots(dots) {
  if (shouldFill) fill(strokeColor)
  
  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots[i].length; j++) {
      circle(dots[i][j].x, dots[i][j].y, dotRadius)
    }
  }
}

function drawWalker(dots, startAtLine) {
  stroke(strokeColor)
  noFill()
  strokeWeight(lineRadius)
  strokeCap(ROUND) // para evitar que a linha fique com as pontas quadradas
  strokeJoin(ROUND) // para evitar que a linha fique com as juntas quadradas
  
  const middle = Math.round(dots[0].length / 2)
  let selectedLine = middle
  let selectedCol = 0
  let previousLine = middle
    
  beginShape()
  while (selectedCol < dots.length) {
    if (!dots[selectedCol] || !dots[selectedCol][selectedLine]) break
    const dot = dots[selectedCol][selectedLine]
    
    if (previousLine !== selectedLine) {
      const prevDot = dots[selectedCol][previousLine]
      vertex(prevDot.x, prevDot.y)
    }
    
    vertex(dot.x, dot.y)

    previousLine = selectedLine
    const next = Math.round(random(-3, 3))
    selectedLine += next
    
    if (selectedLine < 0) selectedLine = 0
    if (selectedLine === dots[0].length) selectedLine = dots[0].length -1

    selectedCol++
  }
  endShape()
}
```
  </p>
</details>
