---
title: Gazeta do desenvolvedor
date: "2020-06-16T22:00:00.169Z"
---

{% raw %}
<div class="top">
  <div class="mainContent">
    <div class="mainArticle">
      <div>
        <a style="background-image: none;" href="https://cgreinhold.dev/2020/01/11/js-seis-caracteres/"><h3>Desenvolvedor programa em Javascript com apenas seis caracteres</h3></a>
        <p style="column-count: 2;column-gap: 25px;">
          Utilizando apenas seis caracteres é possível realizar quase qualquer programa Javascript. A ideia surgida como uma brincadeira se provou como algo complexo mas que tem seu uso. Neste artigo é apresentado um passo a passo de como começar a programar em Javascript utilizando apenas seis caracteres.
        </p>
      </div>
      <a style="background-image: none;margin-left: 20px;" href="https://cgreinhold.dev/2020/01/11/js-seis-caracteres/"><img src="/images/gazeta/javascript.png" alt="javascript" /></a>
    </div>
    <div class="articlePair">
      <div style="padding-right: 30px;">
        <a style="background-image: none;margin-left: 20px;" href="https://cgreinhold.dev/2020/02/04/pixelart-lineargradient/"><img style="width: 100%;" src="/images/gazeta/pixel-art.png" alt="pixel art em css" /></a>
        <div>
          <a style="background-image: none;margin-left: 20px;" href="https://cgreinhold.dev/2020/02/04/pixelart-lineargradient/"><h3>A criação de pixel-art com CSS</h3></a>
          <p>O CSS é uma linguagem extremamente poderosa e permite-nos realizar algumas atividades que nunca imaginamos ser possíveis. Neste artigo é apresentado como é possível a criação de pixel-art utilizando o <b>linear-gradient</b> do CSS.</p>
        </div>
      </div>
      <div>
        <div>
          <a style="background-image: none;margin-left: 20px;" href="https://cgreinhold.dev/2020/02/11/jogo-css/"><h3>É possível criar um jogo somente com CSS?</h3></a>
          <p>Não é só de visual que o CSS se mantém. Abusando de todas suas funcionalidades conseguimos até mesmo criar jogos sem a utilização de Javascript. Neste artigo apresentamos uma sequência de passos que pode ser utilizada para criação de simples jogo.</p>
        </div>
        <a style="background-image: none;margin-left: 20px;" href="https://cgreinhold.dev/2020/02/11/jogo-css/"><img style="width: 100%;" src="/images/gazeta/jogo.png" alt="jogo em css" /></a>
      </div>
    </div>
  </div>
  <div class="sideContent">
    <a style="background-image: none;margin-left: 20px;" href="https://cgreinhold.dev/2020/03/13/criptografia/"><img src="/images/gazeta/crypto.jpg" alt="jogo em css" /></a>
    <div class="sideText">
      <a style="background-image: none;margin-left: 20px;" href="https://cgreinhold.dev/2020/03/13/criptografia/"><h3>A história da criptografia</h3></a>
      <p>Neste blog apresentamos uma série de artigos sobre a história da criptografia. Nesta série são apresentados desde os meios mais primitivos de criptografia até as mais recentes. Também são demonstrados como os modelos criptográficos são representados na cultura popular, sendo encontradas em diferentes livros e filmes renomados.<br/><br/>Esta é uma série ainda em andamento então novos artigos ainda podem continuar aparecendo. Continue acompanhando este blog para não perder os próximos textos. Se desejar você pode também seguir o <a href="https://cgreinhold.dev/feed.xml">feed RSS</a></p>
    </div>
  </div>
</div>
<div class="bottom">
  <a style="background-image: none;" href="https://cgreinhold.dev/"><img src="/images/gazeta/logo.png" alt="logo" /></a>
  <div>
    <a href="https://cgreinhold.dev/"><h3>Mais artigos e inutilizades como essa!</h3></a>
    <p style="column-count: 3;column-gap: 44px;">
      Neste blog adiciono artigos relacionados a computação ou qualquer outra coisa que vem em mente. Nem todos os artigos representam coisas úteis. Alguns são apenas ideias ou testes que recebem seu espaço. Você pode encontrar o código fonte desse blog <a href="https://github.com/CGReinhold/cgrblog">neste link</a> caso desejar entender seu funcionamento ou adicionar sugestões. E por fim agradeço pelo seu tempo lendo esta página e minhas bobiças.
    </p>
  </div>
</div>
<style>
*, ::before, ::after {
  box-sizing: unset !important;
}
body {
  background: url(/images/gazeta/papel.png);
  font-family: "Times New Roman" !important;
}
h1 {
  font: 60px/1 "Times New Roman" !important;
	text-align: center;
  font-weight: bold !important;
  color: #1c1f33 !important;
  padding-bottom: 10px;
}
h2 {
  font: 30px/1 "Times New Roman" !important;
  font-weight: bold !important;
  color: #1c1f33 !important;
  margin-top: 0 !important;
}
h3 {
  font: 25px/1 "Times New Roman" !important;
  text-decoration: none !important;
  font-weight: bold !important;
  color: #1c1f33 !important;
  margin-top: 0 !important;
}
h2:before {
  content: "" !important;
}
p {
  color: #1c1f33;
  text-align: justify;
  line-height: 1.3;
  hyphens: none !important;
  font-size: 1.1rem !important;
}
a {
  color: #1c1f33 !important;
}
a:hover {
  background-image: none !important;
}
img {
  height: 200px;
  width: 200px;
  filter: grayscale(100%) !important;
  transition: filter 0.7s;
  max-width: none !important;
  border: 1px solid #1c1f33;
}
img:hover {
  filter: grayscale(0%) !important;
}
.meta {
  border-color: #1c1f33 !important;
  border-top-style: double;
  border-bottom-style: double;
  padding: 10px;
  display: flex;
  justify-content: space-around;
}
.top {
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom: 1px solid #1c1f33;
}
.mainContent {
  flex: 4;
  padding-right: 20px;
  border-right: 1px solid #1c1f33;
}
.mainArticle {
  display: flex;
  flex-direction: row;
}
.articlePair {
  display: flex;
  flex-direction: row;
}
.sideContent{
  flex: 1;
  padding-left: 20px;
}
.bottom {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
}
.bottom div {
  flex: 1;
  margin-left: 20px;
}
@media only screen and (max-width: 1000px) {
  .top {
    flex-direction: column;
  }
  .mainContent {
    flex: 4;
    padding-right: 0;
    padding-bottom: 20px;
    border-right: none;
    border-bottom: 1px solid #1c1f33;
  }
  .sideContent {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .sideText {
    padding-left: 20px;
  }
  .sideText p {
    column-count: 3;
    column-gap: 44px;
  }
}
</style>
{% endraw %}