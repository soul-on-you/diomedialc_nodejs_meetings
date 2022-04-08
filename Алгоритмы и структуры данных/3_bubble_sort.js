const array = [
  397, 6, 709, 430, 547, 156, 296, 118, 806, 537, 154, 363, 12, 895, 440, 165,
  259, 608, 140, 895, 248, 581, 721, 795, 481, 470, 263, 368, 218, 513,
];

const bubbleSort = (array) => {
  let iterator = 0;

  for (const curIndex in array) {
    for (const bubbleIndex in array) {
      if (array[bubbleIndex] > array[curIndex]) {
        const tmp = array[bubbleIndex];
        array[bubbleIndex] = array[curIndex];
        array[curIndex] = tmp;
      }
      iterator++;
    }
  }

  console.log(`Количество итераций ${iterator}`);

  return array;
};

const res = bubbleSort(array);
console.log(res);

/**
 * Количество итераций 900
 * [
 *     6,  12, 118, 140, 154, 156, 165,
 *   218, 248, 259, 263, 296, 363, 368,
 *   397, 430, 440, 470, 481, 513, 537,
 *   547, 581, 608, 709, 721, 795, 806,
 *   895, 895
 * ]
 */
