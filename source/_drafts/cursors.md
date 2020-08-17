---
title: Cursors
date: "2020-09-15T22:00:00.169Z"
---

Existem vários modelos de cursores diferentes em que é possível utilizar através do atributo `cursors` do CSS. Os mais comuns de vermos são os {%raw%}<code style="cursor:default">default</code><span>, </span><code style="cursor:pointer">pointer</code><span>, </span><code style="cursor:crosshair">crosshair</code><span>, </span><code style="cursor:no-drop">no-drop</code><span> e </span><code style="cursor:none">none</code>{%endraw%}. ALém disso, esse atributo permite também, adicionar {%raw%}<span class="image-cursor">imagens no lugar do cursor</span>{%endraw%}.

Apesar disso, não é possível adicionar _GIFs_ ou vídeos no lugar do cursor, limitando apenas a imagens estáticas.

Uma das alternativas é ocultar totalmente o cursor com o atributo `cursor: none` e através do Javascript adicionar algum componente de forma absoluta nas coordenadas atuais do ponteiro, como no código abaixo:

```js
window.onmousemove = function (e) {
    const x = e.clientX;
    const y = e.clientY;
    myCursor.style.top = (y + 20) + 'px';
    myCursor.style.left = (x + 20) + 'px';
};
```

Esta é a alternativa mais comumente utilizada, mas as vezes perde a performance quando o usuário move o mouse muito rapidamente.

Em uma tentativa alternativa de simular um mouse animado, fiz neste post um teste alterando a imagem constantemente na tentativa de criar um cursor animado. Este teste por motivos óbvios podem não aparecer em dispositivos _touch_.

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

Ao fim deste artigo chegamos com mais dúvidas do que respostas: vale a pena se esforçar para ter um cursor animado?

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
