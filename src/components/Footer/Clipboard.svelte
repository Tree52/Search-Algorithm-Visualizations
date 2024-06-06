<script lang="ts">
	import { steps } from "$lib/refs.svelte";

	function copyToClipboard(): void {
		const arrayElementsString: string = steps.value[0].tileContents.join(", ");
		navigator.clipboard.writeText(arrayElementsString);
		steps.value[0].resultContent = "Array copied to clipboard";
	}
</script>

<button
	class="fa-solid fa-clipboard"
	onclick={copyToClipboard}
	aria-label="Copy array to clipboard"
></button>
