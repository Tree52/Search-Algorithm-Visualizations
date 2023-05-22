async function linearSearch(target) {
  for (let i = 0; i < numTiles; i++) {
    makeGreen("tile" + i);
    await sleep(200);

    if (target === arr[i]) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + i;
      enableButton("reset");
      return;
    }

    make606060("tile" + i);
    await sleep(200);
  }

  document.getElementById("result").innerHTML = "Target is not in the array";
  enableButton("reset");
  return;
}
