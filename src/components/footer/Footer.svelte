<script lang="ts">
	import LeftRightReset from "./LeftRightReset.svelte";
	import { goPressed } from "$lib/refs.svelte";
	import ArrayInput from "./ArrayInput.svelte";
	import Clipboard from "./Clipboard.svelte";
	import Target from "./Target.svelte";
	import Go from "./Go.svelte";
</script>

<footer aria-label="Footer">
	{#if !goPressed.value}
		<ArrayInput />
		<Clipboard />
		<Go />
		<Target />
	{:else if goPressed.value}
		<LeftRightReset />
	{/if}
</footer>

<style lang="scss">
	@import "../../mixins.scss";

	footer {
		display: flex;
		height: 2.25rem;
		justify-content: center;
	}

	footer :global {
		button,
		input {
			border: none;
			font-size: inherit;
			margin: var(--lr-margin);
			padding: 0;
		}

		button {
			background-color: var(--secondary-color);
			color: inherit;
			cursor: pointer;
			font-weight: inherit;
			transition: var(--transition);
			width: var(--button-width);

			&:hover {
				@include hover-styles;
			}

			&:active {
				background-color: var(--primary-color);
				transition: none;
			}
		}

		input {
			min-width: 0; // Window Resizing
			outline: none;
			text-align: center;

			&:focus::placeholder {
				color: transparent;
			}
		}
	}
</style>
