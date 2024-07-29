<script lang="ts">
	import { getRandomIntBetween, stringToNumberArray, sanitizeInput } from "$lib/utils";
	import { steps } from "$lib/refs.svelte";

	let arrayInput = $state("");

	function createStep0TileColors(): void {
		steps.v[0].tileColors = [];
		for (let i: number = 0; i < steps.v[0].tileContents.length; i++) {
			steps.v[0].tileColors[i] = "var(--secondary-color)";
		}
	}

	function pop(): void {
		if (arrayInput === "") {
			steps.v[0].tileContents.pop();
		} else {
			const toRemove: number[] = stringToNumberArray(arrayInput);
			for (let i: number = 0; i < toRemove.length; i++) {
				const index: number = steps.v[0].tileContents.indexOf(toRemove[i]);
				if (index !== -1) steps.v[0].tileContents.splice(index, 1);
			}
		}
		createStep0TileColors();
	}

	function push(): void {
		if (arrayInput === "") {
			steps.v[0].tileContents.push(getRandomIntBetween(-9, 99));
		} else {
			steps.v[0].tileContents.push(...stringToNumberArray(arrayInput));
		}
		createStep0TileColors();
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === "Enter") {
			if (e.shiftKey) pop();
			else push();
		}
	}
</script>

{#if steps.v[0].tileContents.length > 0}
	<button onclick={pop} aria-label="Remove array input">
		-
		<span style:margin-left="-.8rem">Shift + Enter</span>
	</button>
{:else}
	<button style:visibility="hidden"></button>
{/if}
<input
	class="fa-solid"
	type="text"
	placeholder="#, #, ..."
	bind:value={arrayInput}
	oninput={(): void => {
		arrayInput = sanitizeInput(arrayInput, "0-9, -");
	}}
	aria-label="Array input: number comma number comma etc."
	onkeydown={handleKeydown}
/>
<button onclick={push} aria-label="Add array input">
	+
	<span style:margin-left=".5rem">Enter</span>
</button>

<style lang="scss">
	input[type="text"] {
		width: calc(var(--button-width) * 3);

		&:focus + button span {
			display: block;
		}
	}

	button {
		span {
			color: var(--secondary-color);
			display: none;
			font-size: 0.75rem;
			margin-top: -2.75rem;
			position: absolute;
		}

		&:has(+ input[type="text"]:focus) span {
			display: block;
		}
	}
</style>
