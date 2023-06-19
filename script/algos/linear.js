function linearSearch(target, A) {
  for (let i = 0; i < A.length; i++) {
    if (i === 0) {
      definePivot(A, i, 0, "$$0$$");
    } else {
      definePivot(A, i, 0, "$$" + (i - 1) + "+1=" + i + "$$");
    }
    saveState();
    if (target === A[i]) {
      found(target, i);
      return;
    }
    color("white", i, i);
    saveState();
  }

  notFound();
  return;
}
