---
title: Node é mesmo single threaded?
date: "2020-05-19T22:00:00.169Z"
---

É muito comum vermos pela internet a informação de que Node.js é _single threaded_, mas isso é mesmo verdade?

Por mais que o _event loop_, estrutura do Node.js que aguarda os eventos e mensagens para execução, seja executado apenas em uma thread, não podemos afirmar que o node seja _single threaded_. Algumas das bibliotecas que usadas pelo node acabam utilizando mais threads do computador, já que são executadas fora do _event loop_. Veremos um pouco sobre isso neste artigo.

## Exemplificando

Alguns dos exemplos de rotinas que são executadas no pool de threads do Node.js são __acesso ao filesystem__, __acesso a recursos de rede__ ou até mesmo módulos de __criptografia__.

Para que possamos verificar o funcionamento das threads executando em um programa node, vamos utilizar a biblioteca [_crypto_](https://github.com/nodejs/node/blob/master/lib/crypto.js), nativa do node e que possui diversas implementações de funções criptográficas.

Uma forma de testarmos essa biblioteca é executando uma simples função, como por exemplo a `pbkdf2`, que é uma função criptográfica utilizada para gerar uma hash de uma informação. Além disso, vamos verificar o tempo que essa função demora para executar.

Veja no código abaixo isso em uso:

```javascript
const crypto = require("crypto");

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 1:', Date.now() - start);
});
```

Como o tempo de execução é relativo a capacidade de processamento, é normal que em cada máquina o valor gerado no log seja diferente. Na minha máquina, por exemplo, foi apresentado o valor `Thread 1: 579`.

Executando essa função temos apenas um processamento sendo executado. Para conseguirmos verificar as diversas threads funcionando, podemos executar a função repetidas vezes, como no código abaixo, e verificar quais os resultados:

```javascript
const crypto = require("crypto");

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 2:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 3:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 4:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 5:', Date.now() - start);
});
```

Executando este programa, temos por exemplo o seguinte _output_:

```
Thread 2: 844
Thread 4: 855
Thread 3: 887
Thread 1: 904
Thread 5: 1490
```

Com esse resultado, podemos verificar que as funções não foram executadas de forma linear, ou seja, a segunda chamada foi executada antes da primeira e a quarta antes da terceira. Isso ocorreu pois algumas threads acabam demorando um pouco mais para realizar o processamento, terminando de executar um pouco depois.

É importante notar que caso a aplicação fosse realmente _single threaded_, cada funcionalidade seria executada de forma sequencial, da maneira como foi desenvolvida.

## E como podemos mudar a quantidade de threads utilizadas?

O node permite alterarmos a quantidade de threads que ele irá utilizar no pool de threads. Para isso podemos alterar a variável `UV_THREADPOOL_SIZE` do ambiente node.

Para fazer isso basta adicionarmos o seguinte comando no início da nossa aplicação: `process.env.UV_THREADPOOL_SIZE = 2;`.

Caso você esteja rodando em uma máquina Windows, será necessário fazer essa alteração antes de iniciar a aplicação. Desta forma você pode ajustar o _script_ de _start_ da aplicação (localizado no `package.json`) para o seguinte: `"start": "set UV_THREADPOOL_SIZE=2 & node app.js",`

Vejamos o resultado ao executar a nossa aplicação com duas threads do pool de threads:

```
Thread 2: 549
Thread 1: 559
Thread 3: 1127
Thread 4: 1134
Thread 5: 1656
```

Como podemos ver, o tempo total é um pouco maior para executar as cinco threads, mas conseguimos notar um padrão de 500 milisegundos para cada duas execuções.

Neste caso também conseguimos notar que as threads 1 e 2 são executadas antes das outras, já que são as primeiras a serem chamadas no código, em seguida a 3 e a 4 são executadas e por último a 5, confirmando nossa execução de duas threads por vez.

E o que acontece se utilizarmos apenas uma thread? Vejamos:

```
Thread 1: 555
Thread 2: 1101
Thread 3: 1627
Thread 4: 2184
Thread 5: 2785
```

Como podemos notar, habilitando apenas uma thread do node a execução fica sequencial e drasticamente mais lenta.

## Conclusão

Como pudemos verificar, por mais que o _event loop_ do node seja executado em apenas um thread, não podemos arfirmar que o node seja completamente _single threaded_ já que diversas funções são executadas em multiplas threads e você consegue inclusive ajustar a quantidade de threads que deseja utilizar.

Saber disso pode ser algo muito importante em aplicações mais avançadas desenvolvidas em Node.js pois pode trazer uma grande melhoria de performance. Porém ainda é bastante importante tomar cuidado, pois com mais threads também temos mais complexidade e problemas que podemos encontrar em execuções concorrentes.