function metaSearch(target, A) {
  let numBitsNeededForMaxIndex = Math.ceil(Math.log2(A.length));

  clearDiv("result");
  for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
    newEmptyTile(i);
  }
  saveState();

  let pivot = 0;
  for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
    definePivot(A, pivot, 0, "$$" + pivot + "$$");
    saveState();
    if (A[pivot] === target) {
      found(target, pivot);
      return;
    }
    colorTiles("white", 0, pivot);
    saveState();

    let newPivotCandidate = pivot | (1 << i);
    equationHTML(
      1,
      "$$" + pivot + "+2^{" + i + "}=" + newPivotCandidate + "$$"
    );

    if (newPivotCandidate < A.length) {
      colorTiles("lightgreen", newPivotCandidate, newPivotCandidate);
      document.getElementById("tile" + newPivotCandidate).firstChild.data =
        A[newPivotCandidate];
      saveState();
    }

    if (newPivotCandidate < A.length && A[newPivotCandidate] <= target) {
      pivot = newPivotCandidate;
      document.getElementById("empty-tile" + i).innerHTML = 1;
      saveState();
      continue;
    }
    colorTiles("white", newPivotCandidate, A.length - 1);
    document.getElementById("empty-tile" + i).innerHTML = 0;
    saveState();
  }

  definePivot(A, pivot, 0, "$$" + pivot + "$$");
  saveState();
  if (A[pivot] === target) {
    found(target, pivot);
    return;
  }
  colorTiles("white", pivot, pivot);
  saveState();

  notFound();
  return;
}
