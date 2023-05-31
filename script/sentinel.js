async function sentinelSearch(target) {
  questionMarks();
  await sleep(2000);
  
  let last = arr[arr.length - 1];
  document.getElementById("tile" + (arr.length - 1)).firstChild.data = "";
  await sleep(2000);

  arr[arr.length - 1] = target;
  document.getElementById("tile" + (arr.length - 1)).firstChild.data = target;
  await sleep(2000);

  let i = 0;
  while (1) {
    colorPivot(i);
    await sleep(200);
    if (arr[i] === target) {
      break;
    }
    color("white", i, i);
    await sleep(200);
    i++;
  }

  colorPivot(i);
  await sleep(2000);

  document.getElementById("tile" + (arr.length - 1)).firstChild.data = "";
  color("rgb(60, 60, 60)", arr.length - 1, arr.length - 1);
  await sleep(2000);

  arr[arr.length - 1] = last;
  document.getElementById("tile" + (arr.length - 1)).firstChild.data = "?";
  await sleep(2000);

  colorPivot(i);
  await sleep(200);
  if (i < arr.length - 1 || arr[arr.length - 1] === target) {
    found(target, i);
    return;
  }
  color("white", i, i);
  await sleep(200);

  notFound();
  return;
}
