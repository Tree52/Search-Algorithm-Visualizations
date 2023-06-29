function binarySearch(target, A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;

  while (rightIndex >= leftIndex) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    definePivot(
      A,
      pivot,
      0,
      "$$pivot=" +
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
      return pivot;
    } else {
      colorTiles("white", 0, pivot);
      saveState();
      leftIndex = pivot + 1;
    }
  }

  notFound();
  return -1;
}

// prettier-ignore
function binaryCode() {
  newCodeLine("function binarySearch(target, A) {");
  newCodeLine("&emsp;let leftIndex = 0;");
  newCodeLine("&emsp;let rightIndex = A.length - 1;");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;while (rightIndex >= leftIndex) {");
  newCodeLine("&emsp;&emsp;let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;if (target < A[pivot]) {");
  newCodeLine("&emsp;&emsp;&emsp;rightIndex = pivot - 1;");
  newCodeLine("&emsp;&emsp;} else if (target === A[pivot]) {");
  newCodeLine("&emsp;&emsp;&emsp;return i;");
  newCodeLine("&emsp;&emsp;} else {");
  newCodeLine("&emsp;&emsp;&emsp;leftIndex = pivot + 1;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;return -1;");
  newCodeLine("}");
}
