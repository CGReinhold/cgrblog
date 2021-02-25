---
title: Chapéu Seletor da Programação
date: "2021-02-25T22:00:00.169Z"
---

O mundo da programação ainda é algo mágico para você? Não faz ideia de como seguir nessa jornada? O chapéu seletor da programação irá te dizer a qual linguagem de programação você pertence.

![Chapéu seletor](/images/seletor/seletor.png)

## Qual o seu nome?

{%raw%}
<style>
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
</style>

<form onsubmit="return false;" class="form">
  <input id="nome" placeholder="Seu nome"/>
  <button onclick="calcular()">Me diga!</button>
</form>

<div id="resultado"></div>

<script>
const languages = [
  ['Hmmm, {nome}.', 'Consigo ver porque você está aqui.', 'Você só pode fazer parte de uma linguagem.', 'Python.'],
  ['Ora, ora, se não é o {nome}.', 'Finalmente chegou a hora de definir seu caminho.', 'Sua linguagem é muito óbvia.', 'C#.'],
  ['Bem vindo {nome}.', 'Vejo que você se sente pressionado para encontrar sua linguagem.', 'Mas a resposta é clara.', 'Java.'],
  ['Chegou a sua vez, {nome}.', 'Está preparado para encontrar sua linguagem?', 'A escolha não foi fácil, mas já sei qual a sua', 'Go.'],
  ['Olá {nome}.', 'Difícil encontrar uma linguagem que encaixe para você.', 'Mas com esse seu ar misterioso, consigo encontrar seu caminho.', 'Lua.'],
  ['{nome}, você aqui?', 'Achei que você já tinha encontrado seu caminho.', 'Com essa idade você com certeza já foi escolhido para uma linguagem.', 'COBOL.'],
  ['{nome}! É sua primeira vez aqui?', 'Sua linguagem parece uma alternativa fácil.', 'Vejo aqui que você vai se gostar desta escolha.', 'Ruby.'],
  ['{nome}? É você mesmo?', 'Você parece muito decidido para precisar de mim.', 'A sua linguagem pode ser apenas uma.', 'C.'],
  ['Então, você é {nome}.', 'Muitos farão cara feia para você, mas não desista.', 'Você com certeza pertence a uma linguagem.', 'PHP.'],
  ['{nome}! Finalmente você aqui.', 'Percebo que você pode ter alguma dúvida.', 'Mas uma pessoa rebelde assim pertence apenas a uma linguagem.', 'Javascript.'],
];

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
</script>
{%endraw%}

