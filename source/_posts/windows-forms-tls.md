---
title: Habilitando TLS 1.2 em aplicações Windows Forms
date: "2019-06-05T22:00:00.169Z"
---

O TLS (Transport Layer Security) é uma camada de segurança com protocolos de criptografia criado para trazer mais segurança entre conexões de rede.
A versão 1.3 do TLS já está aí, mas sua adoção ainda não está tão disseminado como suas versões anteriores, desta forma o TLS 1.2 ainda possui uma grande relevância.
Sendo um padrão dos dias de hoje, o TLS 1.2 deveria ser simples de ser habilitado em Windows Forms que utilizam conexão com a internet, mas esse nem sempre é o caso e você pode acabar encontrando problemas não tão fáceis de resolver.

## Habilitando TLS 1.2 em aplicações Windows Forms

A partir do .NET 4.6, o TLS 1.2 já é habilitado por padrão, logo não é necessário realizar nenhuma alteração no seu código.

O .NET 4.5 também possui suporte para essa versão do TLS, mas é necessários fazer algumas mudanças no seu código para habilitá-lo. A seguinte linha de código deve servir:

```cs
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11;
```

Com este código você consegue habilitar tanto o TLS 1.2 quanto o TLS 1.1 em sua aplicação.

## Sobre o .NET 4.0

Versões anteriores do .NET não possuem suporte para a versão 1.2 do TLS, então é necessário fazer alguns truques para que funcione. O que fazemos é utilizar o valor do enum ao invés da propriedade em si:

```cs
ServicePointManager.SecurityProtocol = (SecurityProtocolType)768 | (SecurityProtocolType)3072;
```

Desta forma, tanto o TLS 1.2 quanto o TLS 1.1 ficarão habilitados. É importante ressaltar que mesmo você compilando a aplicação com o .NET 4.0, você ainda precisará ter o .NET 4.5 instalado na máquina final para que seja possível utilizar essa versão do protocolo.

## Outras alternativas

Uma outra alternativa para habilitar o TLS 1.2 é alterar algumas chaves de registro do sistema para habilitar a versão de protocolo como padrão. Este workaround pode ser feito utilizando as seguintes chaves do regedit:

Chaves para habilitar [criptografia forte](https://docs.microsoft.com/en-us/officeonlineserver/enable-tls-1-1-and-tls-1-2-support-in-office-online-server#enable-strong-cryptography-in-net-framework-45-or-higher):
```
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\.NETFramework\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001

[HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\.NETFramework\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001
```

Chaves para habilitar o [TLS 1.2](https://docs.microsoft.com/en-us/windows-server/security/tls/tls-registry-settings#tls-12)
```
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Client]
"DisabledByDefault"=dword:00000000
"Enabled"=dword:00000001

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Server]
"DisabledByDefault"=dword:00000000
"Enabled"=dword:00000001
```

Note que mesmo desta forma, o .NET 4.5 ou superior é obrigatório estar instalado na máquina para que possa ser feito o uso do TLS 1.2.

## Conclusão

Por mais que existam alternativas, para que possa ser feito uso do TLS 1.2 é mandatório que o cliente final possua o .NET 4.5 ou superior instalado em sua máquina. Desta forma o ideal em todos os casos é manter sua aplicação Windows Forms compilada com a versão mais recente possível do .NET.