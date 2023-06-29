function metaSearch(target, A) {
  let numBitsNeededForMaxIndex = Math.ceil(Math.log2(A.length));

  clearDiv("result");
  for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
    newEmptyTile(i);
  }
  saveState();

  let cutoff = 0;
  for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {
    definePivot(A, cutoff, 0, "$$cutoff=" + cutoff + "$$");
    saveState();
    if (A[cutoff] === target) {
      found(target, cutoff);
      return cutoff;
    }
    colorTiles("white", 0, cutoff);
    saveState();

    let cutoffCandidate = cutoff | (1 << i);
    equationHTML(1, "$$cutoffCandidate=" + cutoff + "+2^{" + i + "}=" + cutoffCandidate + "$$");

    if (cutoffCandidate < A.length) {
      colorTiles("lightgreen", cutoffCandidate, cutoffCandidate);
      document.getElementById("tile" + cutoffCandidate).firstChild.data =
        A[cutoffCandidate];
      saveState();
    }

    if (cutoffCandidate < A.length && A[cutoffCandidate] <= target) {
      cutoff = cutoffCandidate;
      document.getElementById("empty-tile" + i).innerHTML = 1;
      saveState();
      continue;
    }
    colorTiles("white", cutoffCandidate, A.length - 1);
    document.getElementById("empty-tile" + i).innerHTML = 0;
    saveState();
  }

  definePivot(A, cutoff, 0, "$$cutoff=" + cutoff + "$$");
  saveState();
  if (A[cutoff] === target) {
    found(target, cutoff);
    return cutoff;
  }
  colorTiles("white", cutoff, cutoff);
  saveState();

  notFound();
  return -1;
}

// prettier-ignore
function metaCode() {
  newCodeLine("function metaSearch(target, A) {");
  newCodeLine("&emsp;let numBitsNeededForMaxIndex = Math.ceil(Math.log2(A.length));");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;let cutoff = 0;");
  newCodeLine("&emsp;for (let i = numBitsNeededForMaxIndex - 1; i >= 0; i--) {");
  newCodeLine("&emsp;&emsp;if (A[cutoff] === target) {");
  newCodeLine("&emsp;&emsp;&emsp;return cutoff;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;let cutoffCandidate = cutoff | (1 << i);");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;&emsp;if (cutoffCandidate < A.length && A[cutoffCandidate] <= target) {");
  newCodeLine("&emsp;&emsp;&emsp;cutoff = cutoffCandidate;");
  newCodeLine("&emsp;&emsp;}");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;if (A[cutoff] === target) {");
  newCodeLine("&emsp;&emsp;return cutoff;");
  newCodeLine("&emsp;}");
  newCodeLine("&nbsp;");
  newCodeLine("&emsp;return -1;");
  newCodeLine("}");
}
