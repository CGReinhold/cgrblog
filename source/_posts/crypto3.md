---
title: Criptografia - parte 3
date: "2020-03-24T22:00:00.169Z"
---

Ao final do século XIX a criptografia já não era mais tão eficiente, já que nessa época eram poucas as mensagens criptografadas que não podiam ser decifradas por quebradores de cifras especializados.

Durante o começo do século XX, com o início da popularização do rádio para comunicação e com a tensão entre os países durante a primeira guerra, novas formas de criptografia se viram cada vez mais importantes. Durante esta época, muito esforço foi feito por diversos países para criar ferramentas criptográficas para compartilhar informações sem ser descoberto por outros países.

Uma das ferramentas mais famosas criadas foi a máquina __Enigma__, criada pelo inventor alemão Arthur Scherbius. 

## Enigma

A máquina Enigma é até hoje uma das ferramentas de criptografias mais conhecidas, que durante grande parte da segunda guerra foi utilizada pelo exército alemão para se comunicar sem que os aliados conseguissem decifrar as mensagens.

A máquina baseava-se em um sistema mecânico com discos, e um teclado para a entrada da mensagem. Cada tecla representava uma letra, que era passava por cada disco sendo substituído por uma letra diferente, e ao final uma lâmpada apresentada o valor do caractere criptografado.

![Enigma](/images/crypto3/enigma.jpg)

A grande vantagem deste equipamento é que os discos podiam ser alternados e rotacionados, gerando novas chaves criptográficas. Desta forma, o exército alemão todos os dias alterava as posições dos discos para tornar mais difícil que as mensagens fossem decifradas.

A máquina ainda continha uma série de _plugs_ em sua frente que também alternavam alguns caracteres, servindo como mais uma camada de segurança.

Mesmo ao fim da primeira guerra, os aliados ainda não haviam conseguido decifrar a máquina. A Polônia, por sua vez, não tinha intenção de desistir e por algum tempo continuou estudando a máquina Enigma a ponto de encontrar uma forma de decifrar as mensagens que eram criadas através dela.

Após mais de um ano de estudo, Marian Rejewski, um matemático polonês, conseguiu encontrar uma forma de descobrir a sequência de discos utilizadas em uma máquina para criptografar mensagens. O único problema é que sua forma de decodificação não era muito rápida para decifrar sequências diferentes de discos.

Com o início da Segunda Guerra Mundial, a Alemanha voltou a utilizar sua máquina, porém com maiores níveis de segurança, com mais discos. Neste ponto a Polônia já não tinha mais condições de manter os estudos para criptografar a Enigma, porém passou para o governo britânico suas descobertas, que decidiu continuar os estudos.

Bletchley Park foi uma instalação militar onde ficavam matemáticos e linguistas que tentavam decodificar as mensagens alemãs. O mais famoso deles foi Alan Turing, considerado o responsável por conseguir finalmente decodificar a máquina. __O Jogo da Imitação__ é um filme que apresenta um pouco da vida de Alan Turing e mostra um pouco deste período da história.

No livro __The Code Book: How to make it, break it, hack it, crack it__ do Simon Singh, o autor também apresenta de forma bastante detalhada como funciona essa máquina, com diagramas mostrando cada passo de seu funcionamento.

Você consegue também executar a máquina __Enigma__ de forma interativa com [este projeto](https://observablehq.com/@tmcw/enigma-machine) do [Tom MacWright](https://macwright.org/).

## Alfabeto Navajo

Por mais que a máquina Enigma tenha se tornado um dos ícones da criptografia, também é interessante notar outras formas de esconder mensagens que utilizam diferentes técnicas.

Durante a segunda guerra os Estados Unidos criaram o que foi conhecido como o alfabeto Navajo para criptografar suas mensagens. Este alfabeto consistia em palavras do idioma __Navajo__, idioma de uma tribo indígena norte americana, com palavras do idioma inglês. Um exemplo do alfabeto Navajo utilizado pode ser visto abaixo.

![Alfabeto Navajo](/images/crypto3/navajo.PNG)

Esta forma de criptografia foi bastante utilizada nos frontes americanos no Pacífico, e a grande sacada deste alfabeto é que, por ser de uma tribo norte americana, não era conhecido pelos países orientais, logo, não bastava apenas descobrir uma chave para criptografia, mas também conseguir entender todo um novo idioma.

## Conclusão

Assim como foi com os computadores e a internet, a segunda guerra mundial foi de grande importância para a evolução de modelos criptográficos. As formar aqui apresentadas foram apenas algumas das maneiras de codificar mensagens utilizadas durante esse período, mas que ficaram bastante conhecidas por sua eficácia. E por mais que hoje diversos algoritmos de _hashing_ e troca de chaves sejam utilizados, não podemos deixar de lembrar que foram com essas máquinas que tudo teve início.

