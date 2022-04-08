const array = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 33, 41, 42, 44, 48,
  58, 60, 67, 71, 75, 80, 83, 89, 99, 102, 103, 104, 105, 106, 107,
];

const binarySearch = (array, item) => {
  let start = 0;
  let end = array.length;
  let middle;
  let iterator = 0;

  while (true) {
    middle = Math.floor((end + start) / 2);
    iterator++;

    if (array[middle] === item) {
      console.log(`индекс ${middle} за ${iterator} итераций`);
      return middle;
    }

    if (array[middle] > item) {
      end = middle - 1;
    }

    if (array[middle] < item) {
      start = middle + 1;
    }

    console.log(`start: ${start}, end: ${end}, middle: ${middle}`);
  }
};

console.log("\nSearch 8:");
console.log(array[binarySearch(array, 8)]);

console.log("\nSearch 0:");
console.log(array[binarySearch(array, 0)]);

console.log("\nSearch 12:");
console.log(array[binarySearch(array, 12)]);

console.log("\nSearch 10:");
console.log(array[binarySearch(array, 10)]);

console.log("\nSearch 13:");
console.log(array[binarySearch(array, 13)]);

console.log("\nSearch 75:");
console.log(array[binarySearch(array, 75)]);

console.log("\nSearch 99:");
console.log(array[binarySearch(array, 99)]);

console.log("\nSearch 33:");
console.log(array[binarySearch(array, 33)]);

console.log("\nSearch 42:");
console.log(array[binarySearch(array, 42)]);

console.log("\nSearch 104:");
console.log(array[binarySearch(array, 104)]);

console.log("");
const recursiveBinarySearch = (array, item, start, end) => {
  const middle = Math.floor((end + start) / 2);

  if (array[middle] === item) {
    return middle;
  }

  if (array[middle] > item) {
    return recursiveBinarySearch(array, item, start, middle - 1);
  } else {
    return recursiveBinarySearch(array, item, middle + 1, end);
  }
};

const index104 = recursiveBinarySearch(array, 104, 0, array.length);
console.log(
  `индекс индекс числа 104 [${index104}], проверка, по этому индексу: ${array[index104]}`
);
