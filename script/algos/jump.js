function jumpSearch(target, A) {
  let jumpSize = Math.floor(Math.sqrt(A.length));

  let i = 0;
  for (; A[i] <= target; i += jumpSize) {
    if (i === 0) {
      definePivot(A, i, 0, "$$i=0$$");
    } else {
      definePivot(
        A,
        i,
        0,
        "$$i=" + (i - jumpSize) + "+" + jumpSize + "=" + i + "$$"
      );
    }
    saveState();
    if (A[i] === target) {
      found(target, i);
      return i;
    }
    colorTiles("white", 0, i);
    saveState();
  }

  if (i < A.length) {
    definePivot(
      A,
      i,
      0,
      "$$i=" + (i - jumpSize) + "+" + jumpSize + "=" + i + "$$"
    );
    saveState();
    colorTiles("white", i, A.length - 1);
    saveState();
  }

  // Linear Search:
  for (
    let prevIndex = i - jumpSize + 1;
    prevIndex < i && prevIndex !== A.length && prevIndex >= 0;
    prevIndex++
  ) {
    if (prevIndex === i - jumpSize + 1) {
      definePivot(
        A,
        prevIndex,
        0,
        "$$prevIndex=" + i + "-" + jumpSize + "+1=" + prevIndex + "$$"
      );
    } else {
      definePivot(
        A,
        prevIndex,
        0,
        "$$prevIndex=" + (prevIndex - 1) + "+1=" + prevIndex + "$$"
      );
    }
    saveState();
    if (A[prevIndex] === target) {
      found(target, prevIndex);
      return prevIndex;
    }
    colorTiles("white", prevIndex, prevIndex);
    saveState();
  }

  notFound();
  return -1;
}

// prettier-ignore
function jumpCode() {
  newCodeLine("function jumpSearch(target, A) {");
  newCodeLine("&emsp;let jumpSize = Math.floor(Math.sqrt(A.length));");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;let i = 0;");
  newCodeLine("&emsp;for (; A[i] <= target; i += jumpSize) {");
  newCodeLine("&emsp;&emsp;if (A[i] === target) {");
  newCodeLine("&emsp;&emsp;&emsp;return i;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;// Linear Search:");
  newCodeLine("&emsp;for (");
  newCodeLine("&emsp;&emsp;let prevIndex = i - jumpSize + 1;");
  newCodeLine("&emsp;&emsp;prevIndex < i && prevIndex !== A.length && prevIndex >= 0;");
  newCodeLine("&emsp;&emsp;prevIndex++");
  newCodeLine("&emsp;) {");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;if (A[prevIndex] === target) {");
  newCodeLine("&emsp;&emsp;&emsp;return prevIndex;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;return -1;");
  newCodeLine("}");
}
