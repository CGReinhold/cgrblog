---
title: ml5.js
date: "2020-08-04T22:00:00.169Z"
---

Machine Learning tem sido uma área bastante explorada na computação nos últimos anos, mas você sabia que hoje já é possível utilizar bibliotecas de machine learning no seu navegador?

## ml5.js

O [__ml5.js__](https://ml5js.org/) é uma biblioteca que busca facilitar o uso do machine learning no navegador com modelos já cadastrados e diversas funcionalidades diferentes.

[Neste post](https://cgreinhold.dev/2020/07/14/nose/) fiz o uso do `Posenet`, funcionalidade do __ml5.js__, para detectar a posição de alguns pontos do rosto através da camera e exibir um círculo em cima do nariz.

O interessante é que, como essa biblioteca funciona diretamente no navegador, conseguimos uní-la com outras diferentes bibliotecas, como por exemplo o [__p5.js__](https://p5js.org/), que é utilizada para criação de desenhos em `canvas` ou até mesmo processamento de imagens.

## soundClassifier()

Uma das funcionalidades do __ml5.js__ que podemos utilizar é a de [classificação de som](https://ml5js.org/reference/api-soundClassifier/), onde o machine learning é utilizado para detectar comandos de voz.

Esta funcionalidade utiliza um modelo padrão que consegue detectar alguns poucos comandos (todo em inglês), como: `zero`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `right`, `left`, `up`, `down`, `yes`, `no`, `go` e `stop`. A biblioteca permite que você adicione um novo modelo, podendo criar um que esteja de acordo com as suas necessidades.

Habilitando o microfone você pode ver esta biblioteca em funcionamento. Quando carregado, será apresentado na tela a última palavra que foi detectada, assim como o percentual de confiança da biblioteca.

{% raw %}
<div id="parent"></div>
<style>
html, body {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.sound.min.js"></script>
<meta charset="utf-8" />
<script src="https://unpkg.com/ml5@0.3.1/dist/ml5.min.js"></script>
<script>
let soundClassifier;
let resultP;
function preload() {
  let options = { probabilityThreshold: 0.95 };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options); 
}
function setup() {
  const parent = document.getElementById("parent");
  resultP = createP('carregando...');
  resultP.style('font-size','32pt');
  resultP.parent(parent);
  soundClassifier.classify(gotResults);
}
function gotResults(error, results) {
  resultP.html(`${results[0].label}: ${(results[0].confidence * 100).toFixed(2)}%`);
}
</script>
{% endraw %}

## Conclusão

O __ml5.js__ ainda disponibiliza funcionalidades como classificador de imagems e transferência de estilo de uma imagem em outra. Um ótimo lugar para aprender mais sobre essas bibliotecas é o canal do youtube __The Coding Train__. Nele você consegue encontrar tutoriais sobre o [posenet](https://www.youtube.com/watch?v=OIo-DIOkNVg), [soundClassifier](https://www.youtube.com/watch?v=cO4UP2dX944), e até tutoriais de física e introdução a programação.