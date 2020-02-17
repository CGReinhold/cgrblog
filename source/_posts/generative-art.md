---
title: Arte generativa
date: "2020-02-17T20:12:07.169Z"
---

Computação é uma área da ciência gigante que inclui diversas sub-áreas também muito grandes. _Machine learning_ e _blockchain_ são algumas dessas sub-áreas que acabam adiquirindo um grande _hype_ pela comunidade e gerando também novas áreas de estudos na áreea acadêmica.

Uma das sub-áreas da computação que já existe a bastante tempo mas não é tão difundida é a de __arte generativa__ que busca misturar arte com computação.

## O que é

Arte generativa é a criação de arte através de programação. Uma das ideias por trás disso é que a arte não é gerada totalmente pelo artista, mas sim através de valores aleatórios gerados pelo computador.

A arte generativa é uma junção da ideia do artista que definirá os parâmetros e a forma que a arte será gerada, e a capacidade do computador de processar essa ideia e gerar uma arte totalmente diferente a cada interação.

Essa área não é totalmente nova. Desde a década de 60, quando a era dos computadores ainda estava no início, alguns artistas já estavam começando a trabalhar com esse conceito. Georg Ness é um dos pioneros dessa área criando obras que influenciaram outros artistas, como a da imagem abaixo.

![Obra "Schotter" de Georg Ness](https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-PXfApx7MksY%2FUGR5r-38foI%2FAAAAAAAAAG8%2Fu_Wa5Ta8JGI%2Fs1600%2Fweiss-fig3.jpg&f=1&nofb=1)

[Anders Hoff](https://www.inconvergent.net/) é um artista da atualidade que mantém um blog sobre suas criações e ideias em relação a arte generativa. Mas ele não é o único. No site [Generative artistry](https://generativeartistry.com/), Ruth John e Tim Holman mantém uma série de tutoriais de como recriar obras famosas utilizando arte generativa através de javascript. Eles também possuem um podcast falando sobre arte generativa onde entrevistam alguns artistas.

## Código

Na tentativa de brincar um pouco com arte generativa utilizando a biblioteca [p5.js](https://p5js.org/), criei o código abaixo que irá gerar uma nova imagem diferente a cada vez que essa janela for atualizada.

{% raw %}
<p class="codepen" data-height="529" data-theme-id="default" data-default-tab="result" data-user="cgreinhold" data-slug-hash="OJPKyoE" style="height: 529px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Generative">
  <span>See the Pen <a href="https://codepen.io/cgreinhold/pen/OJPKyoE">
  Generative</a> by cleyson (<a href="https://codepen.io/cgreinhold">@cgreinhold</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
{% endraw %}

Você pode ver ela sendo executada também em um loop no código abaixo.

{% raw %}
<p class="codepen" data-height="510" data-theme-id="default" data-default-tab="result" data-user="cgreinhold" data-slug-hash="zYxgNaG" style="height: 510px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Generative loop">
  <span>See the Pen <a href="https://codepen.io/cgreinhold/pen/zYxgNaG">
  Generative loop</a> by cleyson (<a href="https://codepen.io/cgreinhold">@cgreinhold</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
{% endraw %}

Ou uma versão alternativa

{% raw %}
<p class="codepen" data-height="506" data-theme-id="default" data-default-tab="result" data-user="cgreinhold" data-slug-hash="wvBVKPX" style="height: 506px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="p5.js">
  <span>See the Pen <a href="https://codepen.io/cgreinhold/pen/wvBVKPX">
  p5.js</a> by cleyson (<a href="https://codepen.io/cgreinhold">@cgreinhold</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
{% endraw %}