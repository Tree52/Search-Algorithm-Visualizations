function makeOrange(id) {
  let myTile = document.getElementById(id);
  myTile.style.backgroundColor = "orange";
}

function makeGreen(id) {
  let myTile = document.getElementById(id);
  myTile.style.backgroundColor = "green";
}

function makeIndigo(id) {
  let myTile = document.getElementById(id);
  myTile.style.backgroundColor = "indigo";
}

function make606060(id) {
  let myTile = document.getElementById(id);
  myTile.style.backgroundColor = "rgb(60, 60, 60)";
}

function color(color, startIndex, endIndex) {
  switch (color) {
    case "orange":
      for (let i = startIndex; i <= endIndex; i++) {
        makeOrange("tile" + i);
      }
      break;
    case "indigo":
      for (let i = startIndex; i <= endIndex; i++) {
        makeIndigo("tile" + i);
      }
      break;
    case "606060":
      for (let i = startIndex; i <= endIndex; i++) {
        make606060("tile" + i);
      }
      break;
  }
}
