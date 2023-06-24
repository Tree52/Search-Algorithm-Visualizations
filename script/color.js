function colorTiles(color, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    let myTile = document.getElementById("tile" + i);
    myTile.style.backgroundColor = color;
  }
}

function colorCodeLine(idNum) {
  // Uncolor all lines
  let codeDiv = document.getElementById("code");
  let numCodeLines = codeDiv.getElementsByTagName("div").length;
  for (let i = 0; i < numCodeLines; i++) {
    document.getElementById("line" + i).style.backgroundColor = "rgb(60, 60, 60)";
    document.getElementById("line" + i).style.color = "white";      
  }
  
  if (idNum === -1) {
    return;
  }

  // Color line
  document.getElementById("line" + idNum).style.backgroundColor = "white";
  document.getElementById("line" + idNum).style.color = "rgb(60, 60, 60)";
}