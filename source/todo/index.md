---
title: 101 coisas não convencionais para fazer este ano
date: "2021-03-03T22:00:00.169Z"
author: Cleyson, Isabela e Luma
special: true
translated: true
---

{%raw%}
<style>
h1 {
  margin: 0 0 2rem 0 !important;
}
.max-width {
  max-width: 56rem;
}
#atividades {
  display: flex;
  flex-wrap: wrap;
}
#atividades > div {
  background-color: #eaeaea;
  padding: 10px;
  margin: 4px;
  display: flex;
  cursor: pointer;
  border-radius: 2px;
  display: flex;
  flex: 1;
  min-width: 47%;
}
#atividades span {
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
  flex: 1;
}
#atividades > div > div {
  background-color: white;
  height: 22px;
  width: 22px;
  color: #2bbc8a;
  padding: 0 6px;
  font-weight: bold;
  margin-top: 5px;
  border-radius: 2px;
}

#atividades > div[selected="true"] {
  background-color: #2bbc8a;
  color: white;
}

#resultado {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  text-align: center;
}

#resultado > span {
  font-size: 22px;
  font-weight: bold;
}

@media (max-width: 600px)
{
  #atividades > div {
    min-width: 100%;
  }
}
</style>

<div id="atividades"></div>
<div id="resultado"></div>

<script>
const atividades = [];
let resultText = '';

let selectedItems = [];

const STORAGE_HASH = 'selected-items';

function select(index) {
  if (selectedItems.includes(index)) {
    selectedItems = selectedItems.filter(i => i !== index);
  } else {
    selectedItems.push(index);
  }
  saveSelectedItems();
  renderAtividades();
}

function renderAtividades() {
  const parent = document.getElementById('atividades');
  parent.innerHTML = '';
  atividades.forEach((atividade, index) => {
    const selected = selectedItems.includes(index);
    const atividadeHtml = `<div selected="${(selected ? 'true': 'false')}" onclick="select(${index})"><div class="checkbox">${(selected ? '✓': '')}</div><span>${atividade}</span></div>`;
    parent.innerHTML += atividadeHtml;
  });
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `<span>${resultText.replace('{selected}', selectedItems.length).replace('{total}', atividades.length)}</span>`;
}

function loadSelectedItems() {
  selectedItems = JSON.parse(localStorage.getItem(STORAGE_HASH)) || [];
}

function saveSelectedItems() {
  const selectedString = JSON.stringify(selectedItems);
  localStorage.setItem(STORAGE_HASH, selectedString);
}

function render() {
  const isEN = window.location.search.includes('lang=en');
  const url = isEN ? 'todo.en.json' : 'todo.pt.json';
  fetch(`/data/todo/${url}`)
  .then(file => file.json())
  .then(data => {
    atividades.push(...data.items);
    resultText = data.result;
    document.title = data.title;
    document.querySelector('.posttitle').innerText = data.title;
    loadSelectedItems();
    renderAtividades();
  });
}

render();
</script>

{%endraw%}