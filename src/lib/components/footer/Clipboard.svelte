<script lang="ts">
	import { steps } from "$lib/refs.svelte";

	function copyToClipboard(): void {
		navigator.clipboard.writeText(steps.value[0].tileContents.join(", "));
		alert("Array copied to clipboard");
	}
</script>

<!-- prettier-ignore -->
<button
	class="fa-solid fa-clipboard"
	onclick={copyToClipboard}
	aria-label="Copy array to clipboard"
></button>
