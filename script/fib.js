async function fibSearch(target) {
  sort();
  await sleep(2000);

  let fibA = 0;
  let fibB = 1;
  let fibC = fibA + fibB;

  while (fibC < arr.length) {
    fibA = fibB;
    fibB = fibC;
    fibC = fibA + fibB;
  }

  let eliminatedFrontIndex = -1;

  while (fibC > 1) {
    // If all tiles eliminated.
    if (eliminatedFrontIndex + 1 === arr.length) {
      document.getElementById("result").innerHTML =
        "Target is not in the array";
      enableButton("reset");
      return;
    }

    let pivot = Math.min(eliminatedFrontIndex + fibA, arr.length - 1);
    color("orange", eliminatedFrontIndex + 1, pivot - 1);
    color("green", pivot, pivot);
    color("indigo", pivot + 1, pivot + fibB - 1);
    await sleep(2000);

    if (target < arr[pivot]) {
      color("white", pivot, arr.length - 1);
      await sleep(2000);
      fibC = fibA;
      fibB = fibB - fibA;
      fibA = fibC - fibB;
    } else if (arr[pivot] === target) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + pivot;
      enableButton("reset");
      return;
    } else if (target > arr[pivot]) {
      color("white", 0, pivot);
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
  // Edge case: arr.length === 1, 2, 3, 5, 8, etc., and target === last element in arr.
  // Examples:
  // target = 0, arr = [0]. "Target is not in array."
  // target = 2, arr = [0, 1, 2]. "Target is not in array."

  // If final element hasn't been eliminated. Check it.
  if (eliminatedFrontIndex + 1 === arr.length - 1) {
    color("green", arr.length - 1, arr.length - 1);
    await sleep(2000);
    if (arr[arr.length - 1] === target) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + (arr.length - 1);
      enableButton("reset");
      return;
    }
    color("rgb(60, 60, 60)", arr.length - 1, arr.length - 1);
    await sleep(2000);
  }

  document.getElementById("result").innerHTML = "Target is not in the array";
  enableButton("reset");
  return;
}
