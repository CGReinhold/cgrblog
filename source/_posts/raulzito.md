---
title: Aprendendo Javascript com Raul Seixas
date: "2020-08-25T22:00:00.169Z"
---

O Javascript é uma das linguagens de programação mais utilizadas nos dias de hoje, movido principalmente pelo fato de ser fácil de aprender e estar presente em todos os navegadores modernos. Além disso, o Javascript tem tido nos últimos anos um grande papel também no desenvolvimento desktop e mobile, com bibliotecas como `Node.js`, `React Native` e `Electron`.

Apesar de ser fácil de aprender e dar muita liberadade para o desenvolvimento, alguns conceitos do Javascript acabam sendo um pouco obscuros, principalmente para desenvolvedores que vem de outras linguagens de programação. Por conta disso, decidi trazer alguns conceitos básicos da linguagem e também conceitos comumente usados no desenvolvimento que podem (talvez) ser mais facilmente explicados com músicas de Raul Seixas.

![Raul](/images/raul/raul.png)

## Tipagem dinâmica

> Eu sou a vela que acende
> Eu sou a luz que se apaga
> Eu sou a beira do abismo
> Eu sou o tudo e o nada
> ​
> Eu sou o amargo da língua
> A mãe, o pai e o avô
> O filho que ainda não veio
> O início, o fim e o meio

Diferente de linguagens como `Java` e `C#`, o Javascript utiliza o conceito de tipagem dinâmica. Isso significa que uma variável pode ter diferentes tipos durante o seu ciclo de vida. Assim como na música __Gita__ do Raul, ela pode ser várias coisas. Por exemplo, ela pode iniciar armazenando um texto, mudar seu valor para um número, depois mudar para um objeto e até mesmo para uma função.

Para instanciar novas variáveis utilizamos as palavras chaves `const` e `let`, onde variáveis `const` podem receber qualquer tipo porém nunca irão mudar seu valor, enquanto variáveis `let` podem ter seu valor alterado dinâmicamente.

Vejamos no código abaixo como uma variável `let` pode passar por diferentes tipos em um código Javascript 100% válido (você pode inclusive testar no console do seu navegador).

```js
// uma variável pode ser um número
let euSou = 10;

// passar a ser um texto
euSou = "a vela que acende";

// se transformar em um objeto
euSou = { inicio: 0, meio: 1, fim: 2 };

const mae = { nome: "Ana" };
const pai = { nome: "Paulo" };
const avo = { nome: "José" };

// virar uma lista
euSou = [mae, pai, avo];

class Luz {
  acende() {}
  apaga() {}
}

// um objeto criado por uma classe
euSou = new Luz();

// pode ser até mesmo uma função
euSou = function filhoVindo() {  }

// pode ser tudo, ou nada
euSou = undefined;
```

## Referência de objetos

> Pedro, onde cê vai eu também vou
> Pedro, onde cê vai eu também vou
> Mas tudo acaba onde começou

O Javascript não possui ponteiros da mesma forma que linguagens como o `C`, mas ainda trabalha com pontos de referências em variáveis de alguns tipos, como `objetos` ou `listas`.

Isso pode ser visto mais claramente quando passamos argumentos destes tipos para funções. Qualquer alteração que é feita no objeto dentro da função também terá efeito no objeto que foi passado ao chamar a função. Assim como na música __Meu amigo Pedro__ de Raul, a referência segue sempre junto com o objeto, garantindo que toda alteração é sempre aplicada no objeto original.

```js
function limparNome(pessoa) {
    pessoa.nome = "";
}

const pessoa = { nome: "Raul" };
limparNome(pessoa);
console.log("Pessoa:", pessoa);
// Pessoa: Object { nome: "" }

```

As referências porém não funcionam para outros tipos como de `texto`, `números` ou `booleanos`. Vejamos no código abaixo como podemos verificar em ação o que acontece quando passamos um parâmetro de texto ao invés de objeto.

```js
function limparTexto(texto) {
    texto = "";
}

const nome = "Raul";
limparTexto(nome);
console.log("Nome:", nome);
// Nome: Raul
```

## Imutabilidade

> Ói, olhe o céu, já não é o mesmo céu que você conheceu, não é mais

Para evitar efeitos colaterais vindos de alteração de objetos por referência, métodos imutáveis tem sido muito recomendados nos últimos tempos. Métodos imutáveis são métodos que retornam uma nova instância do objeto/lista que foi passada como argumento de uma função. 

Estes métodos devem garantir que o objeto original não seja alterado, enquanto a informação alterada pode ser verificada em seu retorno. Como o Raul menciona na música __O Trem das Sete__, sua função retornará um objeto que já não é mais o mesmo passado por argumento.

Vejamos no exemplo abaixo:

```js
function pessoaSemNome(pessoa) {
    return { ...pessoa, nome: "" };
}

const pessoa = { nome: "Raul" };
const novaPessoa = pessoaSemNome(pessoa);
console.log("Pessoa:", pessoa);
console.log("Nova pessoa:", novaPessoa);
// Pessoa: Object { nome: "Raul" }
// Nova pessoa: Object { nome: "" }
console.log("É a mesma pessoa?", pessoa === novaPessoa)
// É a mesma pessoa? false
```

Funções imutáveis são bastante utilizadas para listas do Javascript. O próprio `Array` nativo possui métodos imutáveis, como o `map`, `find`, `filter` e `reduce`.

## Conclusão

Apesar de simples de aprender, o Javascript está em constante mudança, como uma __Metamorfose ambulante__, com novas versões do ECMAScript (especificação de linguagem em que o Javascript se baseia) sendo liberadas quase anualmente.

Com isso, a linguagem acaba ganhando um pouco mais de complexidade e demandando um pouco mais de estudo. Mas não tenha medo disso achando que as novas funcionalidades como `spreading` ou `async/await` vão te tornar um __Maluco Beleza__. Quando algum conceito ainda estiver um pouco obscuro, __Tente Outra Vez__, com certeza você conseguirá compreender.

{%raw%}
<style>
img {
    animation: spin 4s linear infinite;
}
@keyframes spin { 50% { transform: scale(0.7) rotate(180deg); } 100% { transform: scale(1) rotate(360deg); } }
</style>
{%endraw%}