async function linearSearch(target) {
  for (let i = 0; i < arr.length; i++) {
    color("green", i, i);
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
