---
title: Dithering - Experimentos em Programação Criativa - 8
date: "2023-11-29T22:00:00.169Z"
---

Essa é mais uma tentativa de reproduzir uma imagem utilizando computação criativa. Como nas últimas vezes, o objetivo dessa tentativa é de utilizar uma inspiração para aprender técnicas e conceitos novos. Esses artigos são principalmente criados como uma forma de catalogar o processo de implementação para referencia futura quando eu estiver desenvolvendo novas coisas.

## Inspiração

Desta vez, uma das imagens que eu tinha salvo como inspiração é a seguinte:

![Gradiente pixelado](/images/creative-coding/part-8/cc-1.png)

Por mais que pareça usar um algoritmo diferente, decidi usar ela como inspiração para aprender a implementar algoritmos de dithering. Dithering é uma forma de ruído, usado para "melhorar" a qualidade de imagens quando utilizando uma quantidade limitada de cores. Em nosso exemplo, usaremos apenas preto e branco.

## Implementação

Usarei novamento o [editor do p5](https://editor.p5js.org) para essa implementação, usando como inspiração [esse artigo](https://surma.dev/things/ditherpunk/) e [essa implementação](https://github.com/meemoo/meemooapp/blob/main/src/nodes/image-monochrome-worker.js), também em Javascript.

O artigo consegue explicar muito melhor como cada artigo funciona, então aqui descreverei apenas como fiz para representar o mesmo usando o editor do p5 e também usar como referência caso eu pretenda usálo em outros projetos.

## Passo 1

Ao invés de usar um simples gradiente, camos usar a própria câmera do laptop como input para o nosso algoritmo. Isso pode ser feito facilmente com p5 da seguinte forma:

```js
let capture;

function setup() {
  createCanvas(600, 450);
  capture = createCapture(VIDEO);
  capture.hide()
}

function draw() {
  background(220);
  image(capture, 0, 0, width, height);
}
```

Com esse código exebimos no canvas a imagem da câmera

![Imagem da câmera](/images/creative-coding/part-8/cc-2.png)

Fazendo um loop nos pixels da imagem podemos calcular qual o valor médio de cor em cada pixel e atribuir 0 (preto) ou 255 (branco) para o pixel, fazendo assim a imagem monocromática.

```js
function draw() {
  ...
  applyMonochrome();
}

function applyMonochrome() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    const blackAndWhite = Math.floor((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    const c = blackAndWhite < 129 ? 0 : 255
    pixels[i] = c;
    pixels[i + 1] = c;
    pixels[i + 2] = c;
  }
  updatePixels();
}
```

![Imagem monocromática](/images/creative-coding/part-8/cc-3.png)

Interessante notar que a lista the `pixels` gerada pelo p5 contem 4 itens para cada pixel, respectivamente os canais RGBA. Por isso precisamos atualizar os três primeiros para que a cor seja definida.

Para testarmos diferentes níveis de limear, podemos usar também um slider.

```js
let slider;


function setup() {
  ... 

  slider = createSlider(0, 255, 129);
}

...


function applyMonochrome() {
  ...
    const c = blackAndWhite < slider.value() ? 0 : 255
  ... 
}

```

## Passo 2

O segundo algoritmo que implementaremos será o de Floyd-Steinberg, que utiliza uma matriz de difusão para distribuição de erro aos pixels vizinhos.

O algoritmo final fica desta forma

```js
function applyFloydSteiberg() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    const blackAndWhite = Math.floor((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    const c = blackAndWhite < slider.value() ? 0 : 255;

    const err = Math.floor((blackAndWhite - c) / 16);
    
    for (let j = 0; j < 3; j++) {
      pixels[i + j] = c;
      pixels[i + j + 4] += err * 7;
      pixels[i + j + 4 * width - 4] += err * 3;
      pixels[i + j + 4 * width] += err * 5;
      pixels[i + j + 4 * width + 4] += err * 1;
    }
  }
  updatePixels();
}
```

![Imagem com filtro Floyd-Steiberg](/images/creative-coding/part-8/cc-4.png)

A imagem aparenta até ter tons de cinza, mas olhando próximo é possível perceber que são pixeis pretos e brancos intercalados.

Para facilitar o teste, podemos adicionar radio buttons para alternar entre os métodos.

```js
let radio;

function setup() {
  ...
  radio = createRadio();
  radio.option('monochrome');
  radio.option('Floyd-Steinberg');
  ...
}

function draw() {
  ...
  
  switch(radio.value()) {
    case 'monochrome': {
      applyMonochrome();
      break;
    }
    case 'Floyd-Steinberg': {
      applyFloydSteiberg();
      break;
    }
  }
}
```

# Passo 3

Sem muitas explicações, os seguintes algoritmos são o de Bill Atkinson e Bayer

```js
function applyBillAttkinson() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    const blackAndWhite = Math.floor((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    const c = blackAndWhite < slider.value() ? 0 : 255

    const err = Math.floor((blackAndWhite - c) / 8);
   
    for (let j = 0; j < 3; j++) {
      pixels[i + j]= c;
      pixels[i + j + 4] += err;
      pixels[i + j + 8] += err;
      pixels[i + j + 4 * width - 4] += err;
      pixels[i + j + 4 * width] += err;
      pixels[i + j + 4 * width + 4] += err;
      pixels[i + j + 8 * width] += err;
    }
  }
  updatePixels();
}

function applyBayer() {
  const bayerThresholdMap = [
    [  15, 135,  45, 165 ],
    [ 195,  75, 225, 105 ],
    [  60, 180,  30, 150 ],
    [ 240, 120, 210,  90 ]
  ];

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    const blackAndWhite = Math.floor((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    
    const x = i/4 % width;
    const y = Math.floor(i/4 / width);
    const mapped = Math.floor( (blackAndWhite + bayerThresholdMap[x%4][y%4]) / 2 );
    const c = (mapped < slider.value()) ? 0 : 255;
    
    pixels[i] = c;
    pixels[i + 1] = c;
    pixels[i + 2] = c;
  }
  updatePixels();
}
```

![Imagem com filtro de Bill Atkinson](/images/creative-coding/part-8/cc-5.png)

![Imagem com filtro Bayer](/images/creative-coding/part-8/cc-6.png)

## Próximos Passos

Esses não são os únicos. Outros algoritmos de dithering também podem ser aplicados. A ideia de próximo passos é implementar novos algoritmos e talvez pensar em quais peojetos seria divertido aplicá-los.

O código completo está abaixo e é uma forma rápida de começar a testar e brincar com esses filtros.

<details>
  <summary>
    Código completo
  </summary>
  <p>
```js
let capture;
let slider;
let radio;

function setup() {
  createCanvas(600, 450);
  capture = createCapture(VIDEO);
  capture.hide();
  
  radio = createRadio();
  radio.option('monochrome');
  radio.option('Floyd-Steinberg');
  radio.option('Bill Atkinson');
  radio.option('Bayer');

  slider = createSlider(0, 255, 129);
}

function draw() {
  background(220);
  image(capture, 0, 0, width, height);
  
  
  switch(radio.value()) {
    case 'monochrome': {
      applyMonochrome();
      break;
    } 
    case 'Floyd-Steinberg': {
      applyFloydSteiberg();
      break;
    }
    case 'Bill Atkinson': {
      applyBillAttkinson();
      break;
    }
    case 'Bayer': {
      applyBayer();
      break;
    }
  }
}

function applyMonochrome() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    const blackAndWhite = Math.floor((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    const c = blackAndWhite < slider.value() ? 0 : 255
    pixels[i] = c;
    pixels[i + 1] = c;
    pixels[i + 2] = c;
  }
  updatePixels();
}

function applyFloydSteiberg() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    const blackAndWhite = Math.floor((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    const c = blackAndWhite < slider.value() ? 0 : 255;

    const err = Math.floor((blackAndWhite - c) / 16);
    
    for (let j = 0; j < 3; j++) {
      pixels[i + j] = c;
      pixels[i + j + 4] += err * 7;
      pixels[i + j + 4 * width - 4] += err * 3;
      pixels[i + j + 4 * width] += err * 5;
      pixels[i + j + 4 * width + 4] += err * 1;
    }
  }
  updatePixels();
}

function applyBillAttkinson() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    const blackAndWhite = Math.floor((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    const c = blackAndWhite < slider.value() ? 0 : 255

    const err = Math.floor((blackAndWhite - c) / 8);
   
    for (let j = 0; j < 3; j++) {
      pixels[i + j]= c;
      pixels[i + j + 4] += err;
      pixels[i + j + 8] += err;
      pixels[i + j + 4 * width - 4] += err;
      pixels[i + j + 4 * width] += err;
      pixels[i + j + 4 * width + 4] += err;
      pixels[i + j + 8 * width] += err;
    }
  }
  updatePixels();
}

function applyBayer() {
  const bayerThresholdMap = [
    [  15, 135,  45, 165 ],
    [ 195,  75, 225, 105 ],
    [  60, 180,  30, 150 ],
    [ 240, 120, 210,  90 ]
  ];

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    const blackAndWhite = Math.floor((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    
    const x = i/4 % width;
    const y = Math.floor(i/4 / width);
    const mapped = Math.floor( (blackAndWhite + bayerThresholdMap[x%4][y%4]) / 2 );
    const c = (mapped < slider.value()) ? 0 : 255;
    
    pixels[i] = c;
    pixels[i + 1] = c;
    pixels[i + 2] = c;
  }
  updatePixels();
}
```
  </p>
</details>
