async function ternarySearch(target) {
  showTitle1("Pivot 2:");
  if (!isSorted(arr)) {
    sort();
    await sleep(2000);
  }
  questionMarks();
  await sleep(2000);

  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (rightIndex >= leftIndex) {
    let pivot1 = leftIndex + Math.floor((rightIndex - leftIndex) / 3);
    let pivot2 = rightIndex - Math.floor((rightIndex - leftIndex) / 3);

    definePivot(
      pivot1,
      0,
      "$$" +
        leftIndex +
        "+\\left\\lfloor\\frac{" +
        rightIndex +
        "-" +
        leftIndex +
        "}{3}\\right\\rfloor=" +
        pivot1 +
        "$$"
    );
    definePivot(
      pivot2,
      1,
      "$$" +
        rightIndex +
        "-\\left\\lfloor\\frac{" +
        rightIndex +
        "-" +
        leftIndex +
        "}{3}\\right\\rfloor=" +
        pivot2 +
        "$$"
    );
    await sleep(2000);
    if (arr[pivot1] === target) {
      found(target, pivot1);
      return pivot1;
    }

    if (arr[pivot2] === target) {
      found(target, pivot2);
      return pivot2;
    }

    if (target < arr[pivot1]) {
      rightIndex = pivot1 - 1;
      color("white", pivot1, arr.length - 1);
      await sleep(2000);
    } else if (target > arr[pivot2]) {
      leftIndex = pivot2 + 1;
      color("white", 0, pivot2);
      await sleep(2000);
    } else {
      leftIndex = pivot1 + 1;
      rightIndex = pivot2 - 1;
      color("white", 0, pivot1);
      color("white", pivot2, arr.length - 1);
      await sleep(2000);
    }
  }

  notFound();
  return;
}
