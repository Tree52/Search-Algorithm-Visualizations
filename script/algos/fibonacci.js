function fibonacciSearch(target, A) {
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
      colorTiles("white", pivot, A.length - 1);
      saveState();
      fibC = fibA;
      fibB = fibB - fibA;
      fibA = fibC - fibB;
    } else if (A[pivot] === target) {
      found(target, pivot);
      return pivot;
    } else {
      colorTiles("white", 0, pivot);
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
    return A.length - 1;
  }
  colorTiles("white", A.length - 1, A.length - 1);
  saveState();

  notFound();
  return -1;
}

// prettier-ignore
function fibonacciCode() {
  newCodeLine("function fibonacciSearch(target, A) {")
  newCodeLine("&emsp;let fibA = 0;")
  newCodeLine("&emsp;let fibB = 1;")
  newCodeLine("&emsp;let fibC = fibA + fibB;")
  newCodeLine("&nbsp;")
  newCodeLine("&emsp;while (fibC < A.length) {")
  newCodeLine("&emsp;&emsp;fibA = fibB;")
  newCodeLine("&emsp;&emsp;fibB = fibC;")
  newCodeLine("&emsp;&emsp;fibC = fibA + fibB;")
  newCodeLine("&emsp;}")
  newCodeLine("&nbsp;")
  newCodeLine("&emsp;let eliminatedFrontIndex = -1;")
  newCodeLine("&nbsp;")
  newCodeLine("&emsp;while (fibC > 1) {")
  newCodeLine("&emsp;&emsp;let pivot = Math.min(eliminatedFrontIndex + fibA, A.length - 1);")
  newCodeLine("&nbsp;")
  newCodeLine("&emsp;&emsp;if (target < A[pivot]) {")
  newCodeLine("&emsp;&emsp;&emsp;fibC = fibA;")
  newCodeLine("&emsp;&emsp;&emsp;fibB = fibB - fibA;")
  newCodeLine("&emsp;&emsp;&emsp;fibA = fibC - fibB;")
  newCodeLine("&emsp;&emsp;} else if (A[pivot] === target) {")
  newCodeLine("&emsp;&emsp;&emsp;return pivot;")
  newCodeLine("&emsp;&emsp;} else {")
  newCodeLine("&emsp;&emsp;&emsp;fibC = fibB;")
  newCodeLine("&emsp;&emsp;&emsp;fibB = fibA;")
  newCodeLine("&emsp;&emsp;&emsp;fibA = fibC - fibB;")
  newCodeLine("&emsp;&emsp;&emsp;eliminatedFrontIndex = pivot;")
  newCodeLine("&emsp;&emsp;}")
  newCodeLine("&emsp;}")
  newCodeLine("&nbsp;")
  newCodeLine("&emsp;if (A[A.length - 1] === target) {")
  newCodeLine("&emsp;&emsp;return A.length - 1;")
  newCodeLine("&emsp;}")
  newCodeLine("&nbsp;")
  newCodeLine("&emsp;return -1;")
  newCodeLine("}")
}
