---
title: -webkit-app-region
date: "2019-06-06T22:00:00.169Z"
---

Recentemente descobri a propriedade css `-webkit-app-region`. Ela não é muito útil quando se está desenvolvendo websites, mas em aplicações Electrons podemos encontrar vários casos de usos legais.

## O que ela faz?

As janelas dos navegadores possuem por padrão uma barra de título em que os usuário conseguem utilizar, entre outras coisas, para mover a janela de lugar. Isto não é um padrão apenas de navegadores, mas da maioria dos programas hoje. Navegadores baseados no Chromium permitem que você crie janelas sem a barra de título, ou "frameless windows". Nestes casos não existe nenhuma forma de o usuário mover com o mouse a janela de lugar, e é aí que essa tag entra. 

Sempre que você adiciona a alguma tag este estilo com o valor `drag`, o componente irá agir como a barra de títulos, ou seja, permitirá o usuário mover a janela de lugar com clique do mouse.

É importante lembrar que as tags filhas também irão adquirir essa funcionalidade. Caso você não deseje que elas herdem esse comportamento você também pode atualizar a propriedade para o valor `no-drag`.

## Como utilizar?

Um exemplo utilizando esta propriedade em uma div pode ser vista no seguinte código:

```html
<div class='title-area'>
  Área arrastável. <div class='title-button'>botão clicável</div>
</div>
```

```css
.title-area {
  -webkit-app-region: drag;
}
.title-button {
  -webkit-app-region: no-drag;
}
```

Node que a div inteira irá permitir que o usuário arraste a janela, com exceção da div interna que é clicável.

## Usando com electron

Para criar janelas frameless com o Electron basta utilizar a propriedade `frame: false` em uma instância de uma BrowserWindow. Outra propriedade legal de utilizar é a `transparent: true`. Com isso você consegue alterar o background-color de seu HTML para transparente podendo criar janelas que não ficam exatamente quadradas, no padrão dos sistemas operacionais.

```javascript
mainWindow = new BrowserWindow({
    width: 500,
    height: 550,
    transparent: true,
    frame: false
})
```

Com o projeto [electron-stopwatch](https://github.com/CGReinhold/electron-stopwatch) eu faço uso destas propriedade para criar um simples cronômetro.

![Exemplo de cronômetro em electron](/images/draggableStopwatch.gif)

## Referência

[chrome.app.window](https://developer.chrome.com/apps/app_window)