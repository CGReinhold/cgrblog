---
title: Caça palavras
date: "2020-11-10T22:00:00.169Z"
---

Existem algumas palavras que para qualquer um que está aprendendo inglês, ou até mesmo para quem já tem níveis avançados, é um grande desafio conseguir escrever corretamente. Podemos ver isso nitidamente com as palavars `tough`, `though`, `thought`, `through`, `thorough` e `throughout`.

Com o intuito de não ajudar em nada a entender essas palavras, mas desafiar a sua paciência, criei esse caça palavras com as palavras citadas acima (e uma variedade pequena de letras para aumentar mais ainda a dificuldade). Será que você consegue?

Palavras encontradas:


{% raw %}
<ul>
<li><strong>tough</strong><span id="tough" class="not-found">×</span</li>
<li><strong>though</strong><span id="though" class="not-found">×</span</li>
<li><strong>thought</strong><span id="thought" class="not-found">×</span</li>
<li><strong>through</strong><span id="through" class="not-found">×</span</li>
<li><strong>thorough</strong><span id="thorough" class="not-found">×</span</li>
<li><strong>throughout</strong><span id="throughout" class="not-found">×</span</li>
</ul>
<p>
  <input id="show-answer" onclick="showAnswer()" type="checkbox"/><span>Mostrar resposta</span>
</p>

<div id="words" style="white-space:nowrap;"></div>
<style>
.word-found {
  color: #2bbc8a;
  padding: 0 10px;
}
.not-found {
  color: red;
  padding: 0 10px;
}
.letter {
  border: 1px solid lightgray;
  padding: 2px 8px;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}
.letter::selection {
  background-color: transparent;
}
.found,
.reveal {
  background-color: #2bbc8a !important;
  border: 1px solid #2bbc8a;
  color: white;
}
.selected {
  background-color: gray;
  border: 1px solid gray;
  color: white;
}
</style>

<script>
const wordMaze = [];
const spans = [];
const letters = ['t','o','u','g','h','r'];
const words = ['tough', 'though', 'thought', 'through', 'thorough', 'throughout'];
const mazeSize = 25;
let startSelection = null;
let currentSelection = null;

const getRandomInt = (maxValue) => {
  return Math.floor(Math.random() * (maxValue + 1));
}

const getRandomLetter = () => {
  return letters[getRandomInt(letters.length - 1)];
}

const generateMaze = () => {
  for (let i = 0; i < mazeSize; i++) {
    const row = [];
    for (let j = 0; j < mazeSize; j++) {
      row.push({ letter: getRandomLetter(), isWord: false });
    }
    wordMaze.push(row);
  }
}

const renderMaze = () => {
  const div = document.getElementById('words');
  div.innerHTML = '';
  for (let i = 0; i < mazeSize; i++) {
    const row = document.createElement('div');
    const spanRow = [];
    div.appendChild(row);
    for (let j = 0; j < mazeSize; j++) {
      const mazeItem = wordMaze[i][j];
      const span = document.createElement('span');
      span.id = mazeItem.word;
      span.className = 'letter';
      if (mazeItem.isWord) {
        span.className += ' isWord';
      }
      span.innerText = mazeItem.letter;
      span.addEventListener('mousedown', () => startSelection = { x: i, y: j });
      span.addEventListener('mousemove', () => {
        if (startSelection) {
          currentSelection = { x: i, y: j };
          updateMaze();
        }
      });
      span.addEventListener('mouseup', () => { 
        startSelection = null;
        currentSelection = null;
        updateMaze();
      });
      row.appendChild(span);
      spanRow.push(span);
    }
    spans.push(spanRow);
  }
}

const updateMaze = () => {
  for (let i = 0; i < spans.length; i++) {    
    for (let j = 0; j < spans[i].length; j++) {
      const span = spans[i][j];
      if (span.classList.contains('selected')) {
        span.classList.remove('selected')
      }
    }
  }
  if (startSelection && currentSelection) {
    if (startSelection.x === currentSelection.x) {
      if (startSelection.y > currentSelection.y) {
        for (let j = startSelection.y; j >= currentSelection.y; j--) {
          const span = spans[startSelection.x][j];
          if (!span.classList.contains('selected')) {
            span.classList.add('selected');
            checkWordSelected();
          }
        }
      } else {
        for (let j = currentSelection.y; j >= startSelection.y; j--) {
          const span = spans[startSelection.x][j];
          if (!span.classList.contains('selected')) {
            span.classList.add('selected');
            checkWordSelected();
          }
        }
      }
    } else if (startSelection.y === currentSelection.y) {
      if (startSelection.x > currentSelection.x) {
        for (let j = startSelection.x; j >= currentSelection.x; j--) {
          const span = spans[j][startSelection.y];
          if (!span.classList.contains('selected')) {
            span.classList.add('selected');
            checkWordSelected();
          }
        }
      } else {
        for (let j = currentSelection.x; j >= startSelection.x; j--) {
          const span = spans[j][startSelection.y];
          if (!span.classList.contains('selected')) {
            span.classList.add('selected');
            checkWordSelected();
          }
        }
      }
    }
  }
}

const checkWordSelected = () => {
  const spanStart = spans[startSelection.x][startSelection.y];
  const spanEnd = spans[currentSelection.x][currentSelection.y];
  const startIsWord = spanStart.classList.contains('isWord');
  const endIsWord = spanEnd.classList.contains('isWord');
  const wordStart = spanStart.id;
  const wordEnd = spanEnd.id;
  const selectionLength = 
    startSelection.x === currentSelection.x ? 
      Math.abs(startSelection.y - currentSelection.y) : 
      Math.abs(startSelection.x - currentSelection.x);
  const correctLength = wordStart.length === selectionLength + 1;
  const isShowingResult = document.getElementById('show-answer').checked;
  if (startIsWord && endIsWord && wordStart === wordEnd && correctLength && !isShowingResult) {
    if (startSelection.x === currentSelection.x) {
      if (startSelection.y > currentSelection.y) {
        for (let j = startSelection.y; j >= currentSelection.y; j--) {
          const span = spans[startSelection.x][j];
          if (span) {
            span.classList.add('found');
            setWordCompleted(wordStart);
          }
        }
      } else {
        for (let j = currentSelection.y; j >= startSelection.y; j--) {
          const span = spans[startSelection.x][j];
          if (span) {
            span.classList.add('found');
            setWordCompleted(wordStart);
          }
        }
      }
    } else if (startSelection.y === currentSelection.y) {
      if (startSelection.x > currentSelection.x) {
        for (let j = startSelection.x; j >= currentSelection.x; j--) {
          const span = spans[j][startSelection.y];
          if (span) {
            span.classList.add('found');
            setWordCompleted(wordStart);
          }
        }
      } else {
        for (let j = currentSelection.x; j >= startSelection.x; j--) {
          const span = spans[j][startSelection.y];
          if (span) {
            span.classList.add('found');
            setWordCompleted(wordStart);
          }
        }
      }
    }
  }
}

const setWordCompleted = (word) => {
  const wordSpan = document.getElementById(word);
  wordSpan.innerText = '✓';
  wordSpan.className = 'word-found';
}

const getWordPosition = (word, direction) => {
  let isValid = false;
  let returnX = 0;
  let returnY = 0;
  while (!isValid) {
    isValid = true;
    x = direction ? getRandomInt(24 - word.length) : getRandomInt(24);
    y = !direction ? getRandomInt(24 - word.length) : getRandomInt(24);
    returnX = x;
    returnY = y;
    console.log(word, returnX, returnY)
    for (let j = 0; j < word.length; j++) {
      if (wordMaze[x][y].isWord && wordMaze[x][y].letter !== word[j]) {
        isValid = false;
        break;
      }
      if (direction) {
        x++;
      } else {
        y++;
      }
    }
  }

  return { x: returnX, y: returnY };
}

const generateWords = () => {
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const direction = getRandomInt(1);
    let { x, y } = getWordPosition(word, direction);
    
    for (let j = 0; j < word.length; j++) {
      wordMaze[x][y] = { letter: word[j], isWord: true, word: word };
      if (direction) {
        x++;
      } else {
        y++;
      }
    }
  }
}

generateMaze();
generateWords();
renderMaze();

function showAnswer() {
  const shouldShow = document.getElementById('show-answer').checked;
  for (let i = 0; i < spans.length; i++) {    
    for (let j = 0; j < spans[i].length; j++) {
      const span = spans[i][j];
      if (span.classList.contains('isWord')) {
        span.classList.toggle('reveal');
      }
    }
  }
}
</script>
{% endraw %}