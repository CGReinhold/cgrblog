---
title: Áudio reverso
date: "2020-05-02T22:00:00.169Z"
---

Este é apenas um experimento para tentar executar áudios de trás para frente usando somente código javascript (que pode ou não funcionar, depende da sua sorte).

{% raw %}
<style>
  .row {
    display:flex;
    flex-direction:row;
    margin-bottom: 5px;
  }
  .button {
    margin-right: 5px;
  }
</style>
<div class="main">
    <div class="row">
      <button class="button" onclick="startRecord()">Gravar</button>
      <button class="button" onclick="stopRecord()">Parar</button>
    </div>
    <div class="row">
      <button class="button" onclick="playAudio()">Executar</button>
      <button class="button" onclick="playReverseAudio()">Executar invertido</button>
    </div>
    <div id="legenda">
    </div>
    <div>
      Meu texto: <input id="texto" class="button" type="text" onInput="textChange()" />
    </div>
    <div>
      Meu texto ao contrário: <span id="texto-contrario"></span>
    </div>
  </div>
  <script>
    navigator.mediaDevices.getUserMedia({audio:true})
    .then(handlerFunction)

    function textChange() {
      const text = document.getElementById("texto").value;
      const textoContrario = document.getElementById("texto-contrario");
      textoContrario.innerText = text.split('').reverse().join('');
    }

    function setDescription(value) {
      document.getElementById("legenda").innerText = value;
    }

    function handlerFunction(stream) {
      rec = new MediaRecorder(stream);
      rec.ondataavailable = e => {
        audioChunks.push(e.data);
      }
    }
      
    function startRecord() {
      setDescription("Gravando...");
      audioChunks = [];
      rec.start();
    }

    function stopRecord() {
      if (rec.state === "recording") {
        setDescription("Áudio gravado!");
        rec.stop();
      }
    }

    function playAudio() {
      stopRecord();
      setTimeout(() => {
        const blob = getBlob();
        convertBlobToArrayBuffer(blob, (arrayBuffer) => {
          play(arrayBuffer);
        });
      }, 200)
    }

    function playReverseAudio() {
      stopRecord();
      setTimeout(() => {
        const blob = getBlob();
        convertBlobToArrayBuffer(blob, (arrayBuffer) => {
          playReverse(arrayBuffer);
        });
      }, 200);
    }

    function getBlob() {
      if (rec.state === "inactive"){
        return new Blob(audioChunks, { type: 'audio/mpeg-3' });
      }

      return null;
    }

    function convertBlobToArrayBuffer(blob, callback) {
      if (blob) {
        fetch(URL.createObjectURL(blob)).then(function(resp) {return resp.arrayBuffer()}).then((buffer) => {
          callback(buffer);
        });
      }
    }

    function play(buffer) {
      var actx = new (window.AudioContext || window.webkitAudioContext);
      actx.decodeAudioData(buffer, function(buffer) {
          var src = actx.createBufferSource();
          src.buffer = buffer;
          src.connect(actx.destination);
          if (!src.start) src.start = src.noteOn;
          src.start(0);
        },
        function() {alert("Could not decode audio!")}
      )
    }

    function playReverse(buffer) {
      var actx = new (window.AudioContext || window.webkitAudioContext);
      actx.decodeAudioData(buffer, function(buffer) {
          var src = actx.createBufferSource(),
              channel, tmp, i, t = 0, len, len2;

          while(t < buffer.numberOfChannels) {
            channel = buffer.getChannelData(t++);
            len = channel.length - 1;
            len2 = len >>> 1;
            for(i = 0; i < len2; i++) {
                tmp = channel[len - i];
                channel[len - i] = channel[i];
                channel[i] = tmp;
            }
          }

          src.buffer = buffer;
          src.connect(actx.destination);
          if (!src.start) src.start = src.noteOn;
          src.start(0);
        },
        function() {alert("Could not decode audio!")}
      )
    }
  </script>
{% endraw %}