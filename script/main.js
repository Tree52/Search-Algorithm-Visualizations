let arr = [];

function removeTile() {
  const valueAsString = document
    .getElementById("arr-numbox")
    .value.replace(/\s/g, "")
    .split(",");

  if (valueAsString[0] === "") {
    const tile = document.getElementById("tile" + (arr.length - 1));
    tile.remove();
    arr.pop();
  } else {
    for (let i = 0; i < valueAsString.length; i++) {
      let arrLength = arr.length;
      for (let j = 0; j < arrLength; j++) {
        if (Number(valueAsString[i]) === arr[j]) {
          arr.splice(j, 1);
          break;
        }
      }
    }
  }

  updateIDs();

  if (arr.length === 0) {
    disableButton("-");
  }
}

function newTile() {
  if (arr.length === 0) {
    enableButton("-");
  }

  const valueAsString = document
    .getElementById("arr-numbox")
    .value.replace(/\s/g, "")
    .split(",");

  for (let i = 0; i < valueAsString.length; i++) {
    if (isNaN(Number(valueAsString[i]))) {
      continue;
    }

    // Create new tile
    const tile = document.createElement("div");
    tile.className = "tile";

    // arr.length is being used for the index here
    tile.id = "tile" + arr.length;

    if (valueAsString[0] === "") {
      let randNum = Math.floor(Math.random() * 100);
      tile.innerHTML = randNum;
      arr.push(randNum);
    } else {
      tile.innerHTML = Number(valueAsString[i]);
      arr.push(Number(valueAsString[i]));
    }

    document.getElementById("content").append(tile);
  }
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
    case "Sentinel Search":
      sentinelSearch(Number(targetAsString));
      break;
    case "Linear Search":
      linearSearch(Number(targetAsString));
      break;
    case "Binary Search":
      binarySearch(Number(targetAsString));
      break;
    case "One-Sided Search":
      oneSidedSearch(Number(targetAsString));
      break;
    case "Meta Search":
      metaSearch(Number(targetAsString));
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

  updateIDs();
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

  color("rgb(60, 60, 60)", 0, arr.length - 1);

  enableButton("+");
  enableButton("-");
  enableButton("go");

  if (arr.length === 0) {
    disableButton("-");
  }
}

function updateIDs() {
  clearDiv("content");
  for (let i = 0; i < arr.length; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.id = "tile" + i;
    tile.innerHTML = arr[i];
    document.getElementById("content").append(tile);
  }
}

function copyToClipboard() {
  document.getElementById("result").innerHTML = "Array copied to clipboard";
  navigator.clipboard.writeText(arr);
}
