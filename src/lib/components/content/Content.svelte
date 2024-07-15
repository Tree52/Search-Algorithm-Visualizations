<script lang="ts">
	import { stepsIndexer, steps } from "$lib/refs.svelte";
	import EmptyTile from "./EmptyTile.svelte";
	import Tile from "./Tile.svelte";
</script>

<main>
	{#each steps.value[stepsIndexer.value].tileContents as tileContent, i}
		<Tile tileIndex={i} {tileContent} tileColor={steps.value[stepsIndexer.value].tileColors[i]} />
	{/each}

	<div>
		{steps.value[stepsIndexer.value].resultContent}
		{#each steps.value[stepsIndexer.value].metaTileContents as tileContent}
			<EmptyTile {tileContent} />
		{/each}
	</div>
</main>

<style lang="scss">
	@import "$lib/../mixins.scss";

	main {
		@include center-div;
		flex: 1;

		div {
			bottom: 3rem;
			display: flex;
			position: absolute;
		}
	}

	main :global {
		div {
			@include center-div;
			height: var(--tile-height);
			margin: var(--lr-margin);
			min-width: var(--tile-height);
			padding: 0.25rem;
		}
	}
</style>
