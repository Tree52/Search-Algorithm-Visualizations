async function sentinelSearch(target) {
  let last = arr[arr.length - 1];
  document.getElementById("tile" + (arr.length - 1)).innerHTML = "";
  await sleep(2000);

  arr[arr.length - 1] = target;
  document.getElementById("tile" + (arr.length - 1)).innerHTML = target;
  await sleep(2000);

  let i = 0;
  while (1) {
    color("green", i, i);
    await sleep(200);
    if (arr[i] === target) {
      break;
    }
    color("white", i, i);
    await sleep(200);
    i++;
  }

  color("green", i, i);
  await sleep(2000);

  document.getElementById("tile" + (arr.length - 1)).innerHTML = "";
  color("rgb(60, 60, 60)", arr.length - 1, arr.length - 1);
  await sleep(2000);

  arr[arr.length - 1] = last;
  document.getElementById("tile" + (arr.length - 1)).innerHTML = last;
  await sleep(2000);

  color("green", i, i);
  await sleep(200);
  if (i < arr.length - 1 || arr[arr.length - 1] === target) {
    document.getElementById("result").innerHTML =
      "Target " + target + " is in the array at index " + i;
    enableButton("reset");
    return;
  }
  color("white", i, i);
  await sleep(200);

  document.getElementById("result").innerHTML = "Target is not in the array";
  enableButton("reset");
  return;
}
