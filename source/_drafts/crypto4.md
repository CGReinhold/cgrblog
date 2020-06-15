---
title: Criptografia - parte 4
date: "2020-06-23T22:00:00.169Z"
---

Um dos principais desafios da criptografia por muito tempo foi o problema da distribuição de chaves. Esse problema se diz respeito a como a chave criptográfica de uma mensagem é transportada com segurança.

Imagine que a pessoa X deseja enviar uma mensagem criptografada para a pessoa Y. Primeiro ela precisa enviar a chave para decriptografar essa mensagem, mas como enviar ela com segurança?

Whitfield Diffie foi um dos criptógrafo que dedicou grande parte dos seus estudos a encontrar a solução para o problema de distribuição de chaves. Diffie se juntou com um outro criptógrafo, Martin Hellman, que buscava a mesma resposta.

## Exemplificando

Podemos exemplificar isso como uma troca de correspondências entre Alice e Bob (ideia tirada do livro __The Code Book: How to make it, break it, hack it, crack it__ do Simon Singh). Imagine que Alice deseja enviar uma correspondência para Bob. Ela criptografa sua mensagem, mas de alguma forma precisa passar essa chave também para Bob. Como poderia fazer isso sem ter previamente se encontrado com ele para entregar a chave?

Agora imagine que Alice coloque sua mensagem dentro de uma caixa, tranque com um cadeado para que ninguém consiga ver seu conteúdo e envia para Bob. Ao receber a caixa Bob precisaria a chave do cadeado, mas Alice não conseguiria enviar a chave sem ser possívelmente interceptada.

Mas vejamos esse cenário: Alice coloca sua mensagem dentro de uma caixa, tranca com um cadeado em que só ela tem a chave e envia para Bob. Assim que recebe a caixa, Bob adiciona um novo cadeado que só ele possui a chave e devolve a caixa para Alice. Alice irá reebe uma caixa com dois cadeados. Um deles ela consegue remover, já que possui a chave, porém o outro somente Bob pode desbloquear. E é exatamente isso que é feito, Alice tira seu cadeado, envia novamente a caixa para Bob que finalmente consegue ler a mensagem sem que ninguem pudesse interceptá-la.

Essa ideia bastante interessante foi um grande passo para que se pudessem ser encontrado formas de criptografias mais seguras. Um dos problemas é que, se falando de computação, não podemos simplesmente adicionar cadeados de forma simples em uma mensagem.

## Chaves assimétricas

Foi com essa ideia em mente que Diffie bolou o conceito de _chaves assimétricas_. Ao invés de uma informação ser decodificada com a mesma chave que foi codificada (apenas invertendo os passos), com as chaves assimétricas uma mensagem seria decriptografada com uma chave diferente da de criptografia.

Com isso, Alice teria uma chave para decriptografar as mensagems, conhecida como _chave privada_, já que somente Alice teria acesso e também teria uma _chave pública_ que seria disponibilizado para qualquer um que desejasse ver e seria utilizado para criptografar a mensagem. Com isso, caso Bob deseje enviar para Alice uma mensagem, basta utilizar a _chave pública_ dela, que somente a _chave privada_ conseguiria decriptografar.

Com essa analogia seria como se a Alice desenvolvesse um cadeado que somente ela possui a chave e distribuisse o cadeado para quem quiser. Caso alguém deseje enviar uma mensagem para Alice, basta utilizar um dos cadeados dela que a mensagem chegaria segura.

Esse conceito parece fácil de ser explicado com cadeados, mas fica muito complexo quando tentamos achar um modelo matemático que atenda essas condições.

## Encontrando uma fórmula

Por mais que Diffie e Hellman tenham encontrado uma maneira segura de criptografar mensagens, [que tem sua implementação inclusive na biblioteca nativa do Node.js](https://nodejs.org/api/crypto.html#crypto_class_diffiehellman), foram outros matemáticos que chegaram numa fórmula matemática que fosse capaz de criar chaves assimétricas.

Ronald Rivest, Adi Shamir e Leonard Adleman criaram um modelo utilizando números primos (que você pode ver descrito de uma forma mais completa no livro __The Code Book: How to make it, break it, hack it, crack it__ do Simon Singh) capaz de gerar chaves assimétricas. Esse modelo se tornou mundialmente conhecido como RSA (Rivest, Shamir, Adleman) que você também consegue encontrar disponibilizadas [nas bibliotecas padrões do Node.js](https://nodejs.org/api/crypto.html#crypto_keyobject_asymmetrickeytype).

## Conclusão

Encontrar uma forma realmente segura de transferir mensagens pode parecer algo muito complexo, e realmente é. Não é a toa que tanto tempo se passou até que se encontrassem formas realmente seguras para isso.

Hoje em dia, com a capacidade de processamento alta, e a possibilidade de ataques de força bruta, fórmulas como essa se vêem cada vez mais importante para criar camadas mas fortes e capazes de bloquear uma possível interceptação.
