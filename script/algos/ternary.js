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
  return -1;
}

// prettier-ignore
function ternaryCode() {
  newCodeLine("function ternarySearch(target, A) {");
  newCodeLine("&emsp;let leftIndex = 0;");
  newCodeLine("&emsp;let rightIndex = A.length - 1;");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;while (rightIndex >= leftIndex) {");
  newCodeLine("&emsp;&emsp;let pivot1 = leftIndex + Math.floor((rightIndex - leftIndex) / 3);");
  newCodeLine("&emsp;&emsp;let pivot2 = rightIndex - Math.floor((rightIndex - leftIndex) / 3);");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;if (A[pivot1] === target) {");
  newCodeLine("&emsp;&emsp;&emsp;return pivot1;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;if (A[pivot2] === target) {");
  newCodeLine("&emsp;&emsp;&emsp;return pivot2;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;if (target < A[pivot1]) {");
  newCodeLine("&emsp;&emsp;&emsp;rightIndex = pivot1 - 1;");
  newCodeLine("&emsp;&emsp;} else if (target > A[pivot2]) {");
  newCodeLine("&emsp;&emsp;&emsp;leftIndex = pivot2 + 1;");
  newCodeLine("&emsp;&emsp;} else {");
  newCodeLine("&emsp;&emsp;&emsp;leftIndex = pivot1 + 1;");
  newCodeLine("&emsp;&emsp;&emsp;rightIndex = pivot2 - 1;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;return -1;");
  newCodeLine("}");
}
