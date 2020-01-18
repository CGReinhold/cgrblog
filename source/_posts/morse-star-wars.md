---
title: Sobre Hexo, Audio e outras coisas (ou Morse Star Wars)
date: "2020-01-18T22:00:00.169Z"
---

O principal intuito de ter começado esse blog foi passar a guardar notas sobre tecnologias que eu acabo usando ou conhecendo no dia a dia e que ficam esquecidas depois por acabar não encontrando grandes utilidades. Algumas dessas tecnologias acabam não tendo nem assunto para um artigo inteiro, então vou acabar escrevendo sobre mais de uma em poucas palavras nestes casos.

## Hexo

O [Hexo](https://hexo.io/) é um framework Javascript utilizado para criação de sites estáticos, principalmente blogs. Esse blog, por exemplo, é feito utilizando essa tecnologia.
Uma das grandes vantagens é que ele permite que os artigos sejam todos escritos em _markdown_ facilitando a criação do conteúdo.

O Hexo também possui diversos [temas](https://hexo.io/themes/) em código aberto, além de ter uma flexibilidade para alterar os estilos da forma que deseja. Além disso, ele permite a insersão de _raw scripts_ no markdown, podendo assim adicionar html dentro de artigos quando necessário.

Para quem busca uma plataforma para criação de sites estáticos sem muitas complexidades, essa é uma boa opção.

## Audio

Já faz bastante tempo que o HTML5 já não é mais uma novidade, mas como muitos de seus recursos não são tão comuns de serem usados muita gente acaba nem utilizando. Até hoje eu ainda não havia utilizado as APIs de áudio, e não sabia que era tão fácil.

Para tocar um áudio não é nem necessário utilizar a tag `<audio>` no HTML da página, basta utilizar o contrutor `new Audio(url)` através do Javascript.

## Morse Star Wars

Para testar a execução de áudio em Javascript fiz um código simples que pode ser visto mais abaixo e que basicamente executa arquivos de som estáticos.

No input abaixo você pode inserir um texto que será convertido para código morse. Através do botão "Play" você consegue executar o morse, mas com o diferencial de ser tocado com sons de sabre de luz do Star Wars.

{% raw %}
<div>
  <label for="text">Insira o texto:</label>
  <input type="text" id="text" oninput="changeText()"></input>
  <button id="play" onclick="playMorse()">Play</button>
</div>
<div id="morse"></div>
<script>
  const morseMap = {
      a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....', i: '..', j: '.---',
      k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-',
      u: '..-', v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..', 1: '.----', 2: '..---', 3: '...--',
      4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.', 0: '-----', '.': '.-.-.-',
      ',': '--..--', '?': '..--..', "'": '.----.', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
      ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
      '$': '...-..-', '!': '-.-.--', '@': '.--.-.'
  };

  function getMorseTranslated() {
    const textItem = document.getElementById('text');
    const text = textItem.value.toLowerCase();
    const morse = text.split('').map(char => morseMap[char] || char).join('');
    return morse;
  }

  function changeText() {
    document.getElementById('morse').innerText = getMorseTranslated();
  }

  function playMorse() {
    var point = new Audio('/sounds/point.wav');
    var dash = new Audio('/sounds/dash.wav');
    const morse = getMorseTranslated();
    let incrementer = 0;

    const interval = setInterval(() => {
      if (morse.length > incrementer) {
        const char = morse[incrementer];
        if (char === '.') {
          point.play();
        } else if (char === '-') {
          dash.play();
        }
        incrementer++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
  }
</script>
{% endraw %}

O código para a execução dos áudios em ordem pode ser visto abaixo

```js
function playMorse(morse) {
  var point = new Audio('point.wav');
  var dash = new Audio('dash.wav');
  let incrementer = 0;

  const interval = setInterval(() => {
    if (morse.length > incrementer) {
      const char = morse[incrementer];
      if (char === '.') {
        point.play();
      } else if (char === '-') {
        dash.play();
      }
      incrementer++;
    } else {
      clearInterval(interval);
    }
  }, 1500);
}
```

## Conclusão

Nem tudo que programamos ou testamos tem potencial para um produto, mas qualquer coisa pode resultar em uma brincadeira rápida e que nos ensina novas coisas.

Neste caso um simples conversor de texto para morse em um gerador de sites estáticos já é uma ideia que nos faz sair da programação do dia a dia e aprender algo diferente.