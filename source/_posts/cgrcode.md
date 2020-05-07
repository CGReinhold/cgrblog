---
title: Alternativa ao QR Code
date: "2020-05-07T22:00:00.169Z"
---

O QR Code é uma tecnologia que permite converter uma mensagem em uma imagem escaneável, geralmente utilizada para facilitar o acesso de links através do celular. Com essa tecnologia, basta você apontar a câmera do seu celular para conseguir acessar o link codificado na imagem. 

Justamente por trazer essa facilidade, o QR Code se tornou bastante utilizado nos últimos anos, porém muitos ainda julgam que ele pode ser melhorado no quesito estético.

Durante minha graduação, decidi criar uma alternativa ao QR Code como trabalho de conclusão de curso, com objetivo de criar uma codificação mais focada no quesito estético, e que ainda assim pudesse ser escaneada por celulares.

A ideia central da proposta era criar uma codificação que pudesse ficar ao redor de uma imagem, mantendo a imagem central como foco e os elementos da codificação menos evidentes. Um exemplo desta codificação pode ser vista na imagem abaixo.

![Exemplo de CGRCode](/images/cgrcode/cgrcodeExample.png)

A criação deste tipo de codificação pode ser feita através [desta página](https://cgreinhold.github.io/) e permite diversos tipos de customização, como por exemplo alterar a imagem, cor, formato, rotação, além do texto codificado.

Como a proposta era a criação de uma imagem escaneável, o desenvolvimento de um aplicativo decodificador foi essencial e seus fontes podem ser encontrados [neste link aqui](https://github.com/CGReinhold/CRGCodeExample). O aplicativo foi desenvolvido apenas para Android utilizando as bibliotecas do OpenCV para realizar o processamento da imagem captada pela câmera a fim de encontrar uma codificação válida.

Este aplicativo, além de decodificar a mensagem do código, também realiza o redirecionamento para URLs codificadas, conforme no vídeo abaixo.

![Vídeo do CGRCode](/images/cgrcode/cgrcode.gif)

Caso você deseje saber um pouco mais sobre o funcionamento interno, tanto do app quanto da ideia por trás da criação do código, [um artigo sobre o desenvolvimento](https://github.com/CGReinhold/CRGCodeExample/blob/master/docs/Artigo-Cleyson_Reinhold.pdf) também está disponível no repositório mencionado acima.

Abaixo você pode ver mais alguns exemplos das diferentes formas que um código pode ser gerado.

![Fotos de CGRCode](/images/cgrcode/fotos.PNG)