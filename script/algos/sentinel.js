function sentinelSearch(target, A) {
  let last = A[A.length - 1];
  document.getElementById("tile" + (A.length - 1)).firstChild.data = "";
  saveState();

  A[A.length - 1] = target;
  document.getElementById("tile" + (A.length - 1)).firstChild.data = target;
  saveState();

  let i = 0;
  while (1) {
    if (i === 0) {
      definePivot(A, i, 0, "$$0$$");
    } else {
      definePivot(A, i, 0, "$$" + (i - 1) + "+1=" + i + "$$");
    }
    saveState();
    if (A[i] === target) {
      break;
    }
    color("white", i, i);
    saveState();
    i++;
  }

  document.getElementById("tile" + (A.length - 1)).firstChild.data = "";
  color("rgb(60, 60, 60)", A.length - 1, A.length - 1);
  saveState();

  A[A.length - 1] = last;
  document.getElementById("tile" + (A.length - 1)).firstChild.data = "?";
  saveState();

  definePivot(A, i, 0, "$$" + (i - 1) + "+1=" + i + "$$");
  saveState();
  if (i < A.length - 1 || A[A.length - 1] === target) {
    found(target, i);
    return;
  }
  color("white", i, i);
  saveState();

  notFound();
  return;
}
