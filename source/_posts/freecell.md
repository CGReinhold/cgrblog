---
title: Freecell
date: "2020-10-12T22:00:00.169Z"
---

Depois de me aventurar criando aplicações Javascript para [WEB](https://cgreinhold.dev/2020/05/25/word-games/), [Desktop](https://cgreinhold.dev/2019/08/25/clippy-revival/) e [Mobile](https://github.com/CGReinhold/BolaoDaCopa/), chegou a hora de fazer uma aplicação CLI.

Com a flexibilidade do **Node.js** conseguimos criar quase qualquer coisa, inclusive aplicações em linha de comando. Recentemente encontrei a biblioteca [Ink](https://github.com/vadimdemedes/ink), que permite criar programas em linha de comando utilizando `React`. Sim, além de aplicações WEB e Mobile, podemos também criar programas CLI com React.

Usando caracteres unicode, a biblioteca permite a criação de caixas, e textos coloridos utilizando estilos bastante familiares ao CSS

Inspirado [neste Solitaire](https://github.com/zephraph/solitaire), que permite você jogar o famoso jogo **Paciência** direto no seu prompt de comando, desenvolvi o [Freecell](https://github.com/CGReinhold/freecell), um jogo de cartas que o Windows costuma disponibilizar em seu sistema operacional.

Para jogar basta executar o seguinte comando caso você tenha o **Node.js** instalado:

```
npx freecell
```

Abaixo você pode ver um exemplo do jogo rodando direto prompt de comando.

![freecell](/images/cards/freecell.gif)

Se você se interessou, recomendo muito brincar com essa biblioteca. O jogo é apenas uma brincadeira, mas você pode fazer muito mais com ela, usando a facilidade já conhecida do React.