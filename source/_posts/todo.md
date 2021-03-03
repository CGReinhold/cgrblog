---
title: 101 coisas não convencionais para fazer este ano
date: "2021-03-03T22:00:00.169Z"
author: Cleyson, Isabela e Luma
---

{%raw%}
<style>
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
const atividades = [
  '💻 Decorar um computador com o tema “pôneis no México”',
  '🐧 Gravar o nome de todas as espécies de pinguim',
  '🎥 Regravar o filme De Volta Para O Futuro reduzido para 15 minutos',
  '🚰 Criar um monólogo dramático sobre uma pia de cozinha',
  '🧵 Costurar um figurino baseado na moda japonesa de 1940',
  '🧊 Fazer um picolé com 3 ingredientes aleatórios na cozinha',
  '🥚 Colocar 10 easter eggs relacionados a sua vida espalhados por algum cômodo',
  '🌠 Desenhar uma linha que conte o tempo de uma forma inédita',
  '🧲 Criar seu próprio ímã de geladeira',
  '🦎 Fazer uma lagartixa de argila',
  '🛏️ Construir um forte de almofadas e nomeá-lo com algum trocadilho a partir do nome de uma civilização, império ou cidade antiga',
  '🧮 Criar um problema matemático que vá além das 4 operações básicas de matemática e que o resultado seja 3',
  '✍️ Escrever um conto incluíndo o último sonho que você teve',
  '🍲 Crie uma receita apenas com ingredientes que começam com a letra “L”',
  '🥿 Tirar uma foto conceitual utilizando um pote, um fundo colorido e um chinelo',
  '🤖 Interpretar por 5 minutos um robô discutindo a lógica por trás de um hambúrguer',
  '👒 Fazer um chapéu estiloso para o seu dedão',
  '📰 Fazer uma saia usando jornal ou revista',
  '💬 Escolher 3 palavras aleatórias do dicionário e criar uma frase com elas',
  '🎪 Criar um look inspirado em um circo e tire uma foto com uma pose inspirada no mesmo',
  '🧦 Fazer uma apresentação em estilo Powerpoint das vantagens de dormir sem meias',
  '🍿 Assistir um filme que contenha a palavra “bateria” no título',
  '🎸 Pensar em um Top 5 motivos para continuar tocando Legião Urbana no violão, mesmo sendo as mesmas músicas de sempre',
  '🎼 Criar um pout pourri com 5 músicas de gêneros totalmente diferentes ou com significados totalmente diferentes',
  '🎞️ Escrever uma crítica do filme citado acima se passando por uma criança de 6 anos',
  '😬 Usar um delineador para tatuar na sua bochecha algo que você tatuaria se estivesse na prisão',
  '🎠 Dar um nome muito legal para o pônei imaginário do seu amigo imaginário',
  '🖊️ Escrever um poema onde cada frase começa com cada letra do seu nome completo',
  '🎁 Fazer uma doação para alguma instituição de caridade, porque é sempre importante fazer isso',
  '🗿 Recriar um monumento ou algum lugar famoso na sua casa e agir como se estivesse lá',
  '✉️ Criar o seu próprio selo de aprovação (com uma foto sua e tudo)',
  '🎲 Desenvolver um jogo de tabuleiro a partir de um filme que você gosta muito',
  '✒️ Fazer uma mistura de tintas, formando a sua própria cor e dando o nome que você quiser pra ela',
  '🧹 Criar um grito de torcida para um time de quadribol que tem como mascote um ornitorrinco',
  '🐬 Imaginar a pior ideia para um jogo de RPG contendo golfinhos',
  '🌈 Dar novos nomes para os tons de cor que você está vestindo',
  '🥂 Tocar uma música com copos de vidro',
  '💬 Criar um personagem de história em quadrinho',
  '🩳 Usar um pijama combinando com alguém',
  '😱 Dar berros de mariachi pela janela',
  '🤗 Expressar o máximo que puder uma expressão/sentimento que você não está acostumado',
  '👩‍🎤 Criar um personagem com uma história elaborada para caso você precise se disfarçar algum dia',
  '🧶 Fazer um pote de crochê',
  '👱 Fazer um moicano com gel',
  '🌶️ Fazer uma receita típica de um país vizinho ao seu',
  '🙃 Fazer um elogio para um estranho',
  '🥔 Aprender a falar: “Ei, essa batata é minha!” em 4 línguas diferentes',
  '🖼️ Recriar um quadro renascentista com a sua refeição',
  '🏺 Criar um produto inútil da junção de outros dois objetos existentes e nomear ele',
  '🛰️ Editar uma foto sua no espaço, com o Keanu Reeves do seu lado',
  '🎤 Criar um acessório que só a Lady Gaga usaria',
  '🩸 Doar sangue e saber qual seu tipo sanguíneo',
  '🎞️ Assistir a série ou filme mais popular do ano que você nasceu',
  '🎵 Criar a letra de um samba sobre o que você comeu no almoço',
  '🎶 Aprender a cantar a sua música favorita da disney em outra língua que não o inglês',
  '🎼 Escrever um conto em que a sua música favorita se encaixaria muito bem',
  '🩲 Criar a logo da pior ideia de marca possível',
  '🎎 Fazer um teatro de fantoches com as suas meias',
  '🖍️ Customizar uma peça de roupa com giz de cera',
  '✍️ Fazer um poema utilizando apenas nomes de músicas',
  '🗽 Criar uma coleção de estátuas utilizando materiais alternativos e adicionando um comentário para cada',
  '🎩 Ficar na posição do elefantinho por 15 segundos equilibrando um chapéu na sua bunda',
  '📰 Fazer uma série de notícias rápidas sobre alguns acontecimentos esquisitos de uma cidade fictícia',
  '🧼 Passar sabão no chão e fingir ser um patinador (lembre de usar equipamentos de segurança)',
  '🗺️ Desenhar um mapa do tesouro com lugares fictícios e obstáculos',
  '♋ Inventar um novo signo e decidir quais as sortes do dia, como um horóscopo',
  '🎄 Criar seu próprio feriado e o motivo por trás',
  '🛑 Criar a pior placa de trânsito possível',
  '👨‍🌾 Inventar um fato sobre a festa junina que todos deveriam saber',
  '🦸 Inventar uma rotina matinal para um super herói em decadência',
  '💃 Criar line up de um evento que você participaria',
  '📹 Criar um comercial para o seu produto inútil',
  '🎶 Criar um Jingle para uma marca de cadeiras de escritório que não giram',
  '💃 Criar uma coreografia que com certeza seria utilizada no Just Dance',
  '📰 Criar uma folha de revista com as fofocas da casa ou uma de jornal com as notícias',
  '🍂 Elaborar a pior ideia para um aplicativo relacionado de alguma forma a folhas secas',
  '📘 Desenhar um livro que com certeza seria escolhido pela capa',
  '📚 Doar um livro e escreva uma dedicatória que deixará o próximo dono confuso',
  '🎨 Fazer uma releitura de uma pintura renascentista como se fosse no fundo do mar',
  '🎲 Escrever as 10 piores ideias de temas para um jogo de STOP',
  '⚗️ Criar um feitiço que usaria no dia-a-dia',
  '👺 Criar uma careta inédita e tirar uma foto',
  '🎭 Realizar uma fantasia em grupo totalmente diferente e legal',
  '🎸 Tocar de um jeito diferente no violão a sua música favorita',
  '👐 Aprender uma dança de mãos (não esqueça de alongá-las antes)',
  '📜 Escrever uma possível primeira epopéia da humanidade',
  '👩‍⚕️ Desenhar um raio X de seus pés como se você soubesse como são por dentro',
  '🎮 Usar seus dons artísticos para customizar um controle remoto',
  '🚪 Desenhar uma dobradiça na parte de dentro do seu cotovelo e quando for esticar o braço, fazer um barulho de porta rangendo',
  '🎞️ Recriar uma cena de um filme preto e branco utilizando cores que provavelmente não são as originais',
  '😨 Criar um nome e um tipo de fobia bizarra',
  '👸🏿 Inventar uma princesa da disney e uma história pra ela',
  '🚴🏾‍♀️ Criar uma competição com regras tão confusas que entendê-las é o primeiro objetivo',
  '🏯 Escrever uma história por trás da oitava maravilha do mundo que ainda não foi descoberta',
  '👽 Escolher a música de uma caixinha de música que seria um presente para alienígenas',
  '🎢 Elaborar um brinquedo de parque de diversões que ninguém gostaria de ir',
  '🧱 Desenhar um labirinto em algum móvel da sua casa',
  '🦸🏿‍♂️ Imaginar o pior super poder para um super herói',
  '👀 Dar vida a algum objeto desenhando olhos nele',
  '🪐 Desenhar um sol com seus planetas antropomorfizados',
  '✔️ Criar sua lista de 101 coisas não convencionais para fazer',
];

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
  resultado.innerHTML = `<span>Você concluiu ${selectedItems.length} de ${atividades.length} atividades</span>`;
}

function loadSelectedItems() {
  selectedItems = JSON.parse(localStorage.getItem(STORAGE_HASH)) || [];
}

function saveSelectedItems() {
  const selectedString = JSON.stringify(selectedItems);
  localStorage.setItem(STORAGE_HASH, selectedString);
}

function render() {
  loadSelectedItems();
  renderAtividades();
}

render();
</script>

{%endraw%}