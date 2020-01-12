---
title: Javascript com seis caracteres
date: "2020-01-11T22:00:00.169Z"
---

Utilizando apenas os caracteres `!+[]()` é possível escrever quase qualquer programa Javascript, mas como isso é possível?

Você provavelmente já deve ter se deparado com o [JSFuck](http://www.jsfuck.com/) em algum momento. Vamos entender como algumas coisas podem ser feitas utilizando apenas esses seis caracteres. Neste artigo iremos criar a string `ideias` com esses caracteres.

## Básico

A ideia básica por trás disso é utilizar o mecanismo de coersão implícita da linguagem que permite criarmos cada um dos caracteres que desejamos. O Javascript trabalha com valores "falso" que podem ser o booleano `false`, uma string vazia ou o número 0, e valores "verdadeiros" que podem ser o booleano `true`, valores diferentes de zero, strings, arrays ou objetos.

Para a criação da nossa string usaremos os caracteres de soma (`+`), negação (`!`), criação de arrays (`[]`) e agrupamentos (`()`) da linguagem.

Com o seguinte código conseguimos criar um array em Javascript:

`[]`

Estes dois caracteres, porém, não servem só para isso. Colchetes também são utilizados para acessar uma posição dentro de um array, quando passado um parâmetro. Outra coisa que podemos lembrar é que um array vazio também representa um valor "verdadeiro", assim como um número inteiro positivo. Com isso conseguimos fazer a seguinte loucura:

`[][[]]`

O código acima está criando um array e tentando acessar a posição "verdadeira", ou 1, do mesmo, resultando assim em `undefined`. Mas para que isso nos serve? Se somarmos `undefined` com um array vazio, o Javascript irá converter para nós isso na string `"undefined"`, desta forma:

`[][[]]+[]` é o equivalente a `undefined+""`

## Criando números

No Javascript, assim como várias outras linguagens, strings são tratadas como arrays, logo conseguimos acessar caracteres dela utilizando nossos colchetes. O que precisamos agora são de números, para conseguir acessar as posições desejadas da string.
Como vimos anteriormente, um array vazio é o equivalente a um valor "verdadeiro". Se negarmos o array com o caractere `!` teremos um valor `false`, e negando duas vezes temos o `true`. Ao colocar o caractere `+` na frente de um valor booleano, ele é convertido para um inteiro. Desta forma, o booleano True pode ser convertido para 1 adicionando o caractere `+` na frente.

`+![]` é equivalente a `+false` que é equivalente a `0`
`+!![]` é equivalente a `+true` que é equivalente a `1`

Para conseguir os outros números, basta realizar a soma com 1:

```js
1 === +!![]
2 === +!![]+!![]
3 === +!![]+!![]+!![]
4 === +!![]+!![]+!![]+!![]
```

## Acessando caracteres de uma string

Agora conseguimos acessar dentro da nossa string `"undefined"` os caracteres que quisermos. O caractere "i", por exemplo, fica no índice 5, logo conseguimos buscá-lo com o seguinte código:

`"undefined"[5]` é equivalente a `([][[]]+[])[+!![]+!![]+!![]+!![]+!![]]` que é equivalente a `"i"`

O caractere "d", por sua vez, está no índice 2, logo podemos utilizar o seguinte código para buscá-lo:

`"undefined"[2]` é equivalente a `([][[]]+[])[+!![]+!![]]` que é equivalente a `"d"`

Nem todos caracteres podem ser encontrados na string "undefined", por isso precisamos encontrar outros métodos para diferentes caracteres. Transformando os booleanos `true` e `false` para strings conseguimos alguns caracteres extras:

`![]+[]` é equivalente a `"false"`
`!![]+[]` é equivalente a `"true"`

Para os caracteres restantes da nossa string desejadas isso já nos é suficiente. Conseguimos encontrar o "e" no índice 3 da string "true" e os caracteres "a" e "s" nos índices 1 e 3 da string "false" respectivamente. É possível fazermos então o seguinte:

`"true"[3]` é equivalente a `(!+[]+[])[+!![]+!![]+!![]]` que é equivalente a `"e"`
`"false"[1]` é equivalente a `(![]+[])[+!![]]` que é equivalente a `"a"`
`"false"[3]` é equivalente a `(![]+[])[+!![]+!![]+!![]]` que é equivalente a `"s"`

## Juntando tudo

Para finalizar a nossa string, basta concatenarmos todos os caracteres encontrados com o `+` da seguinte maneira:

```js
([][[]]+[])[+!![]+!![]+!![]+!![]+!![]] //i
+
([][[]]+[])[+!![]+!![]]                //d
+
(!+[]+[])[+!![]+!![]+!![]]             //e
+
([][[]]+[])[+!![]+!![]+!![]+!![]+!![]] //i
+
(![]+[])[+!![]]                        //a
+
(![]+[])[+!![]+!![]+!![]]              //s
```

Executando o código acima no console do seu navegador você poderá ver que a string "ideias" será impressa na tela.

## Conclusão

Apesar de ser possível a criação de código Javascript com apenas seis caracteres, não são muitas os casos de uso para isto. Um dos possíveis usos seria a ofuscação de códigos que acabam ficando disponíveis para usuários finais da aplicação, porém temos que lembrar que codificar desta forma pode deixar o código muito mais extenso, além de ter uma performance reduzida drasticamente.

O [repositório do JSFuck](https://github.com/aemkei/jsfuck/blob/master/jsfuck.js) exemplifica ainda como conseguir realizar outras funcionalidades do javascript, além de números e strings.