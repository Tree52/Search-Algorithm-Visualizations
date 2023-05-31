async function linearSearch(target) {
  questionMarks();
  await sleep(2000);

  for (let i = 0; i < arr.length; i++) {
    colorPivot(i);
    await sleep(200);

    if (target === arr[i]) {
      found(target, i);
      return;
    }

    color("white", i, i);
    await sleep(200);
  }

  notFound();
  return;
}
