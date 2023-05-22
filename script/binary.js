async function binarySearch(target) {
  sort();
  await sleep(2000);

  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (rightIndex >= leftIndex) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    color("orange", leftIndex, pivot - 1);
    makeGreen("tile" + pivot);
    color("indigo", pivot + 1, rightIndex);
    await sleep(2000);

    if (target < arr[pivot]) {
      color("606060", pivot, numTiles - 1);
      await sleep(2000);

      rightIndex = pivot - 1;
    } else if (target === arr[pivot]) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + pivot;
      enableButton("reset");
      return;
    } else if (target > arr[pivot]) {
      color("606060", 0, pivot);
      await sleep(2000);

      leftIndex = pivot + 1;
    } else {
      throw new Error("Error in binarySearch function");
    }
  }

  document.getElementById("result").innerHTML = "Target is not in the array";
  enableButton("reset");
  return;
}
