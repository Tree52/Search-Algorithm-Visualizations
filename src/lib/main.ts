import { stepIndex, steps } from "$lib";

function addStep(): void {
	stepIndex.value++;
	steps.value[stepIndex.value] = {
		tileColors: [...steps.value[stepIndex.value - 1].tileColors],
		tileContents: [...steps.value[stepIndex.value - 1].tileContents],
		resultContent: steps.value[stepIndex.value - 1].resultContent,
		metaTileContents: [...steps.value[stepIndex.value - 1].metaTileContents]
	};
}

// algos.ts functions:
export function changeTileContent(
	tileIndex: number,
	newContent: number | null,
	stepless?: boolean | undefined
): void {
	if (!stepless) addStep();
	steps.value[stepIndex.value].tileContents[tileIndex] = newContent;
}

export function revealTile(tileIndex: number, stepless?: boolean | undefined): void {
	if (!stepless) addStep();
	changeTileContent(tileIndex, steps.value[0].tileContents[tileIndex] as number, true);
}

export function colorTile(tileIndex: number, color: string, stepless?: boolean | undefined): void {
	if (!stepless) addStep();
	steps.value[stepIndex.value].tileColors[tileIndex] = color;
	revealTile(tileIndex, true);
}

export function colorTiles(
	startIndex: number,
	endIndex: number,
	color: string,
	stepless?: boolean | undefined
): void {
	if (!stepless) addStep();
	for (let i: number = startIndex; i <= endIndex; i++) colorTile(i, color, true);
}

export function newEmptyTile(): void {
	steps.value[stepIndex.value].metaTileContents.push(null);
}

export function changeEmptyTileContent(
	tileIndex: number,
	content: number | null,
	stepless?: boolean | undefined
): void {
	if (!stepless) addStep();
	steps.value[stepIndex.value].metaTileContents[tileIndex] = content;
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
		steps.value[stepIndex.value].resultContent =
			"Target " + target + " is in the array at index " + targetIndex;
	else steps.value[stepIndex.value].resultContent = "Target is not in the array";
	steps.value[stepIndex.value].metaTileContents = [];
}
