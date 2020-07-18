---
title: Acendendo seu primeiro LED (em CSS)
date: "2020-07-21T22:00:00.169Z"
---

Não, você não precisa mais comprar um Arduino para acender o seu primeiro LED. Neste artigo vamos verificar como montar e acender o seu primeiro LED utilizando apenas HTML e CSS. É simples, rápido, e você pode visualizá-lo em todos os navegadores mais modernos.

## Iniciando com HTML

Os primeiros passos para criarmos o nosso LED é adicionarmos as TAGs HTML. Como não sou nenhum especialista em LEDs, vamos nomear as partes do componente com palavras que mais remetam ao que elas são (pelo menos para mim).

O HTML base que vamos utilizar é o seguinte:

```html
<div class="led">
  <div class="cabeca"></div>
  <div class="base"></div>
  <div class="pernas">
    <div class="perna"></div>
    <div class="perna short"></div>
  </div>
</div>
```

## Continuando pela cabeça

Agora que já temos a base, podemos começar com o nosso CSS. Primeiramente adicionamos um fluxo base para a nossa classe LED, definindo que os nossos componentes ficarão um em cima do outro, utilizando o layout `flex` (se você ainda não conhece muito o `flex` recomendo fortemente o [Flexbox Froggy](https://flexboxfroggy.com/)):

```css
.led {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Após isso, adicionamos os estilos para a cabeça do led, com as bordas superiores arredondadas:

```css
.cabeca {
  width: 10em;
  height: 15em;
  border-radius: 5em 5em 0 0;
  border: 1px solid lightgray;
}
```

{% raw %}
<div class="led">
  <div class="cabeca-previa"></div>
  <div></div>
  <div>
    <div></div>
    <div></div>
  </div>
</div>
<style>
  .cabeca-previa {
    width: 10em;
    height: 15em;
    border-radius: 5em 5em 0 0;
    border: 1px solid lightgray;
  }
</style>
{% endraw %}

Podemos adicionar ainda um background mais bonito para o nosso componente, com um degradê para parecer um pouco mais redondo:

```css
.cabeca {
  width: 10em;
  height: 15em;
  border-radius: 5em 5em 0 0;
  background-image: linear-gradient(to top right, rgb(211, 211, 211, 0.5) 20%, rgb(211, 211, 211, 0.3) 60%, rgb(211, 211, 211, 0.2));
}
```

{% raw %}
<div class="led">
  <div class="cabeca"></div>
  <div></div>
  <div>
    <div></div>
    <div></div>
  </div>
</div>
{% endraw %}

## Seguindo pela base

Na sequência, continuamos pela base do LED. A base é bastante parecida com a cabeça, diferenciamento apenas pelo tamanho e a borda arredondada em todos os lados

```css
.base {
  width: 13em;
  height: 3em;
  border-radius: 1em;
  background-image: linear-gradient(to bottom right, rgb(211, 211, 211, 0.5) 20%, rgb(211, 211, 211, 0.3) 60%, rgb(211, 211, 211, 0.2));
}
```

{% raw %}
<div class="led">
  <div class="cabeca"></div>
  <div class="base"></div>
  <div>
    <div></div>
    <div></div>
  </div>
</div>
{% endraw %}

## Pernas

Para concluir o layout do LED, adicionamos as perninhas do LED (que em um mundo ideal seriam utilizadas para conectar o LED com a fonte de energia).

```css
.pernas {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.perna {
  height: 15em;
  width: 0.2em;
  background-color: gray;
  margin: 0 2em;
}
```

{% raw %}
<div class="led">
  <div class="cabeca"></div>
  <div class="base"></div>
  <div class="pernas">
    <div class="perna"></div>
    <div class="perna short"></div>
  </div>
</div>
{% endraw %}

## Acendendo o LED

Com a casca do LED concluída, só precisamos acendê-lo. Para acender a luz podemos utilizar o `box-shadow` que vai criar um efeito de sombra colorida no nosso LED. Além disso, podemos ajustar a cor do nosso linear gradient para ficar mais parecido com a cor da iluminação.

Abaixo coloquei o estilo para LEDs vermelhos, verdes e azuis, que podem ser testados com os `radio buttons` no exemplo abaixo.

```css
.red-light {
  box-shadow: 0px 0px 75px 10px rgb(255,0,0);
}
.red {
  background-image: linear-gradient(to top right, rgba(255, 50, 50, 0.5) 20%, rgba(255, 50, 50, 0.3) 60%, rgba(255, 50, 50, 0.2)) !important;
}
.green-light {
  box-shadow: 0px 0px 75px 10px rgb(0,255,0);
}
.green {
  background-image: linear-gradient(to top right, rgba(50, 255, 50, 0.5) 20%, rgba(50, 255, 50, 0.3) 60%, rgba(50, 255, 50, 0.2)) !important;
}
.blue-light {
  box-shadow: 0px 0px 75px 10px rgb(0,0,255);
}
.blue {
  background-image: linear-gradient(to top right, rgba(50, 50, 255, 0.5) 20%, rgba(50, 50, 255, 0.3) 60%, rgba(50, 50, 255, 0.2)) !important;
}
```

{% raw %}
<div style="margin-top: 15px" class="led">
  <div class="cores">
    <div>
      <input type="radio" id="red" name="red" value="red" checked onClick="onRadioPress(this)">
      <label for="red">Vermelho</label><br>
    </div>
    <div>
      <input type="radio" id="green" name="green" value="green" onClick="onRadioPress(this)">
      <label for="green">Verde</label><br>
    </div>
    <div>
      <input type="radio" id="blue" name="blue" value="blue" onClick="onRadioPress(this)">
      <label for="blue">Azul</label> 
    </div>
  </div>
  <div id="cabeca" class="cabeca red red-light"></div>
  <div id="base" class="base red"></div>
  <div class="pernas">
    <div class="perna"></div>
    <div class="perna short"></div>
  </div>
</div>
<style>
  .red-light {
    box-shadow: 0px 0px 75px 10px rgb(255,0,0);
  }
  .red {
    background-image: linear-gradient(to top right, rgba(255, 50, 50, 0.5) 20%, rgba(255, 50, 50, 0.3) 60%, rgba(255, 50, 50, 0.2)) !important;
  }
  .green-light {
    box-shadow: 0px 0px 75px 10px rgb(0,255,0);
  }
  .green {
    background-image: linear-gradient(to top right, rgba(50, 255, 50, 0.5) 20%, rgba(50, 255, 50, 0.3) 60%, rgba(50, 255, 50, 0.2)) !important;
  }
  .blue-light {
    box-shadow: 0px 0px 75px 10px rgb(0,0,255);
  }
  .blue {
    background-image: linear-gradient(to top right, rgba(50, 50, 255, 0.5) 20%, rgba(50, 50, 255, 0.3) 60%, rgba(50, 50, 255, 0.2)) !important;
  }
  .led {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cabeca {
    width: 10em;
    height: 15em;
    border-radius: 5em 5em 0 0;
    background-image: linear-gradient(to top right, rgb(211, 211, 211, 0.5) 20%, rgb(211, 211, 211, 0.3) 60%, rgb(211, 211, 211, 0.2));
  }
  .base {
    width: 13em;
    height: 3em;
    border-radius: 1em;
    background-image: linear-gradient(to bottom right, rgb(211, 211, 211, 0.5) 20%, rgb(211, 211, 211, 0.3) 60%, rgb(211, 211, 211, 0.2));
  }
  .pernas {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .perna {
    height: 15em;
    width: 0.2em;
    background-color: gray;
    margin: 0 2em;
  }
  .short {
    height: 10em;
  }
  .cores {
    margin-bottom: 100px;
    display: flex;
    justify-content: space-between;
    align-self: stretch;
  }
</style>
<script>
function onRadioPress(event) {
  const radioClicado = event;
  const cabecaLed = document.getElementById("cabeca");
  const baseLed = document.getElementById("base");
  const radioVermelho = document.getElementById("red");
  const radioVerde = document.getElementById("green");
  const radioAzul = document.getElementById("blue");
  switch(radioClicado.id) {
    case "red":
      cabecaLed.className = "cabeca red red-light";
      baseLed.className = "base red";
      radioVerde.checked = false;
      radioAzul.checked = false;
      break;
    case "green":
      cabecaLed.className = "cabeca green green-light";
      baseLed.className = "base green";
      radioVermelho.checked = false;
      radioAzul.checked = false;
      break;
    case "blue":
      cabecaLed.className = "cabeca blue blue-light";
      baseLed.className = "base blue";
      radioVermelho.checked = false;
      radioVerde.checked = false;
      break;
  }
}
</script>
{% endraw %}

## Conclusão

Com esses simples passos conseguimos acender o nosso primeiro LED utilizando apenas HTML e CSS. Pode parecer um passo pequeno, mas esse tutorial pode ser uma ótima porta de entrada para um novo mundo de desenvolvimento de softwares embarcados (porém em CSS).