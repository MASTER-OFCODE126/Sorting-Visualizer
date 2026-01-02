export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // time to revert their color.
    animations.push([i, i]);

    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
export function getHeapSortAnimations(array) {
  const animations = [];
  const n = array.length;
  const arr = array.slice(); // Copy to avoid mutation

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  // Heap sort
  for (let i = n - 1; i > 0; i--) {
    animations.push([0, i]); // Color swap
    animations.push([0, i]); // Color revert
    animations.push([0, arr[i]]); // Height change
    animations.push([i, arr[0]]);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0, animations);
  }

  return animations;
}

function heapify(arr, n, i, animations) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    animations.push([i, largest]); // Color swap
    animations.push([i, largest]); // Color revert
    animations.push([i, arr[largest]]); // Height swap
    animations.push([largest, arr[i]]);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, animations);
  }
}
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    const pivotIndex = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIndex - 1, animations);
    quickSortHelper(array, pivotIndex + 1, high, animations);
  }
}

function partition(array, low, high, animations) {
  const pivot = array[high];
  let i = low;

  for (let j = low; j < high; j++) {
    animations.push(["compare", j, high]);
    animations.push(["revert", j, high]);

    if (array[j] <= pivot) {
      animations.push(["swap", i, array[j]]);
      animations.push(["swap", j, array[i]]);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
    }
  }

  animations.push(["swap", i, array[high]]);
  animations.push(["swap", high, array[i]]);
  let temp = array[i];
  array[i] = array[high];
  array[high] = temp;

  return i;
}
