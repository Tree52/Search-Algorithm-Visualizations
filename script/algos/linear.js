function linearSearch(target, A) {
  for (let i = 0; i < A.length; i++) {
    if (i === 0) {
      definePivot(A, i, 0, "$$0$$");
    } else {
      definePivot(A, i, 0, "$$" + (i - 1) + "+1=" + i + "$$");
    }
    colorCodeLine(2);
    saveState();
    if (target === A[i]) {
      colorCodeLine(3);
      found(target, i);
      return;
    }
    colorCodeLine(4);
    colorTiles("white", i, i);
    saveState();
  }

  colorCodeLine(7);
  notFound();
  return;
}
