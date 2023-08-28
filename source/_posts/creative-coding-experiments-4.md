---
title: Experimentos em Programação Criativa - 4
date: "2023-08-30T22:00:00.169Z"
---

Essa é mais uma tentativa de reproduzir uma imagem utilizando computação criativa, puramente para aprender coisas novas e passar o tempo.

## Inspiração

A imagem que tentei replicar através de código desta vez é a seguinte:

![Semicírculos rotacionando](/images/creative-coding/part-4/cc-1.gif)

E o meu resultado é o seguinte:

![Semicírculos rotacionando de forma parecida](/images/creative-coding/part-4/cc-2.gif)

## Implementação

Usarei novamento o [editor do p5](https://editor.p5js.org) para essa implementação.

## Passo 1

Começando pelo passo mais simples, desenhando um semicírculo. O próprio p5 possui uma função auxiliar para isso: `arc`, deixando esse passo bastante simples.

```js
function setup() {
  createCanvas(400, 400)
}

function draw() {
  noFill()
  stroke(255)
  background(0)
  
  const x = width / 2
  const y = height / 2
  
  arc(x, y, 50, 50, 0, HALF_PI)
}
```

![Semicírculo estático no centro do quadro](/images/creative-coding/part-4/cc-3.png)

## Passo 2

Na sequência adicionamos uma rotação para esse semicírculo. A forma mais simples é apenas incrementando a ponto de início e fim do com o valor do `frameCount`. Como os frames atualizam muito rápidos, podemos reduzir o valor para uma variável de velocidade.

```js
function draw() {
  noFill()
  stroke(255)
  background(0)
  
  const x = width / 2
  const y = height / 2
  
  const velocity = frameCount / 10
  const arcStart = velocity
  const arcEnd = HALF_PI + velocity
  
  arc(x, y, 50, 50, arcStart, arcEnd)
}
```

![Semicírculo rodando](/images/creative-coding/part-4/cc-4.gif)

## Passo 3

Último passo é adicionarmos mais arcos. Faremos isso dentro de um loop simples

```js
function draw() {
  noFill()
  stroke(255)
  background(0)
  
  const x = width / 2
  const y = height / 2
  
  const velocity = frameCount / 10
  const arcStart = velocity
  const arcEnd = HALF_PI + velocity
  
  for (let i = 0; i < 150; i++) {
    const radius = 50 + i * 5
    arc(x, y, radius, radius, arcStart, arcEnd)
  }
}
```

![Semicírculos rodando na mesma direção](/images/creative-coding/part-4/cc-5.gif)

Adicionando diferentes pontos de início e velocidades para cada arco, conseguimos fazer um efeito semelhante ao desejado

```js
function draw() {
  noFill()
  stroke(255)
  background(0)
  
  const x = width / 2
  const y = height / 2
    
  for (let i = 0; i < 150; i++) {
    const radius = 50 + i * 5
    const offsetPositions = 8
    const offset = i % offsetPositions * (HALF_PI / (offsetPositions / 2))

    const velocity = frameCount / (10 * (i % 3) + 10)

    const arcStart = velocity + offset
    const arcEnd = HALF_PI + velocity + offset

    if (i % 2 === 0) {
      arc(x, y, radius, radius, -arcEnd, -arcStart)
    } else {
      arc(x, y, radius, radius, arcStart, arcEnd)
    }
  }
}
```

![Semicírculos rodando em várias direções](/images/creative-coding/part-4/cc-2.gif)


## Próximos passos

Esse código foi bastante simples, mas ainda tem várias formas de brincar com ele, como mudando a largura e distancias entre os arcos, ou até adicionando cores.


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
  noFill()
  stroke(255)
  background(0)
  
  const x = width / 2
  const y = height / 2
    
  for (let i = 0; i < 150; i++) {
    const radius = 50 + i * 5
    const offsetPositions = 8
    const offset = i % offsetPositions * (HALF_PI / (offsetPositions / 2))

    const velocity = frameCount / (10 * (i % 3) + 10)

    const arcStart = velocity + offset
    const arcEnd = HALF_PI + velocity + offset

    if (i % 2 === 0) {
      arc(x, y, radius, radius, -arcEnd, -arcStart)
    } else {
      arc(x, y, radius, radius, arcStart, arcEnd)
    }
  }
}
```
  </p>
</details>
