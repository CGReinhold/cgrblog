---
title: Portmanteau
date: "2021-04-05T22:00:00.169Z"
---

`Portmanteau`, ou `aglutinação` em português, é o "modo pelo qual elementos distintos se unem e integram, formando um todo em que dificilmente se reconhecem as partes originais".

Alguns exemplos de aglutinação de palavras são _aguardente (água ardente)_ e _planalto (plano + alto)_, mas podemos ir mais longe e criar aglutinações inesperadas, como `cervejavascripterodátilo (cerveja + javascript + pterodátilo)`.

Esse é um gerador de `Portmanteau's` em português para você brincar.

{% raw %}
<style>
.portmanteau {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}
.form {
  display: flex;
  align-items: center;
}
.form-input {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
}
.form-input input {
  border: 1px solid lightgray;
  border-radius: 10px;
  height: 40px;
  padding: 0 10px;
}
.form-input span {
  color: lightgray;
  font-weight: bold;
  font-size: 14px;
  margin-top: 5px;
}
.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.button {
  margin: 10px;
  border: none;
  background-color:#f4f5f6;
  box-shadow:  -6px -20px 35px #ffffff, -6px -10px 15px #ffffff, -20px 0px 30px #ffffff, 6px 20px 25px rgba(0,0,0,0.2);
  transition: .13s ease-in-out;
  cursor: pointer;
  border-radius: 20px;
  transform: translate3d(0px, -4px, 0px);
  min-height: 45px;
}
.button:active {
  box-shadow: none;
  transform:translate3d(0px, 0px, 0px);
}
.button button {
  border: none;
  outline: none;
  padding: 15px 13px;
  box-shadow: inset 0px -5px 0px #dddddd;
  border-radius: 14px;
  height: 100%;
  width: 100%;
}
.hidden {
  display: none;
}
p {
  text-align: center;
}
</style>

<div class="portmanteau">
  <div class="form">
    <div class="button-group">
      <div class="button">
        <button onClick="incrementLeft()">+1 à esquerda</button>
      </div>
      <div class="button">
        <button onClick="decrementLeft()">-1 à esquerda</button>
      </div>
    </div>
    <div class="form-input">
      <input id="user-text" type="text" onInput="createWord()" placeholder="Sua palavra" />
      <span>Use pelo menos 3 letras</span>
    </div>
    <div class="button-group">
      <div class="button">
        <button onClick="decrementRight()">-1 à direita</button>
      </div>
      <div class="button">
        <button onClick="incrementRight()">+1 à direita</button>
      </div>
    </div>
  </div>
  <p id="result"></p>
  <p id="word"></p>
  <div id="new" class="button hidden">
    <button onClick="createWord()">Quero outro</button>
  </div>
</div>

<script>
    const linkPortugueseLetters = "/datasets/portuguese.json";
    let words = [];
    let leftCount = 1;
    let rightCount = 1;
    let lastWord = '';

    function incrementLeft() { 
      leftCount++;
      createWord(); 
    }
    function decrementLeft() {
      if (leftCount >= 0) {
        leftCount--;
      }
      createWord();
    }
    function incrementRight() {
      rightCount++;
      createWord();
    }
    function decrementRight() {
      if (rightCount >= 0) {
        rightCount--;
      }
      createWord();
    }

    function getRandom(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    function findWord(word, numberOfLetters, beginning) {
      if (numberOfLetters === 0) return '';
      if (numberOfLetters > word.length) return findWord(word, numberOfLetters - 1, beginning)

      const piece = beginning ? word.substring(word.length - numberOfLetters).toUpperCase() : word.substring(0, numberOfLetters).toUpperCase();
      const found = words.filter(word => {
        if (beginning) {
          return word.startsWith(piece)
        } else {
          return word.endsWith(piece)
        }
      });
      if (found.length > 0) {
        return getRandom(found);
      } else {
        return findWord(word, numberOfLetters - 1, beginning);
      }
    }

    function randomBetween(initialValue, finalValue) {
      return Math.floor(Math.random() * finalValue) + initialValue;
    }

    function joinWords(wordList) {
      return wordList.reduce((acc, word) => {
        if (!acc) return word.toUpperCase();
        let maxCount = word.length - 2;
        while (maxCount > 0) {
          const beginning = word.substring(0, maxCount).toUpperCase();
          if (acc.endsWith(beginning)) {
            return (acc + word.substring(maxCount)).toUpperCase();
          }
          maxCount--;
        }
        return (acc + word).toUpperCase();
      }, '');
    }

    function createWord() {
      const current = document.getElementById('user-text').value;
      if (current.length > 2) {
        const wordsAfter = [];
        const wordsBefore = [];
        // TODO: fazer aleatório a quantidade de letras que fazem o match
        const numberOfMatchingLetters = randomBetween(2, current.length - 2);;

        for (let i = 0; i < leftCount; i++) {
          const word = wordsBefore.length === 0 ? current : wordsBefore[wordsBefore.length - 1];
          wordsBefore.push(findWord(word, numberOfMatchingLetters, false));
        }
        for (let i = 0; i < rightCount; i++) {
          const word = wordsAfter.length === 0 ? current : wordsAfter[wordsAfter.length - 1];
          wordsAfter.push(findWord(word, numberOfMatchingLetters, true));
        }
        const allWords = [...wordsBefore.reverse(), current, ...wordsAfter];
        const fullWord = joinWords(allWords);
        if (fullWord === lastWord) {
          console.log('caiu aqui')
          return createWord();
        }
        document.getElementById('result').innerText = allWords.join(' + ');
        document.getElementById('word').innerText = fullWord;
        document.getElementById('new').classList.remove('hidden');
        lastWord = fullWord;
      } else {
        document.getElementById('result').innerText = '';
        document.getElementById('word').innerText = '';
        document.getElementById('new').classList.add('hidden');
      }
    }

    function getWords() {
        fetch(linkPortugueseLetters)
        .then(r => r.json())
        .then(j => words = j.words);
    }

    getWords();
</script>
{% endraw %}