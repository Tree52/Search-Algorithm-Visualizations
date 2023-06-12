async function stupidSearch(target) {
  questionMarks();
  await sleep(2000);

  let count = 0;

  while (1) {
    count++;
    document.getElementById("result").innerHTML = count;
    let i = Math.floor(Math.random() * arr.length);
    colorPivot(i);
    await sleep(500);

    if (target === arr[i]) {
      found(target, i);
      return;
    }

    color("rgb(60, 60, 60)", i, i);
    await sleep(500);
  }
}
