function ubiquitousSearch(target, A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;

  while (rightIndex - leftIndex > 1) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    colorTiles("lightgreen", pivot, pivot);
    equationHTML(
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

  definePivot(A, leftIndex, 0, "$$" + leftIndex + "$$");
  saveState();
  if (A[leftIndex] === target) {
    found(target, leftIndex);
    return leftIndex;
  }
  colorTiles("white", leftIndex, leftIndex);
  saveState();

  definePivot(A, rightIndex, 0, "$$" + rightIndex + "$$");
  saveState();
  if (A[rightIndex] === target) {
    found(target, rightIndex);
    return rightIndex;
  }
  colorTiles("white", rightIndex, rightIndex);
  saveState();

  notFound();
  return -1;
}

// prettier-ignore
function ubiquitousCode() {
  newCodeLine("function ubiquitousSearch(target, A) {");
  newCodeLine("&emsp;let leftIndex = 0;");
  newCodeLine("&emsp;let rightIndex = A.length - 1;");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;while (rightIndex - leftIndex > 1) {");
  newCodeLine("&emsp;&emsp;let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;if (A[pivot] <= target) {");
  newCodeLine("&emsp;&emsp;&emsp;leftIndex = pivot;");
  newCodeLine("&emsp;&emsp;} else {");
  newCodeLine("&emsp;&emsp;&emsp;rightIndex = pivot;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;if (A[leftIndex] === target) {");
  newCodeLine("&emsp;&emsp;return leftIndex;");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;if (A[rightIndex] === target) {");
  newCodeLine("&emsp;&emsp;return rightIndex;");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;return -1;");
  newCodeLine("}");
}
