const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().split('\n');
const arrays = lines.map(item => {
  if (item.length === 0) return [];
  return item.toString().split(' ').map(item => Number(item));
});

const array = arrays[1].slice(0, arrays[0]);

function mergeSort (array) {
  console.log
  if(array.length <=1) return array;
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return mergeArrays(sourceArrayIterator(sortedLeft), sourceArrayIterator(sortedRight));
}

function sourceArrayIterator(array) {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length 
      ? { value: array[nextIndex++], done: false } 
      : { value: undefined, done: true }
    }
  }
}

function forcePush(array, iterator) {
  let iterationDone = iterator.done;
  while (!iterationDone) {
    const { value, done: iterationDone }= iterator.next();
    if (iterationDone) break
    array.push(value);
  }
}

function mergeArrays(iterator1, iterator2) {
  const result = [];

  let it1 = iterator1.next();
  let it2 = iterator2.next();

  while (!it1.done || !it2.done) {

    if(it1.done) {
      result.push(it2.value)
      forcePush(result, iterator2);
      it2 = iterator2.next();
      break
    };

    if(it2.done) {
      result.push(it1.value)
      forcePush(result, iterator1)
      it1 = iterator1.next();
      break
    };

    if(it1.value === it2.value) {
      result.push(it1.value);
      it1 = iterator1.next();
    }

    if(it2.value > it1.value) {
      result.push(it1.value)
      it1 = iterator1.next();
    } else if (it2.value < it1.value){
      result.push(it2.value)
      it2 = iterator2.next();
    }
  }
  return result;
}

writeFileSync('output.txt', mergeSort(array).join(' '));
