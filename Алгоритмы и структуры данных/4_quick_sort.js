const array = [
  397, 6, 709, 430, 547, 156, 296, 118, 806, 537, 154, 363, 12, 895, 440, 165,
  259, 608, 140, 895, 248, 581, 721, 795, 481, 470, 263, 368, 218, 513,
];

let iterator = 0;

const quickSort = (array) => {
  if (array.length <= 1) return array;

  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array[pivotIndex];
  const less = [];
  const greater = [];

  for (const item of array) {
    if (item === pivot) continue;
    if (item > pivot) {
      greater.push(item);
    } else {
      less.push(item);
    }
    iterator++;
  }

  return [...quickSort(less), pivot, ...quickSort(greater)];
};

const res = quickSort(array);

console.log(`Количество итераций ${iterator}`);
console.log(res);

/**
 * Количество итераций 127
 * [
 *     6,  12, 118, 140, 154, 156, 165,
 *   218, 248, 259, 263, 296, 363, 368,
 *   397, 430, 440, 470, 481, 513, 537,
 *   547, 581, 608, 709, 721, 795, 806,
 *   895, 895
 * ]
 */
