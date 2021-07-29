---
title: Circles
date: "2021-07-29T22:00:00.169Z"
---

Esta é uma biblioteca de círclos. Você pode usá-la para encontrar qual círculo serve melhor para sua vontade.

Obs.: Ao contrário do esperado, alguns círculos podem não girar corretamente.

{%raw%}
<style>
.container {
  display: flex;
  flex-wrap: wrap;
}

.box {
  border: 1px solid #383838;
  padding: 6px;
  margin: 6px;
  position: relative;
  width: 10em;
  height: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.box:hover {
  border-width: 3px;
}

.char {
  animation: spin 4s linear infinite;
  position: absolute;
  font-size: 5em;
  flex: 1;
  text-align: center;
}

.code {
  margin-top: 7em;
  text-align: center;
}

@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
<script>
const circles = [
  { char: '0', code: 'U+0030' },
  { char: 'O', code: 'U+004F' },
  { char: 'o', code: 'U+006F' },
  { char: '®', code: 'U+00AE' },
  { char: '©', code: 'U+00A9' },
  { char: '֯', code: 'U+05AF' },
  { char: '⃝', code: 'U+20DD' },
  { char: '⃠', code: 'U+20E0' },
  { char: '⌽', code: 'U+233D' },
  { char: '⌾', code: 'U+233E' },
  { char: '⍉', code: 'U+2349' },
  { char: '⍟', code: 'U+235F' },
  { char: '❂', code: 'U+2742' },
  { char: '⍜', code: 'U+235C' },
  { char: '⍥', code: 'U+2365' },
  { char: '⏺', code: 'U+23FA' },
  { char: '⏣', code: 'U+23E3' },
  { char: '◍', code: 'U+25CD' },
  { char: '●', code: 'U+25CB' },
  { char: '◌', code: 'U+25CC' },
  { char: '●', code: 'U+25CF' },
  { char: '◐', code: 'U+25D0' },
  { char: '◑', code: 'U+25D1' },
  { char: '◒', code: 'U+25D2' },
  { char: '◓', code: 'U+25D3' },
  { char: '◔', code: 'U+25D4' },
  { char: '◕', code: 'U+25D5' },
  { char: '◯', code: 'U+25EF' },
  { char: '◴', code: 'U+25F4' },
  { char: '◵', code: 'U+25F5' },
  { char: '◶', code: 'U+25F6' },
  { char: '◷', code: 'U+25F7' },
  { char: '⚆', code: 'U+2686' },
  { char: '⚇', code: 'U+2687' },
  { char: '⚈', code: 'U+2688' },
  { char: '⚉', code: 'U+2689' },
  { char: '⚪', code: 'U+26AA' },
  { char: '⚫', code: 'U+26AB' },
  { char: '⚬', code: 'U+26AC' },
  { char: '⛞', code: 'U+26DE' },
  { char: '⛣', code: 'U+26E3' },
  { char: '❍', code: 'U+274D' },
  { char: '⦵', code: 'U+29B5' },
  { char: '⦺', code: 'U+29BA' },
  { char: '⦹', code: 'U+29B9' },
  { char: '⨀', code: 'U+2A00' },
  { char: '⦻', code: 'U+29BB' },
  { char: '⦽', code: 'U+29BD' },
  { char: '⧂', code: 'U+29C2' },
  { char: '⧃', code: 'U+29C3' },
  { char: '⬤', code: 'U+2B24' },
  { char: '⭗', code: 'U+2B57' },
  { char: '⭘', code: 'U+2B58' },
  { char: '￮', code: 'U+FFEE' },
  { char: '𐩑', code: 'U+10A51' },
  { char: '𐩒', code: 'U+10A52' },
  { char: '🔾', code: 'U+1F53E' },
  { char: '🔿', code: 'U+1F53F' },
  { char: '🞄', code: 'U+1F784' },
  { char: '🞅', code: 'U+1F785' },
  { char: '🞇', code: 'U+1F787' },
  { char: '🞉', code: 'U+1F789' },
  { char: '⊕', code: 'U+2295' },
  { char: '⊖', code: 'U+2296' },
  { char: '⊗', code: 'U+2297' },
  { char: '⊘', code: 'U+2298' },
  { char: '⊙', code: 'U+2299' },
  { char: '⊚', code: 'U+229A' },
  { char: '⊛', code: 'U+229B' },
  { char: '⊜', code: 'U+229C' },
  { char: '⊝', code: 'U+229D' },
  { char: '⌼', code: 'U+233C' },
  { char: '⎉', code: 'U+2389' },
  { char: '⎊', code: 'U+238A' },
  { char: '◉', code: 'U+25C9' },
  { char: '◎', code: 'U+25CE' },
  { char: 'ꙮ', code: 'U+A66E' },
  { char: 'Ꙩ', code: 'U+A668' },
  { char: 'ꙩ', code: 'U+A669' },
  { char: 'Ꙫ', code: 'U+A66A' },
  { char: 'ꙫ', code: 'U+A66B' },
  { char: '⧲', code: 'U+29F2' },
  { char: '⧳', code: 'U+29F3' },
  { char: '⦼', code: 'U+29BC' },
  { char: '⧀', code: 'U+29C0' },
  { char: '⧁', code: 'U+29C1' },
  { char: '☀', code: 'U+2600' },
  { char: '☢', code: 'U+2622' },
  { char: '☮', code: 'U+262E' },
  { char: '☯', code: 'U+263F' },
  { char: '☸', code: 'U+2638' },
  { char: '⛭', code: 'U+26ED' },
  { char: '⛮', code: 'U+26EE' },
  { char: '⛯', code: 'U+26EF' },
  { char: '⦁', code: 'U+2981' },
  { char: '⦂', code: 'U+2982' },
  { char: '⨷', code: 'U+2A37' },
  { char: '⚲', code: 'U+26B2' },
  { char: '◖', code: 'U+25D6' },
  { char: '◗', code: 'U+25D7' },
  { char: '⏲', code: 'U+23F2' },
  { char: 'ↀ', code: 'U+2180' },
  { char: 'ↂ', code: 'U+2182' },
  { char: 'ↈ', code: 'U+2188' },
  { char: 'Ɵ', code: 'U+019F' },
  { char: 'Ơ', code: 'U+01A0' },
  { char: '˚', code: 'U+02DA' },
  { char: 'Ο', code: 'U+039F' },
  { char: 'Θ', code: 'U+0398' },
  { char: 'Φ', code: 'U+03A6' },
  { char: ' ҈', code: 'U+0488' },
  { char: ' ҉', code: 'U+0489' },
  { char: '•', code: 'U+0489' },
  { char: 'ₒ', code: 'U+2092' },
];

const container = document.createElement('div');
container.className = 'container';

const parent = document.querySelector('div[itemprop="articleBody"]');
parent.appendChild(container);

circles.sort((a,b) => a.char>b.char ? 1 : 0).forEach(circle => {
  const div = document.createElement('div');
  div.className = 'box';
  div.addEventListener('click', () => {
    navigator.clipboard.writeText(circle.char).then(function() {
      console.log('Copying to clipboard was successful!');
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  });

  const char = document.createElement('div');
  char.className = 'char';
  char.innerText = circle.char;
  div.appendChild(char);

  const code = document.createElement('div');
  code.className = 'code';
  code.innerText = circle.code;
  div.appendChild(code);

  container.appendChild(div);
});
</script>
{%endraw%}