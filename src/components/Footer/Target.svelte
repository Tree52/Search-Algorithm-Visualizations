<script lang="ts">
	import { target } from "$lib/refs.svelte";
	let targetSanitized: string = $derived(target.value.replace(/[^0-9-]/g, ""));
</script>

<input
	class="fa-solid"
	type="text"
	inputmode="numeric"
	placeholder="&#xf140"
	bind:value={target.value}
	oninput={() => (target.value = targetSanitized)}
	aria-label="Algorithm target number"
/>

<style lang="scss">
	input[type="text"] {
		width: var(--button-width);
	}
</style>
