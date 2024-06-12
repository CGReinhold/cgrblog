---
title: Experimentos em Programação Criativa
date: "2023-08-01T22:00:00.169Z"
---

Há alguns anos passei a ter um interesse por programação criativa, e apesar de consumir bastante conteúdo sobre o tema, foram poucas as vezes que de fato implementei algo.

Com várias imagens e gifs de inspiração salvas nesse tempo, quero começar a tentar implementar cada uma dessas ideias. Esses artigos são principalmente criados como uma forma de catalogar o processo de implementação para referencia futura quando eu estiver desenvolvendo novas coisas.

## Inspiração

A primeira imagem que tentei replicar através de código é essa:

![Nonagono com pontos conectando as extremidades](/images/creative-coding/part-1/cc-1.png)

E o meu resultado é o seguinte:

![Um parecido nonagono com pontos conectando as extremidades](/images/creative-coding/part-1/cc-2.png)

## Implementação

Para implementação dos algoritmos, tenho usado o [editor do p5](https://editor.p5js.org).

Este editor utiliza a própria biblioteca do p5.js, e já conta com um código boilerplate com duas funções: `setup`, que é disparado antes que qualquer coisa seja desenhada no canvas, e `draw` que é o loop onde atualizamos o canvas.

```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
```

## Passo 1

Decidi começar de forma simples, apenas adicionando um polígono no centro da imagem. O p5.js possui algumas funções auxiliares para circulos e quadrados, mas para polígonos o mais fácil é começar adicionando pontos na tela e depois conectá-los.

Como queremos fazer polígonos regulares, onde todos os lados sejam iguais, podemos calcular os pontos com base no seno e coseno de um ângulo, e incrementar esse angulo com base na quantidade de lados

```js
function draw() {
  noLoop() // para evitar que a tela atualize muitas vezes
  background(255)
  strokeWeight(5) // grossura dos pontos/linhas
  
  const sides = 8
  const radius = 100
  let angle = 0
  
  for (let i = 0; i < sides; i++) {
    const pointX = radius * sin(angle)
    const pointY = radius * cos(angle)
    
    point(pointX + width/2, pointY + height/2)
    
    angle = angle + TWO_PI / sides
  }
}
```

![Pontos no canvas](/images/creative-coding/part-1/cc-3.png)

Para conectar os pontos, podemos ao invés de usar a função `point(x, y)`, usarmos o `vertex(x, y)` em conjunto com `beginShape()` e `endShape(CLOSE)`.

```js
function draw() {
  noLoop()
  background(255)
  strokeWeight(5)
  noFill() // Para que o polígono não seja preenchido
  
  const vertexes = getPoligonVertexes()
  
  beginShape()
  for (let i = 0; i < vertexes.length; i++) {
    vertex(vertexes[i].x, vertexes[i].y)
  }
  endShape(CLOSE)
}

function getPoligonVertexes(radius = 100, sides = 8) {
  const vertexes = []
  let angle = 0
  
  for (let i = 0; i < sides; i++) {
    const pointX = radius * sin(angle)
    const pointY = radius * cos(angle)
    
    const vector = createVector(pointX + width / 2, pointY + height / 2)
    vertexes.push(vector)
    
    angle = angle + TWO_PI / sides
  }

  return vertexes
}
```

![Polígono completo](/images/creative-coding/part-1/cc-4.png)

## Passo 2

O próximo passo foi adicionar os tentáculos saindo do polígono. Pensei em duas formas que isso poderia ser feito: 1. selecionar pontos aleatórios ao redor do polígono e conectá-los à extremidade mais próxima, ou 2. selecionar pontos aleatórios nas extremidades e caminhar até algum ponto mais distante.

Em minha implementação escolhei a primeira opção. Para isso criei uma função que gera pontos a partir de um ângulo aleatório, e posiciono ele em um raio próximo ao raio de nosso polígono.

```js
function draw() {
  ...

  const dots = getDots()
  
  for (let i = 0; i < dots.length; i++) {
    point(dots[i].x, dots[i].y)
  }
}

function getDots(count = 100) {
  const minRadius = width / 5
  const maxRadius = width / 3
  const dots = []
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * TWO_PI
    const x = Math.cos(angle) * random(minRadius, maxRadius) + width / 2
    const y = Math.sin(angle) * random(minRadius, maxRadius) + height / 2

    const vector = createVector(x, y)
    dots.push(vector)
  }
  return dots
}
```

![Polígono e pontos](/images/creative-coding/part-1/cc-5.png)

Para conectar esses pontos ao polígono pedi ajuda para o ChatGPT. Aparentemente a forma mais simples é encontrar o ponto de menor distância entre um vértice e um segmento de linha, e fazer isso para todas as arestas de um polígono. Assim conseguimos encontrar qual o ponto mais próximo do vértice e do polígono. O próprio ChatGPT me ajudou criando o código para essa etapa:

```js
function getClosestPolygonVertex(vertex, polygonVertexes = []) {
  let closest
  let closestDistance = Infinity

  for (let i = 0; i < polygonVertexes.length; i++) {
    // Loop entre os vertices do polígonos, pegando o atual e o seguinte, que formam a linha
    const isLast = (i+1) === polygonVertexes.length
    const v1 = polygonVertexes[i]
    const v2 = polygonVertexes[isLast ? 0 : i+1]
    
    const closestPoint = getClosestPointFromVertexToLine(vertex, v1, v2)
    const distance = distanceFromVertexes(vertex, closestPoint)
    
    if (distance < closestDistance) {
      closestDistance = distance
      closest = closestPoint
    }
  }
  
  return closest
}

function getClosestPointFromVertexToLine(vertex, lineStart, lineEnd) {
  // Calculate the vector representing the line segment
  const lineSegmentVector = createVector(lineEnd.x - lineStart.x, lineEnd.y - lineStart.y)
  
  // Calculate the vector from the line segment start to the vertex
  const vertexVector = createVector(vertex.x - lineStart.x, vertex.y - lineStart.y)

  // Calculate the dot product of the line segment vector and the vertex vector
  const dotProduct = lineSegmentVector.x * vertexVector.x + lineSegmentVector.y * vertexVector.y;

  // Calculate the squared length of the line segment vector
  const squaredLength = lineSegmentVector.x * lineSegmentVector.x + lineSegmentVector.y * lineSegmentVector.y;

  // Calculate the parameter value of the closest point on the line segment to the vertex
  const t = Math.max(0, Math.min(1, dotProduct / squaredLength));

  // Calculate the coordinates of the closest point on the line segment
  const closestPoint = createVector(lineStart.x + t * lineSegmentVector.x, lineStart.y + t * lineSegmentVector.y)

  return closestPoint
}

function distanceFromVertexes(vertex1, vertex2) {
  return Math.sqrt(
    (vertex1.x - vertex2.x) * (vertex1.x - vertex2.x) +
    (vertex1.y - vertex2.y) * (vertex1.y - vertex2.y)
  )
}
```

Com essas funções, podemos atualizar o método `draw` para desenhar a linha entre os pontos e o polígono:

```js
function draw() {
  ...
  
  const dots = getDots()

  for (let i = 0; i < dots.length; i++) {
    // Desenhando o ponto
    strokeWeight(10)
    point(dots[i].x, dots[i].y)

    // Desenhando a linha
    strokeWeight(2) // Alterando a largura entre o ponto e a linha
    beginShape()
    vertex(dots[i].x, dots[i].y)
    const closestPolygonVertex = getClosestPolygonVertex(dots[i], vertexes)
    vertex(closestPolygonVertex.x, closestPolygonVertex.y)
    endShape(CLOSE) 
  }
}
```

![Polígono e pontos conectados](/images/creative-coding/part-1/cc-6.png)

## Passo 3

O terceiro e último passo de minha implementação foi deixas os tentáculos curvados, ao invés de simples linhas retas. Para isso, uma forma fácil é segmentar a reta em `n` pontos e movê-los de forma aleatória para uma direção próxima.

![Segmentos do tentáculo](/images/creative-coding/part-1/cc-7.png)
![Segmentos do tentáculo com movimento](/images/creative-coding/part-1/cc-8.png)

Para segmentar a linha, pedi uma nova ajuda ao ChatGPT:

```js
function segmentizeLine(lineSegmentStart, lineSegmentEnd, segmentCount = 10) {
  const points = [];
  const dx = (lineSegmentEnd.x - lineSegmentStart.x) / (segmentCount - 1);
  const dy = (lineSegmentEnd.y - lineSegmentStart.y) / (segmentCount - 1);

  for (let i = 0; i < segmentCount; i++) {
    let x = lineSegmentStart.x + dx * i;
    let y = lineSegmentStart.y + dy * i;

    points.push({ x, y });
  }

  return points;
}
```

Fiz uma leve alteração para mover os segmentos centrais:

```js

function segmentizeLine(lineSegmentStart, lineSegmentEnd, segmentCount = 10) {
  const points = [];
  const dx = (lineSegmentEnd.x - lineSegmentStart.x) / (segmentCount - 1);
  const dy = (lineSegmentEnd.y - lineSegmentStart.y) / (segmentCount - 1);

  for (let i = 0; i < segmentCount; i++) {
    let x = lineSegmentStart.x + dx * i;
    let y = lineSegmentStart.y + dy * i;

    // Não queremos mover a posição do primeiro vértice e do vértice que encosta no polígono
    if (i > 0 && i < segmentCount-1) {
      x += random(0, 15)
      y += random(0, 15)
    }
    
    // Para utilizar a função `curveVertex` precisamos do primeiro e último vértices duplicados
    if (i === 0 || i === segmentCount-1) {
      points.push(createVector(x, y));  
    }
    
    points.push(createVector(x, y));
  }

  return points;
}
```

E utilizando essa função junto com o `curveVertex`, conseguimos ter os tentáculos curvos:

```js
function draw() {
  ...
  
  const dots = getDots()

  for (let i = 0; i < dots.length; i++) {
    stroke('black')
    strokeWeight(10)
    point(dots[i].x, dots[i].y)

    // Desenhando a linha
    strokeWeight(2) // Alterando a largura entre o ponto e a linha
    const closestPolygonVertex = getClosestPolygonVertex(dots[i], vertexes)
    const segments = segmentizeLine(dots[i], closestPolygonVertex, 6)
    beginShape()
    for (let j = 0; j < segments.length; j++) {
      curveVertex(segments[j].x, segments[j].y)
    }
    endShape() 
  }
}
```

Assim tempos o resultado final:

![Resultado final](/images/creative-coding/part-1/cc-9.png)

## Próximos passos

Para chegar mais próximo do original, algumas possível mudanças seriam:

- Alterar a forma como adicionamos aleatóriedade nos segmentos do tentáculo para ficarem menos distantes, talvez utilizando `noise` ao invés de `random`
- Alterar a aleatóriedade dos pontos para que não sejam gerados pontos tão próximos do polígono

Por mais que ainda possa ser melhorado, fiquei satisfeito com esse resultado e empolgado para começar um próximo. 


<details>
  <summary>
    Código completo
  </summary>
  <p>
    ```js
function setup() {
  createCanvas(400, 400)
}

function draw() {
  noLoop()
  background(255)
  strokeWeight(5)
  noFill() // Para que o polígono não seja preenchido
  
  const vertexes = getPoligonVertexes()
  
  beginShape()
  for (let i = 0; i < vertexes.length; i++) {
    vertex(vertexes[i].x, vertexes[i].y)
  }
  endShape(CLOSE)
  
  const dots = getDots()

  for (let i = 0; i < dots.length; i++) {
    stroke('black')
    strokeWeight(10)
    point(dots[i].x, dots[i].y)

    // Desenhando a linha
    strokeWeight(2) // Alterando a largura entre o ponto e a linha
    const closestPolygonVertex = getClosestPolygonVertex(dots[i], vertexes)
    const segments = segmentizeLine(dots[i], closestPolygonVertex, 6)
    beginShape()
    for (let j = 0; j < segments.length; j++) {
      curveVertex(segments[j].x, segments[j].y)
    }
    endShape() 
  }
}

function getPoligonVertexes(radius = 100, sides = 8) {
  const vertexes = []
  let angle = 0
  
  for (let i = 0; i < sides; i++) {
    const pointX = radius * sin(angle)
    const pointY = radius * cos(angle)
    
    const vector = createVector(pointX + width/2, pointY + height/2)
    vertexes.push(vector)
    
    angle = angle + TWO_PI / sides
  }

  return vertexes
}

function getDots(count = 100) {
  const minRadius = width / 6
  const maxRadius = width / 2.5
  const dots = []
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * TWO_PI
    const x = Math.cos(angle) * random(minRadius, maxRadius) + width / 2
    const y = Math.sin(angle) * random(minRadius, maxRadius) + height / 2

    const vector = createVector(x, y)
    dots.push(vector)
  }
  return dots
}

function getClosestPolygonVertex(vertex, polygonVertexes = []) {
  let closest
  let closestDistance = Infinity

  for (let i = 0; i < polygonVertexes.length; i++) {
    // Loop entre os vertices do polígonos, pegando o atual e o seguinte, que formam a linha
    const isLast = (i+1) === polygonVertexes.length
    const v1 = polygonVertexes[i]
    const v2 = polygonVertexes[isLast ? 0 : i+1]
    
    const closestPoint = getClosestPointFromVertexToLine(vertex, v1, v2)
    const distance = distanceFromVertexes(vertex, closestPoint)
    
    if (distance < closestDistance) {
      closestDistance = distance
      closest = closestPoint
    }
  }
  
  return closest
}

function getClosestPointFromVertexToLine(vertex, lineStart, lineEnd) {
  // Calculate the vector representing the line segment
  const lineSegmentVector = createVector(lineEnd.x - lineStart.x, lineEnd.y - lineStart.y)
  
  // Calculate the vector from the line segment start to the vertex
  const vertexVector = createVector(vertex.x - lineStart.x, vertex.y - lineStart.y)

  // Calculate the dot product of the line segment vector and the vertex vector
  const dotProduct = lineSegmentVector.x * vertexVector.x + lineSegmentVector.y * vertexVector.y;

  // Calculate the squared length of the line segment vector
  const squaredLength = lineSegmentVector.x * lineSegmentVector.x + lineSegmentVector.y * lineSegmentVector.y;

  // Calculate the parameter value of the closest point on the line segment to the vertex
  const t = Math.max(0, Math.min(1, dotProduct / squaredLength));

  // Calculate the coordinates of the closest point on the line segment
  const closestPoint = createVector(lineStart.x + t * lineSegmentVector.x, lineStart.y + t * lineSegmentVector.y)

  return closestPoint
}

function distanceFromVertexes(vertex1, vertex2) {
  return Math.sqrt(
    (vertex1.x - vertex2.x) * (vertex1.x - vertex2.x) +
    (vertex1.y - vertex2.y) * (vertex1.y - vertex2.y)
  )
}

function segmentizeLine(lineSegmentStart, lineSegmentEnd, segmentCount = 10) {
  const points = [];
  const dx = (lineSegmentEnd.x - lineSegmentStart.x) / (segmentCount - 1);
  const dy = (lineSegmentEnd.y - lineSegmentStart.y) / (segmentCount - 1);

  for (let i = 0; i < segmentCount; i++) {
    let x = lineSegmentStart.x + dx * i;
    let y = lineSegmentStart.y + dy * i;

    // Não queremos mover a posição do primeiro vértice e do vértice que encosta no polígono
    if (i > 0 && i < segmentCount-1) {
      x += random(0, 15)
      y += random(0, 15)
    }
    
    // Para utilizar a função `curveVertex` precisamos do primeiro e último vértices duplicados
    if (i === 0 || i === segmentCount-1) {
      points.push(createVector(x, y));  
    }
    
    points.push(createVector(x, y));
  }

  return points;
}
```
  </p>
</details>
