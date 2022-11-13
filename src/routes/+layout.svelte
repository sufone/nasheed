<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<!-- <Header /> -->

	<main>
		<slot />
	</main>

	<footer>
		<a href="https://www.youtube.com/channel/UC6x-5eSpcaKPrfddPd8PP9w"><p>دواوين العارفين بأنغام المحبين</p></a>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 90vh;
		max-height: 95vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 6px;
		color: inherit;
		background-color: inherit;
	}

	a {
		font-weight: normal;
		color: var(--color-dim);

	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
