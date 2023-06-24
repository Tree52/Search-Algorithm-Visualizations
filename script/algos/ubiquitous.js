function ubiquitousSearch(target, A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;

  while (rightIndex - leftIndex > 1) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    colorTiles("lightgreen", pivot, pivot);
    equationHTML(
      1,
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
    document.getElementById("tile" + pivot).firstChild.data = A[pivot];
    saveState();

    if (A[pivot] <= target) {
      colorTiles("white", 0, pivot - 1);
      saveState();
      colorTiles("rgb(60, 60, 60)", pivot, pivot);
      leftIndex = pivot;
    } else {
      colorTiles("white", pivot + 1, A.length - 1);
      saveState();
      colorTiles("rgb(60, 60, 60)", pivot, pivot);
      rightIndex = pivot;
    }
  }

  equationHTML(0, "");
  definePivot(A, leftIndex, 0, "$$" + leftIndex + "$$");
  saveState();
  if (A[leftIndex] === target) {
    found(target, leftIndex);
    return;
  }
  colorTiles("white", leftIndex, leftIndex);
  saveState();

  definePivot(A, rightIndex, 0, "$$" + rightIndex + "$$");
  saveState();
  if (A[rightIndex] === target) {
    found(target, rightIndex);
    return;
  }
  colorTiles("white", rightIndex, rightIndex);
  saveState();

  notFound();
  return;
}
