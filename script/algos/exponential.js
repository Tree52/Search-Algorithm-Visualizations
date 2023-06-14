async function exponentialSearch(target) {
  if (!isSorted(arr)) {
    sort();
    await sleep(2000);
  }
  questionMarks();
  await sleep(2000);

  definePivot(0, 0, "$$0$$");
  await sleep(500);
  if (arr[0] === target) {
    found(target, 0);
    return;
  }
  color("white", 0, 0);
  await sleep(500);

  let i = 1;
  while (arr[i] <= target && i < arr.length) {
    if (i === 1) {
      definePivot(i, 0, "$$1$$");
    } else {
      definePivot(i, 0, "$$" + i / 2 + "*2=" + i + "$$");
    }
    await sleep(500);
    if (arr[i] === target) {
      found(target, i);
      return;
    }
    color("white", 0, i);
    await sleep(500);
    i = i * 2;
  }

  if (i === 1) {
    oobColor(i, 0, "$$1$$");
  } else {
    oobColor(i, 0, "$$" + i / 2 + "*2=" + i + "$$");
  }
  await sleep(4000);

  // Binary search:
  let leftIndex = i * 0.5 + 1;
  let rightIndex = Math.min(i - 1, arr.length - 1);

  while (rightIndex >= leftIndex) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    definePivot(
      pivot,
      0,
      "$$" +
        leftIndex +
        "-\\left\\lfloor\\frac{" +
        rightIndex +
        "-" +
        leftIndex +
        "}{2}\\right\\rfloor=" +
        pivot +
        "$$"
    );
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
