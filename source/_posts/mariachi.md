---
title: Mariachi
date: "2021-03-18T22:00:00.169Z"
---

{%raw%}
<style>
.content {
  align-items: center;
  justify-content: center;
}
.band {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 60vw;
  position: absolute;
  top: 35%;
}
.band img {
  flex: 1;
  margin: 25px 25px !important;
  height: 30vh !important;
  filter: grayscale(100%);
  cursor: pointer;
}
.band img:hover,
.band img[selected="true"] {
  filter: none;
}

</style>

<div class="band">
  <img id="guitar" src="/images/mariachi/guitar.svg" alt="Guitar Mariachi" selected="false" onclick="onGuitarClick()" onmouseenter="onGuitarHoverIn()" onmouseleave="onGuitarHoverOut()" />
  <img id="trumpet" src="/images/mariachi/trumpet.svg" alt="Trumpet Mariachi" selected="false" onclick="onTrumpetClick()" onmouseenter="onTrumpetHoverIn()" onmouseleave="onTrumpetHoverOut()" />
  <img id="violin" src="/images/mariachi/violin.svg" alt="Violin Mariachi" selected="false" onclick="onViolinClick()" onmouseenter="onViolinHoverIn()" onmouseleave="onViolinHoverOut()" />
  <img id="guitaron" src="/images/mariachi/guitaron.svg" alt="Guitaron Mariachi" selected="false" onclick="onGuitaronClick()" onmouseenter="onGuitaronHoverIn()" onmouseleave="onGuitaronHoverOut()" />
</div>

<script>
let guitarSelected = false, trumpetSelected = false, violinSelected = false, guitaronSelected = false;
let guitarHover = false, trumpetHover = false, violinHover = false, guitaronHover = false;
let guitarPlaying = false, trumpetPlaying = false, violinPlaying = false, guitaronPlaying = false;
let guitarAudio = null, trumpetAudio = null, violinAudio = null, guitaronAudio = null, vocalAudio = null;

function onGuitarClick() {
  guitarSelected = !guitarSelected;
  document.getElementById('guitar').setAttribute('selected', guitarSelected);
  if (guitarSelected) {
    playGuitar();
  } else {
    stopGuitar();
  }
};

function onTrumpetClick() {
  trumpetSelected = !trumpetSelected;
  document.getElementById('trumpet').setAttribute('selected', trumpetSelected);
  if (trumpetSelected) {
    playTrumpet();
  } else {
    stopTrumpet();
  }
};

function onViolinClick() {
  violinSelected = !violinSelected;
  document.getElementById('violin').setAttribute('selected', violinSelected);
  if (violinSelected) {
    playViolin();
  } else {
    stopViolin();
  }
};

function onGuitaronClick() {
  guitaronSelected = !guitaronSelected;
  document.getElementById('guitaron').setAttribute('selected', guitaronSelected);
  if (guitaronSelected) {
    playGuitaron();
  } else {
    stopGuitaron();
  }
};


function onGuitarHoverIn() {
  guitarHover = true;
  playGuitar();
};
function onGuitarHoverOut() {
  guitarHover = false;
  stopGuitar();
};

function onTrumpetHoverIn() {
  trumpetHover = true;
  playTrumpet();
};
function onTrumpetHoverOut() {
  trumpetHover = false;
  stopTrumpet();
};

function onViolinHoverIn() {
  violinHover = true;
  playViolin();
};
function onViolinHoverOut() {
  violinHover = false;
  stopViolin();
};

function onGuitaronHoverIn() {
  guitaronHover = true;
  playGuitaron();
};
function onGuitaronHoverOut() {
  guitaronHover = false;
  stopGuitaron();
};


function playGuitar() {
  if (!guitarPlaying) {
    guitarPlaying = true;
    randomVocalPlay();
    const sound = randomNumber(11);
    guitarAudio = new Audio(`/sounds/mariachi/Guitar/${sound}.wav`);
    guitarAudio.play();
    guitarAudio.addEventListener('ended', () => {
      guitarPlaying = false;
      playGuitar();
    });
  }
}
function stopGuitar() {
  if (guitarPlaying && !guitarSelected && !guitarHover) {
    guitarPlaying = false;
    guitarAudio.pause();
  }
}

function playTrumpet() {
  if (!trumpetPlaying) {
    trumpetPlaying = true;
    randomVocalPlay();
    const sound = randomNumber(28);
    trumpetAudio = new Audio(`/sounds/mariachi/Trumpet/${sound}.wav`);
    trumpetAudio.play();
    trumpetAudio.addEventListener('ended', () => {
      trumpetPlaying = false;
      playTrumpet();
    });
  }
}
function stopTrumpet() {
  if (trumpetPlaying && !trumpetSelected && !trumpetHover) {
    trumpetPlaying = false;
    trumpetAudio.pause()
  }
}

function playViolin() {
  if (!violinPlaying) {
    violinPlaying = true;
    randomVocalPlay();
    const sound = randomNumber(42);
    violinAudio = new Audio(`/sounds/mariachi/Violins/${sound}.wav`);
    violinAudio.play();
    violinAudio.addEventListener('ended', () => {
      violinPlaying = false;
      playViolin();
    });
  }
}
function stopViolin() {
  if (violinPlaying && !violinSelected && !violinHover) {
    violinPlaying = false;
    violinAudio.pause()
  }
}

function playGuitaron() {
  if (!guitaronPlaying) {
    randomVocalPlay();
    guitaronPlaying = true;
    const sound = randomNumber(11);
    guitaronAudio = new Audio(`/sounds/mariachi/Guitarron/${sound}.wav`);
    guitaronAudio.play();
    guitaronAudio.addEventListener('ended', () => {
      guitaronPlaying = false;
      playGuitaron();
    });
  }
}
function stopGuitaron() {
  if (guitaronPlaying && !guitaronSelected && !guitaronHover) {
    guitaronPlaying = false;
    guitaronAudio.pause()
  }
}

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function randomVocalPlay() {
  const shouldPlay = Math.random() < 0.15;
  if (shouldPlay && !vocalAudio) {
    const sound = randomNumber(5);
    vocalAudio = new Audio(`/sounds/mariachi/Vocals/${sound}.wav`);
    vocalAudio.play();
    vocalAudio.addEventListener('ended', () => {
      vocalAudio = null;
    });
  }
}
</script>

{%endraw%}