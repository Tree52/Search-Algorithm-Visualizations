// https://learnersbucket.com/examples/algorithms/iterative-merge-sort-algorithm/

const mergeSort = (arr) => {
  //Create two arrays for sorting
  let sorted = Array.from(arr);
  let n = sorted.length;
  let buffer = new Array(n);

  for (let size = 1; size < n; size *= 2) {
    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      //Get the two sub arrays
      let left = leftStart,
        right = Math.min(left + size, n),
        leftLimit = right,
        rightLimit = Math.min(right + size, n);

      //Merge the sub arrays
      merge(left, right, leftLimit, rightLimit, sorted, buffer);
    }

    //Swap the sorted sub array and merge them
    let temp = sorted;
    sorted = buffer;
    buffer = temp;
  }

  return sorted;
};

const merge = (left, right, leftLimit, rightLimit, sorted, buffer) => {
  let i = left;

  //Compare the two sub arrays and merge them in the sorted order
  while (left < leftLimit && right < rightLimit) {
    if (sorted[left] <= sorted[right]) {
      buffer[i++] = sorted[left++];
    } else {
      buffer[i++] = sorted[right++];
    }
  }

  //If there are elements in the left sub arrray then add it to the result
  while (left < leftLimit) {
    buffer[i++] = sorted[left++];
  }

  //If there are elements in the right sub array then add it to the result
  while (right < rightLimit) {
    buffer[i++] = sorted[right++];
  }
};
