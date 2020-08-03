---
title: Cursors
date: "2020-08-25T22:00:00.169Z"
---

Existem vários modelos de cursores diferentes em que é possível utilizar através do atributo `cursors` do CSS. Esse atributo permite, inclusive, adicionar imagens no lugar do cursor.

Apesar disso, não é possível adicionar _GIFs_ no lugar do cursor, limitando apenas a imagens estáticas.

Neste post faço um teste alterando a imagem constantemente na tentativa de criar um cursor animado. Este teste por motivos óbvios podem não aparecer em dispositivos _touch_.

Uma outra alternativa seria ocultar totalmente o cursor e adicionar algum componente de forma absoluta nas coordenadas atuais do ponteiro, porém essa alternativa apresenta lentidão com movimentos rápidos

{% raw %}
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
