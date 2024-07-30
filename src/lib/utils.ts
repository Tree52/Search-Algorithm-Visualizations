export function getRandomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function stringToNumberArray(input: string): number[] {
  return input
    .split(",")
    .map((str) => parseFloat(str.trim()))
    .filter((num) => !isNaN(num));
}

function merge(left: number[], right: number[]): number[] {
  const sortedArray: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      sortedArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      sortedArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    sortedArray.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    sortedArray.push(right[rightIndex]);
    rightIndex++;
  }

  return sortedArray;
}

export function mergeSort(array: number[]): number[] {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const leftArray = array.slice(0, middle);
  const rightArray = array.slice(middle);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

export function sanitizeInput(s: string, allowedChars: string): string {
  const regex = new RegExp(`[^${allowedChars}]`, "g");
  return s.replace(regex, "");
}
