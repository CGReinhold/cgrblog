(this["webpackJsonpfont-game"]=this["webpackJsonpfont-game"]||[]).push([[0],[,,,,,,,,,,,function(e,t,r){},,function(e,t,r){},function(e,t,r){},function(e,t,r){},,function(e,t,r){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var i=r(1),n=r.n(i),o=r(4),a=r.n(o),c=(r(11),r(2)),s=r(5),l=(r(13),r(14),r(15),["font-family: sans-serif;","color: white;","font-size: 20px;","text-transform: uppercase;","font-kerning: none;","font-variant-caps: all-small-caps;","font-weight: bold;","font-style: italic;","text-decoration: underline;","letter-spacing: 1px;","word-spacing: 5px;","line-height: 1.5;","text-indent: 20px;","text-align: center;","text-shadow: 1px 1px lightgray;",["overflow: hidden;","white-space: nowrap;","text-overflow: ellipsis;"],"direction: rtl;","text-emphasis: triangle;","writing-mode: vertical-lr;","text-orientation: upright;"]),d=["#ff0000","#ff4d00","#ff9900","#ffe600","#ccff00","#33ff00","#80ff00","#00ff19","#00ff66","#00ffb3","#00ffff","#00b2ff","#0066ff","#0019ff","#3300ff","#8000ff","#cc00ff","#ff00e5","#ff0099","#ff004d","#ff0000"],h=r(0),j=function(e){var t=e.level,r=e.input,i=e.onInput,n=e.onEnter,o="string"===typeof l[t-1]?1:l[t-1].length;return Object(h.jsxs)("section",{className:"input-container",children:[Object(h.jsx)("p",{className:"code-start",children:".phrase {"}),Object(h.jsx)("p",{children:l.slice(0,t-1).map((function(e){return"string"===typeof e?Object(h.jsx)("span",{children:e},e):e.map((function(e){return Object(h.jsx)("span",{children:e},e)}))}))}),t<l.length+1&&Object(h.jsx)("textarea",{autoFocus:!0,placeholder:"your style",value:r,onChange:function(e){var t=e.target.value.split("\n").length>o?e.target.value.replace(/\n+$/,""):e.target.value;i(t)},onKeyUp:function(e){"Enter"!==e.key||e.shiftKey||n()},rows:o}),Object(h.jsx)("p",{className:"code-end",children:"}"})]})},p={LEVEL_DESCRIPTIONS:[Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"font-family"})," property specifies the font for an element."]}),Object(h.jsx)("p",{children:"It can be a real font, such as 'Times' or 'Arial', or a generic font, such as 'serif', 'sans-serif', or 'cursive'."})]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"color"})," property is pretty straight forward: it allows you to change the font color."]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"font-size"})," property is also one of the most common ones, it is used to change the size of the letters in your text."]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"text-transform"})," property allows you to change the case of the text, without changing the text itself."]}),Object(h.jsxs)("p",{children:["This removes the necessity to use a ",Object(h.jsx)("i",{children:".toUpperCase()"})," on JavaScript for example."]})]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"font-kerning"})," property is not very famous but can fix a very annoying bug that we find sometimes."]}),Object(h.jsx)("p",{children:"It controls the usage of the kerning information stored in a font, which is the space some letters overlap one another in some fonts."})]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"font-variant-caps"})," property is how you can use the ",Object(h.jsx)("i",{children:"small caps"})," from the font you are using, which is tipically a form of the uppercase letters, but reduced in size."]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"font-weight"})," property allows you to change the weight of a text, making it bolder or lighter."]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"font-style"})," property is a way to changing the style, allowing you to set it to italic, for example."]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"text-decoration"})," property may have a broad naming, but it can be mostly used to add a line under/over/through the text."]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"letter-spacing"})," property allows you to change the spacing between each character of your text."]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"word-spacing"})," property, on the other hand, allows you to change the space between each word of the text, and not each character."]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"line-height"})," property lets you define the height of each line of the text."]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"text-indent"})," property is how you can add an identation to your text only on the first line."]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"text-align"})," property is how you can change the alignment of your text."]}),Object(h.jsxs)("p",{children:["This property allows you to align on the ",Object(h.jsx)("i",{children:"left"}),", ",Object(h.jsx)("i",{children:"right"}),", ",Object(h.jsx)("i",{children:"center"})," or ",Object(h.jsx)("i",{children:"justify"})," your text."]})]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"text-shadow"})," property is the way of adding a shadow to your text. It works similarly to the ",Object(h.jsx)("i",{children:"box-shaddow"})," property."]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"text-overflow"})," property is how you add a proper content for the overflowing text, such as the ellipsis."]}),Object(h.jsxs)("p",{children:["This must be used with the ",Object(h.jsx)("i",{children:"overflow: hidden"})," and ",Object(h.jsx)("i",{children:"white-space: nowrap"})," to have any effect, but will allow you to use a proper ellipsis on the overflow text without the necessity of any JavaScript parsing."]})]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"direction"})," property will define in which direction the text goes, being it ",Object(h.jsx)("i",{children:"ltr"})," (left to right) or ",Object(h.jsx)("i",{children:"rtl"})," (right to left)."]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"text-emphasis"})," property allows you to add emphasis on each character of the text."]}),Object(h.jsxs)("p",{children:["This property enables using ",Object(h.jsx)("i",{children:"circle"}),", ",Object(h.jsx)("i",{children:"triangle"}),", a character, and even define it's color."]})]}),Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"writing-mode"})," property will give you the chance to change the flow of the text from horizontal to vertical."]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["The ",Object(h.jsx)("i",{children:"text-orientation"})," property only affects vertical texts, and it's the way of deciding the direction of each character."]}),Object(h.jsx)("p",{children:"With this, you'll be able to have the text of vertical without rotating the characters."})]})],MOBILE_WARNING:"This app may not work properly in mobile devices. Try playing it on desktop for a better experience.",NO_LEVEL_DESCRIPTION:"This is a game about css font attributes. Can you guess the right CSS attribute to give the text on the right the new style?",START_BUTTON:"Start",NEXT_BUTTON:"Next",CHECK_BUTTON:"Check",GIVE_SOLUTION_BUTTON:"Give me the solution",YOU_WON:"You won!",WAS_WRONG:"You got it wrong. Try again",CHANGE_STYLE:"Try to change the style to look like this",HOVER_TO_SEE:"Hover the text to see previous version",PHRASE:"I wonder if I've been changed in the night.\nLet me think.\nWas I the same when I got up this morning?\nI almost think I can remember feeling a little different.\nBut if I'm not the same, the next question is 'Who in the world am I?' Ah, that's the great puzzle!"},u={LEVEL_DESCRIPTIONS:[Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"font-family"})," \xe9 utilizada para especificar a fonte de um elemento."]}),Object(h.jsx)("p",{children:"Pode-se usar o nome de uma fonte, como 'Times' ou 'Arial', ou uma fonte gen\xe9rica, como 'serif', 'sans-serif' ou 'cursive'."})]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"color"})," \xe9 bastante intuitiva: permite alterar a cor do texto."]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"font-size"})," tamb\xe9m \xe9 uma das mais comuns, \xe9 utilizada para alterar o tamanho das letras no seu texto."]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"text-transform"}),' permite que voc\xea altere a "caixa" do texto, entre mai\xfasculas ou min\xfasculas, por exemplo, sem mudar o texto em si.']}),Object(h.jsxs)("p",{children:["Essa propriedade remove a necessidade de utilizar a fun\xe7\xe3o ",Object(h.jsx)("i",{children:".toUpperCase()"})," no JavaScript por exemplo."]})]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"font-kerning"})," n\xe3o \xe9 t\xe3o famosa, mas pode resolver um problema chato que encontramos as vezes."]}),Object(h.jsx)("p",{children:"Ela controla o uso da informa\xe7\xe3o de kerning contida nas fontes, que \xe9 por sua vez o expa\xe7o em que uma letra sobrep\xf5es a outra."})]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"font-variant-caps"})," \xe9 como voc\xea pode usar o ",Object(h.jsx)("i",{children:"small caps"})," da fonte que est\xe1 utilizando, na qual \xe9 tipicamente uma forma das letras em mai\xfasculo, mas reduzidas em tamanho."]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"font-weight"})," permite mudar a largura das letras, deixando-as mais ou menos negrito."]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"font-style"})," \xe9 uma forma de alterar o estilo da fonte, permitindo deix\xe1-la em it\xe1lico ou mais obliqua, por exemplo."]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"text-decoration"})," pode ter um nome gen\xe9rico, mas \xe9 utilizado principalmente para adicionar sublinhado, ou texto sobre o texto."]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"letter-spacing"})," permite alterar o espa\xe7amento entre cada caractere do seu texto."]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"word-spacing"}),", por outro lado, permite voc\xea alterar o espa\xe7o entre cada palavra do texto, e n\xe3o cada caractere."]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"line-height"})," permite voc\xea alterar a altura de cada linha do texto."]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"text-indent"})," \xe9 como voc\xea pode adicionar uma identa\xe7\xe3o ao seu texto na primeira linha."]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"text-align"})," \xe9 como voc\xea pode alterar o alinhamento de seu texto."]}),Object(h.jsxs)("p",{children:["Esta propriedade permite voc\xea alinhar seu texto na esquerda (",Object(h.jsx)("i",{children:"left"}),"), direita (",Object(h.jsx)("i",{children:"right"}),"), centro (",Object(h.jsx)("i",{children:"center"}),") ou justificado (",Object(h.jsx)("i",{children:"justify"}),")."]})]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"text-shadow"})," \xe9 uma forma de adicionar sombra no seu texto. Funciona de forma similar a propriedade ",Object(h.jsx)("i",{children:"box-shaddow"}),"."]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"text-overflow"})," \xe9 como voc\xea consegue ajustar o conte\xfado corretamente em textos que excedem o tamanho permitido."]}),Object(h.jsxs)("p",{children:["Esta propriedade deve ser utilizada juntamente com ",Object(h.jsx)("i",{children:"overflow: hidden"})," and ",Object(h.jsx)("i",{children:"white-space: nowrap"})," para ter efeito, e permitir\xe1 voc\xea utilizar retic\xeancias no texto excedido sem a necessidade de utilizar JavaScript."]})]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"direction"})," ir\xe1 definir qual a dire\xe7\xe3o o texto segue, sendo ",Object(h.jsx)("i",{children:"ltr"})," (esquerda para direita) ou ",Object(h.jsx)("i",{children:"rtl"})," (direita para esquerda)."]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"text-emphasis"})," permite voc\xea adicionar \xeanfase em cada caractere do texto."]}),Object(h.jsxs)("p",{children:["Ela habilita voc\xea a usar ",Object(h.jsx)("i",{children:"c\xedrculos"}),", ",Object(h.jsx)("i",{children:"triangulos"}),", ou qualquer caractere, e at\xe9 definir sua cor."]})]}),Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"writing-mode"})," te dar\xe1 a chance de alterar como o fluxo de texto \xe9 disposto, alterando entre horizontal e vertical."]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("p",{children:["A propriedade ",Object(h.jsx)("i",{children:"text-orientation"})," ir\xe1 afetar apenas textos na vertical e \xe9 uma forma de decidir a dire\xe7\xe3o de cada caractere."]}),Object(h.jsx)("p",{children:"Com isso voc\xea poder\xe1 ter seu texto na vertical sem ter os caracteres rotacionados."})]})],MOBILE_WARNING:"Este jogo pode n\xe3o funcionar muito bem em dispositivos m\xf3veis. Tente jog\xe1-lo em um desktop.",NO_LEVEL_DESCRIPTION:"Este \xe9 um jogo sobre atributos de fontes no CSS. Voc\xea consegue adivinhar os atributos corretos para atualizar o estado do texto ao lado?",START_BUTTON:"Iniciar",NEXT_BUTTON:"Pr\xf3ximo",CHECK_BUTTON:"Verificar",GIVE_SOLUTION_BUTTON:"Quero a resposta",YOU_WON:"Voc\xea venceu!",WAS_WRONG:"Voc\xea errou. Tente novamente.",CHANGE_STYLE:"Tente mudar o estilo para que o texto fique assim",HOVER_TO_SEE:"Passe o mouse por cima para ver a vers\xe3o anterior",PHRASE:'Ser\xe1 que fui eu que mudei \xe0 noite? Deixe-me pensar: eu era a mesma quando me levantei hoje de manh\xe3? Estou quase achando que posso me lembrar de me sentir um pouco diferente. Mas se eu n\xe3o sou a mesma, a pr\xf3xima pergunta \xe9: "Quem \xe9 que eu sou?". Ah, este \xe9 o grande enigma!'},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"EN";return"PT"===e?u:p},b=function(e){var t=e.level,r=e.language,n=e.onNext,o=e.onPrevious,a=Object(i.useState)(""),s=Object(c.a)(a,2),p=s[0],u=s[1],b=Object(i.useState)(!1),O=Object(c.a)(b,2),m=O[0],f=O[1],g=Object(i.useState)(!1),v=Object(c.a)(g,2),y=v[0],T=v[1],w=x(r),N=w.LEVEL_DESCRIPTIONS,E=w.NO_LEVEL_DESCRIPTION,S=w.START_BUTTON,A=w.NEXT_BUTTON,_=w.CHECK_BUTTON,I=w.GIVE_SOLUTION_BUTTON,C=w.YOU_WON,k=t===l.length&&m;Object(i.useEffect)((function(){document.documentElement.style.setProperty("--neon",d[t])}),[t]);var q=function(){k||(f(!1),u(""),n())},U=function(e,t){return e.replaceAll(" ","").replace(";","").toUpperCase()===t.replaceAll(" ","").replace(";","").toUpperCase()},L=function(){!k&&p&&(m?q():!function(){var e=l[t-1];if("string"===typeof e)return U(p,e);var r=p.split("\n");return e.every((function(e){return r.some((function(t){return U(e,t)}))}))}()?T(!0):(T(!1),f(!0)))};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("section",{className:"level-description",children:Object(h.jsxs)("div",{children:[0===t&&E,t>0&&m&&N[t-1]]})}),y&&Object(h.jsx)("p",{children:"You got it wrong. Try again"}),0===t&&Object(h.jsx)("section",{className:"buttons",children:Object(h.jsx)("button",{onClick:q,children:S})}),t>0&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(j,{input:p,onInput:function(e){u(e),T(!1)},level:t,onEnter:L}),Object(h.jsxs)("section",{className:"buttons",children:[t>0&&Object(h.jsx)("button",{className:"arrow",onClick:function(){f(!1),u(""),o()},children:"<"}),m?Object(h.jsx)("button",{onClick:q,children:k?C:A}):Object(h.jsx)("button",{onClick:L,children:_}),t<l.length&&Object(h.jsx)("button",{className:"arrow",onClick:q,children:">"})]}),!k&&Object(h.jsx)("button",{className:"help-buton",onClick:function(){var e=l[t-1];u("string"===typeof e?e:e.join("\n")),f(!0),T(!1)},children:I})]})]})},O=(r(17),r(6)),m=r.n(O),f=(r(18),function(e){var t=e.language,r=e.level,i=void 0===r?0:r,n=Array.from({length:i},(function(e,t){return"level".concat(t+1)})),o=m()(n),a=x(t).PHRASE;return Object(h.jsx)("p",{className:o,children:a})}),g=function(e){var t=e.level,r=e.language,i=x(r),n=i.HOVER_TO_SEE,o=i.CHANGE_STYLE;return Object(h.jsxs)("section",{className:"phrase-container",children:[t>0&&Object(h.jsx)("div",{className:"phrase-container-tip phrase-top-tip",children:o}),Object(h.jsxs)("div",{className:"phrase",children:[Object(h.jsx)("div",{className:"previous",children:Object(h.jsx)(f,{language:r,level:t>0?t-1:t})}),Object(h.jsx)("div",{className:"current",children:Object(h.jsx)(f,{language:r,level:t})})]}),t>0&&Object(h.jsx)("div",{className:"phrase-container-tip phrase-bottom-tip",children:n})]})},v=function(){var e=Object(i.useState)(0),t=Object(c.a)(e,2),r=t[0],n=t[1],o=Object(i.useState)("EN"),a=Object(c.a)(o,2),l=a[0],d=a[1],j=x(l).MOBILE_WARNING,p=function(e){return l===e?"selected":void 0};return Object(h.jsxs)("div",{className:"game",children:[Object(h.jsxs)("div",{className:"game-content",children:[Object(h.jsx)("h2",{className:"title",children:"Font Challenge"}),s.isMobile&&Object(h.jsx)("p",{className:"mobile",children:j}),Object(h.jsx)(b,{language:l,level:r,onNext:function(){return n(r+1)},onPrevious:function(){return n(r-1)}}),Object(h.jsxs)("div",{className:"links",children:[Object(h.jsx)("a",{href:"https://cgreinhold.dev",children:"cgreinhold.dev"})," \u2022 ",Object(h.jsx)("a",{href:"https://github.com/CGReinhold/font-game",children:"Github"})]}),Object(h.jsxs)("div",{className:"game-languages",children:[Object(h.jsx)("button",{className:p("EN"),onClick:function(){return d("EN")},children:"EN"}),Object(h.jsx)("button",{className:p("PT"),onClick:function(){return d("PT")},children:"PT"})]})]}),Object(h.jsx)(g,{level:r,language:l})]})};a.a.render(Object(h.jsx)(n.a.StrictMode,{children:Object(h.jsx)(v,{})}),document.getElementById("root"))}],[[19,1,2]]]);
//# sourceMappingURL=main.29d1183b.chunk.js.map