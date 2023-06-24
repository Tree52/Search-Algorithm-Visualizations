function exponentialSearch(target, A) {
  definePivot(A, 0, 0, "$$0$$");
  saveState();
  if (A[0] === target) {
    found(target, 0);
    return;
  }
  colorTiles("white", 0, 0);
  saveState();

  let i = 1;
  while (A[i] <= target && i < A.length) {
    if (i === 1) {
      definePivot(A, i, 0, "$$1$$");
    } else {
      definePivot(A, i, 0, "$$" + i / 2 + "*2=" + i + "$$");
    }
    saveState();
    if (A[i] === target) {
      found(target, i);
      return;
    }
    colorTiles("white", 0, i);
    saveState();
    i = i * 2;
  }

  // Binary search:
  let leftIndex = i * 0.5 + 1;
  let rightIndex = Math.min(i - 1, A.length - 1);

  while (rightIndex >= leftIndex) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    definePivot(
      A,
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
    saveState();

    if (target < A[pivot]) {
      colorTiles("white", pivot, A.length - 1);
      saveState();
      rightIndex = pivot - 1;
    } else if (target === A[pivot]) {
      found(target, pivot);
      return;
    } else {
      colorTiles("white", 0, pivot);
      saveState();
      leftIndex = pivot + 1;
    }
  }

  notFound();
  return;
}
