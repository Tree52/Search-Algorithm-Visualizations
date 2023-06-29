function exponentialSearch(target, A) {
  definePivot(A, 0, 0, "$$0$$");
  saveState();
  if (A[0] === target) {
    found(target, 0);
    return 0;
  }
  colorTiles("white", 0, 0);
  saveState();

  let i = 1;
  while (A[i] <= target && i < A.length) {
    if (i === 1) {
      definePivot(A, i, 0, "$$i=1$$");
    } else {
      definePivot(A, i, 0, "$$i=" + i / 2 + "*2=" + i + "$$");
    }
    saveState();
    if (A[i] === target) {
      found(target, i);
      return i;
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
function exponentialCode() {
  newCodeLine("function exponentialSearch(target, A) {");
  newCodeLine("&emsp;if (A[0] === target) {");
  newCodeLine("&emsp;&emsp;return 0;");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;let i = 1;");
  newCodeLine("&emsp;while (A[i] <= target && i < A.length) {");
  newCodeLine("&emsp;&emsp;if (A[i] === target) {");
  newCodeLine("&emsp;&emsp;&emsp;return i;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;i = i * 2;");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;// Binary search:");
  newCodeLine("&emsp;let leftIndex = i * 0.5 + 1;");
  newCodeLine("&emsp;let rightIndex = Math.min(i - 1, A.length - 1);");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;while (rightIndex >= leftIndex) {");
  newCodeLine("&emsp;&emsp;let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;if (target < A[pivot]) {");
  newCodeLine("&emsp;&emsp;&emsp;rightIndex = pivot - 1;");
  newCodeLine("&emsp;&emsp;} else if (target === A[pivot]) {");
  newCodeLine("&emsp;&emsp;&emsp;return pivot;");
  newCodeLine("&emsp;&emsp;} else {");
  newCodeLine("&emsp;&emsp;&emsp;leftIndex = pivot + 1;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;return -1;");
  newCodeLine("}");
}
