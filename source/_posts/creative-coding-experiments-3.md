---
title: Movimento - Experimentos em Programação Criativa - 3
date: "2023-08-22T22:00:00.169Z"
---

Essa é mais uma tentativa de reproduzir uma imagem utilizando computação criativa, puramente para aprender coisas novas e passar o tempo. Esses artigos são principalmente criados como uma forma de catalogar o processo de implementação para referencia futura quando eu estiver desenvolvendo novas coisas.

## Inspiração

A imagem que tentei replicar através de código desta vez é a seguinte:

![Várias linhas conectadas se movendo, gerando um desenho ao fundo](/images/creative-coding/part-3/cc-1.gif)

E o meu resultado é o seguinte:

![Um parecido canvas com várias linhas conectadas se movendo, gerando um desenho ao fundo](/images/creative-coding/part-3/cc-2.gif)

Um pouco longe do resultado desejado, mas já foi muito bom para utilizar algoritmos e estruturas de dados diferentes e praticar um pouquinho com o loop de desenho do p5.

## Implementação

Usarei novamento o [editor do p5](https://editor.p5js.org) para essa implementação.

## Passo 1

Começando por um passo que parece simples mas já precisará de um pouco e matemática, vamos tentar primeiro desenhar a linha central que fica estática. Basicamente temos um ponto no centro da imagem, com uma barra em 45º.

Como todas as barras serão movimentadas com base no seu ponto central, e terão um ângulo e comprimento diferentes, podemos criar uma função que receba a coordenada central, um ângulo e um comprimento para definir quais são as coordenadas das extremidades da linha. Assim só precisamos desenhar a linha entre os dois pontos.

Conseguimos fazer isso com a seguinte função:

```js
function calculateLinePoints(center, angle, lineSize) {
  // Converter o ângulo de graus para radianos
  const angleInRadians = (angle * Math.PI) / 180

  // Calcular a metade da linha
  const halfLineSize = lineSize / 2

  // Calcular os componentes x e y da linha
  const xComponent = Math.cos(angleInRadians) * halfLineSize
  const yComponent = Math.sin(angleInRadians) * halfLineSize

  // Calcular os outros dois pontos da linha
  const point1 = {
    x: center.x - xComponent,
    y: center.y - yComponent
  }

  const point2 = {
    x: center.x + xComponent,
    y: center.y + yComponent
  }

  return [point1, point2]
}
```

E desenhar na tela com o método `draw` do p5:

```js
const SIZE = 500

function setup() {
  createCanvas(SIZE, SIZE)
}

function draw() {
  background(220)
  
  stroke('green')
  strokeWeight(10)
  
  const coord = { x: width / 2, y: height / 2, }

  point(coord.x, coord.y)

  const [point1, point2] = this.calculateLinePoints(coord, 45, 300)

  strokeWeight(2)
  line(point1.x, point1.y, point2.x, point2.y)
}
```

Assim temos nossa primeira linha

![Canvas com linha central em 45 graus](/images/creative-coding/part-3/cc-3.png)

## Passo 2

Como as linhas terão conexão umas com as outras decidi usar classes para esse projeto. Para isso criarei uma classe para desenhar as linhas, para facilitar o trabalho.
Com um pouco de refatoração, podemos atualizar o código anterior para:

```js
function draw() {
  background(220);
  
  const r = new Regua({ x: width / 2, y: height / 2, }, 45, 300)
  r.draw()
}

class Regua {
  constructor(coord, angle, length) {
    this.coord = coord
    this.angle = angle
    this.length = length
  }
  
  draw() {
    stroke('green')
    strokeWeight(10)

    point(this.coord.x, this.coord.y)

    const [point1, point2] = this.calculateLinePoints(this.coord, this.angle, this.length)

    strokeWeight(2)
    line(point1.x, point1.y, point2.x, point2.y)
  }
  
  calculateLinePoints(center, angle, lineSize) {
    // Converter o angulo de graus para radianos
    const angleInRadians = (angle * Math.PI) / 180

    // Calcular a metade da linha
    const halfLineSize = lineSize / 2

    // Calcular os componentes x e y da linha
    const xComponent = Math.cos(angleInRadians) * halfLineSize
    const yComponent = Math.sin(angleInRadians) * halfLineSize

    // Calcular os outros dois pontos da linha
    const point1 = {
      x: center.x - xComponent,
      y: center.y - yComponent
    }

    const point2 = {
      x: center.x + xComponent,
      y: center.y + yComponent
    }

    return [point1, point2]
  }
}
```

## Passo 3

Podemos então adicionar um novo parâmetros para a nossa classe, para desenharmos as linhas seguintes: a linha pai.

```js
function draw() {
  ...

  const r2 = new Regua({ x: width / 2, y: height / 2, }, 0, 300, r)
  r2.draw()
}

class Regua {
  constructor(coord, angle, length, parent) {
    ...
    this.parent = parent
  }
}
```

Como vamos precisar que a linha ande, não podemos sempre redesenhá-la na mesma coordenada. Para isso decidi mudar nosso código para criar as réguas no método `setup` (que só é executado uma vez), e somente desenhá-los no método `draw`.

```js
const RULERS = []

function setup() {
  createCanvas(SIZE, SIZE)
    
  const r = new Regua({ x: width / 2, y: height / 2, }, 45, 300)  
  const r2 = new Regua({ x: width / 2, y: height / 2, }, 0, 300, r)
  
  RULERS.push(r)
  RULERS.push(r2)
}

function draw() {
  background(220)

  RULERS.forEach(ruler => {
    ruler.draw()
  })
}
```

![Canvas com duas linhas](/images/creative-coding/part-3/cc-4.png)

## Passo 4

Agora podemos começar com a parte de movimentação. Podemos criar uma função `walk` em nossa classe de linha, para movimentá-la dentro do loop de desenho. Para encontrar o próximo ponto da linha 

```js
class Regua {
  walk() {
    if (!this.parent) return
    
    // Selecionar as extremidades da linha pai
    const [point1, point2] = this.calculateLinePoints(this.parent.coord, this.parent.angle, this.parent.length)

    // Calcular qual percentual da linha pai será o próximo ponto a seguir. Utilizamos o resto da divisão entre o número de loops e o dobro do tamanho do pai, e mapeamos para que a linha ande nas duas direções
    const percent = map(frameCount % this.parent.length * 2, 0, this.parent.length, -100, 0)
    
    // Atualizar a coordenada
    this.coord = this.getPointOnLine(point1, point2, Math.abs(percent))
  }
  
  getPointOnLine(coordinate1, coordinate2, percent) {
    // Calcular diferença entre coordenadas x e y
    const dx = coordinate2.x - coordinate1.x;
    const dy = coordinate2.y - coordinate1.y;

    // Calcular o ponto na linha com base no percentual
    const point = {
      x: coordinate1.x + (dx * percent) / 100,
      y: coordinate1.y + (dy * percent) / 100
    };

    return point;
  }
}
```

E por fim chamamos o método de desenho dentro do loop:

```js
function draw() {
  background(220)

  RULERS.forEach(ruler => {
    ruler.draw()
    ruler.walk()
  })
}
```

![Linha em movimento](/images/creative-coding/part-3/cc-5.gif)

## Passo 5

Um novo incremento que podemos fazer em nossa linha é configurar também a velocidade em que ela se move, já que cada linha terá uma velocidade diferente.

```js
class Regua {
  constructor(coord, angle, length, parent, velocity = 1) {
    ...
    this.velocity = velocity
  }
  
  walk() {
    ...

    const v = frameCount * this.velocity
    
    // Calcular qual percentual da linha pai será o próximo ponto a seguir. Utilizamos o resto da divisão entre o número de loops e o dobro do tamanho do pai, e mapeamos para que a linha ande nas duas direções
    const percent = map(v % this.parent.length * 2, 0, this.parent.length, -100, 0)
    
    ...
  }
}
```

E então podemos atualizar o o método `setup` para criar várias linhas

```js
const RULERS = []
const RULER_COUNT = 6

function setup() {
  createCanvas(SIZE, SIZE)
    
  const base = new Regua({ x: width / 2, y: height / 2, }, 45, 300)  
  RULERS.push(base)
  
  for (let i = 0; i < RULER_COUNT - 1; i++) {
    const parent = RULERS[RULERS.length - 1]
    const angle = random(0, 180)
    const length = random(50, SIZE / 2)
    const velocity = random(0.3, 1.5)

    const r = new Regua(base.coord, angle, length, parent, velocity)

    RULERS.push(r)
  }
}
```

![Várias linhas em movimento](/images/creative-coding/part-3/cc-6.gif)

## Passo 6

A última linha será a responsável por adicionar o desenho na tela. Podemos ter uma propriedade para indentificarmos a linha que ela deve também desenhar a curva:

```js

function setup() {
  ...
  
  for (let i = 0; i < RULER_COUNT - 1; i++) {
    ...
    const shouldDrawCurve = i === RULER_COUNT - 2

    const r = new Regua(base.coord, angle, length, parent, velocity, shouldDrawCurve)
    ...
  }
}

class Regua {
  constructor(coord, angle, length, parent, velocity = 1, shouldDrawCurve = false) {
    ...
    this.shouldDrawCurve = shouldDrawCurve
  }

  ...
}
```

Na sequência criamos uma lista para os pontos da curva em que preenchemos a cada passo da régua, e chamamos uma função para desenhar a curva após desenharmos a linha:

```js

class Regua {
  constructor(coord, angle, length, parent, velocity = 1, shouldDrawCurve = false) {
    ...
    this.curvePath = []
  }
  
  draw() {
    ...
    
    if (this.shouldDrawCurve) {
      this.drawCurve()
    }
  }
  
  walk() {
    ...
    
    if (this.shouldDrawCurve) {
      const [point1] = this.calculateLinePoints(this.coord, this.angle, this.length)

      this.curvePath.push(point1)
    }
  }
  
  drawCurve() {
    noFill()
    stroke('black')
    strokeWeight(2)

    beginShape()
    this.curvePath.forEach((coord) => {
      curveVertex(coord.x, coord.y)
    })
    endShape()
  }
}  
```

Quase lá. A curva não parece tanto com uma curva. 

![Várias linhas em movimento desenhando uma "curva"](/images/creative-coding/part-3/cc-7.gif)

## Passo 7

Assistindo a [esse vídeo](https://www.youtube.com/watch?v=X_ocxmXeczk) de [Dave Pagurek](https://www.davepagurek.com/), uma forma que é apresentada para resolver esse problema é não adicionar em nossa lista de pontos da curva a extremidade atual da linha, e sim um percentual de distância entre a extremidade e o ponto anterior.

O vídeo faz um papel muito melhor em explicar esse algoritmo, mas o código simples:

```js
class Regua {
  walk() {
    ...
    
    if (this.shouldDrawCurve) {
      const [point1] = this.calculateLinePoints(this.coord, this.angle, this.length)
      const lastPoint = this.curvePath[this.curvePath.length - 1]

      if (!lastPoint) {
        this.curvePath.push(point1)
        return
      }
        
      const point = createVector(lastPoint.x, lastPoint.y).lerp(createVector(point1.x, point1.y), 0.1)
      this.curvePath.push({ x: point.x, y: point.y })
    }
  }
}
```

![Várias linhas em movimento desenhando uma curva de verdade](/images/creative-coding/part-3/cc-8.gif)

## Próximos passos

Algumas outras ideias para evoluir essa brincadeira seriam:

- Alterar a grossura da curva, quando a velocidade de desenho diminui
- Conectar a curva com a extremidade da linha, para que o desenho seja mais suave (sugestões de como implementar ambas ideias são também no vídeo mencionado acima)


<details>
  <summary>
    Código completo
  </summary>
  <p>
    ```js
const SIZE = 500
const RULERS = []
const RULER_COUNT = 6

function setup() {
  createCanvas(SIZE, SIZE)
    
  const base = new Regua({ x: width / 2, y: height / 2, }, 45, 300)  
  RULERS.push(base)
  
  for (let i = 0; i < RULER_COUNT - 1; i++) {
    const parent = RULERS[RULERS.length - 1]
    const angle = random(0,180)
    const length = random(50, SIZE/2)
    const velocity = random(0.3, 1.5)
    const shouldDrawCurve = i === RULER_COUNT - 2

    const r = new Regua(base.coord, angle, length, parent, velocity, shouldDrawCurve)

    RULERS.push(r)
  }
}

function draw() {
  background(220)

  RULERS.forEach(ruler => {
    ruler.draw()
    ruler.walk()
  })
}

class Regua {
  constructor(coord, angle, length, parent, velocity = 1, shouldDrawCurve = false) {
    this.coord = coord
    this.angle = angle
    this.length = length
    this.parent = parent
    this.velocity = velocity
    this.shouldDrawCurve = shouldDrawCurve
    this.curvePath = []
  }
  
  draw() {
    stroke('green')
    strokeWeight(10)

    point(this.coord.x, this.coord.y)

    const [point1, point2] = this.calculateLinePoints(this.coord, this.angle, this.length)

    strokeWeight(2)
    line(point1.x, point1.y, point2.x, point2.y)
    
    if (this.shouldDrawCurve) {
      this.drawCurve()
    }
  }
  
  walk() {
    if (!this.parent) return
    
    // Selecionar as extremidades da linha pai
    const [point1, point2] = this.calculateLinePoints(this.parent.coord, this.parent.angle, this.parent.length)

    const v = frameCount * this.velocity
    // Calcular qual percentual da linha pai será o próximo ponto a seguir. Utilizamos o resto da divisão entre o número de loops e o dobro do tamanho do pai, e mapeamos para que a linha ande nas duas direções
    const percent = map(v % this.parent.length * 2, 0, this.parent.length, -100, 0)
    
    // Atualizar a coordenada
    this.coord = this.getPointOnLine(point1, point2, Math.abs(percent))
    
    if (this.shouldDrawCurve) {
      const [point1] = this.calculateLinePoints(this.coord, this.angle, this.length)
      const lastPoint = this.curvePath[this.curvePath.length - 1]

      if (!lastPoint) {
        this.curvePath.push(point1)
        return
      }
        
      const point = createVector(lastPoint.x, lastPoint.y).lerp(createVector(point1.x, point1.y), 0.1)
      this.curvePath.push({ x: point.x, y: point.y })
    }
  }
  
  drawCurve() {
    noFill()
    stroke('black')
    strokeWeight(2)

    beginShape()
    this.curvePath.forEach((coord) => {
      curveVertex(coord.x, coord.y)
    })
    endShape()
  }
  
  calculateLinePoints(center, angle, lineSize) {
    // Converter o angulo de graus para radianos
    const angleInRadians = (angle * Math.PI) / 180

    // Calcular a metade da linha
    const halfLineSize = lineSize / 2

    // Calcular os componentes x e y da linha
    const xComponent = Math.cos(angleInRadians) * halfLineSize
    const yComponent = Math.sin(angleInRadians) * halfLineSize

    // Calcular os outros dois pontos da linha
    const point1 = {
      x: center.x - xComponent,
      y: center.y - yComponent
    }

    const point2 = {
      x: center.x + xComponent,
      y: center.y + yComponent
    }

    return [point1, point2]
  }
  
  getPointOnLine(coordinate1, coordinate2, percent) {
    // Calcular diferença entre coordenadas x e y
    const dx = coordinate2.x - coordinate1.x;
    const dy = coordinate2.y - coordinate1.y;

    // Calcular o ponto na linha com base no percentual
    const point = {
      x: coordinate1.x + (dx * percent) / 100,
      y: coordinate1.y + (dy * percent) / 100
    };

    return point;
  }
}
```
  </p>
</details>
