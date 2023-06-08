async function exponentialSearch(target) {
  if (!isSorted(arr)) {
    sort();
    await sleep(2000);
  }
  questionMarks();
  await sleep(2000);

  colorPivot(0);
  await sleep(500);
  if (arr[0] === target) {
    found(target, 0);
    return;
  }
  color("white", 0, 0);
  await sleep(500);

  let i = 1;
  while (arr[i] <= target && i < arr.length) {
    colorPivot(i);
    await sleep(500);
    if (arr[i] === target) {
      found(target, i);
      return;
    }
    color("white", 0, i);
    await sleep(500);
    i = i * 2;
  }

  oobColor(i);
  await sleep(4000);

  // Binary search:
  let leftIndex = (i * .5) + 1;
  let rightIndex = Math.min(i - 1, arr.length - 1);
  
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
    } else {
      color("white", 0, pivot);
      await sleep(2000);
      leftIndex = pivot + 1;
    }
  }

  notFound();
  return;
}
