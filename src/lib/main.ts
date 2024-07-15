import { stepsIndexer, steps } from "./refs.svelte";

function addStep(): void {
	stepsIndexer.value++;
	steps.value[stepsIndexer.value] = {
		tileColors: [...steps.value[stepsIndexer.value - 1].tileColors],
		tileContents: [...steps.value[stepsIndexer.value - 1].tileContents],
		resultContent: steps.value[stepsIndexer.value - 1].resultContent,
		metaTileContents: [...steps.value[stepsIndexer.value - 1].metaTileContents]
	};
}

// algos.ts functions:
export function changeTileContent(
	tileIndex: number,
	newContent: number | null,
	isStepless?: boolean | undefined
): void {
	if (!isStepless) addStep();
	steps.value[stepsIndexer.value].tileContents[tileIndex] = newContent;
}

export function revealTile(tileIndex: number, isStepless?: boolean | undefined): void {
	if (!isStepless) addStep();
	changeTileContent(tileIndex, steps.value[0].tileContents[tileIndex] as number, true);
}

export function colorTile(
	tileIndex: number,
	color: string,
	isStepless?: boolean | undefined
): void {
	if (!isStepless) addStep();
	steps.value[stepsIndexer.value].tileColors[tileIndex] = color;
	revealTile(tileIndex, true);
}

export function colorTiles(
	startIndex: number,
	endIndex: number,
	color: string,
	isStepless?: boolean | undefined
): void {
	if (!isStepless) addStep();
	for (let i: number = startIndex; i <= endIndex; i++) colorTile(i, color, true);
}

export function newEmptyTile(): void {
	steps.value[stepsIndexer.value].metaTileContents.push(null);
}

export function changeEmptyTileContent(
	tileIndex: number,
	content: number | null,
	isStepless?: boolean | undefined
): void {
	if (!isStepless) addStep();
	steps.value[stepsIndexer.value].metaTileContents[tileIndex] = content;
}

// Go.svelte functions:
export function hideTiles(): void {
	addStep();
	for (let i: number = 0; i < steps.value[0].tileColors.length; i++)
		changeTileContent(i, null, true);
}

export function finalResult(target: number, targetIndex: number): void {
	addStep();
	if (targetIndex !== -1)
		steps.value[stepsIndexer.value].resultContent =
			"Target " + target + " is in the array at index " + targetIndex;
	else steps.value[stepsIndexer.value].resultContent = "Target is not in the array";
	steps.value[stepsIndexer.value].metaTileContents = [];
}
