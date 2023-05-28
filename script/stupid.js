async function stupidSearch(target) {
  let count = 0;

  while (1) {
    count++;
    document.getElementById("result").innerHTML = count;
    let i = Math.floor(Math.random() * arr.length);
    color("green", i, i);
    await sleep(500);

    if (target === arr[i]) {
      found(target, i);
      return;
    }

    color("rgb(60, 60, 60)", i, i);
    await sleep(500);
  }
}
