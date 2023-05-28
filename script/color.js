function color(color, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    let myTile = document.getElementById("tile" + i);
    if (myTile !== null) {
      myTile.style.backgroundColor = color;
    }
  }
}

async function outOfBoundsColor(i) {
  if (i > arr.length) {
    newTile("", "...", "rgb(18, 18, 18)");
    newTile(i, "", "green");
    await sleep(2000);
    removeTile("");
    removeTile(i);
    await sleep(2000);
  } else if (i === arr.length) {
    newTile(arr.length, "", "green");
    await sleep(2000);
    removeTile(arr.length);
    await sleep(2000);
  } else {
    color("green", i, i);
    await sleep(2000);
    color("white", i, arr.length - 1);
    await sleep(2000);
  }
}

async function outOfBoundsColor2(leftIndex, pivot, rightIndex) {
  newTile(leftIndex, "", "orange");
  newTile("", "...", "rgb(18, 18, 18)");
  newTile(pivot, "", "green");
  newTile(" ", "...", "rgb(18, 18, 18)");
  newTile(rightIndex, "", "indigo");
  await sleep(2000);
  removeTile(leftIndex);
  removeTile("");
  removeTile(pivot);
  removeTile(" ");
  removeTile(rightIndex);
}

async function outOfBoundsColor3(newPivotCandidate) {
  if (newPivotCandidate > arr.length) {
    newTile("", "...", "rgb(18, 18, 18)");
    newTile(newPivotCandidate, "", "lightgreen");
    await sleep(2000);
    removeTile("");
    removeTile(newPivotCandidate);
    await sleep(2000);
  } else {
    color("lightgreen", newPivotCandidate, newPivotCandidate);
    await sleep(2000);
  }
}

function orangeGreenIndigoColor(leftIndex, pivot, rightIndex) {
  color("orange", leftIndex, pivot - 1);
  color("green", pivot, pivot);
  color("indigo", pivot + 1, rightIndex);
}