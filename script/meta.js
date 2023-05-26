async function metaSearch(target) {
  sort();
  await sleep(2000);
  
  let numBitsNeededForMaxIndex = Math.ceil(Math.log2(arr.length));
  
  clearDiv("result");
  for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
    const tile = document.createElement("div");
    tile.className = "empty-tile";
    tile.id = "empty-tile" + i;
    document.getElementById("result").append(tile);
  }
  await sleep(2000);

  let pivot = 0;
  for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
    color("green", pivot, pivot);
    await sleep(2000);
    if (arr[pivot] === target) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + pivot;
      enableButton("reset");
      return;
    }
    color("white", 0, pivot);
    await sleep(2000);

    let newPivotCandidate = pivot | (1 << i);

    if (newPivotCandidate > arr.length) {
      for (let j = arr.length; j <= arr.length + 1; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.id = "tile" + j;
        tile.style.backgroundColor = "rgb(18, 18, 18)";
        document.getElementById("content").append(tile);
      }
      document.getElementById("tile" + arr.length).innerHTML = "...";
      document.getElementById("tile" + (arr.length + 1)).innerHTML = "i " + newPivotCandidate;
      color("lightgreen", arr.length + 1, arr.length + 1);
      await sleep(2000);
  
      for (let j = arr.length; j <= arr.length + 1; j++) {
        const tile = document.getElementById("tile" + j);
        tile.remove();
      }
      await sleep(2000);
    } else {
      color("lightgreen", newPivotCandidate, newPivotCandidate);
      await sleep(2000);
    }
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

  color("green", pivot, pivot);
  await sleep(2000);
  if (arr[pivot] === target) {
    document.getElementById("result").innerHTML =
      "Target " + target + " is in the array at index " + pivot;
    enableButton("reset");
    return;
  }
  color("white", pivot, pivot);
  await sleep(2000);

  document.getElementById("result").innerHTML = "Target is not in the array";
  enableButton("reset");
  return;
}
