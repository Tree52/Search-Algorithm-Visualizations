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
      return -1;
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
  return -1;
}

// prettier-ignore
function interpolationCode() {
  newCodeLine("function interpolationSearch(target, A) {");
  newCodeLine("&emsp;let leftIndex = 0;");
  newCodeLine("&emsp;let rightIndex = A.length - 1;");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;while (");
  newCodeLine("&emsp;&emsp;leftIndex <= rightIndex &&");
  newCodeLine("&emsp;&emsp;target >= A[leftIndex] &&");
  newCodeLine("&emsp;&emsp;target <= A[rightIndex]");
  newCodeLine("&emsp;) {");
  newCodeLine("&emsp;&emsp;if (leftIndex === rightIndex) {");
  newCodeLine("&emsp;&emsp;&emsp;if (A[leftIndex] === target) {");
  newCodeLine("&emsp;&emsp;&emsp;&emsp;return leftIndex;");
  newCodeLine("&emsp;&emsp;&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;&emsp;return -1;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;let pivot =");
  newCodeLine("&emsp;&emsp;&emsp;leftIndex +");
  newCodeLine("&emsp;&emsp;&emsp;Math.floor(");
  newCodeLine("&emsp;&emsp;&emsp;&emsp;((target - A[leftIndex]) * (rightIndex - leftIndex)) /");
  newCodeLine("&emsp;&emsp;&emsp;&emsp;&emsp;(A[rightIndex] - A[leftIndex])");
  newCodeLine("&emsp;&emsp;&emsp;);");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;if (A[pivot] === target) {");
  newCodeLine("&emsp;&emsp;&emsp;return pivot;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;if (A[pivot] < target) {");
  newCodeLine("&emsp;&emsp;&emsp;leftIndex = pivot + 1;");
  newCodeLine("&emsp;&emsp;} else {");
  newCodeLine("&emsp;&emsp;&emsp;rightIndex = pivot - 1;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;return -1;");
  newCodeLine("}");
}
