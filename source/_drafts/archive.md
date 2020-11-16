---
title: Horror
date: "2020-12-01T22:00:00.169Z"
---

Com vontade de assistir algum filme de terror antigo? Nesta página você receberá um filme de terror ou sci-fi que já está em domínio público para passar o seu tempo. Os filmes são coletados do site [archive.org](https://archive.org) (e podem demorar um pouquinho para carregar).

{% raw %}
<style>
body {
	background-color: black;
}

h1 {
	color: orange !important;
}

video {
  width: 100%;
}

.movie {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.random-button {
  margin-top: 40px;
	background-color: transparent;
	border: 2px solid orange;
	color: orange;
	border-radius: 24px;
	padding: 16px;
	font-size: 16px;
	cursor: pointer;
}
</style>
<div class="movie">
  <h1 id="movieTitle"></h1>
  <video id="movieVideo" src="" type="video/mp4" autoplay="autoplay" controls></video>
  <button class="random-button" onClick="playRandomMovie()">Me dê outro filme!</button>
</div>

<script>
const movies = [
	{
		name: 'Night of the Living Dead (1968)',
		url: 'https://archive.org/serve/night_of_the_living_dead/night_of_the_living_dead.mp4',
		description: ''
	},
	{
		name: 'House on Haunted Hill (1959)',
		url: 'https://archive.org/download/house_on_haunted_hill_ipod/house_on_haunted_hill_512kb.mp4',
		description: ''
	},
	{
		name: 'Lady Frankenstein (1971)',
		url: 'https://archive.org/download/Lady_Frankenstein/Lady_Frankenstein.mp4',
		description: ''
	},
	{
		name: 'Killers From Space (1954)',
		url: 'https://archive.org/download/Killers_from_space/Killers_from_space.mp4',
		description: ''
	},
	{
		name: 'Last Woman On Earth (1960)',
		url: 'https://archive.org/download/last_woman_on_earth1960/last_woman_on_earth1960.mp4',
		description: ''
	},
	{
		name: 'Grave of the Vampire (1974)',
		url: 'https://archive.org/download/Grave_of_the_Vampire_movie/Grave-of-the-Vampire.mp4',
		description: ''
	},
	{
		name: '20,000 Leagues Under the Sea (1916)',
		url: 'https://archive.org/download/20000LeaguesUndertheSea/20000_Leagues_Under_the_Sea_512kb.mp4',
		description: ''
	},
	{
		name: 'The Cabinet of Dr. Caligari (1919)',
		url: 'https://archive.org/download/DasKabinettdesDoktorCaligariTheCabinetofDrCaligari/The_Cabinet_of_Dr._Caligari_512kb.mp4',
		description: ''
	},
	{
		name: 'Teenagers from Outer Space (1959)',
		url: 'https://archive.org/download/teenagers_from_outerspace/Teenagers_from_Outer_Space_512kb.mp4',
		description: ''
	},
	{
		name: 'The Phantom Creeps (1939)',
		url: 'https://archive.org/download/ThePhantomCreeps/ThePhantomCreeps.mp4',
		description: ''
	},
	{
		name: 'Naked Massacre (1976)',
		url: 'https://archive.org/download/NakedMassacre1976/MoviePowderPresentsNakedMassacre.mp4',
		description: ''
	},
	{
		name: 'Carnival of Souls (1962)',
		url: 'https://archive.org/download/CarnivalOfSouls_ipod/CarnivalOfSouls_512kb.mp4',
		description: ''
	},
	{
		name: 'The Ghost Train (1941)',
		url: 'https://archive.org/download/TheGhostTrain/TheGhostTrain.mp4',
		description: ''
	},
	{
		name: 'Doomsday Machine (1972)',
		url: 'https://archive.org/download/DoomsdayMachine1972/DoomsdayMachine1972.mp4',
		description: ''
	},
	{
		name: 'Nightmare Castle (1965)',
		url: 'https://archive.org/download/nightmare_castle/M4V10002.mp4',
		description: ''
	},
];

function playRandomMovie() {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  document.getElementById('movieTitle').innerText = randomMovie.name;
  document.getElementById('movieVideo').src = randomMovie.url;
}

window.addEventListener('load', function() {
  playRandomMovie();
});
</script>
{% endraw %}