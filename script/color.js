function color(color, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    let myTile = document.getElementById("tile" + i);
    myTile.style.backgroundColor = color;
  }
}
