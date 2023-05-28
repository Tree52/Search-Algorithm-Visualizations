async function jumpSearch(target) {
  sort();
  await sleep(2000);

  let jumpSize = Math.floor(Math.sqrt(arr.length));

  let i = 0;
  for (; arr[i] <= target; i += jumpSize) {
    color("green", i, i);
    await sleep(500);
    if (arr[i] === target) {
      found(target, i);
      return;
    }
    color("white", 0, i);
    await sleep(500);
  }

  outOfBoundsColor(i);
  await sleep(4000);

  for (let prevIndex = i - jumpSize + 1; prevIndex < i && prevIndex !== arr.length; prevIndex++) {
    color("green", prevIndex, prevIndex);
    await sleep(500);
    if (arr[prevIndex] === target) {
      found(target, prevIndex);
      return;
    }
    color("white", prevIndex, prevIndex);
    await sleep(500);
  }

  notFound();
  return;
}
