function color(color, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    let myTile = document.getElementById("tile" + i);
    if (myTile !== null) {
      myTile.style.backgroundColor = color;
    }
  }
}
