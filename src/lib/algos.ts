import { colorTile, colorTiles, changeTileContent, revealTile, newEmptyTile, changeEmptyTileContent } from "./main";

export type SearchAlgorithm = (target: number, A: number[], leftIndex?: number, rightIndex?: number) => number;

const linear: SearchAlgorithm = (target, A) => {
	for (let i: number = 0; i < A.length; i++) {
		colorTile(i, "green");
		if (target === A[i]) return i;
		colorTile(i, "white");
	}

	return -1;
};

const sentinel: SearchAlgorithm = (target, A) => {
	const last: number = A[A.length - 1];
	A[A.length - 1] = target;
	changeTileContent(A.length - 1, target);

	let i: number = 0;
	if (A.length !== 1) revealTile(i);
	while (A[i] !== target) {
		colorTile(i, "white");
		i++;
		if (i !== A.length - 1) revealTile(i);
	}

	A[A.length - 1] = last;
	changeTileContent(A.length - 1, null);

	if (i === A.length - 1) colorTile(A.length - 1, "green");
	if (i < A.length - 1 || A[A.length - 1] === target) return i;
	colorTile(A.length - 1, "white");

	return -1;
};

const binary: SearchAlgorithm = (target, A, leftIndex = 0, rightIndex = A.length - 1) => {
	while (rightIndex >= leftIndex) {
		const pivot: number = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
		colorTile(pivot, "green");

		if (target < A[pivot]) {
			colorTiles(pivot, A.length - 1, "white");
			rightIndex = pivot - 1;
		} else if (target === A[pivot]) {
			return pivot;
		} else {
			colorTiles(0, pivot, "white");
			leftIndex = pivot + 1;
		}
	}

	return -1;
};

const exponential: SearchAlgorithm = (target, A) => {
	let i: number = 1;
	if (i < A.length) revealTile(i);
	while (i < A.length && A[i] <= target) {
		colorTiles(0, i - 1, "white");
		i = i * 2;
		if (i < A.length) revealTile(i);
	}

	if (i < A.length - 1) colorTiles(i + 1, A.length - 1, "white");

	return binary(target, A, Math.floor(i / 2), Math.min(i, A.length - 1));
};

const fibonacci: SearchAlgorithm = (target, A) => {
	let fibA: number = 0;
	let fibB: number = 1;
	let fibC: number = fibA + fibB;

	while (fibC < A.length) {
		fibA = fibB;
		fibB = fibC;
		fibC = fibA + fibB;
	}

	let eliminatedFrontIndex: number = -1;

	while (fibC > 1) {
		const pivot: number = Math.min(eliminatedFrontIndex + fibA, A.length - 1);
		colorTile(pivot, "green");

		if (target < A[pivot]) {
			colorTiles(pivot, A.length - 1, "white");
			fibC = fibA;
			fibB = fibB - fibA;
			fibA = fibC - fibB;
		} else if (A[pivot] === target) {
			return pivot;
		} else {
			colorTiles(0, pivot, "white");
			fibC = fibB;
			fibB = fibA;
			fibA = fibC - fibB;
			eliminatedFrontIndex = pivot;
		}
	}

	colorTile(A.length - 1, "green");
	if (fibB && A[A.length - 1] === target) return A.length - 1;
	colorTile(A.length - 1, "white");

	return -1;
};

const interpolation: SearchAlgorithm = (target, A, leftIndex = 0, rightIndex = A.length - 1) => {
	revealTile(leftIndex);
	revealTile(rightIndex, true);
	while (leftIndex <= rightIndex && target >= A[leftIndex] && target <= A[rightIndex]) {
		if (leftIndex === rightIndex) {
			colorTile(leftIndex, "green");
			if (A[leftIndex] === target) return leftIndex;
			colorTile(leftIndex, "white");
			return -1;
		}

		const pivot: number = leftIndex + Math.floor(((target - A[leftIndex]) * (rightIndex - leftIndex)) / (A[rightIndex] - A[leftIndex]));

		colorTile(pivot, "green");
		if (A[pivot] === target) return pivot;

		if (A[pivot] < target) {
			colorTiles(0, pivot, "white");
			leftIndex = pivot + 1;
			revealTile(leftIndex);
		} else {
			colorTiles(pivot, A.length - 1, "white");
			rightIndex = pivot - 1;
			revealTile(rightIndex);
		}
	}

	colorTiles(0, A.length - 1, "white");
	return -1;
};

const jump: SearchAlgorithm = (target, A) => {
	let j: number = Math.floor(Math.sqrt(A.length));

	let i: number = 0;
	revealTile(Math.min(j, A.length) - 1);
	while (A[Math.min(j, A.length) - 1] < target) {
		colorTiles(0, Math.min(j, A.length) - 1, "white");
		i = j;
		j += Math.floor(Math.sqrt(A.length));
		if (i >= A.length) return -1;
		revealTile(Math.min(j, A.length) - 1);
	}

	if (j < A.length - 1) {
		colorTiles(j, A.length - 1, "white");
		revealTile(i);
	}
	while (A[i] < target) {
		colorTile(i, "white");
		i++;
		if (i === Math.min(j, A.length)) return -1;
		if (i !== j - 1 && i !== A.length - 1) revealTile(i);
	}

	colorTile(i, "green");
	if (A[i] === target) return i;
	colorTiles(0, A.length - 1, "white");

	return -1;
};

const meta: SearchAlgorithm = (target, A) => {
	const numBitsNeededForMaxIndex: number = Math.ceil(Math.log2(A.length));

	for (let i: number = 0; i < numBitsNeededForMaxIndex; i++) newEmptyTile();

	let cutoff: number = 0;
	for (let i: number = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
		colorTile(cutoff, "green");
		if (A[cutoff] === target) return cutoff;
		colorTiles(0, cutoff, "white");

		const cutoffCandidate: number = cutoff | (1 << i);

		if (cutoffCandidate < A.length) revealTile(cutoffCandidate);

		if (cutoffCandidate < A.length && A[cutoffCandidate] <= target) {
			cutoff = cutoffCandidate;
			changeEmptyTileContent(numBitsNeededForMaxIndex - 1 - i, 1);
			continue;
		}
		colorTiles(cutoffCandidate, A.length - 1, "white");
		changeEmptyTileContent(numBitsNeededForMaxIndex - 1 - i, 0, true);
	}

	colorTile(cutoff, "green");
	if (A[cutoff] === target) return cutoff;
	colorTile(cutoff, "white");

	return -1;
};

const ternary: SearchAlgorithm = (target, A, leftIndex = 0, rightIndex = A.length - 1) => {
	while (rightIndex >= leftIndex) {
		const pivot1: number = leftIndex + Math.floor((rightIndex - leftIndex) / 3);
		const pivot2: number = rightIndex - Math.floor((rightIndex - leftIndex) / 3);

		colorTile(pivot1, "green");
		colorTile(pivot2, "green", true);
		if (A[pivot1] === target) return pivot1;
		if (A[pivot2] === target) return pivot2;

		if (target < A[pivot1]) {
			rightIndex = pivot1 - 1;
			colorTiles(pivot1, A.length - 1, "white");
		} else if (target > A[pivot2]) {
			leftIndex = pivot2 + 1;
			colorTiles(0, pivot2, "white");
		} else {
			leftIndex = pivot1 + 1;
			rightIndex = pivot2 - 1;
			colorTiles(0, pivot1, "white");
			colorTiles(pivot2, A.length - 1, "white", true);
		}
	}

	return -1;
};

const ubiquitous: SearchAlgorithm = (target, A, leftIndex = 0, rightIndex = A.length - 1) => {
	while (rightIndex - leftIndex > 1) {
		const pivot: number = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
		revealTile(pivot);

		if (A[pivot] <= target) {
			colorTiles(0, pivot - 1, "white");
			leftIndex = pivot;
		} else {
			colorTiles(pivot + 1, A.length - 1, "white");
			rightIndex = pivot;
		}
	}

	colorTile(leftIndex, "green");
	if (A[leftIndex] === target) return leftIndex;
	colorTile(leftIndex, "white");

	colorTile(rightIndex, "green");
	if (A[rightIndex] === target) return rightIndex;
	colorTile(rightIndex, "white");

	return -1;
};

export const unsortedAlgos: { [key: string]: SearchAlgorithm } = {
	Linear: linear,
	Sentinel: sentinel
};

export const sortedAlgos: { [key: string]: SearchAlgorithm } = {
	Binary: binary,
	Exponential: exponential,
	Fibonacci: fibonacci,
	Interpolation: interpolation,
	Jump: jump,
	Meta: meta,
	Ternary: ternary,
	Ubiquitous: ubiquitous
};
