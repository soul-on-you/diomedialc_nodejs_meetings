const array = [3, 5, 1, 7, 9, 0, 2, 4, 6, 8];

const linearSearch = (array, item) => {
  let iterator = 0;
  for (const index in array) {
    iterator++;
    if (array[index] === item) {
      console.log(`индекс ${index} за ${iterator} итераций`);
    }
  }
};

linearSearch(array, 6);

//!TEST
// выводит элементы
const forOF = (array) => {
  for (const index of array) {
    console.log(index);
  }
};

// выводит индексы
const forIN = (array) => {
  for (const index in array) {
    console.log(index);
  }
};

forOF(array);
forIN(array);
