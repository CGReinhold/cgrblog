---
title: Sound Wave
date: "2020-12-08T22:00:00.169Z"
---

O código abaixo executa uma onda sonora apresentando um círculo apresentado a amplitude corrente. Este código foi criado utilizando a biblioteca `p5.js` Você pode copiar este texto e testar no [editor online](https://editor.p5js.org/) do `p5.js`.

```js
                                     let o;function                                                                          setup(){createCanvas
                             (720,500);          o=new                                                             p5.TriOsc();                o.amp(0.5);
                     o.start();                     }function                                                 draw(){                                   background(0);
               let freq                                    =map(sin(                                  frameCount                                                    /150),-1,
           1,100,                                                 500);o                           .freq                                                                  (freq);
        o.amp                                                         (0.5);                    let y                                                                          = map(
     freq,                                                                100,500         ,500,0);                                                                                 circle
(width                                                                          /2, y, 16);                                                                                              }
```

Abaixo uma outra brincadeira com este código. Se você estiver com o áudio ligado conseguirá ouvir a onda sonora sendo executada.

{% raw %}
<style>
@media only screen and (min-width: 1350px) {
  #sound  {
    display:flex;justify-content:center;
  }
}
</style>
<div id="sound"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.min.js"></script>

<script>
let o;
let f = 100;

function setup() {
  var canvas = createCanvas(1330, 300);
  canvas.parent('#sound');
  o = new p5.TriOsc();
  o.amp(0.5);
  o.start();
}

function draw() {
  background(255);
  freq = map(sin(frameCount / 50), -1, 1, 100, 500);
  o.freq(freq);
  o.amp(0.5);
  let y = map(freq, 200, 500, height, 0);
  
  textFont('monospace');
  let a = map(freq, 100, 500, 0, 8);
  
  let c = a > 7 ? 0 : 150;
  fill(c);
text('                                     let o;function                                                                          setup(){createCanvas', 0, 100);
  c = a > 6 && a < 7 ? 0 : 150;
  fill(c);
text('                             (720,500);          o=new                                                             p5.TriOsc();                o.amp(0.5);', 0, 110);
  c = a > 5 && a < 6 ? 0 : 150;
  fill(c);
text('                     o.start();                     }function                                                 draw(){                                   background(0);', 0, 120);
  c = a > 4 && a < 5 ? 0 : 150;
  fill(c);
text('               let freq                                    =map(sin(                                  frameCount                                                    /150),-1,', 0, 130);
  c = a > 3 && a < 4 ? 0 : 150;
  fill(c);
text('           1,100,                                                 500);o                           .freq                                                                  (freq);', 0, 140);
  c = a > 2 && a < 3 ? 0 : 150;
  fill(c);
text('        o.amp                                                         (0.5);                    let y                                                                          = map(', 0, 150);
  c = a > 1 && a < 2 ? 0 : 150;
  fill(c);
text('     freq,                                                                100,500         ,500,0);                                                                                 circle', 0, 160);
  c = a > 0 && a < 1 ? 0 : 150;
  fill(c);
text('(width                                                                          /2, y, 16);                                                                                              }', 0, 170);
}
</script>
{% endraw %}