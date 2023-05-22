async function fibSearch(target) {
  sort();
  await sleep(2000);
  makeIndigo("tile" + (numTiles - 1));

  let fibA = 0;
  let fibB = 1;
  let fibC = fibA + fibB;

  while (fibC < numTiles) {
    fibA = fibB;
    fibB = fibC;
    fibC = fibA + fibB;
  }

  let backDifference = fibC - numTiles; // Needed for color function to not break. Irrelevant to algorithm.

  // Algorithm:
  let eliminatedFrontIndex = -1;

  while (fibC > 1) {
    // If all tiles eliminated.
    if (eliminatedFrontIndex + 1 === numTiles) {
      document.getElementById("result").innerHTML = "Target is not in the array";
      enableButton("reset");
      return;
    }

    let pivot = Math.min(eliminatedFrontIndex + fibA, numTiles - 1);
    color("orange", eliminatedFrontIndex + 1, pivot - 1);
    makeGreen("tile" + pivot);
    color("indigo", pivot + 1, pivot + fibB - backDifference - 1);
    await sleep(2000);

    if (target < arr[pivot]) {
      color("606060", pivot, numTiles - 1);
      await sleep(2000);
      fibC = fibA;
      fibB = fibB - fibA;
      fibA = fibC - fibB;
      backDifference = 0;
    } else if (arr[pivot] === target) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + pivot;
      enableButton("reset");
      return;
    } else if (target > arr[pivot]) {
      color("606060", 0, pivot);
      await sleep(2000);
      fibC = fibB;
      fibB = fibA;
      fibA = fibC - fibB;
      eliminatedFrontIndex = pivot;
    } else {
      throw new Error("Error in fibSearch function");
    }
  }

  // Without the following, algo breaks in edge case.
  // Edge case: numTiles === 1, 2, 3, 5, 8, etc., and target === last element in arr.
  // Examples:
  // target = 0, arr = [0]. "Target is not in array."
  // target = 2, arr = [0, 1, 2]. "Target is not in array."

  // If final element hasn't been eliminated. Check it.
  if (eliminatedFrontIndex + 1 === numTiles - 1) {
    makeGreen("tile" + (numTiles - 1));
    await sleep(2000);
    if (arr[numTiles - 1] === target) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + (numTiles - 1);
      enableButton("reset");
      return;
    }
    make606060("tile" + (numTiles - 1));
    await sleep(2000);
  }

  document.getElementById("result").innerHTML = "Target is not in the array";
  enableButton("reset");
  return;
}
