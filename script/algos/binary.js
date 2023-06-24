function binarySearch(target, A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;

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
