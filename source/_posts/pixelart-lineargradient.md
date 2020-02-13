---
title: Pixel art com linear-gradient
date: "2020-02-04T20:12:07.169Z"
---

A algum tempo atrás li [esse artigo](https://css-tricks.com/fun-times-css-pixel-art/) do Geoff Graham explicando como fazer pixel art utilizando apenas CSS através da propriedade `box-shadow`. A ideia é muito legal e já possui até geradores permitem você fazer o desenho em um grid e gerar o código CSS pronto com a imagem.

Recentemente estive trabalhando com `linear-gradients` no CSS e descobri que com isso também conseguimos criar desenhos pixel a pixel. A ideia por trás disso é adicionar diversos `linear-gradients` no mesmo `background-image` criando assim os pixels necessários para a imagem.

## Começando

O `linear-gradient` é basicamente uma forma de adicionar gradientes iniciando em uma cor e terminando em outra em um background. Com essa propriedade conseguimos fazer gradientes tanto verticais (`background-image: linear-gradient(black, red);`) como horizontais (`background-image: linear-gradient(to right, black, red);`).

{% raw %}
Gradiente vertical
<div style="width: 200px; height: 50px; background-image: linear-gradient(black, red);"></div>
Gradiente horizontal
<div style="width: 200px; height: 50px; background-image: linear-gradient(to right, black, red);"></div>
{% endraw %}

## Cores

Também é possível adicionar mais de duas cores dentro de um `linear-gradient` podendo adicionar ilimitados valores (`background-image: linear-gradient(to right, black, red, orange, yellow, white);`).

{% raw %}
<div style="width: 200px; height: 50px; background-image: linear-gradient(to right, black, red, orange, yellow, white);"></div>
{% endraw %}

O `linear-gradient` também permite adicionar percentuais para cada cor, definindo a partir de que ponto ela começa a ser utilizada na imagem (`background-image: linear-gradient(to right, black, red 20%);`).

{% raw %}
<div style="width: 200px; height: 50px; background-image: linear-gradient(to right, black, red 20%);"></div>
{% endraw %}

## "Burlando" o gradiente

Repetindo uma cor após a próxima, o percentual passa a definir o ponto em que a cor termina no gradiente. E com esse percentual, conseguimos passar a "burlar" o gradiente e fazer a disposição de retângulos com cores, uma ao lado do outro (`background-image: linear-gradient(to right, black 0%, black 20%, red 20%);`).

{% raw %}
<div style="width: 200px; height: 50px; background-image: linear-gradient(to right, black 0%, black 20%, red 20%);"></div>
{% endraw %}

Desta mesma forma, utilizando mais cores é possível fazer toda uma linha de pixels de uma imagem (`background-image: linear-gradient(to right, black 0%, black 20%, red 20%, red 40%, orange 40%, orange 60%, yellow 60%, yellow 80%, green 80%);`).

{% raw %}
<div style="width: 200px; height: 50px; background-image: linear-gradient(to right, black 0%, black 20%, red 20%, red 40%, orange 40%, orange 60%, yellow 60%, yellow 80%, green 80%);"></div>
{% endraw %}

O `background-color` aceita mais de um `linear-gradient` em sequência, sendo possível assim fazer a linha seguinte. Temos que tomar cuidado apenas com o `background-size`. Como temos mais de um `linear-gradient`, precisamos definir o tamanho de cada um, ou seja, nas linhas abaixo teremos um tamanho maior para que fiquem visíveis. Definimos também que o background não repita, para que todos os gradientes descritos possam ser exibidos (`background-repeat: no-repeat; background-image: linear-gradient(to right, black 0%, black 20%, red 20%, red 40%, orange 40%, orange 60%, yellow 60%, yellow 80%, green 80%), linear-gradient(to right, green 0%, green 20%, yellow 20%, yellow 40%, orange 40%, orange 60%, red 60%, red 80%, black 80%); background-size: 200px 25px, 200px 50px;`).

{% raw %}
<div style="width: 200px; height: 50px; background-repeat: no-repeat; background-image: linear-gradient(to right, black 0%, black 20%, red 20%, red 40%, orange 40%, orange 60%, yellow 60%, yellow 80%, green 80%), linear-gradient(to right, green 0%, green 20%, yellow 20%, yellow 40%, orange 40%, orange 60%, red 60%, red 80%, black 80%); background-size: 200px 25px, 200px 50px;"></div>
{% endraw %}

## Juntando tudo

Juntando tudo e colocando pixels na posição correta para criar uma imagem, conseguimos criá-la pixel a pixel com essas propriedades, como na imagem abaixo.

{% raw %}
<div style="width: 200px; height: 200px; background-repeat: no-repeat; background-image: linear-gradient(to right, white 0%, white 6.25%, white 6.25%, white 12.5%, white 12.5%, white 18.75%, white 18.75%, white 25%, white 25%, white 31.25%, rgb(0, 0, 0) 31.25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 43.75%, rgb(0, 0, 0) 43.75%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 56.25%, rgb(0, 0, 0) 56.25%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 68.75%, white 68.75%, white 75%, white 75%, white 81.25%, white 81.25%, white 87.5%, white 87.5%, white 93.75%, white 93.75%, white 100%), linear-gradient(to right, white 0%, white 6.25%, white 6.25%, white 12.5%, white 12.5%, white 18.75%, rgb(0, 0, 0) 18.75%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 31.25%, rgb(255, 255, 255) 31.25%, rgb(255, 255, 255) 37.5%, rgb(255, 255, 255) 37.5%, rgb(255, 255, 255) 43.75%, rgb(164, 13, 20) 43.75%, rgb(164, 13, 20) 50%, rgb(164, 13, 20) 50%, rgb(164, 13, 20) 56.25%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 62.5%, rgb(255, 255, 255) 62.5%, rgb(255, 255, 255) 68.75%, rgb(0, 0, 0) 68.75%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 81.25%, white 81.25%, white 87.5%, white 87.5%, white 93.75%, white 93.75%, white 100%), linear-gradient(to right, white 0%, white 6.25%, white 6.25%, white 12.5%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 18.75%, rgb(255, 255, 255) 18.75%, rgb(255, 255, 255) 25%, rgb(255, 255, 255) 25%, rgb(255, 255, 255) 31.25%, rgb(255, 255, 255) 31.25%, rgb(255, 255, 255) 37.5%, rgb(201, 16, 26) 37.5%, rgb(201, 16, 26) 43.75%, rgb(201, 16, 26) 43.75%, rgb(201, 16, 26) 50%, rgb(201, 16, 26) 50%, rgb(201, 16, 26) 56.25%, rgb(201, 16, 26) 56.25%, rgb(201, 16, 26) 62.5%, rgb(255, 255, 255) 62.5%, rgb(255, 255, 255) 68.75%, rgb(255, 255, 255) 68.75%, rgb(255, 255, 255) 75%, rgb(255, 255, 255) 75%, rgb(255, 255, 255) 81.25%, rgb(0, 0, 0) 81.25%, rgb(0, 0, 0) 87.5%, white 87.5%, white 93.75%, white 93.75%, white 100%), linear-gradient(to right, white 0%, white 6.25%, rgb(0, 0, 0) 6.25%, rgb(0, 0, 0) 12.5%, rgb(164, 13, 20) 12.5%, rgb(164, 13, 20) 18.75%, rgb(164, 13, 20) 18.75%, rgb(164, 13, 20) 25%, rgb(201, 16, 26) 25%, rgb(201, 16, 26) 31.25%, rgb(201, 16, 26) 31.25%, rgb(201, 16, 26) 37.5%, rgb(238, 40, 50) 37.5%, rgb(238, 40, 50) 43.75%, rgb(238, 40, 50) 43.75%, rgb(238, 40, 50) 50%, rgb(238, 40, 50) 50%, rgb(238, 40, 50) 56.25%, rgb(238, 40, 50) 56.25%, rgb(238, 40, 50) 62.5%, rgb(201, 16, 26) 62.5%, rgb(201, 16, 26) 68.75%, rgb(201, 16, 26) 68.75%, rgb(201, 16, 26) 75%, rgb(164, 13, 20) 75%, rgb(164, 13, 20) 81.25%, rgb(164, 13, 20) 81.25%, rgb(164, 13, 20) 87.5%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 93.75%, white 93.75%, white 100%), linear-gradient(to right, white 0%, white 6.25%, rgb(0, 0, 0) 6.25%, rgb(0, 0, 0) 12.5%, rgb(164, 13, 20) 12.5%, rgb(164, 13, 20) 18.75%, rgb(201, 16, 26) 18.75%, rgb(201, 16, 26) 25%, rgb(201, 16, 26) 25%, rgb(201, 16, 26) 31.25%, rgb(238, 40, 50) 31.25%, rgb(238, 40, 50) 37.5%, rgb(238, 40, 50) 37.5%, rgb(238, 40, 50) 43.75%, rgb(238, 40, 50) 43.75%, rgb(238, 40, 50) 50%, rgb(238, 40, 50) 50%, rgb(238, 40, 50) 56.25%, rgb(238, 40, 50) 56.25%, rgb(238, 40, 50) 62.5%, rgb(238, 40, 50) 62.5%, rgb(238, 40, 50) 68.75%, rgb(201, 16, 26) 68.75%, rgb(201, 16, 26) 75%, rgb(201, 16, 26) 75%, rgb(201, 16, 26) 81.25%, rgb(164, 13, 20) 81.25%, rgb(164, 13, 20) 87.5%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 93.75%, white 93.75%, white 100%), linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 6.25%, rgb(255, 255, 255) 6.25%, rgb(255, 255, 255) 12.5%, rgb(201, 16, 26) 12.5%, rgb(201, 16, 26) 18.75%, rgb(201, 16, 26) 18.75%, rgb(201, 16, 26) 25%, rgb(238, 40, 50) 25%, rgb(238, 40, 50) 31.25%, rgb(238, 40, 50) 31.25%, rgb(238, 40, 50) 37.5%, rgb(255, 255, 255) 37.5%, rgb(255, 255, 255) 43.75%, rgb(255, 255, 255) 43.75%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 62.5%, rgb(238, 40, 50) 62.5%, rgb(238, 40, 50) 68.75%, rgb(238, 40, 50) 68.75%, rgb(238, 40, 50) 75%, rgb(201, 16, 26) 75%, rgb(201, 16, 26) 81.25%, rgb(201, 16, 26) 81.25%, rgb(201, 16, 26) 87.5%, rgb(255, 255, 255) 87.5%, rgb(255, 255, 255) 93.75%, rgb(0, 0, 0) 93.75%, rgb(0, 0, 0) 100%), linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 6.25%, rgb(255, 255, 255) 6.25%, rgb(255, 255, 255) 12.5%, rgb(255, 255, 255) 12.5%, rgb(255, 255, 255) 18.75%, rgb(201, 16, 26) 18.75%, rgb(201, 16, 26) 25%, rgb(238, 40, 50) 25%, rgb(238, 40, 50) 31.25%, rgb(255, 255, 255) 31.25%, rgb(255, 255, 255) 37.5%, rgb(255, 255, 255) 37.5%, rgb(255, 255, 255) 43.75%, rgb(255, 255, 255) 43.75%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 62.5%, rgb(255, 255, 255) 62.5%, rgb(255, 255, 255) 68.75%, rgb(238, 40, 50) 68.75%, rgb(238, 40, 50) 75%, rgb(201, 16, 26) 75%, rgb(201, 16, 26) 81.25%, rgb(255, 255, 255) 81.25%, rgb(255, 255, 255) 87.5%, rgb(255, 255, 255) 87.5%, rgb(255, 255, 255) 93.75%, rgb(0, 0, 0) 93.75%, rgb(0, 0, 0) 100%), linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 6.25%, rgb(255, 255, 255) 6.25%, rgb(255, 255, 255) 12.5%, rgb(255, 255, 255) 12.5%, rgb(255, 255, 255) 18.75%, rgb(201, 16, 26) 18.75%, rgb(201, 16, 26) 25%, rgb(238, 40, 50) 25%, rgb(238, 40, 50) 31.25%, rgb(255, 255, 255) 31.25%, rgb(255, 255, 255) 37.5%, rgb(255, 255, 255) 37.5%, rgb(255, 255, 255) 43.75%, rgb(255, 255, 255) 43.75%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 62.5%, rgb(255, 255, 255) 62.5%, rgb(255, 255, 255) 68.75%, rgb(238, 40, 50) 68.75%, rgb(238, 40, 50) 75%, rgb(201, 16, 26) 75%, rgb(201, 16, 26) 81.25%, rgb(255, 255, 255) 81.25%, rgb(255, 255, 255) 87.5%, rgb(255, 255, 255) 87.5%, rgb(255, 255, 255) 93.75%, rgb(0, 0, 0) 93.75%, rgb(0, 0, 0) 100%), linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 6.25%, rgb(255, 255, 255) 6.25%, rgb(255, 255, 255) 12.5%, rgb(201, 16, 26) 12.5%, rgb(201, 16, 26) 18.75%, rgb(201, 16, 26) 18.75%, rgb(201, 16, 26) 25%, rgb(201, 16, 26) 25%, rgb(201, 16, 26) 31.25%, rgb(255, 255, 255) 31.25%, rgb(255, 255, 255) 37.5%, rgb(255, 255, 255) 37.5%, rgb(255, 255, 255) 43.75%, rgb(255, 255, 255) 43.75%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 62.5%, rgb(255, 255, 255) 62.5%, rgb(255, 255, 255) 68.75%, rgb(201, 16, 26) 68.75%, rgb(201, 16, 26) 75%, rgb(201, 16, 26) 75%, rgb(201, 16, 26) 81.25%, rgb(201, 16, 26) 81.25%, rgb(201, 16, 26) 87.5%, rgb(255, 255, 255) 87.5%, rgb(255, 255, 255) 93.75%, rgb(0, 0, 0) 93.75%, rgb(0, 0, 0) 100%), linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 6.25%, rgb(164, 13, 20) 6.25%, rgb(164, 13, 20) 12.5%, rgb(201, 16, 26) 12.5%, rgb(201, 16, 26) 18.75%, rgb(201, 16, 26) 18.75%, rgb(201, 16, 26) 25%, rgb(164, 13, 20) 25%, rgb(164, 13, 20) 31.25%, rgb(164, 13, 20) 31.25%, rgb(164, 13, 20) 37.5%, rgb(255, 255, 255) 37.5%, rgb(255, 255, 255) 43.75%, rgb(255, 255, 255) 43.75%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 56.25%, rgb(255, 255, 255) 62.5%, rgb(164, 13, 20) 62.5%, rgb(164, 13, 20) 68.75%, rgb(164, 13, 20) 68.75%, rgb(164, 13, 20) 75%, rgb(201, 16, 26) 75%, rgb(201, 16, 26) 81.25%, rgb(201, 16, 26) 81.25%, rgb(201, 16, 26) 87.5%, rgb(164, 13, 20) 87.5%, rgb(164, 13, 20) 93.75%, rgb(0, 0, 0) 93.75%, rgb(0, 0, 0) 100%), linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 6.25%, rgb(164, 13, 20) 6.25%, rgb(164, 13, 20) 12.5%, rgb(164, 13, 20) 12.5%, rgb(164, 13, 20) 18.75%, rgb(164, 13, 20) 18.75%, rgb(164, 13, 20) 25%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 31.25%, rgb(0, 0, 0) 31.25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 43.75%, rgb(0, 0, 0) 43.75%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 56.25%, rgb(0, 0, 0) 56.25%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 68.75%, rgb(0, 0, 0) 68.75%, rgb(0, 0, 0) 75%, rgb(164, 13, 20) 75%, rgb(164, 13, 20) 81.25%, rgb(164, 13, 20) 81.25%, rgb(164, 13, 20) 87.5%, rgb(164, 13, 20) 87.5%, rgb(164, 13, 20) 93.75%, rgb(0, 0, 0) 93.75%, rgb(0, 0, 0) 100%), linear-gradient(to right, white 0%, white 6.25%, rgb(0, 0, 0) 6.25%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 18.75%, rgb(0, 0, 0) 18.75%, rgb(0, 0, 0) 25%, rgb(244, 202, 104) 25%, rgb(244, 202, 104) 31.25%, rgb(244, 202, 104) 31.25%, rgb(244, 202, 104) 37.5%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 43.75%, rgb(244, 202, 104) 43.75%, rgb(244, 202, 104) 50%, rgb(244, 202, 104) 50%, rgb(244, 202, 104) 56.25%, rgb(0, 0, 0) 56.25%, rgb(0, 0, 0) 62.5%, rgb(244, 202, 104) 62.5%, rgb(244, 202, 104) 68.75%, rgb(244, 202, 104) 68.75%, rgb(244, 202, 104) 75%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 81.25%, rgb(0, 0, 0) 81.25%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 93.75%, white 93.75%, white 100%), linear-gradient(to right, white 0%, white 6.25%, white 6.25%, white 12.5%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 18.75%, rgb(244, 202, 104) 18.75%, rgb(244, 202, 104) 25%, rgb(255, 241, 113) 25%, rgb(255, 241, 113) 31.25%, rgb(255, 241, 113) 31.25%, rgb(255, 241, 113) 37.5%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 43.75%, rgb(255, 241, 113) 43.75%, rgb(255, 241, 113) 50%, rgb(255, 241, 113) 50%, rgb(255, 241, 113) 56.25%, rgb(0, 0, 0) 56.25%, rgb(0, 0, 0) 62.5%, rgb(255, 241, 113) 62.5%, rgb(255, 241, 113) 68.75%, rgb(255, 241, 113) 68.75%, rgb(255, 241, 113) 75%, rgb(244, 202, 104) 75%, rgb(244, 202, 104) 81.25%, rgb(0, 0, 0) 81.25%, rgb(0, 0, 0) 87.5%, white 87.5%, white 93.75%, white 93.75%, white 100%), linear-gradient(to right, white 0%, white 6.25%, white 6.25%, white 12.5%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 18.75%, rgb(244, 202, 104) 18.75%, rgb(244, 202, 104) 25%, rgb(255, 241, 113) 25%, rgb(255, 241, 113) 31.25%, rgb(255, 241, 113) 31.25%, rgb(255, 241, 113) 37.5%, rgb(255, 241, 113) 37.5%, rgb(255, 241, 113) 43.75%, rgb(255, 241, 113) 43.75%, rgb(255, 241, 113) 50%, rgb(255, 241, 113) 50%, rgb(255, 241, 113) 56.25%, rgb(255, 241, 113) 56.25%, rgb(255, 241, 113) 62.5%, rgb(255, 241, 113) 62.5%, rgb(255, 241, 113) 68.75%, rgb(255, 241, 113) 68.75%, rgb(255, 241, 113) 75%, rgb(244, 202, 104) 75%, rgb(244, 202, 104) 81.25%, rgb(0, 0, 0) 81.25%, rgb(0, 0, 0) 87.5%, white 87.5%, white 93.75%, white 93.75%, white 100%), linear-gradient(to right, white 0%, white 6.25%, white 6.25%, white 12.5%, white 12.5%, white 18.75%, rgb(0, 0, 0) 18.75%, rgb(0, 0, 0) 25%, rgb(244, 202, 104) 25%, rgb(244, 202, 104) 31.25%, rgb(255, 241, 113) 31.25%, rgb(255, 241, 113) 37.5%, rgb(255, 241, 113) 37.5%, rgb(255, 241, 113) 43.75%, rgb(255, 241, 113) 43.75%, rgb(255, 241, 113) 50%, rgb(255, 241, 113) 50%, rgb(255, 241, 113) 56.25%, rgb(255, 241, 113) 56.25%, rgb(255, 241, 113) 62.5%, rgb(255, 241, 113) 62.5%, rgb(255, 241, 113) 68.75%, rgb(244, 202, 104) 68.75%, rgb(244, 202, 104) 75%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 81.25%, white 81.25%, white 87.5%, white 87.5%, white 93.75%, white 93.75%, white 100%), linear-gradient(to right, white 0%, white 6.25%, white 6.25%, white 12.5%, white 12.5%, white 18.75%, white 18.75%, white 25%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 31.25%, rgb(0, 0, 0) 31.25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 43.75%, rgb(0, 0, 0) 43.75%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 56.25%, rgb(0, 0, 0) 56.25%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 68.75%, rgb(0, 0, 0) 68.75%, rgb(0, 0, 0) 75%, white 75%, white 81.25%, white 81.25%, white 87.5%, white 87.5%, white 93.75%, white 93.75%, white 100%); background-size: 200px 10px, 200px 20px, 200px 30px, 200px 40px, 200px 50px, 200px 60px, 200px 70px, 200px 80px, 200px 90px, 200px 100px, 200px 110px, 200px 120px, 200px 130px, 200px 140px, 200px 150px, 200px 160px;"></div>
{% endraw %}

## Conclusão

Essa técnica pode ser utilizada de diferentes maneiras também. Nesse exemplo utilizamos os pixels linha a linha para criação da imagem, mas poderiamos também ter utilizado colunas por colunas. O `linear-gradient` também vai muito [além de linhas](https://www.w3schools.com/css/css3_gradients.asp). Você consegue utilizar padrões de repetições, gradientes em ângulos e até em radiais.

Ainda falando de pixel art, o Marcus Blättermann possui [essa página](https://essenmitsosse.de/pixel/) legal com diversas artes que se adaptam ao tamanho da tela e em alguns casos até mudam seu conteúdo. Vale a pena dar uma olhada.