function fibSearch(target, A) {
  let fibA = 0;
  let fibB = 1;
  let fibC = fibA + fibB;

  while (fibC < A.length) {
    fibA = fibB;
    fibB = fibC;
    fibC = fibA + fibB;
  }

  let eliminatedFrontIndex = -1;

  while (fibC > 1) {
    let pivot = Math.min(eliminatedFrontIndex + fibA, A.length - 1);
    definePivot(
      A,
      pivot,
      0,
      "$$min\\left \\{" +
        eliminatedFrontIndex +
        "+" +
        fibA +
        ",\\:" +
        (A.length - 1) +
        "\\right \\}=" +
        pivot +
        "$$"
    );
    saveState();

    if (target < A[pivot]) {
      color("white", pivot, A.length - 1);
      saveState();
      fibC = fibA;
      fibB = fibB - fibA;
      fibA = fibC - fibB;
    } else if (A[pivot] === target) {
      found(target, pivot);
      return;
    } else {
      color("white", 0, pivot);
      saveState();
      fibC = fibB;
      fibB = fibA;
      fibA = fibC - fibB;
      eliminatedFrontIndex = pivot;
    }
  }

  // Without the following, algo breaks in edge case.
  // Edge case: A.length === 1, 2, 3, 5, 8, etc., and target === last element in A.
  // Examples:
  // target = 0, A = [0]. "Target is not in Aay."
  // target = 2, A = [0, 1, 2]. "Target is not in Aay."
  definePivot(A, A.length - 1, 0, "$$" + (A.length - 1) + "$$");
  saveState();
  if (A[A.length - 1] === target) {
    found(target, A.length - 1);
    return;
  }
  color("white", A.length - 1, A.length - 1);
  saveState();

  notFound();
  return;
}
