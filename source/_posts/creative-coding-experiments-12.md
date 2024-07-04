---
title: Corrente - Experimentos em Programação Criativa - 12
date: "2024-07-05T22:00:00.169Z"
---

Essa é mais uma tentativa de reproduzir uma imagem utilizando computação criativa. Como nas últimas vezes, o objetivo dessa tentativa é de utilizar uma inspiração para aprender técnicas e conceitos novos. Esses artigos são principalmente criados como uma forma de catalogar o processo de implementação para referencia futura quando eu estiver desenvolvendo novas coisas.

## Inspiração

Desta vez, uma das imagens que eu tinha salvo como inspiração é a seguinte:

![Grade de círculos conectando-se](/images/creative-coding/part-12/cc-1.png)

Assim como o [projeto anterior](https://cgreinhold.dev/2024/06/20/creative-coding-experiments-11/), esse também é criado por [Roni Kaufman](https://openprocessing.org/user/184331), onde conseguimos encontrar rascunhos semelhantes para entender como o autor criou.

## Implementação

Usarei novamento o [editor do p5](https://editor.p5js.org) para essa implementação.

Da mesma forma como no [artigo anterior](https://cgreinhold.dev/2024/06/20/creative-coding-experiments-11/), vou usar um projeto do autor original para entender como criar um rascunho semelhante. Usarei [esse projeto](https://openprocessing.org/sketch/1942847?hidden=true) como base, mas desta vez criarei a minha versão do zero, usando o código original como referência.

## Passo 1

O código completo do projeto de Roni Kaufman pode ser visto abaixo.

<details>
  <summary>
    Código original completo
  </summary>
  <p>
    ```js
let N;
let s, margin = 1.5;

let detail = 25;

let palette1, palette2;

function setup() {
  createCanvas(500, 500, WEBGL);
  N = random([4, 6, 8]);
  s = width/(N+2*margin);
  margin *= s;
  noStroke();
  noLoop();
}

function draw() {
  translate(-width/2, -height/2);
  
  palette1 = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];
  palette2 = shuffle(["#050505", "#fffbe6"]);
  
	let backCol = random([0, 1]);
  background(palette2[backCol]);
  
  for (let i = 0; i <= N; i++) {
    let x = i*s+margin;
    for (let j = 0; j <= N; j++) {
      let y = j*s+margin;
      fill(palette2[(i+j)%2]);
      ellipse(x, y, s, s, detail*4);
    }
  }
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      makeTile(i, j);
    }
  }
  
  for (let i = 0; i <= N; i++) {
    let x = i*s+margin;
    for (let j = 0; j <= N; j++) {
      let y = j*s+margin;
			if ((i+j)%2 == backCol) fill(random(palette1));
			else fill(palette2[1-(i+j)%2]);
      ellipse(x, y, s/2, s/2, detail*4);
    }
  }
}

function makeTile(i, j) {
  let x = i*s+margin;
  let y = j*s+margin;
  if (random() < 1/2) {
    fill(random(palette1));
    square(x, y, s);
    fill(palette2[(i+j)%2]);
    arc(x, y, s, s, 0, PI/2, PIE, detail);
    arc(x+s, y+s, s, s, PI, 3*PI/2, PIE, detail);
    fill(palette2[1-(i+j)%2]);
    arc(x+s, y, s, s, PI/2, PI, PIE, detail);
    arc(x, y+s, s, s, 3*PI/2, TAU, PIE, detail);
  } else {
    if (random() < 1/2) {
      fill(palette2[1-(i+j)%2]);
      square(x, y, s);
      fill(palette2[(i+j)%2]);
      arc(x, y, s, s, 0, PI/2, PIE, detail);
      arc(x+s, y+s, s, s, PI, 3*PI/2, PIE, detail);
    } else {
      fill(palette2[(i+j)%2]);
      square(x, y, s);
      fill(palette2[1-(i+j)%2]);
      arc(x+s, y, s, s, PI/2, PI, PIE, detail);
      arc(x, y+s, s, s, 3*PI/2, TAU, PIE, detail);
    }
  }
}
```
  </p>
</details>

O resultado é o seguinte:

![Grade de círculos conectando-se](/images/creative-coding/part-12/cc-2.png)

Analisando o código, conseguimos ver que ele consiste principalmente de 3 loops. O primeiro gera os grandes círculos do grid, o segundo gera as conexões entre os grandes círculos, e o terceiro os pequenos círculos coloridos.

Começamos então criando a paleta de cores e definindo as propriedades do grid. Vamos usar o código original como base e criar a paleta dos pontos, do plano de fundo, quantidade de pontos, tamanho e margem.

```js
const dotsPallete = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"]
const backgroundPallete = ["#050505", "#fffbe6"]

let dotCount = 4
let dotSize = 10
let margin = 1.5

function setup() {
  createCanvas(500, 500)
  
  dotCount = random([4, 6, 8])
  dotSize = width/(dotCount+2*margin)
  margin *= dotSize
  
  noLoop()
  noStroke()
}
```

Para a função de desenho, vamos definir a cor do plano de fundo aleatóriamente e os pequenos pontos coloridos.

```js
function draw() {
  const backgroundColor = random([0, 1])
  background(backgroundPallete[backgroundColor])
  
  // Loop para pontos coloridos
  for (let i = 0; i <= dotCount; i++) {
    const x = i * dotSize + margin
    for (let j = 0; j <= dotCount; j++) {
      const y = j * dotSize + margin
      fill(random(dotsPallete))
      ellipse(x, y, dotSize / 2)
    }
  }
}
```

Esse é o nosso resultado:

![Tela escura com grade de pontos coloridos](/images/creative-coding/part-12/cc-3.png)

## Passo 2

Na sequência, vamos adicionas os grandes círculos. Esse será um loop semelhante ao anterios, mas que irá adicionar os círculos intercalados entre um e outro. Isso precisa ser feito antes dos pequenos círculos. As cores também serão opostas ao do plano de fundo.

```js
...

function draw() {
  ...

  // Loop para grandes círculos
  for (let i = 0; i <= dotCount; i++) {
    const x = i * dotSize + margin
    for (let j = 0; j <= dotCount; j++) {
      const y = j * dotSize + margin
      fill(backgroundPallete[(i+j)%2])
      ellipse(x, y, dotSize)
    }
  }
  
  ...
}
```

![Tela escura com grade de pontos coloridos](/images/creative-coding/part-12/cc-4.png)

Vamos também ajustar os pontos dentro dos grandes círculos para serem da mesma cor do plano de fundo

```js
function draw() {
  ...
  
  // Loop para pontos coloridos
  for (let i = 0; i <= dotCount; i++) {
    const x = i * dotSize + margin
    for (let j = 0; j <= dotCount; j++) {
      const y = j * dotSize + margin
      if((i+j)%2 !== backgroundColor) fill(backgroundPallete[1-(i+j)%2])
      else fill(random(dotsPallete))
      ellipse(x, y, dotSize / 2)
    }
  }
}

```

![Tela escura com grade de pontos coloridos](/images/creative-coding/part-12/cc-5.png)

## Passo 3

Por fim, vamos fazer o loop que adicionar os conectores entre os grandes círculos. Para isso vamos adicionar quadrados entre os pequenos círculos. Esses quadrados serão da cor do correspondente círculo grande, e 2 arcos serão adicionados nos cantos, dando a impressão de que os grandes círculos se conectam.

```js
function draw() {
  ...

  // Loop para os conectores
  for (let i = 0; i < dotCount; i++) {
    const x = i * dotSize + margin
    for (let j = 0; j < dotCount; j++) {
      const y = j * dotSize + margin
      drawConectors(i, j)
    }
  }

  ...
}

function drawConectors(i, j) {
  let x = i * dotSize + margin
  let y = j * dotSize + margin

  fill(backgroundPallete[1-(i+j)%2])
  square(x, y, dotSize)  
  fill(backgroundPallete[(i+j)%2])
  arc(x, y, dotSize, dotSize, 0, PI/2, PIE)
  arc(x+dotSize, y+dotSize, dotSize, dotSize, PI, 3*PI/2, PIE)    
}
```

![Tela com grade de pontos coloridos conectados diagonalmente](/images/creative-coding/part-12/cc-6.png)

Como podemos ver, com isso os pontos serão conectados sempre diagonalmente. Vamos adicionar algumas aleatoriedades para não adicionar os conectores em todas as posições, e inverter a direção em alguns casos

```js
function drawConectors(i, j) {
  let x = i * dotSize + margin
  let y = j * dotSize + margin
  
  if (random(1) > 0.8) return
    
  if (random([0, 1])) {
    fill(backgroundPallete[1-(i+j)%2])
    square(x, y, dotSize)  
    fill(backgroundPallete[(i+j)%2])
    arc(x, y, dotSize, dotSize, 0, PI/2, PIE)
    arc(x+dotSize, y+dotSize, dotSize, dotSize, PI, 3*PI/2, PIE)    
  } else {
    fill(backgroundPallete[(i+j)%2])
    square(x, y, dotSize)  
    fill(backgroundPallete[1-(i+j)%2])
    arc(x+dotSize, y, dotSize, dotSize, PI/2, PI, PIE)
    arc(x, y+dotSize, dotSize, dotSize, 3*PI/2, TAU, PIE)
  }
}
```

![Tela com grade de pontos coloridos conectados diagonalmente](/images/creative-coding/part-12/cc-7.png)


## Próximos passos

Há ainda alguns passos para atingir o resultado do original, mas para não manter o artigo muito longo finalizamos por aqui.
Algumas das alterações para ficar mais parecido com o original seriam alterar alguns conectores para serem coloridos, além de a deformação dos conectores serem mais finas.
Outra correção seria eliminar as linhas dos quadrados que aparecem quando o a tela é renderizada. Podemos ver que o autor original utiliza o modo WEBGL do p5.js para resolver esse problema.

<details>
  <summary>
    Código completo
  </summary>
  <p>
    ```js
const dotsPallete = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"]
const backgroundPallete = ["#050505", "#fffbe6"]

let dotCount = 4
let dotSize = 10
let margin = 1.5

function setup() {
  createCanvas(500, 500)
  
  dotCount = random([4, 6, 8])
  dotSize = width/(dotCount+2*margin)
  margin *= dotSize
  
  noLoop()
  noStroke()
}

function draw() {
  const backgroundColor = random([0, 1])
  background(backgroundPallete[backgroundColor])
  
  for (let i = 0; i <= dotCount; i++) {
    const x = i * dotSize + margin
    for (let j = 0; j <= dotCount; j++) {
      const y = j * dotSize + margin
      fill(backgroundPallete[(i+j)%2])
      ellipse(x, y, dotSize)
    }
  }
  
  for (let i = 0; i < dotCount; i++) {
    const x = i * dotSize + margin
    for (let j = 0; j < dotCount; j++) {
      const y = j * dotSize + margin
      drawConectors(i, j)
    }
  }
  
  for (let i = 0; i <= dotCount; i++) {
    const x = i * dotSize + margin
    for (let j = 0; j <= dotCount; j++) {
      const y = j * dotSize + margin
      if((i+j)%2 !== backgroundColor) fill(backgroundPallete[1-(i+j)%2])
      else fill(random(dotsPallete))
      ellipse(x, y, dotSize / 2)
    }
  }
}

function drawConectors(i, j) {
  let x = i * dotSize + margin
  let y = j * dotSize + margin
  
  if (random(1) > 0.8) return
    
  if (random([0, 1])) {
    fill(backgroundPallete[1-(i+j)%2])
    square(x, y, dotSize)  
    fill(backgroundPallete[(i+j)%2])
    arc(x, y, dotSize, dotSize, 0, PI/2, PIE)
    arc(x+dotSize, y+dotSize, dotSize, dotSize, PI, 3*PI/2, PIE)    
  } else {
    fill(backgroundPallete[(i+j)%2])
    square(x, y, dotSize)  
    fill(backgroundPallete[1-(i+j)%2])
    arc(x+dotSize, y, dotSize, dotSize, PI/2, PI, PIE)
    arc(x, y+dotSize, dotSize, dotSize, 3*PI/2, TAU, PIE)
  }
}
```
  </p>
</details>
