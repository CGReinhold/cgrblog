---
title: Wörter
date: "2020-05-25T22:00:00.169Z"
---

{% raw %}
<style>
    .game {
        width: 400px;
        height: 400px;
        margin: auto;
        padding: 5px;
        display: flex;
        flex-direction: column;
        font-family: Arial, Helvetica, sans-serif;
        background-color: #222831;
        color: white;
        border-radius: 5px;
        box-sizing: initial;
    }

    .description-container {
        position: absolute;
        width: 400px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(34,40,49, 0.9);
    }

    .description {
        font-size: 28px;
        margin: 15px;
        text-align: center;
    }

    .button {
        font-size: 20px;
        border: none;
        background-color: #c1a57b;
        padding: 5px 10px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
    }

    .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        line-height: initial;
    }

    .letters-container {
        flex: 1;
        margin: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-column-gap: 8px;
        grid-row-gap: 8px;
        user-select: none;
    }

    .letter {
        background-color: #30475e;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 0px 2px 0px #333;
        cursor: pointer;
        transition: opacity 0.3s;
    }

    .letter[pressed='true'] {
        opacity: 0.4;
    }

    .score {
        background-color: rgb(48,71,94, 0.5);
        border-radius: 5px;
        margin: 5px 10px 0;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .time {
        align-self: flex-end;
        margin: 0 10px 5px;
    }
</style>
<div class="game">
    <div class="container">
        <div id="score" class="score"></div>
        <div id="letters-container" class="letters-container">
            <div id="letter0" class="letter">Y</div>
            <div id="letter1" class="letter">A</div>
            <div id="letter2" class="letter">B</div>
            <div id="letter3" class="letter">C</div>
            <div id="letter4" class="letter">D</div>
            <div id="letter5" class="letter">E</div>
            <div id="letter6" class="letter">F</div>
            <div id="letter7" class="letter">G</div>
            <div id="letter8" class="letter">H</div>
            <div id="letter9" class="letter">I</div>
            <div id="letter10" class="letter">J</div>
            <div id="letter11" class="letter">K</div>
            <div id="letter12" class="letter">L</div>
            <div id="letter13" class="letter">M</div>
            <div id="letter14" class="letter">N</div>
            <div id="letter15" class="letter">O</div>
            <div id="letter16" class="letter">P</div>
            <div id="letter17" class="letter">Q</div>
            <div id="letter18" class="letter">R</div>
            <div id="letter19" class="letter">S</div>
            <div id="letter20" class="letter">T</div>
            <div id="letter21" class="letter">U</div>
            <div id="letter22" class="letter">V</div>
            <div id="letter23" class="letter">W</div>
            <div id="letter24" class="letter">X</div>
        </div>
        <div id="time" class="time">Übrige Zeit: 60 Sekunden</div>
    </div>
    <div id="description-container" class="description-container">
        <span id="description" class="description">Wählen Sie Buchstaben in Linien oder Diagonalen aus, um Wörter zu bilden</span>
        <button id="start" class="button" onclick="startGame()">Start</button>
    </div>
</div>
<script>
    const linkGermanLetters = "https://cgreinhold.dev/datasets/german.json";
    const deutschAlphabet = ['E','E','E','E','E','E','E','E','E','E','E','E','E','E','E','E','E','E','E','E',
        'E','E','E','E','E','E','E','E','E','E','E','E','E','E','N','N','N','N','N','N','N','N','N','N',
        'N','N','N','N','N','N','N','N','N','N','N','N','I','I','I','I','I','I','I','I','I','I','I','I',
        'I','I','I','I','R','R','R','R','R','R','R','R','R','R','R','R','R','R','S','S','S','S','S','S',
        'S','S','S','S','S','S','T','T','T','T','T','T','T','T','T','T','T','T','A','A','A','A','A','A',
        'A','A','A','A','A','A','D','D','D','D','D','D','D','D','D','D','H','H','H','H','H','H','H','H',
        'H','H','U','U','U','U','U','U','U','U','L','L','L','L','L','L','L','L','C','C','C','C','C','C',
        'G','G','G','G','G','G','M','M','M','M','M','M','O','O','O','O','B','B','B','B','W','W','W','W',
        'F','F','K','K','Z','Z','V','V','P','P','ß','J','X','Y','Q'];
    let words = [];
    let selectedLetters = [];
    let isPressed = false;
    let startTime = null;
    let totalScore = 0;
    let levelScore = 0;
    let maxLevelScore = 25;

    function addEvents() {
    const lettersContainer = document.getElementById('letters-container');
    lettersContainer.addEventListener('mousedown', e => {
        const selectedElement = e.target;
        pushLetter(selectedElement);
        isPressed = true;
    });
    lettersContainer.addEventListener('mouseup', e => removeSelecteds());
    lettersContainer.addEventListener('mouseleave', e => removeSelecteds());
    const lettersDom = document.getElementsByClassName('letter');
    for (let i = 0; i < lettersDom.length; i++) {
        lettersDom[i].addEventListener('mouseenter', e => {
        if (isPressed) {
            const selectedElement = e.target;
            const selectedIndex = selectedElement.id.replace('letter', '');
            if (isSecondToLast(selectedIndex)) {
            const lastSelected = selectedLetters[selectedLetters.length - 1];
            selectedLetters.pop();
            document.getElementById('letter' + lastSelected.index).setAttribute('pressed', 'false');
            } else {
            pushLetter(selectedElement);
            }
        }
        });
    }
    }

    function isSecondToLast(index) {
    return selectedLetters.length > 1 
        && selectedLetters[selectedLetters.length - 2].index === index;
    }

    function pushLetter(element) {
    const elementIndex = element.id.replace('letter', '');
    const lastItem = selectedLetters[selectedLetters.length - 1];
    const lastIndex = lastItem ? Number(lastItem.index) : null;
    const isNextToPrevious = isNextTo(Number(elementIndex), lastIndex);
    if (!selectedLetters.find(l => l.index === elementIndex) 
        && isNextToPrevious 
        && element.className === 'letter') {
        selectedLetters.push({ index: elementIndex, letter: element.innerText });
        element.setAttribute('pressed', 'true');
    }
    }

    function isNextTo(newIndex, lastIndex) {
    if (lastIndex !== null) {
        return (
        newIndex === lastIndex + 1
        || newIndex === lastIndex - 1
        || newIndex === lastIndex - 6
        || newIndex === lastIndex - 5
        || newIndex === lastIndex - 4
        || newIndex === lastIndex + 6
        || newIndex === lastIndex + 5
        || newIndex === lastIndex + 4
        );
    }

    return true;
    }

    function removeSelecteds() {
    isPressed = false;
    const selecteds = document.querySelectorAll('[pressed=true]');
    const word = selectedLetters.map(l => l.letter).join('');
    for (let i = 0; i < selecteds.length; i++) {
        selecteds[i].removeAttribute('pressed');
        if (isValidWord(word)) {
        totalScore += word.length * 2;
        levelScore += word.length * 2;
        updateScoreText();
        selecteds[i].innerText = randomLetter();
        if (levelScore >= maxLevelScore) {
            startLevel();
        }
        }
    }
    selectedLetters = [];
    }

    function isValidWord(word) {
    return words.includes(word);
    }

    function randomLetter() {
        const alphabet = deutschAlphabet;
        const randomIndex = Math.round(Math.random() * alphabet.length);
        return alphabet[randomIndex];
        }

        function setInitialLetters() {
        for (let i = 0; i < 25; i++) {
            const element = document.getElementById('letter' + i);
            element.innerText = randomLetter();
        }

        selectedLetters = [];
    }

    function getWords() {
        fetch(linkGermanLetters)
        .then(r => r.json())
        .then(j => words = j.words);
    }

    function startTimeLoop() {
        setInterval(() => {
            if (startTime) {
            const now = Date.now();
            const timePassed = now - startTime;
            const secondsPassed = timePassed / 1000;
            const timeLeft = Math.round(60 - secondsPassed);
            document.getElementById('time').innerText = 
                `Übrige Zeit: ${timeLeft} Sekunden`;
            if (timeLeft === 0) {
                endGame();
            }
            }
        }, 500);
    }

    function endGame() {
        const descriptionContainer = document.getElementById('description-container');
        descriptionContainer.style.display = 'flex';
        startTime = null;
        document.getElementById('description').innerText = `Ergebnis: ${totalScore}`;
        document.getElementById('start').innerText = 'Neu starten';
        maxLevelScore = 25;
        totalScore = 0;
        levelScore = 0;
    }

    function startGame() {
    setInitialLetters();
    const descriptionContainer = document.getElementById('description-container');
    descriptionContainer.style.display = 'none';
    startLevel();
    }

    function startLevel() {
    maxLevelScore = maxLevelScore + 5;
    startTime = Date.now();
    levelScore = 0;
    updateScoreText();
    }

    function updateScoreText() {
    document.getElementById('score').innerText = `${levelScore}/${maxLevelScore}`;
    }

    addEvents();
    startTimeLoop();
    getWords();
</script>
{% endraw %}