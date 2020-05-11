---
title: brainfuck
date: "2020-05-13T22:00:00.169Z"
---

Algum tempo atrás escrevi um artigo sobre [como escrever código Javascript com apenas seis caracteres](https://cgreinhold.dev/2020/01/11/js-seis-caracteres/). A ideia por trás disso era abusar da conversão implícita do Javascript para criação de componentes da linguagem, assim executando o código.

## brainfuck

O [_brainfuck_](https://pt.wikipedia.org/wiki/Brainfuck) é uma outra linguagem de programação considerada _minimalista_ já que contém apenas oito comandos, cada um com um caractere específico.

A ideia básica desta linguagem é poder mover entre ponteiros de memórias e incrementar ou decrementar os valores desses ponteiros, com a possibilidade ainda de realizar loops. Essas características fazem com que ela seja considerada uma linguagem Turing completa.

O _brainfuck_ possui os seguintes comandos:

| comando |                             funcionalidade                                |
|:-------:|---------------------------------------------------------------------------|
|    >    | incrementa o ponteiro de célula selecionada                               |
|    <    | decrementa o ponteiro de célula selecionada                               |
|    +    | incrementa em 1 o valor da célula selecionada                            |
|    -    | decrementa em 1 o valor da célula selecionada                            |
|    .    | imprime na tela o caractere da célula selecionada                         |
|    ,    | salva na célula selecionada o input do usuário                            |
|    [    | início da estrutura de controle para loops (enquanto a célula selecionada for zero) |
|    ]    | fim da estrutura de loop                                                  |

## Criando um interpretador

Por conta da sua simplicidade, o desenvolvimento de um interpretador para programas _brainfuck_ não é muito difícil. Para provar isso, vamos desenvolver em __Javascript__ um interpretador para esta linguagem.

O primeiro passo para criarmos um interpretador é definirmos quais as variáveis de controle precisaremos. Para o nosso caso vamos utilizar as seguintes:

- __Memória:__ Esta será a memória do nosso programa;
- __Ponteiro de instrução:__ Este ponteiro irá indicar qual instrução do programa estamos executando;
- __Ponteiro de memória:__ Este ponteiro indica qual posição de memória o programa está atualmente. Como a linguagem se baseia em navegar em pontos de memórias para atualizar os valores, essa é uma das partes essenciais do interpretador;
- __Pilha de loop:__ Esta pilha será utilizada para saber quando um loop começa para podermos voltar para a instrução quando o fim do loop é encontrado. Utilizamos a estrutura de pilha pois a linguagem permite agregação de loops, ou seja, um loop dentro do outro;
- __Programa:__ Onde o programa ficará armazenado;
- __Entrada:__ Onde serão armazenados os dados de entrada;
- __Saída:__ Onde serão armazenados os dados de saída, exibidos ao usuário ao final da execução.

```javascript
class Brainfuck {
  // Tamanho da memória do nosso programa brainfuck
  TAMANHO_DA_MEMORIA = 50000;

  // A memória é iniciada com valor 0 em todos espaços
  memoria = new Array(this.TAMANHO_DA_MEMORIA).fill(0);
    
  // Ponteiro para indicar qual instrução do programa está sendo executada
  ponteiroInstrucao = 0;
  // Ponteiro da posição de memória em que o programa está
  ponteiroMemoria = 0;

  // Utilizado para armazenar loops que iniciaram para saber ao fechar
  pilhaDeLoop = [];

  programa = "";
  entrada = "";
  saida = "";
}
```

Após isso precisamos implementar as funcionalidades de cada instrução válida. As instruções de entrada e saída, "__,__" e "__.__" respectivamente, irão manipular o valor da posição de memória corrente para inserir/buscar o valor.

```javascript
// A função "imprimir" deve pegar o valor do ponteiro de memória atual e
// adicionar para a string de saida, convertendo o número inteiro para 
// o caractere ASCII equivalente
imprimir = () => {
  this.saida += String.fromCharCode(this.memoria[this.ponteiroMemoria]);
};

// A função "ler" deve remover o primeiro caractere da entrada (caso exista)
// e adicionar o valor para a posição de memótia atual
ler = () => {
  if (this.entrada) {
    const valorEntrada = this.entrada.charCodeAt(0);
    this.entrada = this.entrada.substring(1);
    this.memoria[this.ponteiroMemoria] = valorEntrada;
  }
};
```

Na sequência, implementamos as funcionalidades de avançar e voltar no ponteiro de memória. Essas são as funcionalidades que serão disparadas com as instruções "__>__" e "__<__".

```javascript
// A função "avançar" deve adicionar novos espaços de memória (caso o ponteiro já esteja no último)
// e incrementar o ponteiro da memória
avancar = () => {
  if (this.ponteiroMemoria === this.memoria.length -1) {
    this.memoria.push(0,0,0,0,0);
  }
  this.ponteiroMemoria++;
};

// A função "voltar" deve decrementar o ponteiro da memória caso seja maior que zero
voltar = () => {
  if (this.ponteiroMemoria > 0) {
    this.ponteiroMemoria--;
  }
};
```

As instruções mais simples são as de incrementar e decrementar a posição de memória corrente (respectivamente "__+__" e "__-__").

```javascript
// A função "incrementar" deve incrementar o valor na posição de memória
// onde o ponteiro de memória está
incrementar = () => {
  this.memoria[this.ponteiroMemoria]++;
};

// A função "decrementar" deve decrementar o valor na posição de memória
// onde o ponteiro de memória está
decrementar = () => {
  this.memoria[this.ponteiroMemoria]--;
};
```

Por fim as funcionalidades de iniciar loop ("__[__") e finalizar loop ("__]__") são as mais complexas. O loop funciona verificando se o ponteiro de memória está apontando para uma posição de memória com valor zero ou diferente de zero.

Caso o valor seja diferente de zero, indica que um loop iniciou. As instruções desse loop serão executadas até o fim e o ponteiro de instrução volta para o início. Caso o valor continue diferente de zero, o loop continua.

Quando a instrução de início de loop for executada em um ponteiro de memória igual a zero, o loop termina e o ponteiro de instrução vai para o fim do loop.

```javascript
// A função "iniciarLoop" deve adicionar na pilha de loop o ponteiro que
// indica a posição do programa em que o loop começa caso o valor da posição
// de memória atual seja "0"
// Caso a posição de memória atual seja diferente de "0", o programa deve
// ir para a posição de memória que indica o fim do loop
iniciarLoop = () => {
  if (this.memoria[this.ponteiroMemoria] !== 0) {
    this.pilhaDeLoop.push(this.ponteiroInstrucao)
  } else {
    let contadorDeLoopInterno = 0;
    while (true) {
      this.ponteiroInstrucao++;
      const instrucao = this.programa[this.ponteiroInstrucao];
      if (!instrucao) break;
      if (instrucao === "[") {
        contadorDeLoopInterno++;
      } else if (instrucao === "]") {
        if (contadorDeLoopInterno) {
          contadorDeLoopInterno--;
        } else {
          break;
        }
      }
    }
  }
};

// A função "finalizarLoop" deve voltar o ponteiro de instrução para
// a posição anterior a posição do início de loop equivalente
finalizarLoop = () => {
  this.ponteiroInstrucao = this.pilhaDeLoop.pop() - 1;
};
```

Para concluir a nossa classe interpretadora de _brainfuck_ adicionamos um construtor para receber o programa, um objeto para englobar nossas instruções e um método para executar a aplicação.

```javascript
constructor(programa) {
  this.programa = programa;
}

operacoes = {
  ".": this.imprimir,
  ",": this.ler,
  ">": this.avancar,
  "<": this.voltar,
  "+": this.incrementar,
  "-": this.decrementar,
  "[": this.iniciarLoop,
  "]": this.finalizarLoop
};

// Executa o programa brainfuck
executarPrograma = (entrada) => {
  this.entrada = entrada;
  
  if (!this.programa.length) {
    console.log("Nenhum programa executado");
  }

  while (true) {
    const instrucao = this.programa[this.ponteiroInstrucao];
    if (this.operacoes[instrucao]) {
      this.operacoes[instrucao]();
    } else if (instrucao === undefined) {
      break;
    }

    this.ponteiroInstrucao++;
  }

  console.log(this.saida);
}
```

Para executarmos um programa podemos fazer, por exemplo, da seguinte forma, onde executamos o famoso "Hello World!":

```javascript
const programaBrainfuck = "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.";
new Brainfuck(programaBrainfuck).executarPrograma();
```

Quer testar o programa? Você pode utilizar a caixa de texto abaixo:

{% raw %}
<div>
  <div>
    <label for="entrada">Entrada:</label>
    <input id="entrada" type="text" />
    <button onclick="executarPrograma()">Executar</button>
  </div>
  <div>
    <textarea id="programa" style="width: 400px">++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.</textarea>
  </div>
  <div>
    <label for="saida">Saída:</label>
    <div id="saida"></div>
  </div>
</div>
<script>
class Brainfuck {
  // Tamanho da memória do nosso programa brainfuck
  TAMANHO_DA_MEMORIA = 50000;
  // A memória é iniciada com valor 0 em todos espaços
  memoria = new Array(this.TAMANHO_DA_MEMORIA).fill(0);
  // Ponteiro para indicar qual instrução do programa está sendo executada
  ponteiroInstrucao = 0;
  // Ponteiro da posição de memória em que o programa está
  ponteiroMemoria = 0;
  // Utilizado para armazenar loops que iniciaram para saber ao fechar
  pilhaDeLoop = [];
  programa = "";
  entrada = "";
  saida = "";
  constructor(programa) {
    this.programa = programa;
  }
  // A função "imprimir" deve pegar o valor do ponteiro de memória atual e
  // adicionar para a string de saida, convertendo o número inteiro para 
  // o caractere ASCII equivalente
  imprimir = () => {
    this.saida += String.fromCharCode(this.memoria[this.ponteiroMemoria]);
  };
  // A função "ler" deve remover o primeiro caractere da entrada (caso exista)
  // e adicionar o valor para a posição de memótia atual
  ler = () => {
    if (this.entrada) {
      const valorEntrada = this.entrada.charCodeAt(0);
      this.entrada = this.entrada.substring(1);
      this.memoria[this.ponteiroMemoria] = valorEntrada;
    }
  };
  // A função "avançar" deve adicionar novos espaços de memória (caso o ponteiro já esteja no último)
  // e incrementar o ponteiro da memória
  avancar = () => {
    if (this.ponteiroMemoria === this.memoria.length -1) {
      this.memoria.push(0,0,0,0,0);
    }
    this.ponteiroMemoria++;
  };
  // A função "voltar" deve decrementar o ponteiro da memória caso seja maior que zero
  voltar = () => {
    if (this.ponteiroMemoria > 0) {
      this.ponteiroMemoria--;
    }
  };
  // A função "incrementar" deve incrementar o valor na posição de memória
  // onde o ponteiro de memória está
  incrementar = () => {
    this.memoria[this.ponteiroMemoria]++;
  };
  // A função "decrementar" deve decrementar o valor na posição de memória
  // onde o ponteiro de memória está
  decrementar = () => {
    this.memoria[this.ponteiroMemoria]--;
  };
  // A função "iniciarLoop" deve adicionar na pilha de loop o ponteiro que
  // indica a posição do programa em que o loop começa caso o valor da posição
  // de memória atual seja "0"
  // Caso a posição de memória atual seja diferente de "0", o programa deve
  // ir para a posição de memória que indica o fim do loop
  iniciarLoop = () => {
    if (this.memoria[this.ponteiroMemoria] !== 0) {
      this.pilhaDeLoop.push(this.ponteiroInstrucao)
    } else {
      let contadorDeLoopInterno = 0;
      while (true) {
        this.ponteiroInstrucao++;
        const instrucao = this.programa[this.ponteiroInstrucao];
        if (!instrucao) break;
        if (instrucao === "[") {
          contadorDeLoopInterno++;
        } else if (instrucao === "]") {
          if (contadorDeLoopInterno) {
            contadorDeLoopInterno--;
          } else {
            break;
          }
        }
      }
    }
  };
  // A função "finalizarLoop" deve voltar o ponteiro de instrução para
  // a posição anterior a posição do início de loop equivalente
  finalizarLoop = () => {
    this.ponteiroInstrucao = this.pilhaDeLoop.pop() - 1;
  };
  operacoes = {
    ".": this.imprimir,
    ",": this.ler,
    ">": this.avancar,
    "<": this.voltar,
    "+": this.incrementar,
    "-": this.decrementar,
    "[": this.iniciarLoop,
    "]": this.finalizarLoop
  };
  // Executa o programa brainfuck
  executarPrograma = (entrada) => {
    this.entrada = entrada;
    if (!this.programa.length) {
      return "Nenhum programa executado";
    }
    while (true) {
      const instrucao = this.programa[this.ponteiroInstrucao];
      if (this.operacoes[instrucao]) {
        this.operacoes[instrucao]();
      } else if (instrucao === undefined) {
        break;
      }
      this.ponteiroInstrucao++;
    }
    return this.saida;
  }
};
function executarPrograma() {
  const entrada = document.getElementById("entrada").value;
  const programa = document.getElementById("programa").value;
  const saida = document.getElementById("saida");
  const resultado = new Brainfuck(programa).executarPrograma(entrada);
  saida.innerText = resultado;
}
</script>
{% endraw %}

## Conclusão

Como vimos, um interpretador _brainfuck_ é bem simples de ser desenvolvido e é uma ótima brincadeira para se fazer quando deseja aprender uma nova linguagem.

Caso queira ver o código completo criado, você pode verificar abaixo.

```javascript
class Brainfuck {
  // Tamanho da memória do nosso programa brainfuck
  TAMANHO_DA_MEMORIA = 50000;

  // A memória é iniciada com valor 0 em todos espaços
  memoria = new Array(this.TAMANHO_DA_MEMORIA).fill(0);
    
  // Ponteiro para indicar qual instrução do programa está sendo executada
  ponteiroInstrucao = 0;
  // Ponteiro da posição de memória em que o programa está
  ponteiroMemoria = 0;

  // Utilizado para armazenar loops que iniciaram para saber ao fechar
  pilhaDeLoop = [];

  programa = "";
  entrada = "";
  saida = "";

  constructor(programa) {
    this.programa = programa;
  }
  
  // A função "imprimir" deve pegar o valor do ponteiro de memória atual e
  // adicionar para a string de saida, convertendo o número inteiro para 
  // o caractere ASCII equivalente
  imprimir = () => {
    this.saida += String.fromCharCode(this.memoria[this.ponteiroMemoria]);
  };
  
  // A função "ler" deve remover o primeiro caractere da entrada (caso exista)
  // e adicionar o valor para a posição de memótia atual
  ler = () => {
    if (this.entrada) {
      const valorEntrada = this.entrada.charCodeAt(0);
      this.entrada = this.entrada.substring(1);
      this.memoria[this.ponteiroMemoria] = valorEntrada;
    }
  };
  
  // A função "avançar" deve adicionar novos espaços de memória (caso o ponteiro já esteja no último)
  // e incrementar o ponteiro da memória
  avancar = () => {
    if (this.ponteiroMemoria === this.memoria.length -1) {
      this.memoria.push(0,0,0,0,0);
    }
    this.ponteiroMemoria++;
  };
  
  // A função "voltar" deve decrementar o ponteiro da memória caso seja maior que zero
  voltar = () => {
    if (this.ponteiroMemoria > 0) {
      this.ponteiroMemoria--;
    }
  };
  
  // A função "incrementar" deve incrementar o valor na posição de memória
  // onde o ponteiro de memória está
  incrementar = () => {
    this.memoria[this.ponteiroMemoria]++;
  };
  
  // A função "decrementar" deve decrementar o valor na posição de memória
  // onde o ponteiro de memória está
  decrementar = () => {
    this.memoria[this.ponteiroMemoria]--;
  };

  // A função "iniciarLoop" deve adicionar na pilha de loop o ponteiro que
  // indica a posição do programa em que o loop começa caso o valor da posição
  // de memória atual seja "0"
  // Caso a posição de memória atual seja diferente de "0", o programa deve
  // ir para a posição de memória que indica o fim do loop
  iniciarLoop = () => {
    if (this.memoria[this.ponteiroMemoria] !== 0) {
      this.pilhaDeLoop.push(this.ponteiroInstrucao)
    } else {
      let contadorDeLoopInterno = 0;
      while (true) {
        this.ponteiroInstrucao++;
        const instrucao = this.programa[this.ponteiroInstrucao];
        if (!instrucao) break;
        if (instrucao === "[") {
          contadorDeLoopInterno++;
        } else if (instrucao === "]") {
          if (contadorDeLoopInterno) {
            contadorDeLoopInterno--;
          } else {
            break;
          }
        }
      }
    }
  };

  // A função "finalizarLoop" deve voltar o ponteiro de instrução para
  // a posição anterior a posição do início de loop equivalente
  finalizarLoop = () => {
    this.ponteiroInstrucao = this.pilhaDeLoop.pop() - 1;
  };

  operacoes = {
    ".": this.imprimir,
    ",": this.ler,
    ">": this.avancar,
    "<": this.voltar,
    "+": this.incrementar,
    "-": this.decrementar,
    "[": this.iniciarLoop,
    "]": this.finalizarLoop
  };

  // Executa o programa brainfuck
  executarPrograma = (entrada) => {
    this.entrada = entrada;
    
    if (!this.programa.length) {
      console.log("Nenhum programa executado");
    }

    while (true) {
      const instrucao = this.programa[this.ponteiroInstrucao];
      if (this.operacoes[instrucao]) {
        this.operacoes[instrucao]();
      } else if (instrucao === undefined) {
        break;
      }

      this.ponteiroInstrucao++;
    }

    console.log(this.saida);
  }
};
```