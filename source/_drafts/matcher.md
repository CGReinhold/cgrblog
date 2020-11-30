---
title: Match
date: "2020-12-22T22:00:00.169Z"
---

Ideia de app estilo tinder para escolher filmes do netflix/restaurantes


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
          <span class="title">Movie Matchr</span>
        </div>
      </div>
      <div class="body">
        <div class="chat">
          <div id="chat-container" class="chat-container"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
</script>
{% endraw %}
