async function ubiquitousSearch(target) {
  if (!isSorted(arr)) {
    sort();
    await sleep(2000);
  }
  questionMarks();
  await sleep(2000);

  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (rightIndex - leftIndex > 1) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    color("lightgreen", pivot, pivot);
    document.getElementById("tile" + pivot).firstChild.data = arr[pivot];
    await sleep(2000);
    
    if (arr[pivot] <= target) {
      color("white", 0, pivot - 1);
      await sleep(2000);
      color("rgb(60, 60, 60)", pivot, pivot);
      leftIndex = pivot;
    }
    else {
      color("white", pivot + 1, arr.length - 1);
      await sleep(2000);
      color("rgb(60, 60, 60)", pivot, pivot);
      rightIndex = pivot;
    }
  }

  colorPivot(leftIndex);
  await sleep(2000);
  if (arr[leftIndex] === target) {
    found(target, leftIndex);
    return;
  }
  color("white", leftIndex, leftIndex);
  await sleep(2000);

  colorPivot(rightIndex);
  await sleep(2000);
  if (arr[rightIndex] === target) {
    found(target, rightIndex);
    return;
  }
  color("white", rightIndex, rightIndex);
  await sleep(2000);
  
  notFound();
  return;
}