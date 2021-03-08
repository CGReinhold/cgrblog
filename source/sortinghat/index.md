---
title: Chapéu Seletor da Programação
date: "2021-02-25T22:00:00.169Z"
special: true
---

<p id="introduction"></p>

![Chapéu seletor](/images/seletor/seletor.png)

<h2 id="question"></h2>

{%raw%}
<style>
h1 {
  margin: 0 0 2rem 0 !important;
}
.form {
  display: flex;
  margin: 10px 0 20px;
}
input {
  flex: 1;
  margin-right: 15px;
  padding: 5px 10px;
  border: 1px solid lightgray;
}
button {
  background: transparent;
  border: none;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.32);
  color: gray;
  padding: 5px 10px;
  border-radius: 2px;
}
.text {
  margin-bottom: 5px;
}
img {
  height: 50vh !important;
}
.languages {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
}

.languages a {
  margin: 0 10px;
  color: #383838;
}

</style>

<form onsubmit="return false;" class="form">
  <input id="nome" placeholder="Seu nome"/>
  <button id="button" onclick="calcular()">Me diga!</button>
</form>

<div id="resultado"></div>

<script>
const languages = [];

const CURSOR = '<span>▓</span>';

function getHash(nome) {
  const splitted = nome.toUpperCase().split('');
  const summed = splitted.reduce((acc, char) => char.charCodeAt() + acc, 0);
  return summed % languages.length;
}

function adicionarCursor(divId) {
  const divResultado = document.getElementById(divId);
  divResultado.innerHTML = divResultado.innerHTML.replace(CURSOR, '');
  divResultado.innerHTML += CURSOR;
}

function removerCursor(divId) {
  const divResultado = document.getElementById(divId);
  divResultado.innerHTML = divResultado.innerHTML.replace(CURSOR, '');
}

function escreverFrase(frase, divId, callbackFinal) {
  const scrollingElement = (document.scrollingElement || document.body);
  scrollingElement.scrollTop = scrollingElement.scrollHeight;
  const divResultado = document.getElementById(divId);
  const caracteres = frase.split('');
  const writeFunction = () => setTimeout(() => {
    if (caracteres.length === 0) {
      callbackFinal();
    } else {
      divResultado.innerHTML += caracteres.shift();
      adicionarCursor(divId);
      writeFunction();
    }
  }, 50);
  writeFunction();
}

function escreverLista(lista, callbackFinal) {
  const nome = document.getElementById('nome').value;
  let index = 0;

  const divResultado = document.getElementById('resultado');
  divResultado.innerHTML = `<div id="frase--1">${CURSOR}</div>`;
  const callback = () => {
    const frase = lista.shift();
    if (frase) {
      setTimeout(() => {
        removerCursor('frase-' + (index-1));
        if (lista.length === 0) {
          divResultado.innerHTML += `<strong><div class="text" id="frase-${index}"></div></strong>`;
        } else {
          divResultado.innerHTML += `<div class="text" id="frase-${index}"></div>`;
        }
        escreverFrase(frase.replace('{nome}', nome), 'frase-' + index, callback);
        index++;
      }, 1500);
    } else {
      removerCursor('frase-' + (index-1));
    }
  }
  callback();
}

function calcular() {
  const nome = document.getElementById('nome').value;

  const divResultado = document.getElementById('resultado');
  divResultado.innerHTML = '';
  const hash = getHash(nome);
  const language = languages[hash];
  escreverLista([...language]);
}

function inicializar() {
  const isEN = window.location.search.includes('lang=en');
  const url = isEN ? 'seletor.en.json' : 'seletor.pt.json';
  fetch(`/data/seletor/${url}`)
  .then(file => file.json())
  .then(data => {
    languages.push(...data.languages);
    document.querySelector('.posttitle').innerText = data.title;
    document.querySelector('#question').innerText = data.question;
    document.querySelector('#introduction').innerText = data.introduction;
    document.querySelector('#button').innerText = data.button;
    document.querySelector('#nome').placeholder = data.placeholder;
  });
}

inicializar();
document.querySelector('body').innerHTML += '<div class="languages"><a href="?lang=en">English</a><a href="?lang=pt">Português</a></div>';
</script>
{%endraw%}
