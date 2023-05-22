let numTiles = 0;
let arr = [];

function removeTile() {
  const valueAsString = document
    .getElementById("arr-numbox")
    .value.replace(/\s/g, "")
    .split(",");

  if (valueAsString[0] === "") {
    const tile = document.getElementById("tile" + (numTiles - 1));
    tile.remove();
    arr.pop();
    numTiles--;
  } else {
    for (let i = 0; i < valueAsString.length; i++) {
      let tileRemovedFlag = false;
      let arrLength = arr.length;
      // Find number
      for (let j = 0; j < arrLength; j++) {
        // Delete element(s)
        if (Number(valueAsString[i]) === arr[j] && tileRemovedFlag === false) {
          const tile = document.getElementById("tile" + j);
          tile.remove();
          arr.splice(j, 1);
          numTiles--;
          tileRemovedFlag = true;
          continue;
        }

        // Update tile IDs
        if (tileRemovedFlag === true) {
          document.getElementById("tile" + j).id = "tile" + (j - 1);
        }
      }
    }
  }

  if (numTiles === 0) {
    disableButton("-");
  }
}

function newTile() {
  if (numTiles === 0) {
    enableButton("-");
  }

  const valueAsString = document
    .getElementById("arr-numbox")
    .value.replace(/\s/g, "")
    .split(",");

  for (let i = 0; i < valueAsString.length; i++) {
    // Create new tile
    const tile = document.createElement("div");
    tile.className = "tile";

    // numTiles is being used for the index here
    tile.id = "tile" + numTiles;

    if (valueAsString[0] === "") {
      let randNum = Math.floor(Math.random() * 100);
      tile.innerHTML = randNum;
      arr.push(randNum);
    } else {
      tile.innerHTML = Number(valueAsString[i]);
      arr.push(Number(valueAsString[i]));
    }

    document.getElementById("content").append(tile);
    numTiles++;
  }
}

// function newEmptyTile() {
//   const tile = document.createElement("div");
//   tile.className = "empty-tile";
//   tile.id = "tile" + numTiles;
//   document.getElementById("content").append(tile);
//   arr.push(numTiles);
//   numTiles++;
// }

function expand() {
  document.getElementById("arr-numbox").placeholder = "#, #, ...";
  document.getElementById("arr-numbox").style.width = "400px";
  document.getElementById("expand").classList.add("fa-flip-horizontal");
  document.getElementById("expand").onclick = function () {
    retract();
  };
  isExpand = 0;
}

function retract() {
  document.getElementById("arr-numbox").placeholder = "#";
  document.getElementById("arr-numbox").style.width = "100px";
  document.getElementById("expand").classList.remove("fa-flip-horizontal");
  document.getElementById("expand").onclick = function () {
    expand();
  };
  isExpand = -1;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function go() {
  clearDiv("result");

  // Error check arr empty
  if (arr.length === 0) {
    document.getElementById("result").innerHTML = "Array is empty";
    throw new Error("Array is empty");
  }

  // Store target
  const targetAsString = document.getElementById("target-numbox").value;

  // Error check target is stored
  if (targetAsString == "") {
    document.getElementById("result").innerHTML = "Target is empty";
    throw new Error("Target is empty");
  }

  disableButton("+");
  disableButton("-");
  disableButton("go");
  disableButton("reset");

  // Store algorithm
  const algorithm = document.querySelector('input[name="algo"]:checked').value;

  // Run algorithm
  switch (algorithm) {
    case "Linear Search":
      linearSearch(Number(targetAsString));
      break;
    case "Binary Search":
      binarySearch(Number(targetAsString));
      break;
    case "Fibonacci Search":
      fibSearch(Number(targetAsString));
      break;
    case "Stupid Search":
      stupidSearch(Number(targetAsString));
      break;
  }
}

function sort() {
  arr = mergeSort(arr);

  // Temporarily clear content div
  clearDiv("content");

  // Push sorted array
  for (let i = 0; i < arr.length; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.id = "tile" + i;
    tile.innerHTML = arr[i];
    document.getElementById("content").append(tile);
  }
}

function clearDiv(id) {
  let myDiv = document.getElementById(id);

  myDiv.innerHTML = "";
}

function disableButton(id) {
  let myButton = document.getElementById(id);

  myButton.style.backgroundColor = "red";
  myButton.disabled = true;
}

function enableButton(id) {
  let myButton = document.getElementById(id);

  myButton.style.backgroundColor = "rgb(60, 60, 60)";
  myButton.disabled = false;
}

function reset() {
  clearDiv("result");

  color("606060", 0, (numTiles - 1));
  
  enableButton("+");
  enableButton("-");
  enableButton("go");

  if (numTiles === 0) {
    disableButton("-");
  }
}