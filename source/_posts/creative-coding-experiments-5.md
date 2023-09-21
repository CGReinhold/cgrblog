---
title: Experimentos em Programação Criativa - 5
date: "2023-09-04T22:00:00.169Z"
---

Essa é mais uma tentativa de reproduzir uma imagem utilizando computação criativa, puramente para aprender coisas novas e passar o tempo.

## Inspiração

A imagem que tentei replicar através de código desta vez é a seguinte:

![Espirais empacotadas](/images/creative-coding/part-5/cc-1.png)

E o meu resultado é o seguinte:

![Espirais empacotados de forma parecida](/images/creative-coding/part-5/cc-2.png)

## Implementação

Usarei novamento o [editor do p5](https://editor.p5js.org) para essa implementação.

## Passo 1

Nesse projeto decidi seguir uma forma simples de reutilizar códigos já feito por outras pessoas ao invés de codificar tudo do zero. É um pouco preguiçoso, mas sempre acho essa uma forma boa de aprender, já que eu sempre busco entender o código dos outros antes de começar a alterar ou incrementar algo.

Para isso, usei como base o código [desse vídeo do coding train](https://www.youtube.com/watch?v=QHEQuoIKgNE), onde Daniel Shiffman ensina a aplicar um algoritmo de circle packing. O código do vídeo está [nesse projeto](https://editor.p5js.org/codingtrain/sketches/wxGRAd4I-) que usei como base, fazendo algumas alterações para utilizar o canvas inteiro ao invés de uma imagem.

Esse é o código após as alterações:

```js
let circles = []
let spots = []

function setup() {
  createCanvas(400, 400)
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      spots.push(createVector(x, y))
    }
  }
}

function draw() {
  background(0)

  let total = 5
  let count = 0
  let attempts = 0

  while (count < total) {
    let newC = newCircle()
    if (newC !== null) {
      circles.push(newC)
      count++
    }
    attempts++
    if (attempts > 1000) {
      noLoop()
      break
    }
  }

  for (let i = 0; i < circles.length; i++) {
    let circl = circles[i]

    if (circl.growing) {
      if (circl.edges()) {
        circl.growing = false
      } else {
        for (let j = 0; j < circles.length; j++) {
          let other = circles[j]
          if (circl !== other) {
            var d = dist(circl.x, circl.y, other.x, other.y)
            var distance = circl.r + other.r

            if (d - 4 < distance) {
              circl.growing = false
              break
            }
          }
        }
      }
    }

    circl.show()
    circl.grow()
  }
}

function newCircle() {
  var r = int(random(0, spots.length))
  var spot = spots[r]
  var x = spot.x
  var y = spot.y

  var valid = true
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i]
    var d = dist(x, y, circle.x, circle.y)
    if (d < circle.r) {
      valid = false
      break
    }
  }
  if (valid) {
    return new Circle(x, y)
  } else {
    return null
  }
}

class Circle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.r = 1
    this.growing = true
  }

  grow() {
    if (this.growing) {
      this.r += 1
    }
  }

  show() {
    fill(255)
    noStroke()
    ellipse(this.x, this.y, this.r * 2, this.r * 2)
  }

  edges() {
    return (
      this.x + this.r >= width ||
      this.x - this.r <= 0 ||
      this.y + this.r >= height ||
      this.y - this.r <= 0
    )
  }
}
```

![Círculos empacotados](/images/creative-coding/part-5/cc-3.png)

## Passo 2

Meu segundo passo foi alterar o código para desenhar espirais ao invés de círculos. Pedi para o ChatGPT criar esse código para mim, e esse foi o resultado:

```js
function drawSpiral(centerX, centerY, radius) {
  let angle = 0;
  let increment = 0.1;

  beginShape();
  noFill();
  stroke(0);
  strokeWeight(1);

  for (let r = 0; r < radius; r += 0.1) {
    let x = centerX + cos(angle) * r;
    let y = centerY + sin(angle) * r;
    vertex(x, y);
    angle += increment;
  }

  endShape();
}
```

Esse código já faz bastante do que queremos, e com um pouco de ajustes podemos subsituír o método `show` da nossa classe `Circle`.

```js
class Circle {
  ...

  show() {
    let angle = 0
    let increment = 0.2

    beginShape()
    noFill()
    stroke(255)
    strokeWeight(2)

    for (let r = 0; r < this.r; r += 0.1) {
      let x = this.x + cos(angle) * r
      let y = this.y + sin(angle) * r
      vertex(x, y)
      angle += increment
    }

    endShape()
  }

  ...
}
```

![Espirais empacotadas](/images/creative-coding/part-5/cc-4.png)

# Passo 3

Para adicionarmos cores em alguns dos espirais, teremos que mudar o método `show` para usar linhas ao invés de vértices, já que a cor irá mudando do início até o fim da espiral.

```js
class Circle {
  ...

  show() {
    let angle = 0
    let increment = 0.2

    noFill()
    stroke(255)
    strokeWeight(2)

    let prev
    for (let r = 0; r < this.r; r += 0.1) {
      let x = this.x + cos(angle) * r
      let y = this.y + sin(angle) * r
      
      if (prev) {
        line(prev.x, prev.y, x, y)
      } else {
        point(x, y)
      }

      prev = createVector(x, y)
      angle += increment
    }
  }

  ...
}
```

Então alteramos o `show` novamente para adicionar uma cor de stroke aleatória e mudamos o `colorMode` do nosso projeto para HSB

```js
function setup() {
  colorMode(HSB)
  ...
}

...

class Circle {
  constructor(x, y) {
    ...
    this.colorRange = random(0, 360)
  }
  
  ...
  
  show() {
    let angle = 0
    let increment = 0.2

    noFill()
    stroke(255)
    strokeWeight(2)

    let prev
    for (let r = 0; r < this.r; r += 0.1) {
      let x = this.x + cos(angle) * r
      let y = this.y + sin(angle) * r
      
      if (this.colorRange === 0) {
        stroke(255)
      } else {
        stroke(r * 3 + this.colorRange, height, height)
      }
      
      if (prev) {
        line(prev.x, prev.y, x, y)
      } else {
        point(x, y)
      }

      prev = createVector(x, y)
      angle += increment
    }
  }

  ...
}
```

![Espirais empacotadas coloridas](/images/creative-coding/part-5/cc-5.png)

# Passo 4

O último passo é definir alguns circulos onde apenas espirais dentro deles serão coloridos. Primeiro geramos a lista de áreas coloridas:

```js
let colorCircles = []

function setup() {
  ...
  
  for (let i = 0; i < 4; i++) {
    colorCircles.push({
      x: random(0, width),
      y: random(0, height),
      r: random(10, 30)
    })
  }
}
```

Na sequência atualizamos o método `grow` para atualizar a cor da espiral caso esteja dentro de um dos círculos coloridos.

```js

class Circle {
  ...

  grow() {
    if (this.growing) {
      this.r += 1
      
      if (this.colorRange > 0) return
      for (let i = 0; i < colorCircles.length; i++) {
        const other = colorCircles[i]
        var d = dist(this.x, this.y, other.x, other.y)
        var distance = this.r + other.r * 2
        if (d - 4 < distance) {
          this.colorRange = random(0, 360)
        }
      }
    }
  }

  ...
}
```

![Espirais empacotadas coloridas e brancas](/images/creative-coding/part-5/cc-6.png)

## Próximos passos

Como podem ver na imagem base e na final, nossos círculos coloridos não são perfeitos. Isso acontece porque só verificamos se as espirais encostam em uma das áreas coloridas, mas não paramos de crescê-las quando elas ultrapassam.

Uma ideia para brincar mais um pouco com esse código seria adicionar essa validação para que não sejam desenhadas espirais entre as áreas coloridas e preto e brancas.



<details>
  <summary>
    Código completo
  </summary>
  <p>
    ```js
let circles = []
let spots = []
let colorCircles = []

function setup() {
  createCanvas(400, 400)
  colorMode(HSB)

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      spots.push(createVector(x, y))
    }
  }
  
  for (let i = 0; i < 3; i++) {
    colorCircles.push({
      x: random(0, width),
      y: random(0, height),
      r: 30
    })
  }
}

function draw() {
  background(0)

  let total = 5
  let count = 0
  let attempts = 0

  while (count < total) {
    let newC = newCircle()
    if (newC !== null) {
      circles.push(newC)
      count++
    }
    attempts++
    if (attempts > 1000) {
      noLoop()
      break
    }
  }

  for (let i = 0; i < circles.length; i++) {
    let circl = circles[i]

    if (circl.growing) {
      if (circl.edges()) {
        circl.growing = false
      } else {
        for (let j = 0; j < circles.length; j++) {
          let other = circles[j]
          if (circl !== other) {
            var d = dist(circl.x, circl.y, other.x, other.y)
            var distance = circl.r + other.r

            if (d - 4 < distance) {
              circl.growing = false
              break
            }
          }
        }
      }
    }

    circl.show()
    circl.grow()
  }
}

function newCircle() {
  var r = int(random(0, spots.length))
  var spot = spots[r]
  spots.splice(r, 1)
  var x = spot.x
  var y = spot.y

  var valid = true
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i]
    var d = dist(x, y, circle.x, circle.y)
    if (d < circle.r) {
      valid = false
      break
    }
  }
  if (valid) {
    return new Circle(x, y)
  } else {
    return null
  }
}

class Circle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.r = 1
    this.growing = true
  }

  isColored() {
    for (let i = 0; i < colorCircles.length; i++) {
        const other = colorCircles[i]
        var d = dist(this.x, this.y, other.x, other.y)
        var distance = this.r + other.r
        if (d - 4 < distance) {
          this.colorRange = random(0, 360)
        }
      }
  }
  
  grow() {
    if (this.growing) {
      this.r += 1
      
      if (this.colorRange > 0) return
      for (let i = 0; i < colorCircles.length; i++) {
        const other = colorCircles[i]
        var d = dist(this.x, this.y, other.x, other.y);
        var distance = this.r + other.r * 2;
        if (d - 4 < distance) {
          this.colorRange = random(0, 360)
        }
      }
    }
  }

  show() {
    let angle = 0
    let increment = 0.2

    noFill()
    stroke(255)
    strokeWeight(2)

    let prev
    for (let r = 0; r < this.r; r += 0.1) {
      let x = this.x + cos(angle) * r
      let y = this.y + sin(angle) * r
      
      if (this.colorRange === 0) {
        stroke(255);
      } else {
        stroke(r * 3 + this.colorRange, height, height);
      }
      
      if (prev) {
        line(prev.x, prev.y, x, y)
      } else {
        point(x, y)
      }

      prev = createVector(x, y)
      angle += increment
    }
  }

  edges() {
    return (
      this.x + this.r >= width ||
      this.x - this.r <= 0 ||
      this.y + this.r >= height ||
      this.y - this.r <= 0
    )
  }
}
```
  </p>
</details>
