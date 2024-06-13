---
title: Wings - Experimentos em Programação Criativa - 9
date: "2024-06-06T22:00:00.169Z"
---

Essa é mais uma tentativa de reproduzir uma imagem utilizando computação criativa. Como nas últimas vezes, o objetivo dessa tentativa é de utilizar uma inspiração para aprender técnicas e conceitos novos. Esses artigos são principalmente criados como uma forma de catalogar o processo de implementação para referencia futura quando eu estiver desenvolvendo novas coisas.

## Inspiração

Desta vez, uma das imagens que eu tinha salvo como inspiração é a capa do album Wings da banda BTS:

![Álbum Wings da banda BTS](/images/creative-coding/part-9/cc-1.png)

Nessa imagem, quatro círculos são desenhados com diferentes estilos. A proposta não é desenvolver algo 100% fiel, mas que relembre essa capa.

O resultado foi o seguinte:

![Reprodução da capa do álbum](/images/creative-coding/part-9/cc-2.png)

## Implementação

Usarei novamento o [editor do p5](https://editor.p5js.org) para essa implementação, dessa vez com a modalidade WEBGL.

## Passo 1

Começando pelo círculo do canto inferior direito, que é representado apenas como um círculo preto com gradiente, podemos iniciar o nosso canvas apenas desenhando um círculo na posição correta.

```js
const diameter = 150

function setup() {
  createCanvas(450, 450)
}

function draw() {
  background(255)
  
  drawGradientCircle(width / 3 * 2, height / 3 * 2)

  noLoop()
}

function drawGradientCircle(x, y) {
  ellipse(x, y, diameter, diameter)
}
```

Com esse código inicial criamos um círculo na posição correta do canvas

![Círculo no canvas](/images/creative-coding/part-9/cc-3.png)

Para gerar a sensação de gradiente, vamos simplesmente adicionar círculos menores na frente deste círculo, diminuindo a cor interna de cada um

```js
function drawGradientCircle(x, y) {
  let h = 0
  noStroke()
  for (let r = diameter; r > 0; --r) {
    fill(h);
    ellipse(x, y, r, r);
    h += 0.6
    y += 0.2
    x += 0.1
  }
}
```

Resultando no nosso primeiro círculo completo:

![Círculo com gradiente](/images/creative-coding/part-9/cc-4.png)

## Passo 2

O segundo círculo será o superior direito, com as listras. O desafio nesse círculo é que as listras fazem um ziguezague.

Para isso, vamos criar uma função que calcula um ponto no canvas com base em 1. um ponto inicial, 2. uma distancia do ponto inicial, e 3. o ângulo em que o novo ponto estará posicionado. Com isso, podemos criar uma forma de quatro pontos que se assemelha ao objetivo.

```js
function draw() {
  ...
  drawLineCircle(width / 3 * 2, height / 3)
  ...
}

function drawLineCircle(x, y) {
  noFill()
  stroke(0)
  strokeWeight(8)
  
  beginShape()
  const firstPoint = { x: x - diameter/2, y }
  vertex(firstPoint.x, firstPoint.y)
  const secondPoint = calculatePoint(firstPoint, 60 * (PI/180), 50)
  vertex(secondPoint.x, secondPoint.y)
  const thirdPoint = calculatePoint(secondPoint, -20 * (PI/180), 140)
  vertex(thirdPoint.x, thirdPoint.y)
  const forthPoint = calculatePoint(thirdPoint, 60 * (PI/180), 50)
  vertex(forthPoint.x, forthPoint.y)
  endShape()
}

function calculatePoint(initialPoint, angle, distance) {
    return {
      x: initialPoint.x + distance * Math.cos(angle),
      y: initialPoint.y + distance * Math.sin(angle)
    }
}
```

![Ziguezague no canvas](/images/creative-coding/part-9/cc-5.png)

Na sequência, fazemos um loop para desenhar esse ziguezague algumas vezes no canvas

```js
function drawLineCircle(x, y) {
  noFill()
  stroke(0)
  strokeWeight(8)
  
  let bufferY = y - 100
  let bufferX = x - diameter/2 + 10
  for(let i = 0; i < 16; i++) {
    beginShape()
    const firstPoint = { x: bufferX, y: bufferY }
    vertex(firstPoint.x, firstPoint.y)
    const secondPoint = calculatePoint(firstPoint, 60 * (PI/180), 50)
    vertex(secondPoint.x, secondPoint.y)
    const thirdPoint = calculatePoint(secondPoint, -20 * (PI/180), 140)
    vertex(thirdPoint.x, thirdPoint.y)
    const forthPoint = calculatePoint(thirdPoint, 60 * (PI/180), 50)
    vertex(forthPoint.x, forthPoint.y)

    endShape()
    bufferY += 15
    bufferX -= 5
  }
}
```

![Vários ziguezagues no canvas](/images/creative-coding/part-9/cc-6.png)

E por fim, fazemos um `clip` no `drawingContext`

```js
function drawLineCircle(x, y) {
  fill(255)
  noStroke()
  drawingContext.save()  
  ellipse(x, y, diameter, diameter)
  drawingContext.clip()
  ...
```

![Círculo com ziguezagues no canvas](/images/creative-coding/part-9/cc-7.png)

## Passo 3

Para o primeiro círculo, utilizei [esse tutorial](https://thecodingtrain.com/challenges/36-blobby) do Coding Train. A explicação em vídeo é bastante clara, e o código final é disponibilizado para p5.js. O código para esse projeto ficou simplesmente assim:

```js
function draw() {
  ...
  drawBlobCircle(width / 3, height / 3)
  ...
}

function drawBlobCircle(x, y) {
  noStroke()
  fill(10)
  beginShape();
  let xoff = 0
  let yoff = 0
  for (var a = 0; a < TWO_PI; a += 0.1) {
    let offset = map(noise(xoff, yoff), 0, 1, -25, 25)
    let r = diameter / 2 + offset
    let newX = r * cos(a)
    let newY = r * sin(a)
    vertex(x + newX, y + newY)
    xoff += 0.03
    yoff += 0.01
  }
  endShape()
}
```

![Cículo blob no canvas](/images/creative-coding/part-9/cc-8.png)

## Passo 4

Para o último círculo usaremos um algoritmo de __pixel sorting__. Vamos então criar uma lista e adicionar diversos pontos de cor aleatória (entre 0 e 150, ou preto e cinza). Para definir os pontos aleatórios vamos utilizar o algoritmo de `noise`, disponível no p5.js.

```js

function drawPixelSortCircle(x, y) {
  let areaPixels = []
  for(let i = 0; i < diameter; i++) {
    for (let j = 0; j < diameter; j++) {
      if (!areaPixels[i]) areaPixels[i] = []
      const noiseX = 0.05
      const noiseY = 0.1
      const n = noise(noiseX + noiseX*i, noiseY + noiseY*j + 5)
      const c = map(n, 0, 1, 0, 150)
      areaPixels[i].push(round(c))
    }
  }
  
  areaPixels.forEach((column, ic) => {
    column.forEach((p, ir) => {
      const newX = x + ic - diameter / 2
      const newY = y + ir - diameter / 2
      if (dist(newX, newY, x, y) < diameter/2) {
        set(newX, newY, p)
      }
    })
  })
  updatePixels()
}
```

Com esse código estamos adicionando todos os pixels em colunas na área do tamanho do círculo, e posteriormente desenhando na tela apenas os pixels que estão dentro do raio do círculo.

O resultado disso fica assim:

![Cículo com textura de nuvem](/images/creative-coding/part-9/cc-9.png)

Agora vamos ordenar os pixels por coluna. Não queremos ele 100% ordenado, então cada vez que a diferença de cor entre dois pixels for muito grande, eles não serão odernados, resultando num efeito semelhante ao qoue procuramos. O código fica mais ou menos assim:

```js
function drawPixelSortCircle(x, y) {
  ...
  
  const colorTreshold = 60
  areaPixels.forEach(column => {
    column.sort((a,b) => abs(a-b) < colorTreshold ? a - b : b - a)
  })
  
  ...
}
```

E esse é o resultado:

![Resultado com todos os cículos](/images/creative-coding/part-9/cc-10.png)


## Próximos passos

O resultado final não é exatamente igual a capa, e para tentar um resultado mais fiel poderiamos melhorar cada círculo com algoritmos que relembrem mais a capa original.

<details>
  <summary>
    Código completo
  </summary>
  <p>
    ```js
const diameter = 150

function setup() {
  createCanvas(450, 450)
}

function draw() {
  background(255)
  
  drawBlobCircle(width / 3, height / 3)
  drawGradientCircle(width / 3 * 2, height / 3 * 2)
  drawPixelSortCircle(width / 3, height / 3 * 2)
  drawLineCircle(width / 3 * 2, height / 3)

  noLoop()
}

function drawGradientCircle(x, y) {
  let h = 0
  noStroke()
  for (let r = diameter; r > 0; --r) {
    fill(h);
    ellipse(x, y, r, r);
    h += 0.6
    y += 0.2
    x += 0.1
  }
}

function drawLineCircle(x, y) {
  fill(255)
  noStroke()
  drawingContext.save()  
  ellipse(x, y, diameter, diameter)
  drawingContext.clip()
  
  noFill()
  stroke(0)
  strokeWeight(8)

  let bufferY = y - 100
  let bufferX = x - diameter/2 + 10
  for(let i = 0; i < 16; i++) {
    beginShape()
    const firstPoint = { x: bufferX, y: bufferY }
    vertex(firstPoint.x, firstPoint.y)
    const secondPoint = calculatePoint(firstPoint, 60 * (PI/180), 50)
    vertex(secondPoint.x, secondPoint.y)
    const thirdPoint = calculatePoint(secondPoint, -20 * (PI/180), 140)
    vertex(thirdPoint.x, thirdPoint.y)
    const forthPoint = calculatePoint(thirdPoint, 60 * (PI/180), 50)
    vertex(forthPoint.x, forthPoint.y)

    endShape()
    bufferY += 15
    bufferX -= 5
  }
}

function calculatePoint(initialPoint, angle, distance) {
    return {
      x: initialPoint.x + distance * Math.cos(angle),
      y: initialPoint.y + distance * Math.sin(angle)
    }
}

function drawBlobCircle(x, y) {
  noStroke()
  fill(10)
  beginShape();
  let xoff = 0
  let yoff = 0
  for (var a = 0; a < TWO_PI; a += 0.1) {
    let offset = map(noise(xoff, yoff), 0, 1, -25, 25)
    let r = diameter / 2 + offset
    let newX = r * cos(a)
    let newY = r * sin(a)
    vertex(x + newX, y + newY)
    xoff += 0.03
    yoff += 0.01
    //ellipse(x, y, 4, 4);
  }
  endShape();
}

function drawPixelSortCircle(x, y) {
  let areaPixels = []
  for(let i = 0; i < diameter; i++) {
    for (let j = 0; j < diameter; j++) {
      if (!areaPixels[i]) areaPixels[i] = []
      const noiseX = 0.05
      const noiseY = 0.1
      const n = noise(noiseX + noiseX*i, noiseY + noiseY*j + 5)
      const c = map(n, 0, 1, 0, 150)
      areaPixels[i].push(round(c))
    }
  }
  
  const colorTreshold = 60
  areaPixels.forEach(column => {
    column.sort((a,b) => abs(a-b) < colorTreshold ? a - b : b - a)
  })
  
  areaPixels.forEach((column, ic) => {
    column.forEach((p, ir) => {
      const newX = x + ic - diameter / 2
      const newY = y + ir - diameter / 2
      if (dist(newX, newY, x, y) < diameter/2) {
        set(newX, newY, p)
      }
    })
  })
  updatePixels()
}
```
  </p>
</details>
