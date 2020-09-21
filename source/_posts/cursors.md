---
title: Cursors
date: "2020-09-22T22:00:00.169Z"
---

Hoje em dia existem nos navegadores modernos diversos modelos de cursores diferentes que podem ser utilizados através do atributo `cursors` do CSS. Os mais comuns de vermos são os {%raw%}<code style="cursor:default">default</code><span>, </span><code style="cursor:pointer">pointer</code><span>, </span><code style="cursor:crosshair">crosshair</code><span>, </span><code style="cursor:no-drop">no-drop</code><span> e </span><code style="cursor:none">none</code>{%endraw%}. Além disso, esse atributo permite também, adicionar {%raw%}<code class="image-cursor">imagens no lugar do cursor</code>{%endraw%}.

Com essa flexibilidade muita coisa divertida tem sido feita para melhorar a usabilidade ou apenas sacanear usuários com cursores diferentões. Porém, apesar de conseguirmos fazer esse tipo de brincadeira com imagens, não é possível adicionarmos _GIFs_ ou vídeos no lugar do cursor, limitando apenas a imagens estáticas.

Para contornar isso, uma das alternativas é ocultar totalmente o cursor com o atributo `cursor: none` e através do Javascript adicionar algum componente de forma absoluta nas coordenadas atuais do ponteiro, como no código abaixo:

```js
window.onmousemove = function (e) {
    const x = e.clientX;
    const y = e.clientY;
    myCursor.style.top = (y + 20) + 'px';
    myCursor.style.left = (x + 20) + 'px';
};
```

Esta é a alternativa mais comumente utilizada, mas as vezes perde a performance quando o usuário move o mouse muito rapidamente.

Em uma tentativa de simular um mouse animado, experimentei neste post uma alternativa alterando a imagem constantemente buscando de criar um cursor animado. Este teste por motivos óbvios não irá aparecer em dispositivos _touch_.

No código abaixo é possível ver como essa gambiarra é feita:

```js
let currentCursor = 0;
setInterval(() => {
  if (currentCursor < 35) {
    currentCursor++;
  } else {
    currentCursor = 0;
  }
  const html = document.getElementsByTagName('html')[0];
  html.style.cursor = `url('/images/cursors/${currentCursor}.png'), auto`;
}, 50);
```

Como você pode ver, o seu cursor deve estar mudando de cor constantemente nesta tela, dando a impressão de ser levemente animado.

Por fim deixo aqui uma última sugestão de cursores utilizando as regras de `@keyframes` do CSS, conforme implementado [neste CodePen](https://codepen.io/Jan-Timon/pen/amkLWL). Essa alternativa porém possui algumas restrições de navegadores, funcionando no momento somente no Chrome.

{% raw %}
<style>
.image-cursor {
  cursor: url("/images/mini-logo.png"), auto;
}
</style>
<script>
  let currentCursor = 0;
  setInterval(() => {
    if (currentCursor < 35) {
      currentCursor++;
    } else {
      currentCursor = 0;
    }
    const html = document.getElementsByTagName('html')[0];
    html.style.cursor = `url('/images/cursors/${currentCursor}.png'), auto`;
  }, 50);
</script>
{% endraw %}
