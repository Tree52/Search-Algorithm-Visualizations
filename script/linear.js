async function linearSearch(target) {
  for (let i = 0; i < arr.length; i++) {
    color("green", i, i);
    await sleep(200);

    if (target === arr[i]) {
      document.getElementById("result").innerHTML =
        "Target " + target + " is in the array at index " + i;
      enableButton("reset");
      return;
    }

    color("white", i, i);
    await sleep(200);
  }

  document.getElementById("result").innerHTML = "Target is not in the array";
  enableButton("reset");
  return;
}
