async function metaSearch(target) {
  showTitle1("Candidate Pivot:");
  if (!isSorted(arr)) {
    sort();
    await sleep(2000);
  }
  questionMarks();
  await sleep(2000);

  let numBitsNeededForMaxIndex = Math.ceil(Math.log2(arr.length));

  clearDiv("result");
  for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
    newEmptyTile(i);
  }
  await sleep(2000);

  let pivot = 0;
  for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
    definePivot(pivot, 0, "$$" + pivot + "$$");
    await sleep(2000);
    if (arr[pivot] === target) {
      found(target, pivot);
      return;
    }
    color("white", 0, pivot);
    await sleep(2000);

    let newPivotCandidate = pivot | (1 << i);
    equationHTML(
      1,
      "$$" + pivot + "+2^{" + i + "}=" + newPivotCandidate + "$$"
    );

    oobColor2(newPivotCandidate);
    await sleep(2000);

    if (newPivotCandidate < arr.length && arr[newPivotCandidate] <= target) {
      pivot = newPivotCandidate;
      document.getElementById("empty-tile" + i).innerHTML = 1;
      await sleep(2000);
      continue;
    }
    color("white", newPivotCandidate, arr.length - 1);
    document.getElementById("empty-tile" + i).innerHTML = 0;
    await sleep(2000);
  }

  definePivot(pivot, 0, "$$" + pivot + "$$");
  await sleep(2000);
  if (arr[pivot] === target) {
    found(target, pivot);
    return;
  }
  color("white", pivot, pivot);
  await sleep(2000);

  notFound();
  return;
}
