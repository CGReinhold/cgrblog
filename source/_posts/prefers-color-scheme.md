---
title: prefers-color-scheme
date: "2020-06-02T22:00:00.169Z"
---

Você já usou o [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme), a _feature_ do CSS que permite você identificar qual o tema da máquina do usuário que acessa o seu site?

Como é uma _feature_ recente, ainda pode não ser suportada em alguns navegadores, mas é algo muito legal para configurar seu site com temas escuros ou claros dependendo nas preferências do usuário. Se você utiliza tema escuro na sua máquina já deve ter percebido que este post está um pouco diferente, já que passei a utilizar esse novo estilo. E isso tudo apenas com CSS, de forma simple e fácil.

## Mas, como funciona?

Para utilizar essa funcionalidade no CSS, basta implementar como no código abaixo:

```css
@media (prefers-color-scheme: dark) {
  * { background: #333; color: white; }
}

@media (prefers-color-scheme: light) {
  * { background: white; color:  #555; }
}
```

Com o código acima, estamos alterando o background para escuro e a fonte para branco em máquinas que utilizam tema _dark_, porém em máquinas com tema _light_ o fundo ficara branco enquanto a fonte escura. Legal né?

Uma das desvantagens disso é que você não conseguirá fazer com que o tema seja configurável pelo usuário. Como o CSS detecta que o usuário utiliza tema escuro, esse será o estilo utilizado.

Uma das alternativas é fazer um _hack_ com Javascript verificando qual o estilo computado em um elemento e identificado se é o estilo utilizado em temas claros ou escuros.

```javascript
const body = document.querySelector('body');
window.getComputedStyle(body)["background-color"]; // "rgb(29, 31, 33)" 
```

Definitivamente uma alternativa não muito elegante, mas que funciona.

## E o que mais?

Não é necessário mais nada. Simples assim. É incrível ver como o CSS tem avançado tanto, que algo complexo, como temas de websites podem ser feitas de forma rápida e fácil.

E com isso você pode deixar sua criatividade te levar. Você pode não só mudar as cores de fundo e fonte, como também inverter as cores de imagem, conforme o estilo abaixo:

```css
@media (prefers-color-scheme: dark) {
    filter: invert(88%) !important
}
```

Agora é só por em prática e deixar o seu site de acordo com as preferências de quem usa.

{%raw%}
<style>
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1d1f21;
    color: #c9cacc;
  }
  code, h2 {
    color: #c9cacc !important;
  }
}
</style>
{%endraw%}