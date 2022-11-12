<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	let playState = 'play';

	onMount(async () => {
		const playIconContainer = document.getElementById('play-icon');
		const seekSlider = document.getElementById('seek-slider');
		let muteState = 'unmute';

		// my additions
		// const nextButton = document.getElementById('next-icon');

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
		// nextButton.addEventListener('click', () => {
		// 	generateRandomNumber();
		// });

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
		};

		const whilePlaying = () => {
			seekSlider.value = Math.floor(audio.currentTime);
			currentTimeContainer.textContent = calculateTime(seekSlider.value);
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
				title: audios[currentTrack].qasidah,
				artist: audios[currentTrack].author,
				album: 'دواوين العرافين بأنغام المحبين',
				artwork: [
					// and if doesn't find: no image only, title and artist still work!
					{ src: '/portraits/'+ audios[currentTrack].author +'.jpg', sizes: '96x96', type: 'image/png' }
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
	<img id="author" src="/portraits/الله.jpg" alt="صورة الاسم" loading="lazy" />
{:else}
	<img
		id="author"
		alt="صورة الشيخ المؤلف: {audios[currentTrack].author}"
		loading="lazy"
		src="/portraits/{audios[currentTrack].author}.jpg"
	/>
{/if}

<div id="track-card">
	<h1>{audios[currentTrack].qasidah}</h1>
	<h2>﵁ {audios[currentTrack].author}</h2>
</div>

<audio src="/audio/{audios[currentTrack].filename}.mp3" preload="metadata" loop />
<!-- <p>audio player ish</p> -->
<button id="play-icon" class={playState}><img alt="play icon" src="/{playState}.svg" /></button>
<span id="current-time" class="time">0:00</span>
<input type="range" id="seek-slider" max="100" value="0" />
<span id="duration" class="time">0:00</span>

<!-- <button id="next-icon">التالي</button> -->
<style>
	h1 {
		color: var(--color-theme-1);
		margin: 0 0 2px 0;
		font-weight: 700;
	}
	h2 {
		color: var(--color-dim);
		margin: 0 0 0 0;
		font-weight: 700;
		font-size: larger;
	}
	div#track-card {
		background-color: #bfffd9;
		border-radius: 12px;
		text-align: center;
		padding: 30px 20px 20px 20px;
		margin: -30px 0 90px 0;
		min-width: 300px;
	}
	#current-time,
	#seek-slider,
	#duration {
		display: none;
	}
	img#author {
		margin: 30px 0 0 0;
		border-radius: 50%;
		z-index: 10;
		width: 200px;
		height: 200px;
		box-shadow: rgba(0, 33, 18, 0.5) 0px 3px 8px;
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
		background-color: #006c46;
		box-shadow: rgba(0, 33, 18, 0.19) 0px 10px 20px, rgba(0, 33, 18, 0.23) 0px 6px 6px;
		line-height: 0; /* fixes large height from arabic font */
		transition: all 0.3s ease;
	}
	#play-icon.play {
		width: 75px;
		height: 75px;
		border-radius: 28px;
	}
	#play-icon.pause {
		width: 70px;
		height: 70px;
		border-radius: 50px;
		box-shadow: rgba(0, 33, 18, 0.5) 0px 1px 4px;
	}
	#play-icon.play > img {
		width: 60px;
		height: 60px;
	}
	#play-icon.pause > img {
		width: 40px;
		height: 40px;
	}
	.time {
		display: inline-block;
		width: 37px;
		text-align: center;
		font-size: 20px;
		margin: 28.5px 0 18.5px 0;
		float: left;
	}
</style>
