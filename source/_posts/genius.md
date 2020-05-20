---
title: Genius
date: "2020-01-27T22:00:00.169Z"
---

A algum tempo atrás vi [esse](https://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis/) artigo em que o rapaz fazia animações na url do site utilizando emojis. O mais legal é que ele não faz só animações, mas também exibe a barra de carregamento de um vídeo utilizando caracteres unicode.

## Genius

Vendo isso, imaginei se não é possível utilizar esse conceito para fazer um jogo. Como minha criatividade não foi muito longe daí, decidi tentar implementar o jogo _Genius_ (aquele com quatro cores que acendem e você deve pressionar os botões na sequência correta), já que possui uma jogabilidade simples e fácil de se adaptar a uma caixa de texto.

Clicando no botão abaixo a URL será utilizada como "display" para o jogo. As cores irão aparecer em uma sequência, e quando a URL indicar a sua vez, basta digitar aqui mesmo a inicial das cores (em inglês) na mesma sequência. (Alguns navegadores podem não conseguir carregar todos os emojis corretamente)

🔵 ➔ **B**
🟡 ➔ **Y**
🟢 ➔ **G**
🔴 ➔ **R**

(Em alguns apps para _smartphones_ pode não funcionar corretamente)
{% raw %}
<button onclick="start('location')">Iniciar o jogo na URL</button>
{% endraw %}

## Title

O principal problema de alterar o _location_ da página para esse tipo de brincadeira é a enchurrada de links que acabam ficando no histórico do navegador. Como a cada alteração o navegador armazena isso no histórico, a lista pode acabar ficando grande muito rápido. Alguns navegadores acabam até bloqueando isso e proibindo alterações seguintes.

Como alternativa, ajustei o código para permitir o mesmo tipo de jogo através do _title_ da página. Esse é um outro lugar utilizado por alguns sites para jogar informações, como mensagens não lidas, mas que pode ser explorado para o mesmo tipo de jogo.

O botão abaixo irá permitir você jogar, mas agora no título da aba do navegador.

(Em alguns apps para _smartphones_ pode não funcionar corretamente)
{% raw %}
<button onclick="start('title')">Iniciar o jogo na aba do navegador</button>
{% endraw %}

## Favicon

Recentemente caí [neste artigo aqui](http://www.p01.org/defender_of_the_favicon/) em que um outro rapaz desenvolveu um verdadeiro jogo no _favicon_ da página, onde você pode utilizar as teclas para movimentar e atirar com uma nave. A ideia é muito legal e a biblioteca [favico.js](http://lab.ejci.net/favico.js/) permite de uma forma fácil tentar fazer algo similar.

Com essa biblioteca, decidi criar uma versão do genius também no _favicon_ dessa página. Para jogar, clique no botão abaixo.

(Em alguns apps para _smartphones_ pode não funcionar corretamente)
{% raw %}
<script src="https://cgreinhold.dev/js/favico.min.js"></script>
<button onclick="start('favicon')">Iniciar o jogo no ícone da aba do navegador</button>
{% endraw %}

## Conclusão

Por mais que com o _favicon_ a atualização dos frames fique um pouco lenta, podemos concluir que não é necessário muitos recursos para conseguir executar um jogo como o _Genius_. O limite para criação de algo como isso vai até aonde a criatividade do desenvolvedor acaba.


{% raw %}
<script>
const currentLocation = window.location.href;
let keyPressed = undefined;
let geniusCount = 0;
let mode = undefined;
let favicon = null;

const balls = [
  { value: 1, symbol: '🔵', key: 'b' },
  { value: 2, symbol: '🟡', key: 'y' },
  { value: 3, symbol: '🟢', key: 'g' },
  { value: 4, symbol: '🔴', key: 'r' }
]

const getBall = (val) => balls.find(item => item.value === val);
const random = (count = 4) => Math.floor(Math.random() * count) + 1;
const getRandomBall = () => getBall(random(balls.length));
const getSequence = (count) => {
  const sequenceList = []
  for (let i = 0; i < count; i++) {
    sequenceList.push(getRandomBall());
  }
  return sequenceList;
}

const setTitle = (text) => document.title = text;
const setURL = (text) => window.location = currentLocation + '#' + text.replace(/ /g, '_').replace(/ /g, '_');
const setFavicon = (text) => {
  let imageId = '';
  switch (text) {
    case ' ':
      favicon.reset();
      break;
    case 'Sua vez...':
      imageId = 'suavez';
      break;
    case 'Preparar...':
      imageId = 'preparar';
      break;
    case '🔵':
      imageId = 'blue';
      break;
    case '🟡':
      imageId = 'yellow';
      break;
    case '🟢':
      imageId = 'green';
      break;
    case '🔴':
      imageId = 'red';
      break;
    default:
      if (text.includes('Fim')) {
        imageId = 'fim';
        favicon.badge(RegExp(/(\d+)/).exec(text)[0]);
      } else {
        favicon.reset();
      }
      break;
  }

  if (imageId) {
    if (document.getElementById(imageId)) {
      image = document.getElementById(imageId);
    } else {
      image = document.createElement('img');
      image.id = imageId;
      image.src = `/images/genius/${imageId}.png`;
      image.style.opacity = 0;
      document.body.appendChild(image);
    }

    favicon.image(image);
  }
};

function start(selectedMode) {
  keyPressed = undefined;
  geniusCount = 0;
  switch (selectedMode) {
    case 'location':
      mode = setURL;
      break;
    case 'title':
      mode = setTitle;
      break;
    case 'favicon':
      if (favicon === null) {
        favicon = new Favico({animation : 'none'});
      }
      mode = setFavicon;
      break;
  }
  iterate();
}

function timeoutTitle(arrayTitles, onEnd) {
  let currentIteration = 0;
  const interval = setInterval(() => {
    if (currentIteration < arrayTitles.length) {
      mode(' ');
      setTimeout(() => {
        mode(arrayTitles[currentIteration].symbol);
        currentIteration++;
      }, 100);
    } else {
      mode('Sua vez...');
      clearInterval(interval);
      onEnd();
    }
  }, 1000);
}

function iterate() {
  mode('Preparar...');
  keyPressed = undefined;
  const sequence = getSequence(++geniusCount);
  timeoutTitle(sequence, () => {
    keyPressed = (key) => {
      if (key !== sequence.shift().key) {
        mode(`Fim de jogo! Pontuação: ${geniusCount - 1}`);
      } else if (sequence.length === 0) {
        mode(balls.find(item => item.key === key).symbol);
        setTimeout(iterate, 300);
      } else {
        mode(balls.find(item => item.key === key).symbol);
      }
    }
  });
}

document.addEventListener('keydown', event => {
  if (keyPressed) {
    keyPressed(event.key.toLowerCase());
  }
});
</script>
{% endraw %}
