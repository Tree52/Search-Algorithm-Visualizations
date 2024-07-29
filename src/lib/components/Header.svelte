<script lang="ts">
	import { unsortedAlgos, sortedAlgos } from "$lib/algos";
	import { algorithm, steps } from "$lib/refs.svelte";
</script>

{#if steps.v.length === 1}
	<header aria-label="Header algorithms checklist">
		<div>
			{#each Object.keys(unsortedAlgos) as key}
				<input type="radio" name="algorithm" value={key} bind:group={algorithm.v} id={key} />
				<label for={key}>{key}</label>
			{/each}
		</div>

		<div>
			{#each Object.keys(sortedAlgos) as key}
				<input type="radio" name="algorithm" value={key} bind:group={algorithm.v} id={key} />
				<label for={key}>{key}</label>
			{/each}
		</div>
	</header>
{/if}

<style lang="scss">
	@import "$lib/../mixins.scss";

	header {
		border-bottom: white 2px solid;
		font-size: 0.75rem;

		div {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			input[type="radio"],
			label {
				// input[type="radio"] needs this, set opacity to 1 to see.
				cursor: pointer;
			}

			input[type="radio"] {
				opacity: 0;
				position: fixed;

				&:checked + label {
					@include hover-styles;
				}
			}

			label {
				background-color: var(--secondary-color);
				padding: 0.25rem 0.5rem;
				transition: var(--transition);

				&:hover {
					@include hover-styles;
				}
			}
		}
	}
</style>
