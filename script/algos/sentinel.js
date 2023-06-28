function sentinelSearch(target, A) {
  let last = A[A.length - 1];
  document.getElementById("tile" + (A.length - 1)).firstChild.data = "";
  // colorCodeLine(1);
  saveState();

  A[A.length - 1] = target;
  document.getElementById("tile" + (A.length - 1)).firstChild.data = target;
  // colorCodeLine(2);
  saveState();

  let i = 0;
  definePivot(A, i, 0, "$$0$$");
  // colorCodeLine(5);
  saveState();
  while (A[i] !== target) {
    colorTiles("white", i, i);
    // colorCodeLine(6);
    saveState();
    i++;
    definePivot(A, i, 0, "$$" + (i - 1) + "+1=" + i + "$$");
    // colorCodeLine(5);
    saveState();
  }

  document.getElementById("tile" + (A.length - 1)).firstChild.data = "";
  colorTiles("rgb(60, 60, 60)", A.length - 1, A.length - 1);
  saveState();

  A[A.length - 1] = last;
  document.getElementById("tile" + (A.length - 1)).firstChild.data = "?";
  saveState();

  if (i === A.length - 1) {
    definePivot(A, i, 0, "$$" + (i - 1) + "+1=" + i + "$$");
    saveState();
  }

  if (i < A.length - 1 || A[A.length - 1] === target) {
    found(target, i);
    return;
  }
  colorTiles("white", i, i);
  saveState();

  notFound();
  return;
}

// prettier-ignore
function sentinelCode() {
  newCodeLine("function sentinelSearch(target, A) {");
  newCodeLine("&emsp;let last = A[A.length - 1];");
  newCodeLine("&emsp;A[A.length - 1] = target;");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;let i = 0;");
  newCodeLine("&emsp;while (A[i] !== target) {");
  newCodeLine("&emsp;&emsp;i++;");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;A[A.length - 1] = last;");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;if (i < A.length - 1 || A[A.length - 1] === target) {");
  newCodeLine("&emsp;&emsp;return i;");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;return -1;");
  newCodeLine("}");
}
