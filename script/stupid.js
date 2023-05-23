async function stupidSearch(target) {
  let count = 0;

  while (1) {
    count++;
    document.getElementById("result").innerHTML = count;
    let i = Math.floor(Math.random() * numTiles);
    makeGreen("tile" + i);
    await sleep(500);

    if (target === arr[i]) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + i;
      enableButton("reset");
      return;
    }

    make606060("tile" + i);
    await sleep(500);
  }
}
