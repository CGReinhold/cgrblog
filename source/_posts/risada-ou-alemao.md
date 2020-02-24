---
title: Palavra alemã ou risada de internet?
date: "2020-02-17T20:12:07.169Z"
---

A risada é algo universal, mas não existe uma forma simples de reproduzi-la através de texto. No Brasil o mais comum é utilizar o hahaha ou kkkk, mas também tem quem gosta de só bater no teclado de qualquer jeito e usar um aushuash, kospakoa ou até isudhwuhiw.

Você pode se achar que está criando uma risada inédita se gosta de fazer isso, mas você pode ter sido passado por um alemão que criou uma palavra assim antes de você. E aqui fica um desafio, você consegue diferenciar uma palavra alemã de uma risada de internet?

{% raw %}
<style>
  .word {
    font-size: 20px;
    font-weight: bold;
  }

  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  .helper {
    cursor: pointer;
  }

  .options {
    display: flex;
    padding: 10px;
  }

  .option {
    padding: 10px;
    margin: 10px;
    width: 170px;
    height: 130px;
    border: none;
    border-radius: 20;
    box-shadow: 0 3px 6px rgba(0,0,0,.275);
    cursor: pointer;
    font-family: "Menlo", "Meslo LG", monospace;
    font-size: 15px;
    outline: none;
  }

  .option:hover {
    box-shadow: 0 10px 13px rgba(0,0,0,.275);
  }

  .isRight {
    background-color: #4caf50;
  }

  .isWrong {
    background-color: #f44336;
    color: white;
  }

  .end {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<div class="game">
  <div id="word" class="word"></div>
  <div id="translation" class="translation"></div>
  <div class="options">
    <button id="isGerman" class="option" onclick="isGermanWord()">Palavra alemã</button>
    <button id="isLaugh" class="option" onclick="isInternetLaugh()">Risada de internet</button>
  </div>
  <div class="helpers">
    <a id="next" class="helper" onclick="nextWord()">Próxima</a>
    <div id="end" class="end">
      <div id="pontuacao"></div>
      <a id="restart" class="helper" onclick="runGame()">Recomeçar</a>
    </div>
  </div>
</div>

<script>
  const words = [
    { word: 'Haushahn', translation: 'Galo de casa' },
    { word: 'Schwesterchen', translation: 'Irmãzinha' },
    { word: 'Ahausen', translation: 'Cidade alemã' },
    { word: 'schauen', translation: 'ver' },
    { word: 'nennenden', translation: 'chamando' },
    { word: 'irritierter', translation: 'desconcertado' },
    { word: 'Herrenrennen', translation: 'corrida de homens' },
    { word: 'hochschoss', translation: 'tiro alto' },
    { word: 'Ostseestaates', translation: 'estados do mar báltico' },
    { word: 'Niereninneren', translation: 'dentro do rim' },
    { word: 'asbestbelastetes', translation: 'contaminado com amianto' },
    { word: 'erstregistrierte', translation: 'primeiro registrado' },
    { word: 'sinnentstellten', translation: 'distorcido' },
    { word: 'Gesetzestextes', translation: 'texto legal (lei)' },
    { word: 'Haushalt', translation: 'orçamento' },
    { word: 'hauahus' },
    { word: 'schweshstrece' },
    { word: 'husahuan' },
    { word: 'schuanauch' },
    { word: 'schoscohs' },
    { word: 'seitnniesenit' },
    { word: 'lisetnielsn' },
    { word: 'itreetrirt' },
    { word: 'erstrttrseni' },
    { word: 'astblesltbsalb' },
    { word: 'uhsauhsha' },
    { word: 'nhsuanhahn' },
    { word: 'rehnrerhnhen' },
    { word: 'oeastetsaost' },
    { word: 'gestzesteges' },
  ];

  function randomUpTo(limit) {
    return Math.round(Math.random() * limit);
  }

  function runGame() {
    window.gameWords = [...words];
    window.score = 0;
    changeHelpersVisibiliy();
    nextWord();
  }

  function nextWord() {
    removeSelected();
    if (gameWords.length) {
      const wordIndex = randomUpTo(gameWords.length - 1);
      const word = gameWords.splice(wordIndex, 1)[0];
      window.currentWord = word;
      document.getElementById('word').innerText = word.word.toLowerCase();
    }
  }

  function removeSelected() {
    const rightButtons = document.getElementsByClassName('isRight');
    if (rightButtons.length) {
      rightButtons[0].classList.remove('isRight');
    }

    const wrongButtons = document.getElementsByClassName('isWrong');
    if (wrongButtons.length) {
      wrongButtons[0].classList.remove('isWrong');
    }

    document.getElementById('translation').innerText = '';
  }

  function isGermanWord() {
    if (window.currentWord) {
      const button = document.getElementById('isGerman');
      if (window.currentWord.translation) {
        setRight(button);
        document.getElementById('word').innerText = window.currentWord.word;
        document.getElementById('translation').innerText = `Tradução: ${window.currentWord.translation}`;
        window.score++;
      } else {
        setWrong(button);
      }

      window.currentWord = undefined;
      changeHelpersVisibiliy();
    }
  }

  function isInternetLaugh() {
    if (window.currentWord) {
      const button = document.getElementById('isLaugh');
      if (!window.currentWord.translation) {
        setRight(button);
        window.score++;
      } else {
        setWrong(button);
        document.getElementById('translation').innerText = `Tradução: ${window.currentWord.translation}`;
      }

      window.currentWord = undefined;
      changeHelpersVisibiliy();
    }
  }

  function setRight(button) {
    button.classList.add('isRight');
  }

  function setWrong(button) {
    button.classList.add('isWrong');
  }

  function changeHelpersVisibiliy() {
    if (window.gameWords.length) {
      document.getElementById('next').style.display = 'initial';
      document.getElementById('pontuacao').innerText = '';
      document.getElementById('end').style.display = 'none';
    } else {
      document.getElementById('next').style.display = 'none';
      document.getElementById('end').style.display = 'flex';
      document.getElementById('pontuacao').innerText = `Acertos: ${window.score}/${words.length}`;
    }
  }

  runGame();
</script>
{% endraw %}
