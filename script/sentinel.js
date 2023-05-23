async function sentinelSearch(target) {
  let last = arr[numTiles - 1];
  document.getElementById("tile" + (numTiles - 1)).innerHTML = "";
  await sleep(2000);

  arr[numTiles - 1] = target;
  document.getElementById("tile" + (numTiles - 1)).innerHTML = target;
  await sleep(2000);

  let i = 0;
  while (1) {
    makeGreen("tile" + i);
    await sleep(200);
    if (arr[i] === target) {
      break;
    }
    make606060("tile" + i);
    await sleep(200);
    i++;
  }

  makeGreen("tile" + i);
  await sleep(2000);

  document.getElementById("tile" + (numTiles - 1)).innerHTML = "";
  make606060("tile" + (numTiles - 1));
  await sleep(2000);

  arr[numTiles - 1] = last;
  document.getElementById("tile" + (numTiles - 1)).innerHTML = last;
  await sleep(2000);

  makeGreen("tile" + i);
  await sleep(200);
  if (i < numTiles - 1 || arr[numTiles - 1] === target) {
    document.getElementById("result").innerHTML =
      "Target " + target + " is in the array at index " + i;
    enableButton("reset");
    return;
  }
  make606060("tile" + i);
  await sleep(200);

  document.getElementById("result").innerHTML = "Target is not in the array";
  enableButton("reset");
  return;
}
