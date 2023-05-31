async function binarySearch(target) {
  if (!isSorted(arr)) {
    sort();
    await sleep(2000);
  }
  questionMarks();
  await sleep(2000);

  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (rightIndex >= leftIndex) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    colorPivot(pivot);
    await sleep(2000);

    if (target < arr[pivot]) {
      color("white", pivot, arr.length - 1);
      await sleep(2000);
      rightIndex = pivot - 1;
    } else if (target === arr[pivot]) {
      found(target, pivot);
      return;
    } else if (target > arr[pivot]) {
      color("white", 0, pivot);
      await sleep(2000);
      leftIndex = pivot + 1;
    } else {
      throw new Error("Error in binarySearch function");
    }
  }

  notFound();
  return;
}
