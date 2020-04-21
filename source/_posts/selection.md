---
title: ::selection
date: "2020-04-21T04:00:00.169Z"
---

Você já utilizou o pseudo-elementos `::selection` do CSS? Embora não seja muito comum de vê-lo por aí, ele pode trazer algumas funcionalidades legais para o seu texto. 

## Para que serve?

O pseudo-elemento `::selection` é utilizado para alterar o estilo de algum texto quando ele está sendo selecionado, porém possum algumas limitações. Apenas alguns atributos CSS são permitidas, como por exemplo `color`, `background-color` ou `text-shadow`. As [documentações da Mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection) descrevem todas as propriedades permitidas para este pseudo-elemento.

Um exemplo de como utilizá-lo pode ser visto no código abaixo:

```css
::selection {
  background-color: red;
  color: blue;
}
```

{% raw %}
<style>
.selection1::selection {
  background-color: red;
  color: blue;
}
.selection2::selection {
  background-color: white;
  color: black;
}
.selection3::selection {
  background-color: white;
  color: white;
}
.selection4::selection {
  background-color: black;
  color: black;
}
.selection5::selection {
  text-shadow: 0.1px 0.1px #C50000, 0.2px 0.2px #C70000, 0.3px 0.3px #C90000, 0.4px 0.4px #CB0000, 0.5px 0.5px #CD0000, 0.6px 0.6px #CF0000, 0.7px 0.7px #D10000, 0.8px 0.8px #D30000, 0.9px 0.9px #D50000, 1px 1px #D70000, 1.1px 1.1px #D90000, 1.2px 1.2px #DB0000, 1.3px 1.3px #DD0000, 1.4px 1.4px #DF0000, 1.5px 1.5px #E10000, 1.6px 1.6px #E30000, 1.7px 1.7px #E50000, 1.8px 1.8px #E70000, 1.9px 1.9px #E90000, 2px 2px #EB0000, 2.1px 2.1px #ED0000, 2.2px 2.2px #EF0000, 2.3px 2.3px #F10000, 2.4px 2.4px #F30000, 2.5px 2.5px #F50000, 2.6px 2.6px #F70000, 2.7px 2.7px #F90000, 2.8px 2.8px #FB0000, 2.9px 2.9px #FD0000, 3px 3px #FF0000;
}
.description {
  margin-top: 0 !important;
  font-size: 11px;
}
</style>
<p><span class="selection1">Apesar de ser apenas o estilo da fonte que é possível alterar, ainda podemos fazer algumas coisas divertidas.</span><span class="selection2"> Você pode por exemplo fazer um texto que parece não ser selecionável, </span><span class="selection3">ou um texto que parece sumir após a seleção. </span><span class="selection4">É possível fazer um texto que fica todo preto ao selecioná-lo,</span><span class="selection5"> ou um texto ficar com uma sombra maneira.</span></p>
<p class="description">(Selecione o texto acima para entender um pouco melhor)</p>
{% endraw %}

## E o que mais?

Com um pouco mais de criatividade você pode fazer algo como no texto abaixo:

{% raw %}
<style>
canvas {
  display: none;
}
.selectable {
  font-family: monospace;
  width: 500px;
  font-size: 10px;
  line-height: 7px;
  margin: auto;
}
.char {
  display: inline;
  hyphens: none;
  -moz-hyphens: none;
  text-align: left;
}
</style>
<p class="selectable">
Loremipsumdolorsitamet,consecteturadipiscingelit.Nullaexnisl,dictumutdolorquis,dignissimpellentesquemagna.Etiamquisestutlectusultriceslobortisegetutfelis.Fuscemollistemporenim,aposueremaurispellentesquequis.Aeneancursusutdoloratlacinia.Phasellusnonhendreritlacus.Namultriciesinterdumligulavitaefinibus.Etiampharetrapuruslibero.Sedrutrumnibhetmassadignissim,ataccumsanjustoiaculis.Quisqueideleifendnibh.Aeneancursusatleoacondimentum.Vivamusvulputate,elitacmolestiedictum,loremmassaimperdiettellus,sedportaantemagnaetleo.Maecenasquamlorem,eleifendettelluseu,commodotinciduntex.Sedvulputateefficiturdiamquistempor.Vivamussitametconvallisligula.Curabiturquamarcu,portaaloremid,pellentesquecongueipsum.Fuscerutrumturpiseleifendsodalesporta.Donecquisnislposuere,iaculismagnain,eleifendest.Pellentesquetincidunttortorvitaevestibulumsemper.Crascongue,leoscelerisquetinciduntluctus,diamnisieleifendarcu,noncommodomaurisligulavelmagna.Utornare,justoetcongueconsequat,arcumetusmattisfelis,elementumimperdietmagnaurnainnulla.Aeneanlobortisconsecteturmiaplacerat.Suspendissesitametnuncegetmifinibusullamcorperatacvelit.Aeneanmetusante,consectetursedliberovel,efficiturmollisarcu.Nuncavelitblandit,mattismetusvitae,condimentumlacus.Suspendissesuscipitnisietnequesollicitudinornareininex.Doneccommodoscelerisquelacussedcommodo.Vivamusegetleovariusnuncvenenatisaliquet.Donecvulputatesuscipitconvallis.Sedbibendumlectusquam,vitaeegestasmiefficiturvitae.Phaselluselementumgravidasem,euplaceratdiamcommodovitae.Donecvelsemlibero.Etiameumolestienibh.Maurisfeugiatnuncmi.Curabiturvelduiuttortorornaresagittisnonsednunc.Inmaximusestinlacusfeugiatconsectetur.Sedsedconsecteturmagna.Crasatfacilisisnibh.Duisutdapibusipsum.Utsednunctempus,consequattortorornare,imperdietdiam.Duisamassasitametsapiensagittiscongue.Vestibulumvitaeleoaceratscelerisquelaciniaeuveljusto.Maecenasnibhjusto,sagittisnontempora,fringillaetnibh.Crasmaximuselitvelfermentumaliquam.Fuscepretiumtinciduntauctor.Nunceuurnainterdum,suscipitpurusvitae,conguejusto.Proinnonfeliselementum,efficiturrisuset,mollisipsum.Sedtincidunt,odiositametornarefermentum,nuncdolorfeugiaturna,etsollicitudinnuncleoetodio.Vivamusultricesmiviverraturpisbibendum,veltempormetusfeugiat.Donecsollicitudinaliquetlobortis.Maecenascommodo,nislincommodobibendum,magnaduieuismodnisl,nonimperdietelitarcunonlectus.Aeneantemporvolutpatduiapulvinar.Vestibulumenimlorem,aliquamnonimperdietvitae,feugiatvelligula.Sednonexquam.Namposuerenecmaurisquissollicitudin.Vivamusaliquamdignissimsapien,veldictumnequetempusnon.Phasellusexpurus,tempusidleovel,ornarealiquamorci.Aeneannonestinturpismattismaximus.Aeneanquisquamatmauriscommodoimperdietvitaeegeteros.Fusceeleifendesteuestcommodo,euelementumsapienporttitor.Namconsequatvestibulumdapibus.Nunctempordapibusvestibulum.Fusceefficiturinduivelpulvinar.Phasellusafelisnunc.Prointinciduntvelitneque.Vestibulumconsequat,lacusineuismodefficitur,exanteplaceratdiam,tempustempusexelitatnunc.Aliquamapurusplacerat,pulvinarerosut,consequatorci.Crassuscipit,odionecconguefinibus,ipsummassavariusnunc,eutemportellusfelisidaugue.Aeneanidanteetnisimollisdictum.Vivamusposueredictumorci,etplaceratorcidapibusvel.Suspendissevariusdictumfringilla.Integerneclaciniasem.Nullamsitametnullasitametmagnasuscipitfringilla.Maecenastinciduntrutrumeratnoniaculis.Nuncquistemporlectus,euscelerisquedolor.Duisatpretiumdui.Curabiturvelarcurhoncus,venenatismagnavitae,fringillalorem.Utfermentumnibhanullacommodoullamcorper.Inidligulaquisduimattisaliquet.Curabiturnecvelitsitametmassaposueredapibussedsedsapien.Namidnullaatenimtempustincidunt.Maurisquisfelisanisiluctusconsequat.Inmassaex,finibusinbibendumeget,pretiumquisnibh.Suspendissepotenti.Orcivariusnatoquepenatibusetmagnisdisparturientmontes,nasceturridiculusmus.Curabitursemperodiovitaemagnaaccumsan,nonelementumtortorporta.Nullavestibulumorcivitaescelerisquesuscipit.Maurisullamcorperutmassainbibendum.Nuncnectortorcursus,volutpatauguevel,convallisleo.Donecfaucibusurnaquam,velgravidaliberolaoreetvitae.Nullammalesuadatempusmagna,sedfeugiatrisuspulvinarvitae.Sedelementumvelituteuismodsodales.Aliquamlaciniaimperdietest,inporttitoreratrhoncuset.Curabitureuquamlacus.Praesentvestibulumegetenimaconvallis.Uttempusarcuquisleodignissimhendrerit.Utdictumjustoquiselitlacinia,velultricesnequetempus.Quisqueplacerattortoretgravidaultrices.Seddolorante,commodoatconsecteturut,maximusnonaugue.Sedplaceratquamsedduiblandittristique.Donecneciaculisenim.Inindolorvenenatis,sempersemac,venenatisvelit.Maurisetsemvelodiomolestiepellentesquenecegetlectus.Phasellusluctusurnaatnequesagittisvolutpat.Praesentveltristiquejusto.Maurisloremmassa,temporaleoin,accumsantinciduntmauris.Fusceiaculisaugueurna,sedvehiculanullagravidaid.Maurisdapibusimperdietorciatefficitur.Maecenassemperviverraerosvelrhoncus.Aeneandictumlorempulvinar,hendreriturnaeget,vehiculadolor.Nullasuscipiterosquisvelitfeugiatrutrum.Duissedmolestiesapien,egetvenenatismi.Duissagittisnuncinluctustincidunt.Donecmaximuslobortisturpis,fringillavestibulumestvenenatiseget.Aliquamacvolutpatleo,nonaliquamlorem.Namalacusutsemtinciduntimperdietsedegetenim.Sedconsecteturetnequesedauctor.Maecenasblanditsedloremquisfinibus.Suspendisseidrhoncusmetus.Praesentatmollismi,quisegestasjusto.Loremipsumdolorsitamet,consecteturadipiscingelit.Integerorciest,viverrasitametmassaac,scelerisquelaoreetlacus.Etiamcursusestnonmetusmollis,actempormagnasuscipit.Pellentesqueultriciesloreminestefficiturpharetra.Suspendissepotenti.Etiambibendumconsecteturmi,atdictumnibhaccumsannec.Phasellussitametnuncnondolorpellentesquefermentumatposuereex.Curabiturquisleoarcu.Ututliberovehicula,tempusenimquis,dictumodio.Nullamviverraquamorci,inmollisnisidapibusnec.Pellentesqueacvelitnecnequedapibusiaculis.Inetfinibusodio,atincidunteros.Pellentesquehabitantmorbitristiquesenectusetnetusetmalesuadafamesacturpisegestas.Morbinequenibh,ultricesamaurissed,feugiatluctusenim.Etiaminlectusfelis.Morbibibendumnullavitaevelitsodales,dictumtinciduntipsumconsequat.Pellentesquefacilisissedmassaatfeugiat.Phaselluslectuslacus,euismodetlectusvel,mattistempusrisus.Namornareanteidexvarius,atviverraerosultrices.Loremipsumdolorsitamet,consecteturadipiscingelit.Praesentluctusduivitaeenimcongue,idvenenatisenimtincidunt.Praesentcondimentumcongueex,etaccumsannisisempermaximus.Sedegestasenimidexfringillaullamcorper.Fuscevelaugueipsum.Utvariusnuncvitaeligulaegestasbibenduminnonodio.Pellentesquevestibulumestneccursusornare.Quisqueullamcorperfelisidtortorvolutpat,quisaliquamauguevulputate.Crascondimentumnequeutmagnacursus,sedvolutpatmassahendrerit.Crasvellacusmi.Maecenastinciduntvariusurnanecmolestie.Prointinciduntfeugiaturnaidpharetra.Nullamlaoreetmagnaetpellentesquemaximus.Nuncvelfeugiatmassa.Sedeunequeullamcorper,dictumlacusnon,laoreeterat.Fusceconsectetur,sapieneucommodolacinia,auguesemcommodoarcu,infinibusanteipsumeleifendquam.Suspendisseconvallisineratnonfaucibus.Aeneanfeugiatimperdiettincidunt.Inpellentesquelectusrhoncusinterduminterdum.Phasellusvarius,esteteleifendmolestie,orcinisivehiculametus,sedsuscipitjustoturpisrhoncusnulla.Inligulanisi,dictumegetvelitaliquam,aliquaminterdumurna.Crassollicitudinduiquistemporsodales.Proineleifendporttitornequeatlaoreet.Sedlaoreetluctusligula,necegestasnibhhendreriteget.Quisqueviverranisianequesollicitudin,neccondimentumvelitegestas.Vivamussitametportaex.Namnequetellus,imperdietininterdumvel,portaetarcu.Praesentultriciesduileo,etconguequambibendumsed.Vestibulumatliberoquam.Curabituretnequeipsum.Sedquamaugue,tinciduntaultriciesvitae,vehiculaatdui.Phaselluseuluctusleo,vitaeeleifendante.Pellentesquenectinciduntante.Orcivariusnatoquepenatibusetmagnisdisparturientmontes,nasceturridiculusmus.Fuscevitaenisleutortorvestibulumsollicitudin.Fuscenoneratelementum,dignissimsemut,tinciduntleo.Suspendissedignissimvolutpatvelit,egetgravidaenimtristiqueet.Donecmattispurussedmassatempus,atsodaleseliteleifend.Nullaatelluspretiumvelitauctormolli
</p>
<canvas id="viewport" width="81" height="102" style="width: 81px;height: 102px;"></canvas>

<script>
var canvas = document.getElementById('viewport'),
context = canvas.getContext('2d');
const colors = [];

function createImage()
{
  image = new Image();
  image.src = '/images/the-scream.jpg';
  image.onload = function(){
    context.drawImage(image, 0, 0);
    
    for (let i = 0; i < 105; i++) {
      for (let j = 0; j < 83; j++) {
        var imgData = context.getImageData(j, i, 1, 1).data;
        colors.push([imgData[0], imgData[1], imgData[2], imgData[3]]);
      }
    }

    setSelection(colors);
  }
}

function setSelection(colors) {
  let css = '';
  const paragraph = document.querySelector('.selectable');
  const chars = paragraph.innerText.split('');
  paragraph.innerText = '';
  for (let i = 0; i < chars.length; i++) {
    const span = document.createElement('div');
    span.innerText = chars[i];
    span.className = `char char${i}`;
    if (colors.length > i) {
      const color = colors[i];
      css += `.char${i}::selection { background-color: rgba(${color[0]},${color[1]},${color[2]},${color[3]});color: rgba(${color[0]},${color[1]},${color[2]},${color[3]}); }\n`;
    }
    paragraph.appendChild(span);
  }

  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');

  head.appendChild(style);

  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
}

createImage();
</script>
{% endraw %}