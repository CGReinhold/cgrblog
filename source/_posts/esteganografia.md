---
title: Ocultando informações com esteganografia
date: "2020-01-23T22:00:00.169Z"
---

Esteganografia, também conhecida como a arte da comunicação invisível, é o estudo sobre a ocultação de uma informação dentro de outra sem que seja possível saber da existência da informação ofuscada. Essa palavra vem dos termos gregos "stegos", que significa "esconder" e "grafia" que significa "escrita".

A grande diferença entre a esteganografia para a criptografia é que, diferente da criptografia, onde o receptor sabe que alguma informação está codificada, a esteganografia busca ocultar a existência da informação, assim, só é possível ser decodificada por quem sabe que algo está escondido.

A esteganografia já tem sido utilizada a muito tempo, como por exemplo na Grécia antiga onde mensagens eram tatuadas nas cabeças de escravos para que ficassem ocultas assim que o cabelo estivesse crescido de volta. Hoje em dia existem diversas formas de algoritmos diferentes capazes de realizar esse tipo de ocultação. Uma forma de esteganografia que tem sido bastante [utilizada no jornalismo](https://www.zachaysan.com/writing/2017-12-30-zero-width-characters) para criação de uma impressão digital em textos divulgados é a inserção de caracteres unicode _zero width_ dentro do texto. Estes caracteres funcionam como qualquer outros, porém não existem representação visual, portanto não é possível identificá-los no texto se não utilizar uma ferramenta de exibe cada tipo de caractere unicode incluso.

## Como funciona

Os caracteres unicode _[Zero-width non-joiner](https://en.wikipedia.org/wiki/Zero-width_non-joiner)_ (`U+200C`) e _[Zero-width space](https://en.wikipedia.org/wiki/Zero-width_space)_ (`U+200B`) não possuem nenhuma identificação visual em um texto, e por isso conseguimos usá-los para esconder qualquer mensagem.

Com dois caracteres diferentes conseguimos escrever qualquer mensagem utilizando codificação binária. Para isso, primeiro buscamos o valor unicode de cada caractere da mensagem, e convertemos para binário. Juntando todos esses, podemos converter o valor `1` para o caractere `U+200C` e o valor `0` para `U+200B`. Veja no código abaixo:

```js
const padZeros = text => '00000000'.slice(String(text).length) + text;
//Convertendo texto para binário
const textToBinary = text => (text.split('').map(char => padZeros(char.charCodeAt(0).toString(2))).join(''));
//Alterando os caracteres do texto para caracteres "invisíveis"
const hideText = text => textToBinary(text).replace(/1/g, '\u200c').replace(/0/g, '\u200b');

console.log(hideText('Esta informação está escondida!'));
```

Tendo essa string convertida, podemos inserir em qualquer outra string que ela acaba ficando "invisível" para quem está lendo o texto.
O código abaixo faz a lógica reversa. Ele busca os caracteres _zero width_, converte para binário e depois de volta para texto.

```js
//Convertendo texto escondido para binário
const hiddenToBinary = text => text.split('')
                                    .filter(char => char === '\u200c' || char === '\u200b')
                                    .map(char => char === '\u200c' ? '1' : '0')
                                    .join('');
//Convertendo código binário para texto
const binaryToText = text => hiddenToBinary(text).split('')
                                          .reduce((result, value, index, array) => {
                                            if (index % 8 === 0) result.push(array.slice(index, index + 8));
                                            return result;
                                          }, [])
                                          .map(char => String.fromCharCode(parseInt(char.join(''), 2)))
                                          .join('');

console.log(binaryToText(hideText('Esta informação está escondida!')));
```

## Conclusão

Com as funções acima conseguimos esconder qualquer texto e decodificá-lo posteriormente. A _string_ gerada pela codificação pode, por exemplo, ser inserida no meio de um texto qualquer como uma impressão digital. Desta forma, leitores sem conhecimento não irá conseguir perceber o código oculto, mas caso copiem o texto completo para outros lugares essa informação com a impressão digital continuará indo junto.

Este é só um dos algoritmos de esteganografias utilizados hoje em dia, mas a lista vai longe com muita coisa interessante. [Este algoritmo aqui por exemplo](https://incoherency.co.uk/chess-steg/) converte um texto em jogadas de xadrez, e consegue realizar também o inverso. [Este outro](https://incoherency.co.uk/image-steganography/) esconde uma imagem dentro de outra através do último bit da imagem "fonte".