---
title: Jogando com CSS
date: "2020-02-11T20:12:07.169Z"
---

Um dos primeiros programas que fiz ao aprender a programar foi um simples jogo para Android. No meu primeiro ano estudando programação tive o desafio de aprender como desenvolver jogos para Android para realizar uma oficina para os alunos das turmas iniciais. A ideia era criar um jogo onde baratas ficavam correndo pela tela e o usuário precisava clicar nelas para ganhar pontos.

As linguagens de programação evoluíram muito desde então, e hoje um jogo como esse é possível ser feito utilizando apenas CSS e HTML. E é isso que faremos neste artigo. Alguns dos recursos que vamos usar são disponíveis apenas nas versões mais recentes do CSS e podem não funcionar em versões mais antigas de alguns navegadores.

## Começando

A base do nosso jogo será utilizando _checkboxes_. Para isso iniciamos com um simples HTML contendo 5 deles com os respectivos _labels_. Também vamos adicionar um CSS básico na página que por enquanto não terá muito efeito. O código abaixo demonstra como ele está no momento.

{% raw %}
<iframe width="100%" height="300" src="//jsfiddle.net/cgreinhold/doqk7rzm/1/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
{% endraw %}

Na sequência, adicionamos alguns estilos nos inputs para transformá-los nos nossos itens do jogo. Para isso, ocultamos a caixa de seleção existente, e nos labels de cada um adicionamos _emojis_ da seguinte forma:

```css
label[for="1"]:before {
  content: '🍎';
}

label[for="2"]:before {
  content: '🍇';
}
```

Além disso, vamos mudar o conteúdo das caixas selecionadas para terem um _emoji_ diferente, definindo que elas foram clicadas e remover o evento do clique para que um novo clique não surta efeito:

```css
input:checked + label:before {
  content: '🥙';
}

input:checked + label {
  pointer-events: none;
}
```

E por fim adicionamos um estilo a mais no input para ocultar a caixa:

```css
input {
  position: absolute;
  left: -100vw;
  zoom: 3;
}
```

{% raw %}
<iframe width="100%" height="300" src="//jsfiddle.net/cgreinhold/doqk7rzm/4/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
{% endraw %}

## Contador

Precisamos também de um contador para a pontuação do jogo, e por sorte o CSS possui essa funcionalidade também, utilizando a propriedade _counter_. Para isso vamos incrementar o contador __frutas__ para cada input e o contador __frutas-selecionadas__ para as frutas clicadas.

```css
input {
  counter-increment: frutas;
}
    
input:checked {
  counter-increment: frutas frutas-selecionadas;
}
```

Também vamos adicionar na nossa tela um footer com o resultado do contador.

```html
<footer>
  frutas selecionadas
</footer>
```

```css
footer {
  background-color: #f03a17;
  color: white;
  height: 1.5rem;
  width: 100vw;
  position: absolute;
  bottom: 0;
}

footer:before {
  content: counter(frutas-selecionadas) '/' counter(frutas) ' ';
}
```

{% raw %}
<iframe width="100%" height="300" src="//jsfiddle.net/cgreinhold/doqk7rzm/28/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
{% endraw %}

## Animando

Agora que já temos a base de nosso jogo pronta, podemos adicionar a animação aos itens para dar um pouco de dificuldade. Para isso vamos utilizar as propriedades de animação do CSS. O estilo abaixo por exemplo fará com que todos os _emojis_ fiquem subindo e descendo infinitamente (`infinite`, `linear` e `alternate`) demorando 5 segundos (`5s`) para chegar ao fim da página (`100vh`) e 5 segundos mais para subir:

```css
label {
  animation: move 5s infinite linear alternate;
  display: inline-block;
}

@keyframes move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(100vh - 3rem));
  }
}
```

{% raw %}
<iframe width="100%" height="300" src="//jsfiddle.net/cgreinhold/doqk7rzm/29/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
{% endraw %}

Podemos fazer com que o estilo fique um pouco mais aleatório utilizando mais _keyframes_ no movimento dos itens como por exemplo abaixo:

```css
@keyframes move {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(calc(30vh)) translateX(50px);
  }
  40% {
    transform: translateY(calc(80vh - 3rem)) translateX(-150px);
  }
  60% {
    transform: translateY(calc(50vh - 3rem)) translateX(-100px);
  }
  80% {
    transform: translateY(calc(85vh - 3rem)) translateX(100px);
  }
  100% {
    transform: translateY(calc(100vh - 3rem));
  }
}
```

{% raw %}
<iframe width="100%" height="300" src="//jsfiddle.net/cgreinhold/doqk7rzm/30/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
{% endraw %}

E brincando mais com o seletor `nth-of-type` conseguimos deixar cada item com um movimento diferente.

```css
/* Seleciona os labels pares, iniciando pelo segundo */
label:nth-of-type(even) {
  animation-direction: alternate-reverse;
  animation-duration: 3.5;
  transform: translateY(calc(100vh - 3rem));
}

/* Seleciona todos os labels, exceto os dois primeiros */
label:nth-of-type(n + 3) {
  animation-delay: 1s;
}

/* Seleciona apenas os três primeiros labels */
label:nth-of-type(-n + 3) {
  animation-duration: 7s;
}
```

E também vamos parar a animação quando estiverem selecionados:

```css
input:checked + label {
  animation-play-state: paused;
}
```

{% raw %}
<iframe width="100%" height="300" src="//jsfiddle.net/cgreinhold/doqk7rzm/31/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
{% endraw %}

## Finalizando

Por fim, vamos adicionar uma mensagem para quando o jogo chegou ao fim. Essa mensagem só deve ser exibida quando todos os _checkboxes_ tiverem sido clicados, e por isso utilizamos o _[general sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator)_ do CSS que só aplicará o estilo a um seletor se ele estiver seguido de irmãos definidos anteriormente. Utilizamos da seguinte forma:

```html
<!-- Primeiro adicionamos a div com a mensagem -->
<div class="final">
  Bom trabalho
</div>
```

```css
.final {
  width: 100%;
  height: calc(100vh - 3rem);
  position: absolute;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: xx-large;
  display: none;
}

input:checked
  ~ input:checked
  ~ input:checked
  ~ input:checked
  ~ input:checked
  ~ .final {
  display: flex;
}
```

E assim temos o jogo finalizado.

{% raw %}
<iframe width="100%" height="300" src="//jsfiddle.net/cgreinhold/doqk7rzm/32/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
{% endraw %}

## Conclusão

O CSS já evoluiu tanto que hoje conseguimos fazer coisas bastante avançadas conforme vimos no jogo acima. Um ótimo lugar para pesquisar e conhecer mais sobre CSS com projetos de verdade é o [Codepen](https://codepen.io/picks/pens/), onde muitos desenvolvedores liberam trechos de códigos para ideias simples, mas que podem deixar suas páginas mais bonitas e divertidas.

Outra ferramenta muito legal é o [Flexbox Froggy](https://flexboxfroggy.com/) que ensina o funcionamento do _flex_ no CSS através de um jogo com 24 níveis de dificuldade.

## Referência

Esse artigo foi feito com base no tutorial da Mira Thoen Feiring, disponibilizado em 21.12.2019 [aqui](https://css.christmas/2019/21).