async function oneSidedSearch(target) {
  sort();
  await sleep(2000);

  let i = 0;
  let count = 0;
  while (arr[i] <= target) {
    color("green", i, i);
    await sleep(500);
    if (arr[i] === target) {
      found(target, i);
      return;
    }
    color("white", 0, i);
    await sleep(500);
    i = 1 << count;
    count++;
  }

  outOfBoundsColor(i);
  await sleep(4000);

  // Binary search:
  let leftIndex = (i >> 1) + 1;
  let rightIndex = i - 1;

  while (rightIndex >= leftIndex) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);

    if (rightIndex > arr.length) {
      outOfBoundsColor2(leftIndex, pivot, rightIndex);
      await sleep(4000);
    } else {
      orangeGreenIndigoColor(leftIndex, pivot, rightIndex);
      await sleep(2000);
    }

    if (target < arr[pivot] || arr[pivot] === undefined) {
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
      throw new Error("Error in oneSidedSearch function");
    }
  }

  notFound();
  return;
}
