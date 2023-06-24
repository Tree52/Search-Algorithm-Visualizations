function ternarySearch(target, A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;

  while (rightIndex >= leftIndex) {
    let pivot1 = leftIndex + Math.floor((rightIndex - leftIndex) / 3);
    let pivot2 = rightIndex - Math.floor((rightIndex - leftIndex) / 3);

    definePivot(
      A,
      pivot1,
      0,
      "$$" +
        leftIndex +
        "+\\left\\lfloor\\frac{" +
        rightIndex +
        "-" +
        leftIndex +
        "}{3}\\right\\rfloor=" +
        pivot1 +
        "$$"
    );
    definePivot(
      A,
      pivot2,
      1,
      "$$" +
        rightIndex +
        "-\\left\\lfloor\\frac{" +
        rightIndex +
        "-" +
        leftIndex +
        "}{3}\\right\\rfloor=" +
        pivot2 +
        "$$"
    );
    saveState();
    if (A[pivot1] === target) {
      found(target, pivot1);
      return pivot1;
    }

    if (A[pivot2] === target) {
      found(target, pivot2);
      return pivot2;
    }

    if (target < A[pivot1]) {
      rightIndex = pivot1 - 1;
      colorTiles("white", pivot1, A.length - 1);
      saveState();
    } else if (target > A[pivot2]) {
      leftIndex = pivot2 + 1;
      colorTiles("white", 0, pivot2);
      saveState();
    } else {
      leftIndex = pivot1 + 1;
      rightIndex = pivot2 - 1;
      colorTiles("white", 0, pivot1);
      colorTiles("white", pivot2, A.length - 1);
      saveState();
    }
  }

  notFound();
  return;
}
