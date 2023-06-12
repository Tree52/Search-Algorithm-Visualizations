async function ternarySearch(target) {
  if (!isSorted(arr)) {
    sort();
    await sleep(2000);
  }
  questionMarks();
  await sleep(2000);

  let l = 0;
  let r = arr.length - 1;

  while (r >= l) {
    let mid1 = l + Math.floor((r - l) / 3);
    let mid2 = r - Math.floor((r - l) / 3);

    colorPivot(mid1);
    colorPivot(mid2);
    await sleep(2000);
    if (arr[mid1] === target) {
      found(target, mid1);
      return mid1;
    }

    if (arr[mid2] === target) {
      found(target, mid2);
      return mid2;
    }

    if (target < arr[mid1]) {
      r = mid1 - 1;
      color("white", mid1, arr.length - 1);
      await sleep(2000);
    } else if (target > arr[mid2]) {
      l = mid2 + 1;
      color("white", 0, mid2);
      await sleep(2000);
    } else {
      l = mid1 + 1;
      r = mid2 - 1;
      color("white", 0, mid1);
      color("white", mid2, arr.length - 1);
      await sleep(2000);
    }
  }

  notFound();
  return;
}
