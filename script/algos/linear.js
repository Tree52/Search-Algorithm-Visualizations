function linearSearch(target, A) {
  for (let i = 0; i < A.length; i++) {
    if (i === 0) {
      definePivot(A, i, 0, "$$i=0$$");
    } else {
      definePivot(A, i, 0, "$$i=" + (i - 1) + "+1=" + i + "$$");
    }
    // colorCodeLine(2);
    saveState();
    if (target === A[i]) {
      // colorCodeLine(3);
      found(target, i);
      return i;
    }
    // colorCodeLine(4);
    colorTiles("white", i, i);
    saveState();
  }

  // colorCodeLine(7);
  notFound();
  return -1;
}

// prettier-ignore
function linearCode() {
  newCodeLine("function linearSearch(target, A) {");
  newCodeLine("&emsp;for (let i = 0; i < A.length; i++) {");
  newCodeLine("&emsp;&emsp;if (target === A[i]) {");
  newCodeLine("&emsp;&emsp;&emsp;return i;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;return -1;");
  newCodeLine("}");
}
