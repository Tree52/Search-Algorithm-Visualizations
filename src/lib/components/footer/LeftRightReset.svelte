<script lang="ts">
	import { stepsIndexer, steps, target, algorithm } from "$lib/refs.svelte";

	function reset(): void {
		stepsIndexer.reset();
		steps.value.splice(1);
	}
</script>

<div>
	Target:&nbsp;{target.value}
	<br />
	Visual:&nbsp;{stepsIndexer.value} / {steps.value.length - 1}
	<br />
	Algorithm:&nbsp;{algorithm.value}
</div>
{#if stepsIndexer.value !== 1}
	<button
		class="fa-solid fa-arrow-left"
		onclick={(): void => {
			stepsIndexer.value--;
		}}
		aria-label="Left arrow"
	></button>
{:else}
	<button style:visibility="hidden"></button>
{/if}
{#if stepsIndexer.value !== steps.value.length - 1}
	<button
		class="fa-solid fa-arrow-right"
		onclick={(): void => {
			stepsIndexer.value++;
		}}
		aria-label="Right arrow"
	></button>
{:else}
	<button style:visibility="hidden"></button>
{/if}
<button class="fa-solid fa-rotate-right" onclick={reset} aria-label="Reset footer"></button>

<style lang="scss">
	div {
		bottom: 20px;
		left: 20px;
		position: absolute;
	}
</style>
