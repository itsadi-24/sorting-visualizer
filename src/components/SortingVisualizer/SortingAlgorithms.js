import {
  COMP_COLOR,
  SORTED_COLOR,
  PIVOT_COLOR,
  ORGINAL_COLOR,
} from '../../utils/constants';

async function waitForAnimate(speedRef) {
  const sp = speedRef.current < 5 ? 5 : speedRef.current;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 1000 - sp); // Invert the speed so that higher values mean faster
  });
}

export async function bubbleSort(newBars, swap, stopSortingRef, speedRef) {
  for (var i = 0; i < newBars.length; i++) {
    for (var j = 0; j < newBars.length - 1 - i; j++) {
      if (stopSortingRef.current) return;
      document.getElementById('bar-' + j).style.background = COMP_COLOR;
      document.getElementById('bar-' + (j + 1)).style.background = COMP_COLOR;
      await waitForAnimate(speedRef);
      document.getElementById('bar-' + j).style.background = ORGINAL_COLOR;
      document.getElementById('bar-' + (j + 1)).style.background =
        ORGINAL_COLOR;

      if (newBars[j] > newBars[j + 1]) {
        swap(j, j + 1, newBars);
      }
    }
    var sorted = newBars.length - 1 - i;
    document.getElementById('bar-' + sorted).style.background = SORTED_COLOR;
  }
}

export async function selectionSort(newBars, swap, stopSortingRef, speedRef) {
  for (var i = 0; i < newBars.length; i++) {
    if (stopSortingRef.current) return;
    var leastIdx = i;
    document.getElementById('bar-' + leastIdx).style.background = 'black';

    for (var j = i + 1; j < newBars.length; j++) {
      if (stopSortingRef.current) return;
      document.getElementById('bar-' + j).style.background = COMP_COLOR;
      await waitForAnimate(speedRef);
      document.getElementById('bar-' + j).style.background = ORGINAL_COLOR;

      if (newBars[j] < newBars[leastIdx]) {
        document.getElementById('bar-' + leastIdx).style.background =
          ORGINAL_COLOR;
        leastIdx = j;
        document.getElementById('bar-' + leastIdx).style.background = 'black';
      }
    }
    swap(i, leastIdx, newBars);
    document.getElementById('bar-' + leastIdx).style.background = ORGINAL_COLOR;
    document.getElementById('bar-' + i).style.background = SORTED_COLOR;
  }
}

export async function insertionSort(newBars, swap, stopSortingRef, speedRef) {
  for (var i = 1; i < newBars.length; i++) {
    if (stopSortingRef.current) return;
    var tmp = newBars[i],
      j = i - 1;
    document.getElementById('bar-' + i).style.transform = 'translateY(15px)';

    while (j >= 0 && newBars[j] > tmp) {
      if (stopSortingRef.current) return;
      document.getElementById('bar-' + j).style.background = COMP_COLOR;
      document.getElementById('bar-' + (j + 1)).style.background = PIVOT_COLOR;

      await waitForAnimate(speedRef);
      newBars[j + 1] = newBars[j];
      document.getElementById('bar-' + (j + 1)).style.height =
        newBars[j] + 'px';
      document.getElementById('bar-' + (j + 1)).style.background = SORTED_COLOR;
      j--;
    }
    newBars[j + 1] = tmp;
    document.getElementById('bar-' + (j + 1)).style.height = tmp + 'px';
    document.getElementById('bar-' + (j + 1)).style.background = SORTED_COLOR;
    document.getElementById('bar-' + i).style.transform = 'translateY(0px)';
  }
}

async function partition(low, high, array, swap, stopSortingRef, speedRef) {
  if (stopSortingRef.current) return;
  let pivot = high,
    i = low;
  document.getElementById('bar-' + pivot).style.background = PIVOT_COLOR;

  for (let j = low; j < high; j++) {
    if (stopSortingRef.current) return;
    document.getElementById('bar-' + j).style.background = COMP_COLOR;
    document.getElementById('bar-' + i).style.background = COMP_COLOR;
    await waitForAnimate(speedRef);
    document.getElementById('bar-' + j).style.background = ORGINAL_COLOR;
    document.getElementById('bar-' + i).style.background = ORGINAL_COLOR;

    if (array[j] <= array[pivot]) {
      swap(i, j, array);
      i++;
    }
  }
  swap(i, pivot, array);
  document.getElementById('bar-' + pivot).style.background = ORGINAL_COLOR;
  return i;
}

export async function quickSort(
  low,
  high,
  array,
  swap,
  stopSortingRef,
  speedRef
) {
  if (stopSortingRef.current) return;
  if (low >= high) return;
  let pi = await partition(low, high, array, swap, stopSortingRef, speedRef);
  await quickSort(low, pi - 1, array, swap, stopSortingRef, speedRef);
  await quickSort(pi + 1, high, array, swap, stopSortingRef, speedRef);
}

export async function mergeSort(
  low,
  high,
  array,
  swap,
  stopSortingRef,
  speedRef
) {
  if (stopSortingRef.current) return;
  if (low >= high) return;
  var mid = Math.floor((low + high) / 2);
  await mergeSort(low, mid, array, swap, stopSortingRef, speedRef);
  await mergeSort(mid + 1, high, array, swap, stopSortingRef, speedRef);

  var newArr1 = [],
    newArr2 = [];
  for (let i = low; i <= mid; i++) {
    newArr1.push({ x: array[i], idx: i });
  }
  for (let i = mid + 1; i <= high; i++) {
    newArr2.push({ x: array[i], idx: i });
  }
  let i = 0,
    j = 0,
    k = low;
  while (i < newArr1.length && j < newArr2.length) {
    if (stopSortingRef.current) return;
    document.getElementById('bar-' + newArr1[i].idx).style.background =
      COMP_COLOR;
    document.getElementById('bar-' + newArr2[j].idx).style.background =
      COMP_COLOR;
    await waitForAnimate(speedRef);
    document.getElementById('bar-' + newArr1[i].idx).style.background =
      SORTED_COLOR;
    document.getElementById('bar-' + newArr2[j].idx).style.background =
      SORTED_COLOR;

    if (newArr1[i].x < newArr2[j].x) {
      array[k] = newArr1[i].x;
      document.getElementById('bar-' + k).style.height = array[k] + 'px';
      i++;
    } else {
      array[k] = newArr2[j].x;
      document.getElementById('bar-' + k).style.height = array[k] + 'px';
      j++;
    }
    k++;
  }
  while (i < newArr1.length) {
    if (stopSortingRef.current) return;
    array[k] = newArr1[i].x;
    document.getElementById('bar-' + k).style.height = array[k] + 'px';
    document.getElementById('bar-' + k).style.background = SORTED_COLOR;
    i++;
    k++;
  }
  while (j < newArr2.length) {
    if (stopSortingRef.current) return;
    array[k] = newArr2[j].x;
    document.getElementById('bar-' + k).style.height = array[k] + 'px';
    document.getElementById('bar-' + k).style.background = SORTED_COLOR;
    j++;
    k++;
  }
}
