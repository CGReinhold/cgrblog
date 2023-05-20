---
title: QRCode playground
date: "2023-05-20T22:00:00.169Z"
special: true
---

{%raw%}
<meta property="og:title" content="QRCode playground" />
<meta property="og:description" content="QRCode playground - play with QRCodes">

<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.js"></script>
    <style>
      header {
        display: none !important;
      }
      .max-width {
        max-width: 100%;
      }
      .content {
        padding: 0 !important;
        margin: 0 !important;
        height: 100vh;
        flex-direction: row;
      }
      article .content img {
        height: inherit !important;
      }
      body {
        padding: 0 !important;
        margin: 0 !important;
        font-family: 'Courier New', Courier, monospace;
      }
      .background {
        width: 100%;
        height: 100%;
        position: absolute;
      }
      #page {
        width: 100%;
        height: 100%;
        mix-blend-mode: difference;
        background-color: #eee;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .input {
        border: none;
        background-color: transparent;
        font-size: 22px;
        outline: none;
        font-family: 'Courier New', Courier, monospace;
        border: 5px dashed black;
        padding: 5px 10px;
      }
      span {
        display: block;
      }
      fieldset {
        border: none;
      }
      .mode {
        display: block;
        padding: 1px 6px;
        cursor: pointer;
      }
      input[type=radio] {
        display: none;
      }
      label:has(input[type=radio]:checked) {
        font-weight: bold;
        background-color: #222;
        color: #eee;
      }
      .theme-picker {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      .header {
        height: 10vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eee;
      }
      .footer {
        width: 100vw;
        background-color: #eee;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .mode-options {
        margin-top: 10px;
        display: flex;
        align-items: center;
        display: block;
      }
      #qrcode {
        transition: transform 1s;
      }
      .hidden {
        display: none;
      }
    </style>
    
    <script>
      // Helper functions
      function random(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }
      function randomItem(list) { return list[random(0, list.length)] }

      function createSvgElement(tagName, attributes) {
        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', tagName)
        if (attributes) Object.keys(attributes).forEach((key) => svgElement.setAttribute(key, attributes[key]))
        return svgElement
      }
      function createRectElement(attributes) { return createSvgElement('rect', attributes) }
      function createCircleElement(attributes) { return createSvgElement('circle', attributes) }

      function svg2img(element) { return 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(element)) }

    </script>

    <script>
      class Game {
        parentSvg = document.getElementById('qrcode')
        intervals = []
        events = {}

        constructor(id, description) {
          this.id = id
          this.description = description
        }

        initialize() {
          document.getElementById('description').innerText = this.description
          this.start()
        }

        start() {
          throw new Error('start not implemented')
        }

        setInterval(handler, timeout) {
          const intervalId = setInterval(handler, timeout)
          this.intervals.push(intervalId)
          return intervalId
        }

        clearInterval(intervalId) {
          clearInterval(intervalId)
        }

        getParentWidth() {
          return Number(this.parentSvg.getAttribute('width'))
        }

        addEventListener(event, listener) {
          document.addEventListener(event, listener)
          this.events[event] = listener
        }

        createRectElement(attributes = {}) {
          return createRectElement({ ...attributes, [this.id]: 'true', 'qrcode': 'true' })
        }

        insertRectElement(attributes = {}) {
          const rect = this.createRectElement(attributes)
          this.parentSvg.appendChild(rect)
          return rect
        }

        getElement(attributes = {}, elementType = '*') {
          const attributesFilter = Object.keys(attributes).map(attribute => `[${attribute}="${attributes[attribute]}"]`)
          return document.querySelector(`${elementType}${attributesFilter.join('')}`)
        }

        getElements(attributes = {}, elementType = '*') {
          const attributesFilter = Object.keys(attributes).map(attribute => `[${attribute}="${attributes[attribute]}"]`)
          return document.querySelectorAll(`${elementType}${attributesFilter.join('')}`)
        }

        getRectElement(attributes = {}) {
          return this.getElement(attributes, 'rect')
        }

        getRectElements(attributes = {}) {
          return this.getElements(attributes, 'rect')
        }

        addBorders(activeBorders = []) {
          const width = this.getParentWidth()
          const borders = [
            [0, 0, width, pixelSize], // top
            [0, width - pixelSize, width, pixelSize], //bottom
            [0, 0, pixelSize, width], //right
            [width - pixelSize, 0, pixelSize, width] //left
          ]
          borders.forEach((border, index) => {
            if (activeBorders.includes(index)) {
              this.insertRectElement({
                'x': border[0],
                'y': border[1],
                'width': border[2],
                'height': border[3],
                'fill': BLACK,
              })
            }
          })
        }

        destroy() {
          const gameObjects = this.getElements({ [this.id]: true })
          gameObjects.forEach(rect => rect.remove())

          this.intervals.forEach(clearInterval)
          this.intervals = []

          Object.keys(this.events).forEach(event => document.removeEventListener(event, this.events[event]))
          this.events = {}
        }
      }

      class BallGame extends Game {
        ballVelocity = 5

        constructor(id, description) {
          super(id, description)
        }

        createBall() {
          const svgWidth = this.getParentWidth()

          const radius = pixelSize / 4
          const minimum = pixelSize * 4

          this.ball = new Ball(radius, random(minimum, svgWidth - minimum), random(minimum, svgWidth - minimum))
          while(getOverlappingPixel(this.ball)) {
            this.ball = new Ball(radius, random(minimum, svgWidth - minimum), random(minimum, svgWidth - minimum))
          }

          const ballComponent = this.ball.create()
          ballComponent.setAttribute(this.id, 'true')
          this.parentSvg.appendChild(ballComponent)
        }

        startBallMovement() {
          this.createBall()

          this.setInterval(() => {
            const nexPosition = this.ball.getNextPosition()

            const ballOnNewPosition = new Ball(this.ball.r, nexPosition.x, nexPosition.y)
            const overlappingPixel = getOverlappingPixel(ballOnNewPosition, true)
            if (overlappingPixel) {
              this.onBallColision(ballOnNewPosition, overlappingPixel)
            }

            this.ball.move()
          }, this.ballVelocity)
        }

        onBallColision(ballOnNewPosition, overlappedElement) {
          const overlappingAxis = ballOnNewPosition.overlaps(overlappedElement)
          this.ball.reroute(overlappingAxis)
        }
      }

      class FreeDrawingGame extends Game {
        constructor() {
          super('free-drawing', 'Click on the QRCode pixels to change their color.')
        }

        start() {
          this.addBorders([0, 1, 2, 3])

          const pixels = this.getRectElements({ 'pixel': true })
          pixels.forEach(pixel => pixel.addEventListener('click', this.elementEvent))
        }

        elementEvent(element) {
          const currentValue = element.target.getAttribute('fill')
          element.target.setAttribute('fill', currentValue === WHITE ? BLACK : WHITE)
        }

        destroy() {
          super.destroy()
          const pixels = this.getRectElements({ 'pixel': true })
          pixels.forEach(pixel => pixel.removeEventListener('click', this.elementEvent))
        }
      }

      class SnakeGame extends Game {
        snakePosition = []
        snakeDirection = 'right'

        constructor() {
          super('snake', 'Use ← ↑ → ↓ to move the snake and eat all pixels. No worries if you touch yourself.')
        }

        start() {
          this.addBorders([0, 1, 2, 3])
          this.startSnake()
        }

        startSnake() {
          const width = this.getParentWidth() / pixelSize
          const y = Math.floor(width / 2)
          this.snakePosition.push(...[[5, y], [4, y], [3, y]])

          this.snakePosition.forEach(([x, y]) => {
            const eatenPixel = this.getRectElement({ pixel: true, x: x * pixelSize, y: y * pixelSize, fill: BLACK })
            if (eatenPixel) {
              eatenPixel.setAttribute('fill', WHITE)
            }
          })

          this.addEventListener('keydown', this.movementEvent.bind(this))
          this.renderSnake()

          this.setInterval(() => {
            this.moveSnake()
          }, 500)
        }

        renderSnake() {
          const snakeRects = this.getRectElements({ 'snake-body': true })
          snakeRects.forEach(rect => rect.remove())
          this.snakePosition.forEach(([x, y]) => {
            this.insertRectElement({
              'x': x * pixelSize,
              'y': y * pixelSize,
              'width': pixelSize,
              'height': pixelSize,
              'fill': '#00FF00',
              'snake-body': 'true'
            })
          })
        }

        moveSnake() {
          const [x, y] = this.snakePosition[0]
          const nextPosition = [x, y]
          const movement = {
            'right': () => nextPosition[0]++,
            'left': () => nextPosition[0]--,
            'down': () => nextPosition[1]++,
            'up': () => nextPosition[1]--
          }
          movement[this.snakeDirection]()
          
          this.snakePosition.unshift(nextPosition)
          const eatenPixel = this.getRectElement({ pixel: true, x: nextPosition[0] * pixelSize, y: nextPosition[1] * pixelSize, fill: BLACK })
          if (eatenPixel) {
            eatenPixel.setAttribute('fill', WHITE)
          } else {
            this.snakePosition.pop()
          }

          this.renderSnake()
        }

        movementEvent(event) {
          const movements = {
            'ArrowRight': () => this.snakeDirection = 'right',
            'ArrowLeft': () => this.snakeDirection = 'left',
            'ArrowDown': () => this.snakeDirection = 'down',
            'ArrowUp': () => this.snakeDirection = 'up',
          }
          movements[event.key]?.()
        }
      }

      class BrickBreakerGame extends BallGame {
        velocity = 20

        constructor() {
          super('brick-breaker', 'Use ← → to block the ball to leave the QRCode and destroy all the pixels.')
        }

        start() {
          this.addBorders([0, 2, 3])
          this.startBallMovement()
          this.createMovementBar()
        }

        onBallColision(ballOnNewPosition, overlappedElement) {
          if (overlappedElement.getAttribute('pixel') === 'true') {
            removePixel(overlappedElement)
          }
          
          super.onBallColision(ballOnNewPosition, overlappedElement)
        }

        createMovementBar() {
          const qrCodeWidth = this.getParentWidth()
          this.movementBarBoundingRect = [
            qrCodeWidth / 2.5, // x
            qrCodeWidth - pixelSize, // y
            qrCodeWidth / 4, // width
            pixelSize // height
          ]

          const rect = this.insertRectElement({
            'x': this.movementBarBoundingRect[0],
            'y': this.movementBarBoundingRect[1],
            'width': this.movementBarBoundingRect[2],
            'height': this.movementBarBoundingRect[3],
            'fill': BLACK,
          })

          this.movementBar = rect
          this.addEventListener('keydown', this.keyDown.bind(this))
        }

        keyDown(event) {
          const qrCodeWidth = this.getParentWidth()

          if (event.key === 'ArrowRight' && this.movementBarBoundingRect[0] + this.movementBarBoundingRect[2] < qrCodeWidth - pixelSize) {
            this.movementBarBoundingRect[0] = this.movementBarBoundingRect[0] + this.velocity
            this.movementBar.setAttribute('x', this.movementBarBoundingRect[0])
          }
          if (event.key === 'ArrowLeft' && this.movementBarBoundingRect[0] > pixelSize) {
            this.movementBarBoundingRect[0] = this.movementBarBoundingRect[0] - this.velocity
            this.movementBar.setAttribute('x', this.movementBarBoundingRect[0])
          }
        }
      }

      class PongGame extends BallGame {
        velocity = 20

        constructor() {
          super('pong', 'Use W S (left) ↑ ↓ (right) and don\'t let the ball leave the QRCode.')
        }

        start() {
          this.addBorders([0, 1])

          const width = this.getParentWidth()

          this.createMovementBar('wasd', [
            0, // x
            width / 2.5, // y
            pixelSize, // width
            width / 4 // height
          ])
          this.createMovementBar('arrows', [
            width - pixelSize, // x
            width / 2.5, // y
            pixelSize, // width
            width / 4 // height
          ])

          this.startBallMovement()
        }

        createMovementBar(movementBarId, boundingRect) {
          const qrCodeWidth = this.getParentWidth()
          const boundingRectId = movementBarId + '-boundingRect'
          this[boundingRectId] = boundingRect

          const rect = this.insertRectElement({
            'x': this[boundingRectId][0],
            'y': this[boundingRectId][1],
            'width': this[boundingRectId][2],
            'height': this[boundingRectId][3],
            'fill': BLACK,
          })

          this[movementBarId] = rect
          this.addEventListener('keydown', this.keyDown.bind(this))
        }

        keyDown(event) {
          const qrCodeWidth = this.getParentWidth()

          if (event.key === 'ArrowDown' && this['arrows-boundingRect'][1] + this['arrows-boundingRect'][3] < qrCodeWidth - pixelSize) {
            this['arrows-boundingRect'][1] = this['arrows-boundingRect'][1] + this.velocity
            this['arrows'].setAttribute('y', this['arrows-boundingRect'][1])
          }
          if (event.key === 'ArrowUp' && this['arrows-boundingRect'][1] > pixelSize) {
            this['arrows-boundingRect'][1] = this['arrows-boundingRect'][1] - this.velocity
            this['arrows'].setAttribute('y', this['arrows-boundingRect'][1])
          }

          if (event.key === 's' && this['wasd-boundingRect'][1] + this['wasd-boundingRect'][3] < qrCodeWidth - pixelSize) {
            this['wasd-boundingRect'][1] = this['wasd-boundingRect'][1] + this.velocity
            this['wasd'].setAttribute('y', this['wasd-boundingRect'][1])
          }
          if (event.key === 'w' && this['wasd-boundingRect'][1] > pixelSize) {
            this['wasd-boundingRect'][1] = this['wasd-boundingRect'][1] - this.velocity
            this['wasd'].setAttribute('y', this['wasd-boundingRect'][1])
          }
        }
      }

      class MazeGame extends Game {
        constructor() {
          super('maze', 'Walk around the QRCode. No actual goal here.')
        }

        start() {
          this.addBorders([0, 1, 2, 3])
          this.boardX = 0
          this.boardY = -120
          this.renderBoard()
          this.startPlayer()
        }

        renderBoard() {
          this.parentSvg.style.transform = `perspective(300px) rotateX(50deg) translate(${this.boardX}px, ${this.boardY}px)`
        }

        startPlayer() {
          const width = this.getParentWidth() / pixelSize
          this.playerPosition = [Math.ceil(width / 2), width - 2]
          this.addEventListener('keydown', this.movementEvent.bind(this))
          this.renderPlayer()
        }

        renderPlayer() {
          const playerRect = this.getRectElements({ 'player-body': true })
          playerRect.forEach(rect => rect.remove())
          this.insertRectElement({
            'x': this.playerPosition[0] * pixelSize,
            'y': this.playerPosition[1] * pixelSize,
            'width': pixelSize,
            'height': pixelSize,
            'fill': '#FF0000',
            'player-body': 'true'
          })
        }

        movementEvent(event) {
          const [x, y] = this.playerPosition
          const movements = {
            'ArrowRight': () => {
              const hasPixel = this.getRectElement({ pixel: true, x: (x + 1) * pixelSize, y: y * pixelSize, fill: BLACK })
              if (!hasPixel && this.playerPosition[0] + 2 < this.getParentWidth() / pixelSize) {
                this.playerPosition[0]++;
                this.boardX -= pixelSize;
              }
            },
            'ArrowLeft': () => {
              const hasPixel = this.getRectElement({ pixel: true, x: (x - 1) * pixelSize, y: y * pixelSize, fill: BLACK })
              if (!hasPixel && this.playerPosition[0] > 1) {
                this.playerPosition[0]--;
                this.boardX += pixelSize;
              }
            },
            'ArrowDown': () => {
              const hasPixel = this.getRectElement({ pixel: true, x: x * pixelSize, y: (y + 1) * pixelSize, fill: BLACK })
              if (!hasPixel && this.playerPosition[1] + 2 < this.getParentWidth() / pixelSize) {
                this.playerPosition[1]++;
                this.boardY -= pixelSize;
              }
            },
            'ArrowUp': () => {
              const hasPixel = this.getRectElement({ pixel: true, x: x * pixelSize, y: (y - 1) * pixelSize, fill: BLACK })
              if (!hasPixel && this.playerPosition[1] > 1) {
                this.playerPosition[1]--;
                this.boardY += pixelSize;
              }
            }
          }
          movements[event.key]?.()
          this.renderPlayer()
          this.renderBoard()
        }

        destroy() {
          super.destroy()
          this.parentSvg.style.transform = ''
        }
      }

      class GravityGame extends Game {
        constructor() {
          super('gravity', 'Let the gravity happen on your QRCode.')
        }

        start() {
          this.addBorders([0, 1, 2, 3])
          this.startGravity()
        }

        startGravity() {
          const intervalId = this.setInterval(() => {
            let stillFalling = false
            const pixels = [...document.querySelectorAll('rect[pixel="true"]')]
            const highestY = Math.max(...pixels.map(pixel => Number(pixel.getAttribute('y'))))
            const sortedPixels = pixels.sort((a, b) => Number(b.getAttribute('y') - Number(a.getAttribute('y'))))
            sortedPixels.forEach(pixel => {
              const currentY = Number(pixel.getAttribute('y'))
              const currentColor = pixel.getAttribute('fill')
              if (currentY !== highestY && currentColor === BLACK) {
                const nextY = currentY + pixelSize
                const pixelBelow = document.querySelector(`rect[y="${nextY}"][x="${pixel.getAttribute('x')}"]`)
                if (pixelBelow) {
                  if (pixelBelow.getAttribute('fill') === WHITE) {
                    pixelBelow.setAttribute('fill', BLACK)
                    pixel.setAttribute('fill', WHITE)
                    stillFalling = true
                  }
                }
              }
            })
            if (!stillFalling) {
              this.clearInterval(intervalId)
            }
          }, 300)
        }
      }

      class GameOfLife extends Game {
        constructor() {
          super('game-of-life', 'Whatch the game of life.')
        }

        start() {
          this.addBorders([0, 1, 2, 3])
          this.startGameOfLife()
        }

        startGameOfLife() {
          const intervalId = this.setInterval(() => {
            const pixels = [...document.querySelectorAll('rect[pixel="true"]')]
            const generation = pixels.reduce((curr, value, index) => {
              if (!curr.length) {
                curr.push([value])
                return curr
              }
              const lastRow = curr[curr.length - 1]
              const lastItem = lastRow[lastRow.length - 1]
              if (value.getAttribute('x') !== lastItem.getAttribute('x')) {
                curr.push([value])
                return curr
              }
              lastRow.push(value)
              return curr
            }, []).map(row => {
              return row.map(value => value.getAttribute('fill') === BLACK ? 1 : 0)
            })

            const nextGeneration = this.runGeneration(generation)

            nextGeneration.map((row, x) => {
              row.map((cell, y) => {
                const pixelX = (x+1) * pixelSize + (pixelSize * 2)
                const pixelY = (y+1) * pixelSize + (pixelSize * 2)
                const pixel = document.querySelector(`rect[pixel="true"][y="${pixelY}"][x="${pixelX}"]`)
                pixel.setAttribute('fill', cell === 1 ? BLACK : WHITE)
              })
            })
          }, 500)
        }

        runGeneration(oldGen) {
          const newGen = [];

          for (let row = 0; row < oldGen.length; row++) {
            newGen[row] = [];
            for (let column = 0; column < oldGen[row].length; column++) {
              const neighboursCount = this.countAliveNeighbours(oldGen, row, column);

              if (this.shouldSurvive(oldGen[row][column], neighboursCount)) {
                newGen[row][column] = 1;
              } else if (this.shouldBecomeAlive(oldGen[row][column], neighboursCount)) {
                newGen[row][column] = 1;
              } else {
                newGen[row][column] = 0;
              }
            }
          }

          return newGen;
        }

        shouldSurvive(cellState, neighbourCount) {
          return (
            this.isCellAlive(cellState) &&
            (neighbourCount === 2 || neighbourCount === 3)
          );
        }

        shouldBecomeAlive(cellState, neighbourCount) {
          return !this.isCellAlive(cellState) && neighbourCount === 3;
        }

        isCellUnderpopulated(cellState, neighbourCount) {
          return this.isCellAlive(cellState) && neighbourCount < 2;
        }

        isCellAlive(cellState) {
          return !!cellState;
        }

        countAliveNeighbours(matrix, row, column) {
          let count = 0; // alive cells
          for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
            for (let columnOffset = -1; columnOffset < 2; columnOffset++) {
              if (row + rowOffset < 0 || row + rowOffset === matrix.length) {
                continue;
              }
              if (
                column + columnOffset < 0 ||
                column + columnOffset === matrix[row].length
              ) {
                continue;
              }
              count += matrix[row + rowOffset][column + columnOffset];
            }
          }
          count -= matrix[row][column];
          return count;
        }
      }

      class Ball {
        vX = 0.9 // velocity on X axis
        vY = 0.9 // velocity on Y axis

        constructor(r, x, y) {
          this.r = r
          this.x = x
          this.y = y
        }

        create() {
          const { r, x, y } = this
          const ball = createCircleElement({ 'id': 'ball', 'r': r, 'cx': x, 'cy': y, 'fill': 'green' })
          this.svgComponent = ball

          return ball
        }

        destroy() {
          this.svgComponent.remove()
        }

        getNextPosition() {
          return {
            x: this.x + this.vX,
            y: this.y + this.vY
          }
        }

        reroute(axis) {          
          if (axis === 'x') {
            this.vX *= -1
          } else {
            this.vY *= -1
          }
        }

        move() {
          this.x = this.x + this.vX
          this.y = this.y + this.vY

          this.update()
        }

        update() {
          const newElement = this.svgComponent.cloneNode()
          this.svgComponent.parentElement.appendChild(newElement)
          this.svgComponent.remove()

          this.svgComponent = newElement
          this.svgComponent.setAttribute('cx', this.x)
          this.svgComponent.setAttribute('cy', this.y)
        }

        overlaps(rect) {
          const rectX = Number(rect.getAttribute('x'))
          const rectY = Number(rect.getAttribute('y'))
          const rectWidth = Number(rect.getAttribute('width'))
          const rectHeight = Number(rect.getAttribute('height'))

          const distX = Math.abs(this.x - rectX - rectWidth / 2)
          const distY = Math.abs(this.y - rectY - rectHeight / 2)

          if (distX > (rectWidth / 2 + this.r)) return ''
          if (distY > (rectHeight / 2 + this.r)) return ''

          if (distX <= (rectWidth / 2)) return 'y'
          if (distY <= (rectHeight / 2)) return 'x'

          const dx = distX - rectWidth / 2
          const dy = distY - rectHeight / 2

          if (dx * dx + dy * dy <= (this.r * this.r)) {
            return (dx < dy) ? 'y' : 'x'
          } else {
            return ''
          }
        }
      }
    </script>
  </head>
  <body>
    <div>
      <svg class="background">
        <rect id="background" width="100%" height="100%" fill="#222"></rect>
      </svg>
      <div id="page">

        <div class="header">
          <input type="text" id="text" class="input" placeholder="Your URL or text..." autofocus />
        </div>

        <br>
        <svg id="qrcode"></svg>
        <br>

        <div class="footer">
          <span id="description"></span>
          <fieldset id="mode-options" class="mode-options">
            <label class="mode"><input type="radio" name="mode" id="mode-1" value="1" checked /> 1 - Free drawing</label>
            <label class="mode"><input type="radio" name="mode" id="mode-2" value="2" /> 2 - Snake</label>
            <label class="mode"><input type="radio" name="mode" id="mode-3" value="3" /> 3 - Brick breaker</label>
            <label class="mode"><input type="radio" name="mode" id="mode-4" value="4" /> 4 - Pong</label>
            <label class="mode"><input type="radio" name="mode" id="mode-5" value="5" /> 5 - Maze</label>
            <label class="mode"><input type="radio" name="mode" id="mode-6" value="6" /> 6 - Gravity</label>
            <label class="mode"><input type="radio" name="mode" id="mode-7" value="7" /> 7 - Game of life</label>
          </fieldset>
        </div>

        <button class="theme-picker" aria-hidden="true" style="border: none; cursor: pointer" onclick="changeTheme()">
          <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" id="sun">
             <g>
              <rect height="3" width="15" y="6" x="21" fill="#222"/>
              <rect height="3" width="9" y="3" x="24" fill="#222"/>
              <rect height="3" width="3" y="0" x="27" fill="#222"/>
             </g>
             <g>
              <rect height="15" width="33" y="21" x="12" fill="#222"/>
              <rect height="33" width="15" y="12" x="21" fill="#222"/>
              <rect height="27" width="21" y="15" x="18" fill="#222"/>
              <rect height="21" width="27" y="18" x="15" fill="#222"/>
             </g>
             <g transform="rotate(180 28.5 52.5)">
              <rect height="3" width="15" y="54" x="21" fill="#222"/>
              <rect height="3" width="9" y="51" x="24" fill="#222"/>
              <rect height="3" width="3" y="48" x="27" fill="#222"/>
             </g>
             <g transform="rotate(90 52.5 28.5)">
              <rect height="3" width="15" y="30" x="45" fill="#222"/>
              <rect height="3" width="9" y="27" x="48" fill="#222"/>
              <rect height="3" width="3" y="24" x="51" fill="#222"/>
             </g>
             <g transform="rotate(-90 4.5 28.5)">
              <rect height="3" width="15" y="30" x="-3" fill="#222"/>
              <rect height="3" width="9" y="27" x="0" fill="#222"/>
              <rect height="3" width="3" y="24" x="3" fill="#222"/>
             </g>
             <g>
              <rect height="9" width="3" y="9" x="6" fill="#222"/>
              <rect height="6" width="3" y="9" x="9" fill="#222"/>
              <rect height="3" width="3" y="9" x="12" fill="#222"/>
             </g>
             <g transform="rotate(90 46.5 13.5)">
              <rect height="9" width="3" y="9" x="42" fill="#222"/>
              <rect height="6" width="3" y="9" x="45" fill="#222"/>
              <rect height="3" width="3" y="9" x="48" fill="#222"/>
             </g>
             <g transform="rotate(180 46.5 43.5)">
              <rect height="9" width="3" y="39" x="42" fill="#222"/>
              <rect height="6" width="3" y="39" x="45" fill="#222"/>
              <rect height="3" width="3" y="39" x="48" fill="#222"/>
             </g>
             <g transform="rotate(-89.9536 10.5 43.5)">
              <rect height="9" width="3" y="39" x="6" fill="#222"/>
              <rect height="6" width="3" y="39" x="9" fill="#222"/>
              <rect height="3" width="3" y="39" x="12" fill="#222"/>
             </g>
           </svg>

          <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" id="moon" class="hidden">
            <rect height="18" width="18" y="18" x="6" fill="#222"/>
            <rect height="6" width="21" y="12" x="9" fill="#222"/>
            <rect height="3" width="3" y="18" x="24" fill="#222"/>
            <rect height="9" width="6" y="8.70589" x="42" fill="#222"/>
            <rect height="6" width="6" y="14.70589" x="45" fill="#222"/>
            <rect height="9" width="30" y="6" x="15" fill="#222"/>
            <rect height="3" width="18" y="3" x="21" fill="#222"/>
            <rect height="3" width="3" y="9" x="12" fill="#222"/>
            <rect height="6" width="21" y="36" x="9" fill="#222"/>
            <rect height="3" width="3" y="33" x="24" fill="#222"/>
            <rect height="6" width="30" y="42" x="15" fill="#222"/>
            <rect height="3" width="3" y="42" x="12" fill="#222"/>
            <rect height="6" width="18" y="39" x="30" fill="#222"/>
            <rect height="3" width="9" y="36" x="42" fill="#222"/>
            <rect height="3" width="3" y="33" x="48" fill="#222"/>
            <rect height="3" width="19" y="48" x="21" fill="#222"/>
        </svg>
        </button>
      </div>
    </div>
    <script >
      let pixelSize = 15
      const WHITE = '#eee'
      const BLACK = '#222'
      let currentModeKey = 0
      let currentMode = null
      let ball;

      const GAME_MODES = {
        1: FreeDrawingGame,
        2: SnakeGame,
        3: BrickBreakerGame,
        4: PongGame,
        5: MazeGame,
        6: GravityGame,
        7: GameOfLife
      }

      function restartMode(mode) {
        currentMode?.destroy()
        currentModeKey = mode
        if (GAME_MODES[mode]) {
          currentMode = new GAME_MODES[mode]()
          currentMode.initialize()
        }
      }

      function onModeChange(mode) {
        Object.keys(GAME_MODES).forEach(gameMode => {
          if (gameMode === mode && currentModeKey !== mode) {
            restartMode(mode)
          }
        })
      }

      document.getElementById('text').addEventListener('input', onTextChange)
      document.getElementById('mode-options').addEventListener('change', (event) => onModeChange(event.target.value))
      document.addEventListener('keydown', (event) => {
        const input = document.querySelector(`#mode-${event.key}`)
        if (input) {
          input.checked = true
          onModeChange(event.key)
        }
      })

      function getQrCodeSvgWidth() {
        const greaterDimension = innerWidth// innerHeight > innerWidth ? innerHeight : innerWidth
        const percent = greaterDimension / 100 * 80
        if (percent <= 200) return 200
        if (percent >= 645) return 450
        return Math.ceil(percent)
      }

      function changeTheme() {
        const background = document.querySelector('.background')
        const { width, height } = background.getBoundingClientRect()

        const columnCount = Math.ceil(width / pixelSize)
        const rowCount = Math.ceil(height / pixelSize)
        const pixelCount = columnCount * rowCount

        document.getElementById('sun').classList.toggle('hidden')
        document.getElementById('moon').classList.toggle('hidden')
        
        const currentColor = document.querySelector('#background').getAttribute('fill')
        const nextColor = currentColor === WHITE ? BLACK : WHITE

        const pixelsToUpdate = new Array(pixelCount)
          .fill(0)
          .map((_i, index) => index)
          .sort((a, b) => .5 - Math.random())


        const intervalId = setInterval(() => {
          if (pixelsToUpdate.length === 0) {
            clearInterval(intervalId)
            const background = document.getElementById('background')
            const currentColor = background.getAttribute('fill')
            background.setAttribute('fill', nextColor)

            const pixelsToRemove = document.querySelectorAll('rect[remove="true"]')
            pixelsToRemove.forEach(pixel => pixel.remove())
            return
          }

          for (let j = 0; j < 200; j++) {
            const i = pixelsToUpdate.shift()
            if (i) {
              const rect = createRectElement({
                'x': Math.floor(i / rowCount) * pixelSize,
                'y': Math.floor(i % rowCount) * pixelSize,
                'width': pixelSize,
                'height': pixelSize,
                'fill': nextColor,
                'remove': 'true',
              })
              background.appendChild(rect)
            }
          }
        }, 1)
      }

      function onTextChange(defaultValue) {
        const input = document.getElementById('text')
        const length = input.value.length
        input.style.width = length ? ((length + 2) * 14) + 'px' : '250px'
        const text = input.value || defaultValue
        updateQRCode(text)
        restartMode(currentModeKey)

        if ('ontouchstart' in document.documentElement) {
          document.querySelector('.footer').style.display = 'none'
          document.querySelector('.header').style.display = 'none'
          const qrCode = [[1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1],[1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],[1,0,1,1,1,0,1,0,0,1,1,1,0,0,0,1,1,0,1,0,1,1,1,0,1],[1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,0,1,1,0,1,1,1,0,1],[1,0,1,1,1,0,1,0,1,1,1,1,1,0,0,1,1,0,1,0,1,1,1,0,1],[1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,1,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0],[0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,1,0],[0,1,1,1,1,1,0,0,1,1,0,1,1,0,0,0,0,1,0,0,0,0,0,1,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0],[0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0],[0,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0],[1,1,1,1,1,1,1,0,0,1,1,1,0,0,0,0,1,0,1,0,1,0,0,0,0],[1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0],[1,0,1,1,1,0,1,0,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0],[1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,1,1,1,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
          qrCode.map((row, x) => {
            row.map((cell, y) => {
              const pixelX = (x+1) * pixelSize + (pixelSize * 2)
              const pixelY = (y+1) * pixelSize + (pixelSize * 2)
              const pixel = document.querySelector(`rect[pixel="true"][y="${pixelY}"][x="${pixelX}"]`)
              pixel.setAttribute('fill', cell === 1 ? BLACK : WHITE)
            })
          })
          return
        }
      }

      function updateQRCode(text) {
        const code = QRCode.create(text)
        if (code) {
          const keys = Object.keys(code.modules.data)
          const qrCodeWidth = Math.sqrt(keys.length)

          pixelSize = Math.round(getQrCodeSvgWidth() / qrCodeWidth)

          const svg = document.getElementById('qrcode')

          const pixelsToRemove = document.querySelectorAll('#qrcode > rect[pixel="true"]')
          pixelsToRemove.forEach(pixel => pixel.remove())

          const svgWidth = qrCodeWidth * pixelSize + pixelSize * 6

          svg.setAttribute('width', svgWidth)
          svg.setAttribute('height', svgWidth)

          for (let i = 0; i < keys.length; i++) {
            const pixel = code.modules.data[keys[i]]
            const isReservedPixel = code.modules.reservedBit[keys[i]]
            const rect = createRectElement({
              'x': Math.floor(i / qrCodeWidth) * pixelSize + pixelSize * 3,
              'y': Math.floor(i % qrCodeWidth) * pixelSize + pixelSize * 3,
              'width': pixelSize,
              'height': pixelSize,
              'fill': pixel === 1 ? BLACK : WHITE,
              'pixel': 'true',
              'qrcode': 'true',
              'reserved': isReservedPixel === 1 ? 'true' : 'false'
            })
            svg.appendChild(rect)
          }
        }
      }

      function removePixel(rect) {
        rect.setAttribute('fill', '#aaa')
        setTimeout(() => {
          rect.setAttribute('fill', WHITE)
        }, 90)
      }

      function getOverlappingPixel(ball) {
        const rects = document.querySelectorAll('rect[qrcode="true"]')
        const pixels = [...rects]

        let overlaps = false

        for (let pixel of pixels) {
          const pixelColor = pixel.getAttribute('fill')

          if (pixelColor === BLACK) {
            const overlappingAxis = ball.overlaps(pixel)
            if (overlappingAxis) return pixel
          }
        }

        return undefined
      }

      onTextChange('https://cgreinhold.dev')
      onModeChange('1')
      window.addEventListener('resize', onTextChange)
    </script>
  </body>
</html>
{%endraw%}
