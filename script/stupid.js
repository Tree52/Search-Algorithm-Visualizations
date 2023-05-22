async function stupidSearch(target) {
  let count = 0;

  while (1) {
    count++;
    document.getElementById("result").innerHTML = count;
    let pivot = Math.floor(Math.random() * numTiles);
    makeGreen("tile" + pivot);
    await sleep(500);

    if (target === arr[pivot]) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + pivot;
      enableButton("reset");
      return;
    }

    make606060("tile" + pivot);
    await sleep(500);
  }
}
