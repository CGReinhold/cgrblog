---
title: Morse
date: "2020-10-20T22:00:00.169Z"
---

A implementação abaixo é uma proposta de aplicativo para comunicação utilizando código morse. A mensagem que é enviada por um usuário é apresentada ao outro como código morse.

Ao passar o mouse em cima da mensagem é possível verificar o texto original dela. A mensagem também tem dois botões, o de luz e o de vibração. Pressionando estes botões o dispositivo irá reproduzir a mensagem pela lanterna ou vibrando o celular.

{% raw %}
<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.phone {
  border: 3px solid darkgray;
  border-radius: 5vh;
  height: 80vh;
  width: 45vh;
  padding: 1.2rem;
  display: flex;
  background: radial-gradient(#000, #222);
  position: relative;
}
.real-button {
  border-radius: 1rem;
  background-color: darkgray;
  height: 3rem;
  width: .4rem;
  position: absolute;
}
.power {
  right: -.4rem;
  top: 6rem;
}
.volume-up {
  height: 3.5rem;
  left: -.4rem;
  top: 6rem;
}
.volume-down {
  height: 3.5rem;
  left: -.4rem;
  top: 10rem;
}
.camera-container {
  position: absolute;
  width: 23vh;
  left: 10.5vh;
  background-color: black;
  height: 3vh;
  background: radial-gradient(#000, #222);
  border-radius: 0 0 1rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.speaker {
  width: 13vh;
  height: 1.5vh;
  border: 2px solid #444;
  border-radius: 1rem;
  background-image: linear-gradient(90deg, rgba(68, 68, 68, .5) 50%, transparent 0),
  linear-gradient(rgba(68, 68, 68, .5) 50%, transparent 0);
  background-size: .3rem .3rem;
}
.camera {
  width: 1.5vh;
  height: 1.5vh;
  border: 1px solid #444;
  background: radial-gradient(#222, #444);
  border-radius: 1rem;
  position: absolute;
  right: 2vh;
}
.screen {
  border: 1px solid black;
  border-radius: 4vh;
  flex: 1;
  background-color: white;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
.header {
  height: 4.5rem;
  width: 100%;
  background-color: #2bbc8a;
  box-shadow: 0px 0px 5px gray;
  color: white;
  font-family: Helvetica;
  display: flex;
  flex-direction: column;
}
.header-info {
  padding: .4vh 3.5vh;
  font-size: 1.3vh;
  display: flex;
  justify-content: space-between;
}
.header-info svg {
  height: 2.2vh;
  padding-right: 0.7vh;
}
.title-container {
  flex: 1;
  display: flex;
  align-items: center;
}
.title {
  padding: 0 1rem;
  font-weight: bold;
  font-size: 1.2em;
}
.body {
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  justify-content: flex-end;
}
.chat {
  flex: 1;
  overflow-y: auto;
}
.chat-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.chat-message-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
}
.chat-message {
  margin: 0.3rem 1rem;
  padding: 1rem;
  border-radius: 2rem;
  max-width: 27vh;
  background-color: #2bbc8a;
  color: white;
  align-self: flex-start;
  position: relative;
}
.chat-message-button-container {
  display: flex;
  flex-direction: row;
  position: relative;
  top: -1.3rem;
  margin-left: 1rem;
}
.container-self {
  justify-content: flex-end;
  margin-right: 1rem;
}
.message-button {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 1rem;
  border: none;
  background-color: #008858;
  color: white;
  margin: 0 0.1rem;
  padding: 0;
  cursor: pointer;
}
.button-self {
  background-color: gray;
  color: black;
}
.message-button svg {
  height: 1.5rem;
  padding-top: 0.3rem;
}
.self {
  align-self: flex-end;
  background-color: lightgray;
  color: black;
}
.chat-input {
  width: 100%;
  margin-top: 0.6rem;
  height: 5rem;
  box-shadow: 0px 4px 10px gray;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.chat-input input {
  flex: 1;
  outline: none;
  padding: .5rem;
  border-radius: 2rem;
  border: 1px solid lightgray;
  height: 3rem;
  margin-right: .4rem;
}
.chat-input button {
  border: none;
  outline: none;
  height: 3rem;
  width: 3rem;
  background-color: #2bbc8a;
  border-radius: 3rem;
  color: white;
  box-shadow: 2px 2px 5px lightgray;
}
.light {
  box-shadow: 0 0 45px 100px rgb(255,255,255);
  background: white;
  border: none;
}
.vibration {
  animation: shake 0.3s;
  animation-iteration-count: infinite;
}
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
<div class="container">
  <div id="phone" class="phone">
    <div class="power real-button"></div>
    <div class="volume-up real-button"></div>
    <div class="volume-down real-button"></div>
    <div class="camera-container">
      <div class="speaker"></div>
      <div id="camera" class="camera"></div>
    </div>
    <div class="screen">
      <div class="header">
        <div class="header-info">
          <span>08:47</span>
          <div>
            <svg viewBox="0 0 512 512" fill="white"><path d="M496,208h-16v-16c0-8.837-7.163-16-16-16h-16v-16c0-17.673-14.327-32-32-32H32c-17.673,0-32,14.327-32,32v192 c0,17.673,14.327,32,32,32h384c17.673,0,32-14.327,32-32v-16h16c8.837,0,16-7.163,16-16v-16h16c8.837,0,16-7.163,16-16v-64 C512,215.163,504.837,208,496,208z M416,192v160H192V160h224V192z"/></svg>
          </div>
        </div>
        <div class="title-container">
          <span class="title">Morse chat</span>
        </div>
      </div>
      <div class="body">
        <div class="chat">
          <div id="chat-container" class="chat-container"></div>
        </div>
        <div class="chat-input">
          <input type="text" id="message" onkeyup="keyUp()" />
          <button onclick="sendMessage()">
            <svg viewBox="0 0 24 24" fill="white" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
const messageList = [];
let morseInterval = null;
function sendMessage() {
  const messageInput = document.getElementById("message");
  if (messageInput && messageInput.value) {
    messageList.push({ message: messageInput.value, isAutomatic: false });
    messageInput.value = "";
    renderMessages();
  }
}
function renderMessages() {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.innerHTML = "";
  for (const message of messageList) {
    const morseMessage = getMorseTranslated(message.message);
    const messageContainer = document.createElement("div");
    messageContainer.className = "chat-message-container";
    const spanElement = document.createElement("span");
    spanElement.className = "chat-message";
    if (!message.isAutomatic) {
      spanElement.className += " self";
    }
    spanElement.innerText = morseMessage;
    spanElement.addEventListener("mouseenter", () => messageMouseEnter(spanElement, message.message));
    spanElement.addEventListener("mouseleave", () => messageMouseLeave(spanElement, morseMessage));
    spanElement.addEventListener("touchstart", () => messageMouseEnter(spanElement, message.message));
    spanElement.addEventListener("touchend", () => messageMouseLeave(spanElement, morseMessage));
    messageContainer.appendChild(spanElement);
    const messageButtonContainer = document.createElement("div");
    messageButtonContainer.className = "chat-message-button-container";
    if (!message.isAutomatic) {
      messageButtonContainer.className += " container-self";
    }
    const buttonLight = document.createElement("button");
    buttonLight.className = "message-button";
    if (!message.isAutomatic) {
      buttonLight.className += " button-self";
    }
    buttonLight.innerHTML = "<svg viewBox=\"0 0 480.003 480.003\" fill=\"white\"><path d=\"M140.935,369.074c3.335,4.073,6.919,7.937,10.731,11.569h0.024c23.716,22.776,55.35,35.454,88.232,35.36 c2.088,0,4.192-0.048,6.296-0.152c67.558-4.017,120.628-59.38,121.784-127.048c0.328-38.926-17.176-75.862-47.512-100.256 c-5.491-4.65-8.607-11.518-8.488-18.712v-17.832c-0.042-10.134-6.445-19.15-16-22.528v-9.472c-0.021-5.923-2.245-11.627-6.24-16 c8.32-9.044,8.32-22.956,0-32c8.87-9.677,8.215-24.712-1.461-33.581c-2.566-2.352-5.618-4.112-8.939-5.155 c-3.652-21.716-24.216-36.36-45.932-32.708c-16.759,2.818-29.89,15.949-32.708,32.708c-12.534,3.899-19.535,17.22-15.636,29.755 c1.038,3.336,2.798,6.403,5.156,8.981c-8.32,9.044-8.32,22.956,0,32c-3.995,4.373-6.219,10.077-6.24,16v9.472 c-9.555,3.378-15.958,12.394-16,22.528v18.76c-0.142,7.161-3.497,13.879-9.136,18.296 C104.204,233.817,96.176,314.413,140.935,369.074z M240.001,16.003c10.168,0.012,19.229,6.418,22.632,16h-45.264 C220.772,22.421,229.833,16.015,240.001,16.003z M208.001,48.003h64c4.418,0,8,3.582,8,8s-3.582,8-8,8h-64c-4.418,0-8-3.582-8-8 S203.583,48.003,208.001,48.003z M208.001,80.003h64c4.418,0,8,3.582,8,8s-3.582,8-8,8h-64c-4.418,0-8-3.582-8-8 S203.583,80.003,208.001,80.003z M200.001,120.003c0-4.418,3.582-8,8-8h64c4.418,0,8,3.582,8,8v8h-80V120.003z M169.001,201.483 v-0.04c9.36-7.45,14.869-18.718,15-30.68v-18.76c0-4.418,3.582-8,8-8h96c4.418,0,8,3.582,8,8v17.832 c-0.17,12.028,5.127,23.483,14.4,31.144c26.553,21.332,41.88,53.645,41.6,87.704c-0.987,59.218-47.422,107.682-106.544,111.2 c-61.76,3.017-114.272-44.604-117.289-106.364C126.439,258.105,141.585,223.965,169.001,201.483z\"/><path d=\"M240.001,432.003c-4.418,0-8,3.582-8,8v32c0,4.418,3.582,8,8,8s8-3.582,8-8v-32 C248.001,435.584,244.42,432.003,240.001,432.003z\"/><path d=\"M168.01,412.712c-0.003-0.002-0.006-0.004-0.009-0.005c-3.827-2.207-8.72-0.894-10.927,2.934 c0,0.001-0.001,0.002-0.001,0.002l-16,27.704c-2.234,3.812-0.956,8.713,2.856,10.947c3.812,2.234,8.713,0.956,10.947-2.856 c0.018-0.03,0.035-0.061,0.053-0.092l16-27.704C173.142,419.818,171.835,414.924,168.01,412.712z\"/><path d=\"M104.455,357.021c-0.031,0.018-0.062,0.036-0.093,0.054l-27.704,16c-3.841,2.183-5.185,7.067-3.002,10.908 c2.183,3.841,7.067,5.185,10.908,3.002c0.031-0.018,0.062-0.036,0.093-0.054l27.704-16c3.841-2.183,5.185-7.067,3.002-10.908 C113.18,356.181,108.296,354.837,104.455,357.021z\"/><path d=\"M96.001,288.003c0-4.418-3.582-8-8-8h-32c-4.418,0-8,3.582-8,8s3.582,8,8,8h32 C92.42,296.003,96.001,292.421,96.001,288.003z\"/><path d=\"M76.566,202.878c0.03,0.018,0.061,0.035,0.092,0.053l27.704,16c3.812,2.234,8.713,0.956,10.947-2.856 c2.234-3.812,0.956-8.713-2.856-10.947c-0.03-0.018-0.061-0.035-0.092-0.053l-27.704-16c-3.812-2.234-8.713-0.956-10.947,2.856 C71.476,195.742,72.754,200.643,76.566,202.878z\"/><path d=\"M371.649,220.003c1.404,0,2.784-0.37,4-1.072l27.704-16c3.841-2.184,5.184-7.068,3-10.909s-7.068-5.184-10.909-3 c-0.031,0.017-0.061,0.035-0.092,0.053l-27.704,16c-3.826,2.209-5.137,7.102-2.928,10.928 C366.151,218.478,368.791,220.003,371.649,220.003z\"/><path d=\"M424.001,280.003h-32c-4.418,0-8,3.582-8,8s3.582,8,8,8h32c4.418,0,8-3.582,8-8S428.42,280.003,424.001,280.003z\"/><path d=\"M403.439,373.128c-0.031-0.018-0.062-0.036-0.093-0.054l-27.704-16c-3.811-2.235-8.713-0.957-10.948,2.854 c-2.235,3.811-0.957,8.713,2.854,10.948c0.031,0.018,0.062,0.036,0.093,0.054l27.704,16c3.811,2.235,8.713,0.957,10.948-2.854 C408.528,380.265,407.25,375.363,403.439,373.128z\"/><path d=\"M338.929,443.347l-16-27.704c-2.183-3.841-7.067-5.185-10.908-3.002c-3.841,2.183-5.185,7.067-3.002,10.908 c0.018,0.031,0.036,0.062,0.054,0.093l16,27.704c2.183,3.841,7.067,5.185,10.908,3.002c3.841-2.183,5.185-7.067,3.002-10.908 C338.965,443.409,338.947,443.378,338.929,443.347z\"/></svg>";
    buttonLight.addEventListener("click", () => lightMorse(morseMessage));
    messageButtonContainer.appendChild(buttonLight);
    const buttonVibration = document.createElement("button");
    buttonVibration.className = "message-button";
    if (!message.isAutomatic) {
      buttonVibration.className += " button-self";
    }
    buttonVibration.innerHTML = "<svg viewBox=\"0 0 24 24\" fill=\"white\"><path d=\"m15.483 2h-6.966c-1.113 0-2.017.925-2.017 2.063v11.812.563 1.5c0 1.139.903 2.062 2.017 2.062h6.967c1.114 0 2.017-.923 2.017-2.062v-1.5-.563-11.812c-.001-1.138-.905-2.063-2.018-2.063zm.55 15h-8.066v-12.562c0-.518.411-.938.916-.938h6.233c.506 0 .917.42.917.938z\"/></g><g><path d=\"m4.207 5.793-1.755-1.755 1.717-1.545c.41-.369.443-1.001.074-1.412-.37-.411-1.001-.444-1.412-.074l-2.5 2.25c-.204.183-.323.443-.331.717-.007.274.099.54.293.733l1.793 1.793-1.793 1.793c-.391.391-.391 1.023 0 1.414l1.793 1.793-1.793 1.793c-.391.391-.391 1.023 0 1.414l1.793 1.793-1.793 1.793c-.194.194-.3.459-.293.733.008.274.127.533.331.717l2.5 2.25c.191.173.431.257.669.257.273 0 .546-.112.743-.331.369-.411.336-1.043-.074-1.412l-1.717-1.545 1.755-1.755c.391-.391.391-1.023 0-1.414l-1.793-1.793 1.793-1.793c.391-.391.391-1.023 0-1.414l-1.793-1.793 1.793-1.793c.391-.391.391-1.023 0-1.414z\"/></g><g><path d=\"m24 3.974c-.008-.274-.127-.534-.331-.717l-2.5-2.25c-.41-.37-1.042-.335-1.412.074-.369.411-.336 1.043.074 1.412l1.717 1.545-1.755 1.755c-.391.391-.391 1.023 0 1.414l1.793 1.793-1.793 1.793c-.391.391-.391 1.023 0 1.414l1.793 1.793-1.793 1.793c-.391.391-.391 1.023 0 1.414l1.755 1.755-1.717 1.545c-.41.369-.443 1.001-.074 1.412.197.219.47.331.743.331.238 0 .478-.085.669-.257l2.5-2.25c.204-.183.323-.443.331-.717.007-.274-.099-.54-.293-.733l-1.793-1.793 1.793-1.793c.391-.391.391-1.023 0-1.414l-1.793-1.793 1.793-1.793c.391-.391.391-1.023 0-1.414l-1.793-1.793 1.793-1.793c.194-.194.3-.459.293-.733z\"/></svg>";
    buttonVibration.addEventListener("click", () => vibrationMorse(morseMessage));
    messageButtonContainer.appendChild(buttonVibration);
    chatContainer.appendChild(messageContainer);
    chatContainer.appendChild(messageButtonContainer);
  }
  chatContainer.parentElement.scrollTop = chatContainer.parentElement.scrollHeight;
}
function messageMouseEnter(element, message) {
  element.innerText = message;
}
function messageMouseLeave(element, morseMessage) {
  element.innerText = morseMessage;
}
function keyUp() {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }
}
const morseMap = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....', i: '..', j: '.---',
  k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-',
  u: '..-', v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..', 1: '.----', 2: '..---', 3: '...--',
  4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.', 0: '-----', '.': '.-.-.-',
  ',': '--..--', '?': '..--..', "'": '.----.', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
  ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
  '$': '...-..-', '!': '-.-.--', '@': '.--.-.'
};
function getMorseTranslated(text) {
  const morse = text.toLowerCase().split('').map(char => morseMap[char] || char).join('');
  return morse;
}
function lightMorse(morseMessage) {
  morseBlink(morseMessage);
}
function vibrationMorse(morseMessage) {
  morseVibrate(morseMessage)
}
function turnLightsOn() {
  const camera = document.getElementById("camera");
  camera.classList.add("light");
}
function turnLightsOff() {
  const camera = document.getElementById("camera");
  camera.classList.remove("light");
}
function shortBlink() {
  turnLightsOn();
  setTimeout(() => {
    turnLightsOff();
  }, 150);
}
function longBlink() {
  turnLightsOn();
  setTimeout(() => {
    turnLightsOff();
  }, 500);
}
function morseBlink(morseMessage) {
  runMorse(morseMessage, "blink");
}
function vibrationOn() {
  const phone = document.getElementById("phone");
  phone.classList.add("vibration");
}
function vibrationOff() {
  const phone = document.getElementById("phone");
  phone.classList.remove("vibration");
}
function shortVibration() {
  vibrationOn();
  setTimeout(() => {
    vibrationOff();
  }, 150);
}
function longVibration() {
  vibrationOn();
  setTimeout(() => {
    vibrationOff();
  }, 500);
}
function morseVibrate(morseMessage) {
  runMorse(morseMessage, "vibrate");
}
function runMorse(morseMessage, morseType) {
  const morseChars = morseMessage.split('');
  if (morseInterval) {
    clearInterval(morseInterval);
    morseInterval = null;
  }
  if (!morseInterval) {
    morseInterval = setInterval(() => {
      if (morseChars.length) {
        const char = morseChars.shift();
        if (char === ".") {
          if (morseType === "blink") {
            shortBlink();
          } else {
            shortVibration();
          }
        } else if (char === "-") {
          if (morseType === "blink") {
            longBlink();
          } else {
            longVibration();
          }
        }
      } else {
        clearInterval(morseInterval);
        morseInterval = null;
      }
    }, 650);
  }
}
const phrases = [
  "Bugs sao apenas oportunidades de melhoria",
  "Nao existe teste melhor que em producao",
  "Se compilou e porque funciona",
  "Na minha maquina funciona",
  "Declare variaveis e nao guerras",
];
function automaticMessages() {
  setTimeout(() => {
    const phrase = phrases.shift();
    messageList.push({ message: phrase, isAutomatic: true });
    renderMessages();
  }, 5000);
  const automaticInterval = setInterval(() => {
      if (phrases.length) {
        const phrase = phrases.shift();
        messageList.push({ message: phrase, isAutomatic: true });
        renderMessages();
      } else {
        clearInterval(automaticInterval);
      }
    }, 120000);
}
automaticMessages();
</script>
{% endraw %}
