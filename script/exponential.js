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
  let leftIndex = (i >> 1) + 1;
  let rightIndex = i - 1;

  while (rightIndex >= leftIndex) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2); 
    
    if (pivot >= arr.length) {
      oobColor(pivot);
      await sleep(4000);
    } else {
      colorPivot(pivot);
    await sleep(2000);
    }
    
    if (arr[pivot] === undefined) {
      rightIndex = pivot - 1;
    } else if (target < arr[pivot]) {
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
