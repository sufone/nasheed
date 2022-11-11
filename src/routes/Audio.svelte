<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	onMount(async () => {
		const playIconContainer = document.getElementById('play-icon');
		const audioPlayerContainer = document.getElementById('audio-player-container');
		const seekSlider = document.getElementById('seek-slider');
		let playState = 'play';
		let muteState = 'unmute';

		// my additions
		const nextButton = document.getElementById('next-icon');

		playIconContainer.addEventListener('click', () => {
			if (playState === 'play') {
				audio.play();
				playState = 'pause';
			} else {
				audio.pause();
				playState = 'play';
			}
		});
		// my addition for next song
		nextButton.addEventListener('click', () => {
			generateRandomNumber();
		});

		const showRangeProgress = (rangeInput) => {
			audioPlayerContainer.style.setProperty(
				'--seek-before-width',
				(rangeInput.value / rangeInput.max) * 100 + '%'
			);
		};

		seekSlider.addEventListener('input', (e) => {
			showRangeProgress(e.target);
		});

		/* Implementation of the functionality of the audio player */

		const audio = document.querySelector('audio');
		const durationContainer = document.getElementById('duration');
		const currentTimeContainer = document.getElementById('current-time');
		let raf = null;

		const calculateTime = (secs) => {
			const minutes = Math.floor(secs / 60);
			const seconds = Math.floor(secs % 60);
			const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
			return `${minutes}:${returnedSeconds}`;
		};

		const displayDuration = () => {
			durationContainer.textContent = calculateTime(audio.duration);
		};

		const setSliderMax = () => {
			seekSlider.max = Math.floor(audio.duration);
		};

		const displayBufferedAmount = () => {
			const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
			audioPlayerContainer.style.setProperty(
				'--buffered-width',
				`${(bufferedAmount / seekSlider.max) * 100}%`
			);
		};

		const whilePlaying = () => {
			seekSlider.value = Math.floor(audio.currentTime);
			currentTimeContainer.textContent = calculateTime(seekSlider.value);
			audioPlayerContainer.style.setProperty(
				'--seek-before-width',
				`${(seekSlider.value / seekSlider.max) * 100}%`
			);
		};

		if (audio.readyState > 0) {
			displayDuration();
			setSliderMax();
			displayBufferedAmount();
		} else {
			audio.addEventListener('loadedmetadata', () => {
				displayDuration();
				setSliderMax();
				displayBufferedAmount();
			});
		}

		audio.addEventListener('progress', displayBufferedAmount);

		seekSlider.addEventListener('input', () => {
			currentTimeContainer.textContent = calculateTime(seekSlider.value);
		});

		seekSlider.addEventListener('change', () => {
			audio.currentTime = seekSlider.value;
		});

		/* Implementation of the Media Session API */
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: 'Komorebi',
				artist: 'Anitek',
				album: 'MainStay',
				artwork: [
					{ src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '96x96', type: 'image/png' },
					{
						src: 'https://assets.codepen.io/4358584/1.300.jpg',
						sizes: '128x128',
						type: 'image/png'
					},
					{
						src: 'https://assets.codepen.io/4358584/1.300.jpg',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'https://assets.codepen.io/4358584/1.300.jpg',
						sizes: '256x256',
						type: 'image/png'
					},
					{
						src: 'https://assets.codepen.io/4358584/1.300.jpg',
						sizes: '384x384',
						type: 'image/png'
					},
					{
						src: 'https://assets.codepen.io/4358584/1.300.jpg',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			});
			navigator.mediaSession.setActionHandler('play', () => {
				if (playState === 'play') {
					audio.play();
					playState = 'pause';
				} else {
					audio.pause();
					playState = 'play';
				}
			});
			navigator.mediaSession.setActionHandler('pause', () => {
				if (playState === 'play') {
					audio.play();
					playState = 'pause';
				} else {
					audio.pause();
					playState = 'play';
				}
			});
			navigator.mediaSession.setActionHandler('seekbackward', (details) => {
				audio.currentTime = audio.currentTime - (details.seekOffset || 10);
			});
			navigator.mediaSession.setActionHandler('seekforward', (details) => {
				audio.currentTime = audio.currentTime + (details.seekOffset || 10);
			});
			navigator.mediaSession.setActionHandler('seekto', (details) => {
				if (details.fastSeek && 'fastSeek' in audio) {
					audio.fastSeek(details.seekTime);
					return;
				}
				audio.currentTime = details.seekTime;
			});
			navigator.mediaSession.setActionHandler('stop', () => {
				audio.currentTime = 0;
				seekSlider.value = 0;
				audioPlayerContainer.style.setProperty('--seek-before-width', '0%');
				currentTimeContainer.textContent = '0:00';
				if (playState === 'pause') {
					playState = 'play';
				}
			});
		}
	});

	import audios from '$lib/sources.js';

	let currentTrack;
	let previousTrack;
	generateRandomNumber();

	function generateRandomNumber() {
		let newRandomNumber = Math.floor(Math.random() * audios.length);

		// handle ini: simple
		if (typeof currentTrack == undefined) {
			console.log(newRandomNumber);
			currentTrack = newRandomNumber;
		} else {
			// handle randomly playing the same or previous track
			if (newRandomNumber === currentTrack || newRandomNumber === previousTrack) {
				if (newRandomNumber === 0) {
					// handles the edge case of going negative
					previousTrack = currentTrack;
					currentTrack = newRandomNumber + 1;
				} else {
					previousTrack = currentTrack;
					currentTrack = newRandomNumber - 1;
				}
				// handle
			} else {
				previousTrack = currentTrack;
				currentTrack = newRandomNumber;
			}
		}
		console.log(currentTrack);
	}
</script>

<!-- Checking of the author has no picture, then use default
this is needed since vite doesn't play nice with onerror fallbacks -->
{#if audios[currentTrack].author == 'الشيخ أبو مدين الغوث'}
	<img src="/portraits/الله.jpg" alt="صورة الاسم" loading="lazy" />
{:else}
	<img
		alt="صورة الشيخ المؤلف: {audios[currentTrack].author}"
		loading="lazy"
		src="/portraits/{audios[currentTrack].author}.jpg"
	/>
{/if}

<h2>{audios[currentTrack].author}</h2>
<h1>{audios[currentTrack].qasidah}</h1>
<div id="audio-player-container">
	<audio src="/audio/{audios[currentTrack].filename}.mp3" preload="metadata" loop />
	<!-- <p>audio player ish</p> -->
	<button id="play-icon" />
	<span id="current-time" class="time">0:00</span>
	<input type="range" id="seek-slider" max="100" value="0" />
	<span id="duration" class="time">0:00</span>
</div>
<button id="next-icon">التالي</button>

<style>
	#current-time,
	#seek-slider,
	#duration {
		display: none;
	}
	img {
		border-radius: 50%;
		width: 200px;
		height: 200px;
	}
	button {
		padding: 0;
		border: 0;
		background: transparent;
		cursor: pointer;
		outline: none;
		width: 40px;
		height: 40px;
		float: left;
	}
	#audio-player-container {
		--seek-before-width: 0%;
		--volume-before-width: 100%;
		--buffered-width: 0%;
		position: relative;
		background-color: #006c46;
		border-radius: 18px;
		padding: 15px 15px;
	}

	p {
		position: absolute;
		top: -18px;
		right: 5%;
		padding: 0 5px;
		margin: 0;
		font-size: 28px;
		background: #fff;
	}
	#play-icon {
		/* margin: 20px 2.5% 10px 2.5%; */
		stroke-opacity: 0;
	}
	.time {
		display: inline-block;
		width: 37px;
		text-align: center;
		font-size: 20px;
		margin: 28.5px 0 18.5px 0;
		float: left;
	}
	input[type='range'] {
		position: relative;
		-webkit-appearance: none;
		width: 48%;
		margin: 0;
		padding: 0;
		height: 19px;
		margin: 30px 2.5% 20px 2.5%;
		float: left;
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 3px;
		cursor: pointer;
		background: linear-gradient(
			to right,
			rgba(0, 125, 181, 0.6) var(--buffered-width),
			rgba(0, 125, 181, 0.2) var(--buffered-width)
		);
	}
	input[type='range']::before {
		position: absolute;
		content: '';
		top: 8px;
		left: 0;
		width: var(--seek-before-width);
		height: 3px;
		background-color: #007db5;
		cursor: pointer;
	}
	input[type='range']::-webkit-slider-thumb {
		position: relative;
		-webkit-appearance: none;
		box-sizing: content-box;
		border: 1px solid #007db5;
		height: 15px;
		width: 15px;
		border-radius: 50%;
		background-color: #fff;
		cursor: pointer;
		margin: -7px 0 0 0;
	}
	input[type='range']:active::-webkit-slider-thumb {
		transform: scale(1.2);
		background: #007db5;
	}
	input[type='range']::-moz-range-track {
		width: 100%;
		height: 3px;
		cursor: pointer;
		background: linear-gradient(
			to right,
			rgba(0, 125, 181, 0.6) var(--buffered-width),
			rgba(0, 125, 181, 0.2) var(--buffered-width)
		);
	}
	input[type='range']::-moz-range-progress {
		background-color: #007db5;
	}
	input[type='range']::-moz-focus-outer {
		border: 0;
	}
	input[type='range']::-moz-range-thumb {
		box-sizing: content-box;
		border: 1px solid #007db5;
		height: 15px;
		width: 15px;
		border-radius: 50%;
		background-color: #fff;
		cursor: pointer;
	}
	input[type='range']:active::-moz-range-thumb {
		transform: scale(1.2);
		background: #007db5;
	}
	input[type='range']::-ms-track {
		width: 100%;
		height: 3px;
		cursor: pointer;
		background: transparent;
		border: solid transparent;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower {
		background-color: #007db5;
	}
	input[type='range']::-ms-fill-upper {
		background: linear-gradient(
			to right,
			rgba(0, 125, 181, 0.6) var(--buffered-width),
			rgba(0, 125, 181, 0.2) var(--buffered-width)
		);
	}
	input[type='range']::-ms-thumb {
		box-sizing: content-box;
		border: 1px solid #007db5;
		height: 15px;
		width: 15px;
		border-radius: 50%;
		background-color: #fff;
		cursor: pointer;
	}
	input[type='range']:active::-ms-thumb {
		transform: scale(1.2);
		background: #007db5;
	}
</style>
