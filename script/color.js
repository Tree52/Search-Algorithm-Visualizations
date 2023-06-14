function color(color, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    let myTile = document.getElementById("tile" + i);
    myTile.style.backgroundColor = color;
  }
}

async function oobColor(i, equationIDNum, equation) {
  // oob === out of bounds
  if (i < arr.length) {
    definePivot(i, equationIDNum, equation);
    await sleep(2000);
    color("white", i, arr.length - 1);
    await sleep(2000);
  } else if (i === arr.length) {
    equationHTML(equationIDNum, equation);
    newTile(arr.length, "", "green");
    await sleep(2000);
    removeTile(arr.length);
    await sleep(2000);
  } else {
    equationHTML(equationIDNum, equation);
    newTile("", "...", "rgb(18, 18, 18)");
    newTile(i, "", "green");
    await sleep(2000);
    removeTile("");
    removeTile(i);
    await sleep(2000);
  }
}

async function oobColor2(newPivotCandidate) {
  if (newPivotCandidate < arr.length) {
    color("lightgreen", newPivotCandidate, newPivotCandidate);
    document.getElementById("tile" + newPivotCandidate).firstChild.data =
      arr[newPivotCandidate];
    await sleep(2000);
  } else if (newPivotCandidate === arr.length) {
    newTile(arr.length, "", "lightgreen");
    await sleep(2000);
    removeTile(arr.length);
    await sleep(2000);
  } else {
    newTile("", "...", "rgb(18, 18, 18)");
    newTile(newPivotCandidate, "", "lightgreen");
    await sleep(2000);
    removeTile("");
    removeTile(newPivotCandidate);
    await sleep(2000);
  }
}
