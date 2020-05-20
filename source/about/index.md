---
title: about
date: 2020-01-11 14:45:36
---

Sou Cleyson, desenvolvedor de Software e formado em Ciência da Computação na [FURB](https://furb.br/). Tenho {%raw%}<span id="idade"></span>{%endraw%} anos (ou teria caso não tivesse feito um _update_ sem _where_). Entusiasta de tudo relacionado a programação, estou o tempo inteiro aprendendo e buscando explorar novas tecnologias. Nas horas vagas também um viajante, que tenta conhecer novas culturas sempre que a oportunidade aparece. Compartilhe esse blog com 20 pessoas para evitar que o _update_ sem _where_ também atinja você.

{% raw %}
<script>
  const idadeDom = document.getElementById("idade");
  const diferenca = Date.now() - new Date(1996, 5, 22);
  const data = new Date(diferenca); // miliseconds from epoch
  const idade =  Math.abs(data.getUTCFullYear() - 1970);
  idadeDom.innerText = idade;
</script>
{% endraw %}