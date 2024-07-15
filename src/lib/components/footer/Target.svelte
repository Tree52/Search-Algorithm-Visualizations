<script lang="ts">
	import { sanitizeInput } from "$lib/utils";
	import { target } from "$lib/refs.svelte";
</script>

<input
	class="fa-solid"
	placeholder="&#xf140"
	bind:value={target.value}
	oninput={(): void => {
		target.value = sanitizeInput(target.value, "0-9-");
	}}
	aria-label="Algorithm target number"
/>

<style lang="scss">
	input {
		width: var(--button-width);
	}
</style>
