let arr = [];

function newTile(idNum, innerHTML, backgroundColor) {
  const tileDiv = document.createElement("div");
  const indexDiv = document.createElement("div");
  tileDiv.className = "tile";
  indexDiv.className = "index";
  tileDiv.id = "tile" + idNum;
  indexDiv.id = "index" + idNum;
  tileDiv.innerHTML = innerHTML;
  indexDiv.innerHTML = idNum;
  tileDiv.style.backgroundColor = backgroundColor;
  document.getElementById("content").append(tileDiv);
  document.getElementById("tile" + idNum).append(indexDiv);
}

function newEmptyTile(idNum) {
  const tileDiv = document.createElement("div");
  tileDiv.className = "empty-tile";
  tileDiv.id = "empty-tile" + idNum;
  document.getElementById("result").append(tileDiv);
}

function removeTile(idNum) {
  const tileDiv = document.getElementById("tile" + idNum);
  tileDiv.remove();
}

function push() {
  const valueAsString = document
    .getElementById("arr-numbox")
    .value.replace(/\s/g, "")
    .split(",");

  for (let i = 0; i < valueAsString.length; i++) {
    if (isNaN(Number(valueAsString[i]))) {
      continue;
    }

    if (valueAsString[0] === "") {
      let randNum = Math.floor(Math.random() * 100);
      arr.push(randNum);
    } else {
      arr.push(Number(valueAsString[i]));
    }
  }

  updateTiles();

  if (arr.length !== 0) {
    enableButton("-");
  }
}

function pop() {
  const valueAsString = document
    .getElementById("arr-numbox")
    .value.replace(/\s/g, "")
    .split(",");

  if (valueAsString[0] === "") {
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

  updateTiles();

  if (arr.length === 0) {
    disableButton("-");
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
    case "Binary Search":
      binarySearch(Number(targetAsString));
      break;
    case "Exponential Search":
      exponentialSearch(Number(targetAsString));
      break;
    case "Fibonacci Search":
      fibSearch(Number(targetAsString));
      break;
    case "Interpolation Search":
      interpolationSearch(Number(targetAsString));
      break;
    case "Jump Search":
      jumpSearch(Number(targetAsString));
      break;
    case "Linear Search":
      linearSearch(Number(targetAsString));
      break;
    case "Meta Search":
      metaSearch(Number(targetAsString));
      break;
    case "Sentinel Search":
      sentinelSearch(Number(targetAsString));
      break;
    case "Ternary Search":
      ternarySearch(Number(targetAsString));
      break;
    case "Ubiquitous Search":
      ubiquitousSearch(Number(targetAsString));
      break;
  }
}

function sort() {
  arr = mergeSort(arr);
  updateTiles();
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
  clearDiv("equation0");
  clearDiv("equation1");
  hideTitle1();
  updateTiles();

  color("rgb(60, 60, 60)", 0, arr.length - 1);

  enableButton("+");
  enableButton("-");
  enableButton("go");

  if (arr.length === 0) {
    disableButton("-");
  }
}

function updateTiles() {
  clearDiv("content");
  for (let i = 0; i < arr.length; i++) {
    newTile(i, arr[i], "rgb(60, 60, 60)");
  }
}

function copyToClipboard() {
  document.getElementById("result").innerHTML = "Array copied to clipboard";
  navigator.clipboard.writeText(arr);
}

function found(target, targetIndex) {
  document.getElementById("result").innerHTML =
    "Target " + target + " is in the array at index " + targetIndex;
  enableButton("reset");
}

function notFound() {
  document.getElementById("result").innerHTML = "Target is not in the array";
  enableButton("reset");
}

function questionMarks() {
  for (let i = 0; i < arr.length; i++) {
    document.getElementById("tile" + i).firstChild.data = "?";
  }
}

const isSorted = (arr) => arr.every((v, i, a) => !i || a[i - 1] <= v);

function openClose() {
  let sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("fa-flip-horizontal")) {
    sidebar.classList.remove("fa-flip-horizontal");
  } else {
    sidebar.classList.add("fa-flip-horizontal");
  }

  let myDiv = document.getElementById("codeContainer");
  if (myDiv.style.visibility === "hidden") {
    myDiv.style.visibility = "visible";
  } else {
    myDiv.style.visibility = "hidden";
  }
}

function equationHTML(idNum, equation) {
  document.getElementById("equation" + idNum).innerHTML = equation;
  MathJax.typeset();
}

function definePivot(pivotIndex, equationIDNum, equation) {
  color("green", pivotIndex, pivotIndex);
  document.getElementById("tile" + pivotIndex).firstChild.data =
    arr[pivotIndex];
  equationHTML(equationIDNum, equation);
}

function showTitle1(title) {
  document.getElementById("title1").innerHTML = title;
  document.getElementById("title1").style.display = "flex";
  document.getElementById("equation1").style.display = "flex";
}

function hideTitle1() {
  document.getElementById("title1").style.display = "none";
  document.getElementById("equation1").style.display = "none";
}
