<script lang="ts">
	import { sanitizeInput } from "$lib/utils";
	import { target } from "$lib/refs.svelte";
</script>

<input
	class="fa-solid"
	type="text"
	inputmode="numeric"
	placeholder="&#xf140"
	bind:value={target.value}
	oninput={() => (target.value = sanitizeInput(target.value, "0-9-"))}
	aria-label="Algorithm target number"
/>

<style lang="scss">
	input[type="text"] {
		width: var(--button-width);
	}
</style>
