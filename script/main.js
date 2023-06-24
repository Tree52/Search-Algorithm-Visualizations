let arr = [];
let state = [];
let curState = 0;

function StateStruct(
  backgroundColors,
  innerHTMLs,
  equation,
  equation2,
  result,
  codeLine
) {
  this.backgroundColors = backgroundColors;
  this.innerHTMLs = innerHTMLs;
  this.equation = equation;
  this.equation2 = equation2;
  this.result = result;
  this.codeLine = codeLine;
}

function newTile(idNum, innerHTML, backgroundColor) {
  appendDiv("content", "tile" + idNum, "tile", innerHTML);
  appendDiv("tile" + idNum, "index" + idNum, "index", idNum);
  document.getElementById("tile" + idNum).style.backgroundColor = backgroundColor;
}

function newEmptyTile(idNum) {
  appendDiv("result", "empty-tile" + idNum, "empty-tile", "");
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

  displayElement("reset");
  displayElement("left");
  displayElement("right");
  hideElement("-");
  hideElement("arr-numbox");
  hideElement("+");
  hideElement("copy");
  hideElement("go");
  document.getElementById("target-numbox").style.pointerEvents = "none";

  const algorithm = document.querySelector('input[name="algo"]:checked').value;
  let sortedArr = mergeSort(arr);

  saveState();

  if (algorithm === "Linear Search" || algorithm === "Sentinel Search") {
  } else {
    clearDiv("content");
    for (let i = 0; i < sortedArr.length; i++) {
      newTile(i, sortedArr[i], "rgb(60, 60, 60)");
    }
    saveState();
  }

  questionMarks();
  saveState();

  switch (algorithm) {
    case "Binary Search":
      binarySearch(Number(targetAsString), sortedArr);
      break;
    case "Exponential Search":
      exponentialSearch(Number(targetAsString), sortedArr);
      break;
    case "Fibonacci Search":
      fibSearch(Number(targetAsString), sortedArr);
      break;
    case "Interpolation Search":
      interpolationSearch(Number(targetAsString), sortedArr);
      break;
    case "Jump Search":
      jumpSearch(Number(targetAsString), sortedArr);
      break;
    case "Linear Search":
      newCodeLine(0, "function linearSearch(target, A) {");
      newCodeLine(1, "&emsp;for (let i = 0; i < A.length; i++) {");
      newCodeLine(2, "&emsp;&emsp;if (target === A[i]) {");
      newCodeLine(3, "&emsp;&emsp;&emsp;return i;");
      newCodeLine(4, "&emsp;&emsp;}");
      newCodeLine(5, "&emsp;}");
      newCodeLine(6, "&emsp;");
      newCodeLine(7, "&emsp;return -1;");
      newCodeLine(8, "}");
      codeLines = 9;
      linearSearch(Number(targetAsString), arr);
      break;
    case "Meta Search":
      showTitle1("Candidate Pivot:");  
      metaSearch(Number(targetAsString), sortedArr);
      break;
    case "Sentinel Search":
      sentinelSearch(Number(targetAsString), arr);
      break;
    case "Ternary Search":
      showTitle1("Pivot 2:");
      ternarySearch(Number(targetAsString), sortedArr);
      break;
    case "Ubiquitous Search":
      showTitle1("Ubiquitous Pivot:");
      ubiquitousSearch(Number(targetAsString), sortedArr);
      break;
  }

  loadState0();
}

function clearDiv(id) {
  let myDiv = document.getElementById(id);
  myDiv.innerHTML = "";
}

function reset() {
  clearDiv("code");

  hideElement("title1");
  hideElement("equation1");

  hideElement("reset");
  hideElement("left");
  hideElement("right");
  displayElement("-");
  displayElement("arr-numbox");
  displayElement("+");
  displayElement("copy");
  displayElement("go");
  document.getElementById("target-numbox").style.pointerEvents = "auto";

  loadState0();

  state = [];
  curState = 0;
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
  saveState();
}

function notFound() {
  document.getElementById("result").innerHTML = "Target is not in the array";
  saveState();
}

function questionMarks() {
  for (let i = 0; i < arr.length; i++) {
    document.getElementById("tile" + i).firstChild.data = "?";
  }
}

function openCloseSidebar() {
  let sidebar = document.getElementById("sidebar");
  let myDiv = document.getElementById("codeContainer");
  if (sidebar.classList.contains("fa-flip-horizontal")) {
    sidebar.classList.remove("fa-flip-horizontal");
    myDiv.style.display = "none";
  } else {
    sidebar.classList.add("fa-flip-horizontal");
    myDiv.style.display = "flex";
  }
}

function equationHTML(idNum, equation) {
  document.getElementById("equation" + idNum).innerHTML = equation;
  MathJax.typeset();
}

function definePivot(myArr, pivotIndex, equationIDNum, equation) {
  colorTiles("green", pivotIndex, pivotIndex);
  document.getElementById("tile" + pivotIndex).firstChild.data =
    myArr[pivotIndex];
  equationHTML(equationIDNum, equation);
}

function showTitle1(title) {
  document.getElementById("title1").innerHTML = title;
  displayFlexElement("title1");
  displayFlexElement("equation1");
}

function loadState0() {
  clearDiv("content");
  for (let i = 0; i < arr.length; i++) {
    newTile(i, state[0].innerHTMLs[i], state[0].backgroundColors[i]);
  }

  document.getElementById("equation0").innerHTML = state[0].equation;
  document.getElementById("equation1").innerHTML = state[0].equation2;
  document.getElementById("result").innerHTML = state[0].result;

  let codeDiv = document.getElementById("code");
  let numCodeLines = codeDiv.getElementsByTagName("div").length;
  for (let i = 0; i < numCodeLines; i++) {
    document.getElementById("line" + i).style.backgroundColor = "rgb(60, 60, 60)";
    document.getElementById("line" + i).style.color = "white";      
  }
}

function previousState() {
  if (curState === 0) {
    return;
  }

  curState--;

  clearDiv("content");
  for (let i = 0; i < arr.length; i++) {
    newTile(
      i,
      state[curState].innerHTMLs[i],
      state[curState].backgroundColors[i]
    );
  }

  document.getElementById("equation0").innerHTML = state[curState].equation;
  document.getElementById("equation1").innerHTML = state[curState].equation2;
  document.getElementById("result").innerHTML = state[curState].result;
  colorCodeLine(state[curState].codeLine);
}

function nextState() {
  if (curState === state.length - 1) {
    return;
  }

  curState++;

  clearDiv("content");
  for (let i = 0; i < arr.length; i++) {
    newTile(
      i,
      state[curState].innerHTMLs[i],
      state[curState].backgroundColors[i]
    );
  }

  document.getElementById("equation0").innerHTML = state[curState].equation;
  document.getElementById("equation1").innerHTML = state[curState].equation2;
  document.getElementById("result").innerHTML = state[curState].result;
  colorCodeLine(state[curState].codeLine);
}

function saveState() {
  let backgroundColors = [];
  let innerHTMLs = [];
  let equation = document.getElementById("equation0").innerHTML;
  let equation2 = document.getElementById("equation1").innerHTML;
  let result = document.getElementById("result").innerHTML;
  let codeLine = -1;

  let codeDiv = document.getElementById("code");
  let numCodeLines = codeDiv.getElementsByTagName("div").length;
  for (let i = 0; i < numCodeLines; i++) {
    if (window.getComputedStyle(document.getElementById("line" + i)).color === "rgb(60, 60, 60)") {
      codeLine = i;
      break;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    backgroundColors.push(
      window.getComputedStyle(document.getElementById("tile" + i))
        .backgroundColor
    );
    innerHTMLs.push(document.getElementById("tile" + i).firstChild.data);
  }

  state.push(
    new StateStruct(backgroundColors, innerHTMLs, equation, equation2, result, codeLine)
  );
}

function displayElement(id) {
  document.getElementById(id).style.display = "block";
}

function displayFlexElement(id) {
  document.getElementById(id).style.display = "flex";
}

function hideElement(id) {
  document.getElementById(id).style.display = "none";
}

function appendDiv(parentID, childID, className, innerHTML) {
  const myDiv = document.createElement("div");
  myDiv.className = className;
  myDiv.id = childID;
  myDiv.innerHTML = innerHTML;
  document.getElementById(parentID).append(myDiv);
}

function newCodeLine(idNum, innerHTML) {
  appendDiv("code", "line" + idNum, "line", innerHTML);
}
