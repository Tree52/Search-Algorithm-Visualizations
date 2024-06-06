<script lang="ts">
	import { goPressed, stepIndex, steps, target } from "$lib/refs.svelte";

	function reset(): void {
		stepIndex.value = 0;
		goPressed.value = false;
		steps.value.splice(1);
	}
</script>

<div>
	Target:&nbsp;{target.value}
	<br />
	Visual:&nbsp;{stepIndex.value} / {steps.value.length - 1}
</div>
<button
	class="fa-solid fa-arrow-left"
	onclick={() => {
		if (stepIndex.value !== 1) stepIndex.value--;
	}}
	aria-label="Left arrow"
></button>
<button
	class="fa-solid fa-arrow-right"
	onclick={() => {
		if (stepIndex.value !== steps.value.length) stepIndex.value++;
	}}
	aria-label="Right arrow"
></button>
<button class="fa-solid fa-rotate-right" onclick={reset} aria-label="Reset footer"></button>

<style lang="scss">
	div {
		bottom: 20px;
		left: 20px;
		position: absolute;
	}
</style>
