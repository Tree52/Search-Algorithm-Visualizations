async function fibSearch(target) {
  if (!isSorted(arr)) {
    sort();
    await sleep(2000);
  }
  questionMarks();
  await sleep(2000);

  let fibA = 0;
  let fibB = 1;
  let fibC = fibA + fibB;

  while (fibC < arr.length) {
    fibA = fibB;
    fibB = fibC;
    fibC = fibA + fibB;
  }

  let eliminatedFrontIndex = -1;

  while (fibC > 1) {
    // If all tiles eliminated.
    if (eliminatedFrontIndex + 1 === arr.length) {
      notFound();
      return;
    }

    let pivot = Math.min(eliminatedFrontIndex + fibA, arr.length - 1);
    colorPivot(pivot);
    await sleep(2000);

    if (target < arr[pivot]) {
      color("white", pivot, arr.length - 1);
      await sleep(2000);
      fibC = fibA;
      fibB = fibB - fibA;
      fibA = fibC - fibB;
    } else if (arr[pivot] === target) {
      found(target, pivot);
      return;
    } else {
      color("white", 0, pivot);
      await sleep(2000);
      fibC = fibB;
      fibB = fibA;
      fibA = fibC - fibB;
      eliminatedFrontIndex = pivot;
    }
  }

  // Without the following, algo breaks in edge case.
  // Edge case: arr.length === 1, 2, 3, 5, 8, etc., and target === last element in arr.
  // Examples:
  // target = 0, arr = [0]. "Target is not in array."
  // target = 2, arr = [0, 1, 2]. "Target is not in array."

  // If final element hasn't been eliminated. Check it.
  if (eliminatedFrontIndex + 1 === arr.length - 1) {
    colorPivot(arr.length - 1);
    await sleep(2000);
    if (arr[arr.length - 1] === target) {
      found(target, arr.length - 1);
      return;
    }
    color("white", arr.length - 1, arr.length - 1);
    await sleep(2000);
  }

  notFound();
  return;
}
