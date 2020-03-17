---
title: Criptografia - parte 2
date: "2020-03-18T22:00:00.169Z"
---

No último artigo escrevi um pouco sobre a história da criptografia, e algumas das formas mais antigas de criptografar textos utilizadas. Uma das mais famosas é a cifra de César, que substitui cada caractere do alfabeto por um caractere diferente.

A cifra de César é considerada simples de quebrar, já que por ser monoalfabética, ou seja, cada caractere é substituído por outro, conseguimos encontrar qual o valor criptografado de cada letra analisando a frequência de caracteres da mensagem. Isso é possível pois o caracter mais utilizado na mensagem criptografada provavelmente deve ser um dos caracteres mais utilizados no idioma da mensagem original.

## Disco de Alberti

Sabendo da fraqueza deste método de criptografia, várias outros sistemas foram criados. Uma das ferramentas inventadas para auxiliar a codificação de mensagens é o disco de Alberti, criado por Leon Alberti. O disco consiste em duas partes, uma com caracteres externos, que fica parada, e outra com caracteres internos, que pode ser rotacionada. Esse disco é utilizado para criação de cifras polialfabéticas, ou seja, um caractere da mensagem original pode ser substituído por vários outros.

O disco de Alberti pode ser visto na imagem abaixo.

![Disco de Alberti](/images/crypto2/albertiDisk.JPG)

Com esse disco é possível, por exemplo, realizar um alinhamento inicial entre duas letras, e a cada caractere da mensagem a ser codificada rotacionar o disco interno um caractere a direita. Desta forma, a mesma letra na mensagem original pode ter diferentes valores na mensagem criptografada, já que será substituído por diferentes caracteres por conta do movimento do círculo interno. Para conseguir decodificar a mensagem, basta o leitor utilizar o disco com o mesmo alinhamento inicial.

## Cifra de Vigenère

Mas esta não foi a única forma de criptografia polialfabética criada. Blaise de Vigenère, um diplomata francês, criou a cifra que é hoje conhecida como cifra de Vigenère.

A cifra de Vigenère consiste em um quadrado de caracteres onde cada linha é uma sequência do alfabeto iniciada por um caractere diferente e uma chave de criptografia utilizada para codificar a mensagem desejada. A chave da criptografia serve para definir quais linhas do quadrado serão utilizadas para codificar a mensagem, e da mesma forma que na cifra de César, os caracteres da mensagem são substituídos por caracteres da linha, utilizando as linhas de acordo com a ordem das letras da palavra chave.

O quadrado de Vigenère é disposto da seguinte forma:

![Quadrado de Vigenère](/images/crypto2/vigenere.jpg)

A criptografia de uma mensagem utilizando este quadrado pode seguir da seguinte forma se utilizarmos a cifra `ideia` para criptografar a mensagem `criptografia`:

1. Substituímos a primeira letra da __mensagem__ (`c`) pela terceira letra (já que a letra `c` é a terceira do alfabeto) da linha que começa pela primeira letra da __cifra__ (neste caso `i`). Desta forma, a primeira letra da __mensagem criptografada__ ficaria `k`.
2. Substituímos a segunda letra da __mensagem__ (`r`) pela decima oitava letra (já que a letra `r` é a decima oitava do alfabeto) da linha que iniciada pela segunda letra da __cifra__ (neste caso `d`). Desta forma, a segunda letra da __mensagem criptografada__ ficaria `u`.
3. Substituímos a terceira letra da __mensagem__ (`i`) pela nona letra (já que a letra `i` é a nona do alfabeto) da linha que iniciada pela terceira letra da __cifra__ (neste caso `e`). Desta forma, a segunda letra da __mensagem criptografada__ ficaria `m`.
4. Os mesmo passos são feitos para as outras letras da mensagem até o fim das letras da cifra. Ao chegar ao final, volta-se a utilizar do começo as letras da cifra escolhida.

Abaixo você consegue verificar de uma forma interativa como a criptografia funciona.

{% raw %}
<style>
.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: monospace;
}
.input {
  margin-bottom: 10px;
}
.input label {
  margin-right: 5px;
}
.input input {
  margin-right: 20px;
}
.result {
  margin-bottom: 20px;
}
.row span {
  min-width: 12px;
  text-align: center;
}
</style>
<div class="column">
  <div style="display:flex;flex-direction:row;">
    <div class="input">
      <label for="cifra" maxlength="10">Cifra</label>
      <input id="cifra" maxlength="30" oninput="onVigenere()"></input>
    </div>
    <div class="input">
      <label for="mensagem">Mensagem</label>
      <input id="mensagem" oninput="onVigenere()"></input>
    </div>
  </div>
  <div class="result">
    <span>Resultado:</span>
    <span id="resultado"></span>
  </div>
  <div id="rowContainer" class="column">
  <div class="row"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span></div>
  
  <div class="row"><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span></div>

  <div class="row"><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span></div>

  <div class="row"><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span></div>

  <div class="row"><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span></div>

  <div class="row"><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span></div>

  <div class="row"><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span></div>

  <div class="row"><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span></div>

  <div class="row"><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span></div>

  <div class="row"><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span></div>

  <div class="row"><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span></div>

  <div class="row"><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span></div>

  <div class="row"><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span></div>

  <div class="row"><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span></div>

  <div class="row"><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span></div>

  <div class="row"><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span></div>

  <div class="row"><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span></div>

  <div class="row"><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span></div>

  <div class="row"><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span></div>

  <div class="row"><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span></div>

  <div class="row"><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span></div>

  <div class="row"><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span></div>

  <div class="row"><span>w</span><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span></div>

  <div class="row"><span>x</span><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span></div>

  <div class="row"><span>y</span><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span></div>

  <div class="row"><span>z</span><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span><span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span><span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span></div>
  </div>
</div>

<script>
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let currentInterval = null;

function onVigenere() {
  const cifra = document.getElementById('cifra').value;
  const mensagem = document.getElementById('mensagem').value;
  
  let indexMessage = 0;
  let indexCipher = 0;
  let result = '';

  if (currentInterval) {
    clearInterval(currentInterval);
  }

  currentInterval = setInterval(() => {
    if (mensagem.length && cifra.length) {
      if (indexMessage === 0) {
        result = '';
      }

      const messageLetter = mensagem[indexMessage];
      const cipherLetter = cifra[indexCipher];
      const indexOfMessage = alphabet.indexOf(messageLetter);
      const indexOfCipher = alphabet.indexOf(cipherLetter);

      highlightColumn(indexOfMessage);
      highlightLine(indexOfCipher);
      highlightCurrent(indexOfCipher, indexOfMessage);

      let novaLetra = '';
      if (indexOfMessage >= 0 && indexOfCipher >= 0) {
        novaLetra = alphabet[indexOfMessage + indexOfCipher];
      }

      if (indexCipher + 1 >= cifra.length) {
        indexCipher = 0;
      } else {
        indexCipher++;
      }

      if (indexMessage + 1 >= mensagem.length) {
        indexMessage = 0;
        indexCipher = 0;
      } else {
        indexMessage++;
      }

      result += novaLetra;
      document.getElementById('resultado').innerText = result;
    }
  }, 1400);
}

function highlightLine(lineNumber) {
  const rows = document.getElementById('rowContainer').children;
  for (let i = 0; i < rows.length; i++) {
    if (i === lineNumber) {
      rows[i].style.backgroundColor = 'lightblue';
    } else {
      rows[i].style.backgroundColor = 'transparent';
    }
  }
}

function highlightColumn(columnNumber) {
  const rows = document.getElementById('rowContainer').children;
  for (let i = 0; i < rows.length; i++) {
    const columns = rows[i].children;
    for (let j = 0; j < columns.length; j++) {
      if (j === columnNumber) {
        columns[j].style.backgroundColor = 'lightgreen';
      } else {
        columns[j].style.backgroundColor = 'transparent';
      }
    }
  }
}

function highlightCurrent(lineNumber, columnNumber) {
  const rows = document.getElementById('rowContainer').children;
  for (let i = 0; i < rows.length; i++) {
    const columns = rows[i].children;
    for (let j = 0; j < columns.length; j++) {
      if (i == lineNumber && j === columnNumber) {
        columns[j].style.backgroundColor = 'lightcoral';
      }
    }
  }
}

const cifra = document.getElementById('cifra');
cifra.value = 'ideia';
const mensagem = document.getElementById('mensagem');
mensagem.value = 'criptografia';
onVigenere();
</script>
{% endraw %}

## Conclusão

Por muito tempo a cifra de Vigenère foi considerada inquebrável por utilizar um modelo polialfabético em que fica muito difícil de decodificar sem saber a palavra chave. Ainda assim, Charles Babbage, um matemático inglês, conseguiu no ano 1854 quebrar essa cifra e decifrar mensagens utilizando um método de frequência e estatística de caracteres.

No livro __The Code Book: How to make it, break it, hack it, crack it__ do Simon Singh, o autor exemplifica passo a passo como é possível quebrar mensagens criptografadas com o cifra de Vigenère. Ele também conta um pouco mais da história de Vigenère e Babbage e quais foram seus objetivos ao criar e quebrar modelos criptográficos.