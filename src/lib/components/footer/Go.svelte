<script lang="ts">
	import { algorithm, target, stepsIndexer, steps } from "$lib/refs.svelte";
	import { type SearchAlgorithm, unsortedAlgos, sortedAlgos } from "$lib/algos";
	import { finalResult, hideTiles } from "$lib/main";
	import { mergeSort } from "$lib/utils";

	function go(): void {
		if (target.value === "" || isNaN(Number(target.value)))
			steps.value[0].resultContent = "Input valid target number";
		else {
			steps.value[0].resultContent = "";
			let returnedIndex: number = -1;
			const searchFunction: SearchAlgorithm =
				unsortedAlgos[algorithm.value] || sortedAlgos[algorithm.value];
			if (searchFunction) {
				if (sortedAlgos[algorithm.value]) {
					steps.value[0].tileContents = mergeSort(steps.value[0].tileContents as number[]);
				}
				hideTiles();
				returnedIndex = searchFunction(Number(target.value), [
					...steps.value[0].tileContents
				] as number[]);
			} else throw new Error(`Algorithm ${algorithm.value} has no matching key.`);
			finalResult(Number(target.value), returnedIndex);
			stepsIndexer.value = 1;
		}
	}
</script>

<button onclick={go}>Go</button>
