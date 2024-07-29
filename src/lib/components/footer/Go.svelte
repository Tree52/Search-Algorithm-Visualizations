<script lang="ts">
	import { algorithm, target, stepsIndexer, steps } from "$lib/refs.svelte";
	import { type SearchAlgorithm, unsortedAlgos, sortedAlgos } from "$lib/algos";
	import { finalResult, hideTiles } from "$lib/main";
	import { mergeSort } from "$lib/utils";

	function go(): void {
		if (target.v === "" || isNaN(Number(target.v)))
			steps.v[0].resultContent = "Input valid target number";
		else {
			steps.v[0].resultContent = "";
			let returnedIndex: number = -1;
			const searchFunction: SearchAlgorithm =
				unsortedAlgos[algorithm.v] || sortedAlgos[algorithm.v];
			if (searchFunction) {
				if (sortedAlgos[algorithm.v]) {
					steps.v[0].tileContents = mergeSort(steps.v[0].tileContents as number[]);
				}
				hideTiles();
				returnedIndex = searchFunction(Number(target.v), [
					...steps.v[0].tileContents
				] as number[]);
			} else throw new Error(`Algorithm ${algorithm.v} has no matching key.`);
			finalResult(Number(target.v), returnedIndex);
			stepsIndexer.v = 1;
		}
	}
</script>

<button onclick={go}>Go</button>
