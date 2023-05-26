async function oneSidedSearch(target) {
  sort();
  await sleep(2000);

  let i = 0;
  let count = 0;
  while (arr[i] <= target) {
    color("green", i, i);
    await sleep(500);
    if (arr[i] === target) {
      document.getElementById("result").innerHTML =
      "Target " + target + " is in the array at index " + i;
      enableButton("reset");
      return;
    }
    color("white", 0, i);
    await sleep(500);
    i = 1 << count;
    count++;
  }

  if (i > arr.length) {
    for (let j = arr.length; j <= arr.length + 1; j++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.id = "tile" + j;
      tile.style.backgroundColor = "rgb(18, 18, 18)";
      document.getElementById("content").append(tile);
    }
    document.getElementById("tile" + arr.length).innerHTML = "...";
    document.getElementById("tile" + (arr.length + 1)).innerHTML = "i " + i;
    color("green", arr.length + 1, arr.length + 1);
    await sleep(2000);

    for (let j = arr.length; j <= arr.length + 1; j++) {
      const tile = document.getElementById("tile" + j);
      tile.remove();
    }
    await sleep(2000);
  } else {
    color("green", i, i);
    await sleep(2000);

    color("white", i, arr.length - 1);
    await sleep(2000);
  }

  // Binary search:
  let leftIndex = (i >> 1) + 1;
  let rightIndex = i - 1;

  while (rightIndex >= leftIndex) {
    let pivot = leftIndex + Math.floor((rightIndex - leftIndex) / 2);

    if (leftIndex >= arr.length) {
      for (let j = arr.length; j <= arr.length + 4; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.id = "tile" + j;
        tile.style.backgroundColor = "rgb(18, 18, 18)";
        document.getElementById("content").append(tile);
      }
      document.getElementById("tile" + arr.length).innerHTML = "i " + leftIndex;
      color("orange", arr.length, arr.length);

      document.getElementById("tile" + (arr.length + 1)).innerHTML = "...";

      color("green", arr.length + 2, arr.length + 2);
      document.getElementById("tile" + (arr.length + 2)).innerHTML = "i " + pivot;

      document.getElementById("tile" + (arr.length + 3)).innerHTML = "...";

      color("indigo", arr.length + 4, arr.length + 4);
      document.getElementById("tile" + (arr.length + 4)).innerHTML = "i " + rightIndex;
      await sleep(2000);
  
      for (let j = arr.length; j <= arr.length + 4; j++) {
        const tile = document.getElementById("tile" + j);
        tile.remove();
      }
    } else {
      color("orange", leftIndex, pivot - 1);
      color("green", pivot, pivot);
      color("indigo", pivot + 1, rightIndex);
      await sleep(2000);
    }

    if (target < arr[pivot] || arr[pivot] === undefined) {
      color("white", pivot, arr.length - 1);
      await sleep(2000);

      rightIndex = pivot - 1;
    } else if (target === arr[pivot]) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + pivot;
      enableButton("reset");
      return;
    } else if (target > arr[pivot]) {
      color("white", 0, pivot);
      await sleep(2000);

      leftIndex = pivot + 1;
    } else {
      throw new Error("Error in oneSidedSearch function");
    }
  }

  document.getElementById("result").innerHTML = "Target is not in the array";
  enableButton("reset");
  return;
}
