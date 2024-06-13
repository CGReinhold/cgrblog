---
title: Xadrez - Experimentos em Programação Criativa - 10
date: "2024-06-12T22:00:00.169Z"
---

Essa é mais uma tentativa de reproduzir uma imagem utilizando computação criativa. Como nas últimas vezes, o objetivo dessa tentativa é de utilizar uma inspiração para aprender técnicas e conceitos novos. Esses artigos são principalmente criados como uma forma de catalogar o processo de implementação para referencia futura quando eu estiver desenvolvendo novas coisas.

## Inspiração

Desta vez, uma das imagens que eu tinha salvo como inspiração é a capa do album Wings da banda BTS:

![Grid com movimento ao clicar nas bordas](/images/creative-coding/part-10/cc-1.gif)

Nessa imagem, quatro círculos são desenhados com diferentes estilos. A proposta não é desenvolver algo 100% fiel, mas que relembre essa capa.

O resultado foi o seguinte:

![Reprodução de grid com movimento ao clicar nas bordas](/images/creative-coding/part-10/cc-2.gif)

## Implementação

Usarei novamento o [editor do p5](https://editor.p5js.org) para essa implementação, dessa vez com a modalidade WEBGL.

## Passo 1

Começando pelo grid, vamos criar uma matriz que guardará cada uma das células. Os valores serão 1 para células pretas e 0 para células brancas.

```js
const matrix = []

const WIDTH = 60
const CHECKED_SIZE = 6

function setup() {
  createCanvas(WIDTH * (CHECKED_SIZE + 2), WIDTH * (CHECKED_SIZE + 2))
  
  new Array(CHECKED_SIZE).fill(0).map((_, i) => {
    matrix.push([])
    new Array(CHECKED_SIZE).fill(0).map((_, j) => {
      const v = i % 2 === 0 ? (j % 2 === 0 ? 1 : 0) : (j % 2 === 0 ? 0 : 1)
      matrix[i].push(v)
    })
  })
}
```

E pintamos eles na tela como um grid de quadrados

```js

function draw() {
  background(220)
  stroke(0)
  strokeWeight(2)
  
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      fill(matrix[i][j] === 1 ? 0 : 220)
      const x = WIDTH * i + WIDTH
      const y = WIDTH * j + WIDTH
      square(x, y, WIDTH)
    }
  }
}
```

Com isso temos o seguinte resultado:

![Grid com xadrez na tela](/images/creative-coding/part-10/cc-3.png)

## Passo 2

Para o próximo passo, vamos adicionar os pequenos círculos nas quatro pontas do tabuleiro. Basta verificarmos se o quadrado faz parte de uma das pontas, e adicionar um círculo na posição central

```js
...


function draw() {
  background(220)
  stroke(0)
  strokeWeight(2)
  
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      ...
      
      const isXWall = i === 0 || i === CHECKED_SIZE - 1
      const isYWall = j === 0 || j === CHECKED_SIZE - 1
      if (isXWall && isYWall) {
        fill(matrix[i][j] === 1 ? 220 : 0)
        circle(x + WIDTH/2, y + WIDTH/2, WIDTH / 2)
      }
    }
  }
}

```

Resultando no seguinte:

![Grid com xadrez na tela e um círculo em cada ponta](/images/creative-coding/part-10/cc-4.png)

## Passo 3

Neste último passo, vamos adicionar a ação do clique. O próprio p5.js já possui uma função interna que observa o método `mouseClicked()` para facilitar o desenvolvimento, por isso podemos só implementar esse método e usar as variáveis `mouseX` e `mouseY` para detectar a posição do canvas que foi clicado.

```js
function mouseClicked() {
  const isLeftWall = mouseX < WIDTH
  const isRightWall = mouseX > WIDTH * 7
  const isTopWall = mouseY < WIDTH
  const isBottomWall = mouseY > WIDTH * 7
  if (isLeftWall || isRightWall) {
    const row = floor(mouseY * (CHECKED_SIZE + 2) / width)
    // Mover a linha para a direita ou esquerda
  }
  if (isTopWall || isBottomWall) {
    const column = floor(mouseX * (CHECKED_SIZE + 2) / width)
    // Mover a coluna para baixo ou para cima
  }
}
```

E com uma lógica um pouco mais elaborada, podemos fazer o deslocamento das células para a direção desejada.

```js
function mouseClicked() {
  ...
  if (isLeftWall || isRightWall) {
    ...
    rotateMatrix(row - 1, 'x', isLeftWall ? 'right' : 'left')
  }
  if (isTopWall || isBottomWall) {
    ...
    rotateMatrix(column - 1, 'y', isTopWall ? 'bottom' : 'top')
  }
}

function rotateMatrix(index, axis, direction) {
  if (index < 0 || index >= CHECKED_SIZE) return
  if(axis === 'y') {
    if (direction === 'bottom') {
      matrix[index].unshift(matrix[index].pop())
    } else {
      matrix[index].push(matrix[index].shift())
    }
  } else {
    const cells = matrix.map(row => row[index])
    if (direction === 'right') {
      cells.unshift(cells.pop())
    } else {
      cells.push(cells.shift())
    }
    matrix.forEach((row, i) => row[index] = cells[i])
  }
}
```

Produzindo nosso resultado final:

![Resultado final com as ações do clique deslocando as linhas e colunas do xadrez](/images/creative-coding/part-10/cc-5.gif)


## Próximos passos

Para um resultado mais fiel ao original, seria legal adicionar uma animação para visualizar as linhas e colunas movendo para a direção que estão sendo deslocadas, além de linhas delimitando quais direções podem ou não ser clicadas.

<details>
  <summary>
    Código completo
  </summary>
  <p>
    ```js
const matrix = []

const WIDTH = 60
const CHECKED_SIZE = 6

function setup() {
  createCanvas(WIDTH * (CHECKED_SIZE + 2), WIDTH * (CHECKED_SIZE + 2))
  
  new Array(CHECKED_SIZE).fill(0).map((_, i) => {
    matrix.push([])
    new Array(CHECKED_SIZE).fill(0).map((_, j) => {
      const v = i % 2 === 0 ? (j % 2 === 0 ? 1 : 0) : (j % 2 === 0 ? 0 : 1)
      matrix[i].push(v)
    })
  })
}

function draw() {
  background(220)
  stroke(0)
  strokeWeight(2)
  
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      fill(matrix[i][j] === 1 ? 0 : 220)
      const x = WIDTH * i + WIDTH
      const y = WIDTH * j + WIDTH
      square(x, y, WIDTH)
      
      const isXWall = i === 0 || i === CHECKED_SIZE - 1
      const isYWall = j === 0 || j === CHECKED_SIZE - 1
      if (isXWall && isYWall) {
        fill(matrix[i][j] === 1 ? 220 : 0)
        circle(x + WIDTH/2, y + WIDTH/2, WIDTH / 2)
      }
    }
  }
}

function mouseClicked() {
  const isLeftWall = mouseX < WIDTH
  const isRightWall = mouseX > WIDTH * 7
  const isTopWall = mouseY < WIDTH
  const isBottomWall = mouseY > WIDTH * 7
  if (isLeftWall || isRightWall) {
    const row = floor(mouseY * (CHECKED_SIZE + 2) / width)
    rotateMatrix(row - 1, 'x', isLeftWall ? 'right' : 'left')
  }
  if (isTopWall || isBottomWall) {
    const column = floor(mouseX * (CHECKED_SIZE + 2) / width)
    rotateMatrix(column - 1, 'y', isTopWall ? 'bottom' : 'top')
  }
}

function rotateMatrix(index, axis, direction) {
  if (index < 0 || index >= CHECKED_SIZE) return
  if(axis === 'y') {
    if (direction === 'bottom') {
      matrix[index].unshift(matrix[index].pop())
    } else {
      matrix[index].push(matrix[index].shift())
    }
  } else {
    const cells = matrix.map(row => row[index])
    if (direction === 'right') {
      cells.unshift(cells.pop())
    } else {
      cells.push(cells.shift())
    }
    matrix.forEach((row, i) => row[index] = cells[i])
  }
}
```
  </p>
</details>
