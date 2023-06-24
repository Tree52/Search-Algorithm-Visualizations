function jumpSearch(target, A) {
  let jumpSize = Math.floor(Math.sqrt(A.length));

  let i = 0;
  for (; A[i] <= target; i += jumpSize) {
    if (i === 0) {
      definePivot(A, i, 0, "$$0$$");
    } else {
      definePivot(
        A,
        i,
        0,
        "$$" + (i - jumpSize) + "+" + jumpSize + "=" + i + "$$"
      );
    }
    saveState();
    if (A[i] === target) {
      found(target, i);
      return;
    }
    colorTiles("white", 0, i);
    saveState();
  }

  if (i < A.length) {
    definePivot(
      A,
      i,
      0,
      "$$" + (i - jumpSize) + "+" + jumpSize + "=" + i + "$$"
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
        "$$" + i + "-" + jumpSize + "+1=" + prevIndex + "$$"
      );
    } else {
      definePivot(
        A,
        prevIndex,
        0,
        "$$" + (prevIndex - 1) + "+1=" + prevIndex + "$$"
      );
    }
    saveState();
    if (A[prevIndex] === target) {
      found(target, prevIndex);
      return;
    }
    colorTiles("white", prevIndex, prevIndex);
    saveState();
  }

  notFound();
  return;
}
