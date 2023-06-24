function interpolationSearch(target, A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;

  colorTiles("lightgreen", leftIndex, leftIndex);
  document.getElementById("tile" + leftIndex).firstChild.data = A[leftIndex];
  colorTiles("lightgreen", rightIndex, rightIndex);
  document.getElementById("tile" + rightIndex).firstChild.data = A[rightIndex];
  saveState();
  while (
    leftIndex <= rightIndex &&
    target >= A[leftIndex] &&
    target <= A[rightIndex]
  ) {
    if (leftIndex === rightIndex) {
      definePivot(A, leftIndex, 0, "$$" + leftIndex + "$$");
      saveState();
      if (A[leftIndex] === target) {
        found(target, leftIndex);
        return leftIndex;
      }
      colorTiles("white", leftIndex, leftIndex);
      saveState();
      notFound();
      return;
    }

    let pivot =
      leftIndex +
      Math.floor(
        ((target - A[leftIndex]) * (rightIndex - leftIndex)) /
          (A[rightIndex] - A[leftIndex])
      );

    definePivot(
      A,
      pivot,
      0,
      "$$" +
        leftIndex +
        "+\\left\\lfloor\\frac{(" +
        target +
        "-" +
        A[leftIndex] +
        ")(" +
        rightIndex +
        "-" +
        leftIndex +
        ")}{" +
        A[rightIndex] +
        "-" +
        A[leftIndex] +
        "}\\right\\rfloor=" +
        pivot +
        "$$"
    );
    saveState();
    if (A[pivot] === target) {
      found(target, pivot);
      return pivot;
    }

    if (A[pivot] < target) {
      colorTiles("white", 0, pivot);
      leftIndex = pivot + 1;
      colorTiles("lightgreen", leftIndex, leftIndex);
      document.getElementById("tile" + leftIndex).firstChild.data =
        A[leftIndex];
      saveState();
    } else {
      colorTiles("white", pivot, A.length - 1);
      rightIndex = pivot - 1;
      colorTiles("lightgreen", rightIndex, rightIndex);
      document.getElementById("tile" + rightIndex).firstChild.data =
        A[rightIndex];
      saveState();
    }
  }

  colorTiles("white", 0, A.length - 1);
  saveState();
  notFound();
  return;
}
