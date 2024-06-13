---
title: Skate - Experimentos em Programação Criativa - 7
date: "2023-11-03T22:00:00.169Z"
---

Essa é mais uma tentativa de reproduzir uma imagem utilizando computação criativa. Como nas últimas vezes, o objetivo dessa tentativa é de utilizar uma inspiração para aprender técnicas e conceitos novos. Esses artigos são principalmente criados como uma forma de catalogar o processo de implementação para referencia futura quando eu estiver desenvolvendo novas coisas.

## Inspiração

A imagem que usarei como inspiração desta vez é a seguinte:

![Skate com linhas](/images/creative-coding/part-7/cc-1.png)

E o meu resultado é o seguinte:

![Linhas](/images/creative-coding/part-7/cc-2.png)

## Implementação

Usarei novamento o [editor do p5](https://editor.p5js.org) para essa implementação, dessa vez com a modalidade WEBGL.

## Passo 1

Desta vez, achei que seria mais fácil alcançar o resultado utilizando WEBGL, criando cada elemento da tela de forma 3D, facilitando assim o posicionamento de cada um em frente do outro.

Utilizar WEBGL com o p5js é bastante simples, bastando adicionar um novo parâmetro para função de criação do canvas `createCanvas(400, 400, WEBGL)`. Criar um cubo pode ser feito de forma simples:

```js
function setup() {
  createCanvas(400, 400, WEBGL)
}

function draw() {
  background(220)

  // As funções de rotação serão apenas para debug, mas não serão necessárias para esse código
  rotateX(frameCount * 0.01)
  rotateY(frameCount * 0.01)

  box(50, 50, 50)
}
```

![Cubo rotacionado](/images/creative-coding/part-7/cc-3.png)

Para o resultado final não usaremos as funções `rotateX` e `rotateY`, mas durante a implementação usarei em alguns momentos para depurar a posição de cada elemento da tela.

Um conceito interessante de notar, é que todos os elementos 3D adicionados em tela são posicionados no centro da tela. Portanto, quando quisermos mudar a posição de algum elemento, devemos usar as funções de transformação, como `translate` e `rotate`. 

Para o resultado que estamos buscando, usaremos vários paralelepípedos posicionados lado a lado. Para isso, podemos criar um loop que adicionará os elementos e fazer um translate após isso.

```js
const LINES_COUNT = 26
const LINE_WIDTH = 10

function setup() {
  createCanvas(400, 400, WEBGL)
}

function draw() {
  background(220)

  // As funções de rotação serão apenas para debug, mas não serão necessárias para esse código
  rotateX(frameCount * 0.01)
  rotateY(frameCount * 0.01)

  push()
  translate(LINES_COUNT / 2 * LINE_WIDTH * -1, 0)
  for (let i = 0; i < LINES_COUNT; i++) {
    box(LINE_WIDTH, 300, 5)
    translate(LINE_WIDTH, 0, 0)
  }
  pop()
}
```

![Paralelepípedos rotacionados](/images/creative-coding/part-7/cc-4.png)

Com esse resultado sem rotação:

![Paralelepípedos paralelos](/images/creative-coding/part-7/cc-5.png)

Transladando o eixo Z, fazemos com que cada paralelepípedo fique em posições diferentes, por onde as linhas horizontais passarão nas próximas etapas. Decidi fazer a translação duas vezes, voltando para a origem no eixo Z, para que usarmos 3 níveis diferentes (gerados de forma aleatória).

```js
...
function draw() {
  ...

  push()
  translate(LINES_COUNT / 2 * LINE_WIDTH * -1, 0)
  for (let i = 0; i < LINES_COUNT; i++) {
    const zIndex = int(random(1, 4)) * 10
    translate(0, 0, zIndex)
    box(LINE_WIDTH, 300, 5)
    translate(LINE_WIDTH, 0, -zIndex)
  }
  pop()
}
```

![Paralelepípedos paralelos](/images/creative-coding/part-7/cc-6.png)

## Passo 2

Antes de adicionar os paralelepípedos horizontais, vamos ajustar algumas outras coisas no código até agora. Primeiro, podemos adicionar cores. 

O p5 permite várias configurações de [luzes e materiais](https://p5js.org/reference/#group-3D). Para o nosso caso, usaremos o `emissiveMaterial()`, que é usado para definir uma cor com sua força total, ignorando qualquer configuração de luz. Essa função deve ser chamada antes de renderizar algum elemento na tela, com a cor desejada.


```js
...
function draw() {
  ...

  push()
  translate(LINES_COUNT / 2 * LINE_WIDTH * -1, 0)
  for (let i = 0; i < LINES_COUNT; i++) {
    emissiveMaterial(random(100,255), random(100,255), random(100,255))
    const zIndex = int(random(1, 4)) * 10
    translate(0, 0, zIndex)
    box(LINE_WIDTH, 300, 5)
    translate(LINE_WIDTH, 0, -zIndex)
  }
  pop()
}
```

![Paralelepípedos coloridos paralelos](/images/creative-coding/part-7/cc-7.png)

Além disso, usamos o `noStroke()` para remover as bordas.

![Paralelepípedos coloridos paralelos](/images/creative-coding/part-7/cc-8.png)

Por fim, precisamos ajustar a camera para o modo ortogonal. Com isso, todos os objetos de mesmas dimensões terão o mesmo tamanho, independetemente da distância até a câmera. Com isso, o resultado ficará bem mais parecido com o que buscamos.

```js
...
function setup() {
  createCanvas(400, 400, WEBGL)
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500)
}
...
```

![Paralelepípedos coloridos ortogonais paralelos](/images/creative-coding/part-7/cc-9.png)

Por mais que não pareça, se rotacionarmos o canvas conseguímos ver que o eixo Z ainda está diferente para cada elemento.

![Paralelepípedos coloridos ortogonais paralelos](/images/creative-coding/part-7/cc-10.png)

## Parte 3

A última etapa será adicionar as linhas horizontais que atravessam as verticais. Isso pode ser feito com um loop semelhante ao anterior, apenas invertendo o desenho do cubo para horizontal, e definindo a cor padrão como preto.

```js
...

function draw() {
  ...

  emissiveMaterial(0, 0, 0)
  
  translate(-5, -165, 5)
  for (let i = 0; i < 10; i++) {
    const zIndex = int(random(1, 4)) * 10
    translate(0, 30, zIndex)
    box(300, LINE_WIDTH, 5)
    translate(0, 0, -zIndex)
  }
}
```

![Paralelepípedos coloridos ortogonais paralelos](/images/creative-coding/part-7/cc-11.png)

Como estamos adicionando os elementos aleatoriamente no eixo Z, conseguimos ver as faixas horizontais passando em frente e atrás das verticais.

Por fim adicionamos algumas faixas verticais para conectar as horizontais, e o resultado está pronto.

```js
function draw() {
  ...

  for (let i = 0; i < 10; i++) {
    const zIndex = int(random(1, 4)) * 10
    translate(0, 30, zIndex)
    box(300, LINE_WIDTH, 5)
    if (i === 9) break
    translate(i % 2 === 0 ? 145 : -145, 15, 0)
    box(LINE_WIDTH, 30, 5)
    translate(i % 2 === 0 ? -145 : 145, -15, -zIndex)
  }
}
```

![Paralelepípedos coloridos ortogonais paralelos](/images/creative-coding/part-7/cc-12.png)

## Próximos passos

Algumas ideias para um próximo passo seria brincar com o tamanho e larguras das faixas, além de alterar mais as formas como o eixo Z é trabalhado, tentando alcançar algo mais entrelaçado.

<details>
  <summary>
    Código completo
  </summary>
  <p>
    ```js
const LINES_COUNT = 26
const LINE_WIDTH = 10

function setup() {
  createCanvas(400, 400, WEBGL)
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500)
}

function draw() {
  background(220)
  
  noLoop()
  noStroke()

  push()
  translate(LINES_COUNT / 2 * LINE_WIDTH * -1, 0)
  for (let i = 0; i < LINES_COUNT; i++) {
    emissiveMaterial(random(100,255), random(100,255), random(100,255))
    const zIndex = int(random(1, 4)) * 10
    translate(0, 0, zIndex)
    box(LINE_WIDTH, 300, 5)
    translate(LINE_WIDTH, 0, -zIndex)
  }
  pop()
  
  emissiveMaterial(0, 0, 0)
  
  translate(-5, -165, 5)
  for (let i = 0; i < 10; i++) {
    const zIndex = int(random(1, 4)) * 10
    translate(0, 30, zIndex)
    box(300, LINE_WIDTH, 5)
    if (i === 9) break
    translate(i % 2 === 0 ? 145 : -145, 15, 0)
    box(LINE_WIDTH, 30, 5)
    translate(i % 2 === 0 ? -145 : 145, -15, -zIndex)
  }
}
```
  </p>
</details>
