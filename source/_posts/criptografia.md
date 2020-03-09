---
title: Criptografia - parte 1
date: "2020-03-13T22:00:00.169Z"
---

A algumas semanas escrevi um pouco sobre esteganografia, e fiz até uma implementação simples para entendermos melhor como funciona. Neste artigo vamos falar um pouco sobre a criptografia, uma linha de estudo que tenta, ao invés de esconder, modificar uma mensagem ou informação a ponto de que só possa ser decodificada por alguém que tenha uma chave para isso.

Neste artigo vou buscar trazer um contexto histórico de como a criptografia evoluiu deste sua criação, me baseando no livro __The Code Book: How to make it, break it, hack it, crack it__ do Simon Singh. Serão apenas apresentados tipos de codificação para mensagens textuais, mas os mesmo podem ser adaptados também para outros tipos de informações.

## Introdução

A ideia básica da criptografia é converter uma informação em outra usando alguma chave que pode ser utilizada para decodificá-la novamente para a mensagem original. Isso pode ser feito de duas formas: `transposição`, que seria mudar a posição dos caracteres de uma mensagem, e `substituição`, que seria trocar os caracteres ou conjuntos de caracteres por outro caractere ou símbolo.

## Criptografia por transposição

Como um exemplo de criptografia por transposição, podemos utilizar uma regra para criptografar uma mensagem em que os caracteres ímpares de uma mensagem sempre trocarão de posição com o caractere a sua direita. Neste caso a palavra `criptografia` ficaria `rcpiotrgfaai`. Você pode experimentar com outras palavras abaixo:

{% raw %}
<style>
  .input-text {
    display: flex;
    flex-direction: row;
    height: 35px;
  }

  .transposed {
    padding-left: 15px;
    font-size: 20px;
    font-family: Courier, monospace;
  }

  .transposed span {
    position: absolute;
  }

  .transposed span:nth-child(odd) {
    animation-name: odds;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }

  .transposed span:nth-child(even) {
    animation-name: evens;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }

  @keyframes odds {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(11px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes evens {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-11px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>

<div class="input-text">
  <input id="transposition" type="text" maxlength="30" oninput="onTransposition(this)"></input>
  <div id="transposed" class="transposed"></div>
</div>

<script>
function onTransposition(el) {
  const writtenWord = el.value;
  const transposed = document.getElementById('transposed');
  transposed.innerHTML = '';
  if (writtenWord) {    
    for (let i = 0; i < writtenWord.length; i++) {
      const letter = writtenWord[i];
      const domLetter = document.createElement('span');
      domLetter.innerText = letter;
      domLetter.style.paddingLeft = (i * 11) + 'px';
      transposed.appendChild(domLetter);
    }
  }  
}

const transposition = document.getElementById('transposition');
transposition.value = 'criptografia';
onTransposition(transposition);
</script>
{% endraw %}

Outro exemplo de criptografia por transposição é utilizando a `cifra cerca de trilho`, em que os caracteres de algumas colunas descem para a linha seguinte, formando uma nova sequência. No exemplo abaixo, alteramos a linha dos caracteres em posição par, fazendo com que a palavra `criptografia` seja codificada para `citgairporfa`. Neste exemplo você também pode experimentar com outras palavras:

{% raw %}
<style>
  .input-text2 {
    display: flex;
    flex-direction: row;
    height: 35px;
  }

  .transposed2 {
    display: flex;
    flex-direction: row;
    padding-left: 15px;
  }

  .letter {
    font-family: monospace;
    font-size: 17px;
  }

  .letter:nth-child(2) {
    animation-name: e2;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(3) {
    animation-name: o3;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(4) {
    animation-name: e4;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(5) {
    animation-name: o5;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(6) {
    animation-name: e6;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(7) {
    animation-name: o7;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(8) {
    animation-name: e8;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(9) {
    animation-name: o9;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(10) {
    animation-name: e10;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(11) {
    animation-name: o11;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(12) {
    animation-name: e12;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(13) {
    animation-name: o13;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(14) {
    animation-name: e14;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(15) {
    animation-name: o15;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(16) {
    animation-name: e16;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }
  .letter:nth-child(17) {
    animation-name: o17;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(18) {
    animation-name: e18;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(19) {
    animation-name: o19;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(20) {
    animation-name: e20;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(21) {
    animation-name: o21;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(22) {
    animation-name: e22;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(23) {
    animation-name: o23;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(24) {
    animation-name: e24;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(25) {
    animation-name: o25;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(26) {
    animation-name: e26;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(27) {
    animation-name: o27;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(28) {
    animation-name: e28;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(29) {
    animation-name: o29;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  .letter:nth-child(30) {
    animation-name: e30;
    animation-duration: 8s;
    animation-iteration-count:infinite;
  }

  @keyframes o3 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-10px);}
    75%  {transform: translateX(-10px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o5 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-20px);}
    75%  {transform: translateX(-20px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o7 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-30px);}
    75%  {transform: translateX(-30px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o9 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-40px);}
    75%  {transform: translateX(-40px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o11 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-50px);}
    75%  {transform: translateX(-50px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o13 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-60px);}
    75%  {transform: translateX(-60px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o15 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-70px);}
    75%  {transform: translateX(-70px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o17 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-80px);}
    75%  {transform: translateX(-80px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o19 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-90px);}
    75%  {transform: translateX(-90px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o21 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-10px);}
    75%  {transform: translateX(-10px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o23 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-100px);}
    75%  {transform: translateX(-100px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o25 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-110px);}
    75%  {transform: translateX(-110px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o27 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-120px);}
    75%  {transform: translateX(-120px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes o29 {
    0%   {transform: translateX(0);}
    10%  {transform: translate(0);}
    20%  {transform: translateX(-130px);}
    75%  {transform: translateX(-130px);}
    85%  {transform: translate(0);}
    100% {transform: translateX(0);}
  }

  @keyframes e2 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-10px, 11px);}
    75%  {transform: translate(-10px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e4 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-20px, 11px);}
    75%  {transform: translate(-20px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e6 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-30px, 11px);}
    75%  {transform: translate(-30px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e8 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-40px, 11px);}
    75%  {transform: translate(-40px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e10 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-50px, 11px);}
    75%  {transform: translate(-50px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e12 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-60px, 11px);}
    75%  {transform: translate(-60px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e14 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-70px, 11px);}
    75%  {transform: translate(-70px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e16 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-80px, 11px);}
    75%  {transform: translate(-80px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e18 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-90px, 11px);}
    75%  {transform: translate(-90px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e20 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-100px, 11px);}
    75%  {transform: translate(-100px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e22 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-110px, 11px);}
    75%  {transform: translate(-110px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e24 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-120px, 11px);}
    75%  {transform: translate(-120px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e26 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-130px, 11px);}
    75%  {transform: translate(-130px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e28 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-140px, 11px);}
    75%  {transform: translate(-140px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }

  @keyframes e30 {
    0%   {transform: translate(0, 0);}
    10%  {transform: translate(0, 11px);}
    20%  {transform: translate(-150px, 11px);}
    75%  {transform: translate(-150px, 11px);}
    85%  {transform: translate(0, 11px);}
    100% {transform: translate(0, 0);}
  }
</style>

<div class="input-text2">
  <input id="transposition2" type="text" maxlength="30" oninput="onTransposition2(this)"></input>
  <div id="transposed2" class="transposed2"></div>
</div>

<script>
function onTransposition2(el) {
  const writtenWord = el.value;
  const transposed = document.getElementById('transposed2');
  transposed2.innerHTML = '';
  for (let char of writtenWord) {
    const letter = document.createElement('span');
    letter.classList.add('letter');
    letter.innerText = char;
    transposed.appendChild(letter);
  }
}

const transposition2 = document.getElementById('transposition2');
transposition2.value = 'criptografia';
onTransposition2(transposition2);
</script>
{% endraw %}

Também conseguimos encontrar na história algumas outras formas de criptografias por transposição utilizadas para conseguir enviar mensagens secretas. Uma delas é a cítala, utilizada pelos espartanos. Esta ferramenta consistia num bastão em que uma tira de couro ou papíro era enrolada e então a mensagem é escrita. Ao desenrolar a tira, a mensagem fica irreconhecível, e só é possível lê-la novamente enrolando-a em um bastão de mesma espessura. Ao utilizar bastões de espessuras diferentes a mensagem acaba não representando o mesmo da original. A imagem abaixo mostra um exemplo de cítala espartana.

![Cítala espartana](/images/crypto1/spartanScytale.jpg)

A criptografia por transposição sozinha não é considerada muito eficiente, já que verificando a frequência de caracteres acaba sendo muito fácil de decodificá-la. Ela se torna útil quando utilizada em conjunto com alguma técnica de substituição, criando uma nova camada que dificulta a quebra da codificação.

## Criptografia por substituição

Outra forma de criptografia é por substituição, onde cada caractere ou palavra de uma mensagem é substituído por outro, criando desta forma uma mensagem quase inilegível. Esse tipo de criptografia também é bastante 
r na cultura pop, aparecendo, por exemplo, em contos de Arthur Conan Doyle e Edgar Allan Poe. Os tipos de codificação apresentados aqui podem parecer simples de decodificar hoje em dia, mas foram bastante utilizados na história da humanidade quando computadores ainda não faziam parte de nossas vidas.

## Substituição de palavras

Uma forma simples de codificação de mensagens e a substituição de palavras ou conjunto de palavras por algum outro símbolo. Esse tipo de codificação pode não utilizar nenhuma regra lógica, sendo assim bastante difícil de decodificá-la, sendo só possível por quem possui um dicionário que indica o significado de cada símbolo.

```
assassinar → D    general  → ∑    imediatamente → 08
chantagear → P    rei      → Ω    hoje          → 73
capturar   → J    ministro → Ψ    nesta noite   → 28
```

Usando esta cifra, a mensagem `assassinar o rei nesta noite` ficaria simplesmente `D-Ω-28`.

Como esse tipo de cifra é se baseia em substituir palavras, ele pode acabar se tornando extremamente grande quando se trata em criar símbolo para muitas palavras, tornando difícil de decorá-lo. Abaixo temos um exemplo desse tipo de cifra.

## Substituição de letras

A criptografia por substituição de letras, por sua vez, trás formas de substituirmos cada caractere de uma informação por outro seguindo alguma regra lógica. Desta forma, somente quem conhece a regra utilizada conseguiria, em teoria, decodificar a mensagem original.

Um exemplo clássico deste tipo de criptografia é incrementando a posição da letra no alfabeto utilizando um fator de incrementação, buscando alguma outra letra na sequência. Por exemplo, se escolhermos o fator de incrementação `5` a letra `a` (número `1` do alfabeto) seria substituída pela letra `f` (número `5` do alfabeto). Isso seria feito para todas as letras da mensagem. A palavra `criptografia` seria criptografada para `hwnuytlwfknf` ao utilizar o fator de incrementação `5`. Você pode testar com outras palavras abaixo:

{% raw %}
<style>
  .substitution {
    display: flex;
    flex-direction: row;
    height: 90px;
  }

  .inputs {
    display: flex;
    flex-direction: column;
  }

  .container {
    display: flex;
    flex-direction: row;
    font-family: Courier, monospace;
    padding-top: 15px;
    height: 40px;
    overflow: hidden;
    padding-left: 20px;
  }

  .letterContainer {
    display: flex;
    flex-direction: column;
    font-size: 18px;
    overflow: hidden;
  }

  .letterSubstitution {
    width: 18px;
    position: relative;
    transition: top 2s ease-in-out;
  }
</style>

<div class="substitution">
  <div class="inputs">
    <input id="word" type="text" maxlength="30" oninput="onSubstitution()" style="margin-bottom: 15px;"></input>
    <input id="factor" type="number" min="0" max="25" oninput="onSubstitution()"></input>
  </div>
  <div id="container" class="container"></div>
</div>

<script>
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let timeout = null;

function createComponents(word) {
  const container = document.getElementById('container');
  container.innerHTML = '';
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    const letterContainer = document.createElement('div');
    letterContainer.classList.add('letterContainer');
    letterContainer.style.left = (i * 11) + 10 + 'px';
    letterContainer.style.height = '40px';
    
    let currentIndex = alphabet.indexOf(letter);
    while (letterContainer.children.length < alphabet.length) {
      const letterSpan = document.createElement('span');
      letterSpan.classList.add('letterSubstitution');
      letterSpan.style.top = '0px';
      letterSpan.innerText = alphabet[currentIndex] || ' ';
      letterContainer.appendChild(letterSpan);
      if (currentIndex == alphabet.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
    }
    
    container.appendChild(letterContainer);
  }
}

function setKey(key, nextKey = 0) {
  const letterContainers = document.getElementById('container').children;

  for (let letterContainer of letterContainers) {
    const letters = letterContainer.children;
    for (let letter of letters) {
      letter.style.top = ((key+1) * 3.1 * -1) + 3.1 + 'px';
    }
  }
  
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => setKey(nextKey, key), 3500);
}

function onSubstitution(el) {
  const writtenWord = document.getElementById('word').value;
  const factor = document.getElementById('factor').value;
  createComponents(writtenWord.toLowerCase());
  setKey(factor)
}

const substitutedWord = document.getElementById('word');
substitutedWord.value = 'criptografia';
const substitutedFactor = document.getElementById('factor');
substitutedFactor.value = 5;
onSubstitution(substitutedWord);
</script>
{% endraw %}

Este tipo de cifra é conhecido como cifra de César, por ter sido utilizada no passado pelo imperador Julio César. Uma forma semelhante de utilizar essa cifra é, ao invés de utilizar um fator de incrementação, escolher uma chave textual. Com isso, basta remover as letras duplicadas dessa chave e adicionar as letras faltantes ao final, continuando da última letra da chave. Este novo alfabeto substituiria o nosso alfabeto regular.

Por exemplo, se escolhermos para a cifra a chave `Julius Caesar`, primeiramente removemos as letras duplicadas, restando `JulisCaer`. Após isso adicionamos as letras faltantes do alfabeto continuando a partir da última da cifra. Nosso novo alfabeto ficaria `juliscaertvwxyzbdfghkmnopq`. Ao criptografar a mensagem desejada, substituiríamos as letras de acordo com a posição no alfabeto, ou seja, a letra `a` seria substituída por `j` e a `b` por `u`. As substituições completas podem ser vistas abaixo:

```
a b c d e f g h i j k l m n o p q r s t u v w x y z
↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
j u l i s c a e r t v w x y z b d f g h k m n o p q
```

Utilizando a chave `Julius Caesar`, conseguimos criptografar a palavra `criptografia` para `lfrbhzafjcrj`.

Por mais que essa forma de criptografar mensagens seja mais difícil de quebrar do que criptografias por transposição, ainda são fracas, já que conseguimos utilizar técnicas de frequência para decrifrar a mensagem.

## Cultura pop

Técnicas de criptografia também são comumente utilizadas em histórias de detetives e investigações. Uma das histórias mais famosas a apresentar mensagens criptografadas é `Os dançarinos`, uma das histórias do Sherlock Holmes escrita por Arthur Connan Doyle. Nesta história o detetive se depara com mensagens com bonecos palitos em diversas posições.

![Os dançarinos](/images/crypto1/dancingMan.jpg)

No decorrer da história ele descobre que cada boneco representa uma letra do alfabeto, e com base na frequência em que cada boneco aparece nas mensagens ele consegue descobrir qual o símbolo para cada letra. Na imagem acima você consegue verificar uma exemplificação de como as letras são representadas por bonecos nessa história.

Edgar Allan Poe também era fascinado por quebrar códigos. Uma de suas histórias, `O escaravelho de ouro`, envolve um texto criptografado que descreve o caminho para encontrar um tesouro perdido. O texto apresenta também uma mensagem em que os caracteres são substituídos por números e símbolos. A mensagem completa pode ser vista abaixo.

```
53‡‡†305))6*;4826)4‡.)4‡);80
6*;48†8¶60))85;1‡(;:‡*8†83(88)
5*†;46(;88*96*?;8)*‡(;485);5*†
2:*‡(;4956*2(5*-4)8¶8*;40692
85);)6†8)4‡‡;1(‡9;48081;8:8‡1
;48†85;4)485†528806*81(‡9;48
;(88;4(‡?34;48)4‡;161;:188;‡?;
```

Neste caso, o personagem da história também utiliza a identificação de frequência dos símbolos para descobrir qual letra cada símbolo representa.

```
a  5  (12)
b  2  (5)
c  -  (1)
d  †  (8)
e  8  (33)
f  1  (8)
g  3  (4)
h  4  (19)
i  6  (11)
j
k
l  0  (6)
m  9  (5)
n  *  (13)
o  ‡  (16)
p  .  (1)
q
r  (  (10)
s  )  (16)
t  ;  (26)
u  ?  (3)
v  ¶  (2)
w  
x
y  :  (4)
z
```

## Conclusão

As formas de criptografia apresentadas nesse artigo podem parecer simples, mas serviram de alguma forma para chegarmos ao que temos hoje. Essas técnicas também podem não ser muito eficientes se utilizadas sozinhas, mas quando juntas acabam aumentando a dificuldade da mensagem ser decodificada por quem não sabe as chaves de decodificação.

¹Vale ²ressaltar ³também ⁴que ⁵hoje ⁶diversas ⁷outras ⁸formas ⁹de ¹⁰codificação ¹¹são ¹²utilizadas ¹³em ¹⁴jogos ¹⁵e ¹⁶brincadeiras. ¹⁷Uma ¹⁸delas ¹⁹é ²⁰adicionar ²¹um ²²número ²³na ²⁴frente ²⁵de ²⁶cada ²⁷palavra ²⁸em ²⁹um ³⁰texto. ³¹Esses ³²números ³³podem ³⁴ser ³⁵utilizados ³⁶posteriormente ³⁷onde ³⁸cada ³⁹número ⁴⁰representa ⁴¹a ⁴²primeira ⁴³letra ⁴⁴de ⁴⁵cada ⁴⁶palavra.

Outra codificação que ficou muito famosa é a chamada codificação maçonica, ou codificação jogo da velha, em que cada letra é apresentada dentro de um jogo da velha com ou sem pontos, e ao criar uma mensagem codificada, as letras são substituídas pala parte do jogo da velha em que ela fica.

![Pigpen](/images/crypto1/pigpen.png)

E por fim temos também a codificação onde as letras são marcadas com um ṗonto embȧixo ou em cima, maṛcȧndo quais letras representam a mensagem original. Essa por sua vez é ḅastante simplẹs e qualquer um coṅṣegue notar algo de diferente, mesmo quando não está buscando a mensagem secreta, já que um ponto estranho pode ser ṿistọ em um texto aparentemente normal.

Essas são apenas algumas téċnicas simplės para esconḍẹr mensagens que serviram de base para ċịḟras mais complexas, como a de Vigenère, a máquina `Enigma`, utilizada na segunda gueṙra mundial, e até mesmȯ os algoritmos de hash ụtilizado por computadores hoje em dia. 
