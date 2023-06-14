async function interpolationSearch(target) {
  if (!isSorted(arr)) {
    sort();
    await sleep(2000);
  }
  questionMarks();
  await sleep(2000);

  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  color("lightgreen", leftIndex, leftIndex);
  document.getElementById("tile" + leftIndex).firstChild.data = arr[leftIndex];
  color("lightgreen", rightIndex, rightIndex);
  document.getElementById("tile" + rightIndex).firstChild.data =
    arr[rightIndex];
  await sleep(2000);
  while (
    leftIndex <= rightIndex &&
    target >= arr[leftIndex] &&
    target <= arr[rightIndex]
  ) {
    if (leftIndex === rightIndex) {
      definePivot(leftIndex, 0, "$$" + leftIndex + "$$");
      await sleep(2000);
      if (arr[leftIndex] === target) {
        found(target, leftIndex);
        return leftIndex;
      }
      color("white", leftIndex, leftIndex);
      await sleep(2000);
      notFound();
      return;
    }

    let pivot =
      leftIndex +
      Math.floor(
        ((target - arr[leftIndex]) * (rightIndex - leftIndex)) /
          (arr[rightIndex] - arr[leftIndex])
      );

    definePivot(
      pivot,
      0,
      "$$" +
        leftIndex +
        "+\\left\\lfloor\\frac{(" +
        target +
        "-" +
        arr[leftIndex] +
        ")(" +
        rightIndex +
        "-" +
        leftIndex +
        ")}{" +
        arr[rightIndex] +
        "-" +
        arr[leftIndex] +
        "}\\right\\rfloor=" +
        pivot +
        "$$"
    );
    await sleep(2000);
    if (arr[pivot] === target) {
      found(target, pivot);
      return pivot;
    }

    if (arr[pivot] < target) {
      color("white", 0, pivot);
      leftIndex = pivot + 1;
      color("lightgreen", leftIndex, leftIndex);
      document.getElementById("tile" + leftIndex).firstChild.data =
        arr[leftIndex];
      await sleep(2000);
    } else {
      color("white", pivot, arr.length - 1);
      rightIndex = pivot - 1;
      color("lightgreen", rightIndex, rightIndex);
      document.getElementById("tile" + rightIndex).firstChild.data =
        arr[rightIndex];
      await sleep(2000);
    }
  }

  color("white", 0, arr.length - 1);
  await sleep(2000);
  notFound();
  return;
}
