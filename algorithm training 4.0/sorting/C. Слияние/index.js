const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().split('\n');
const arrays = lines.map(item => {
  if (item.length === 0) return [];
  return item.toString().split(' ').map(item => Number(item));
});

const array1 = arrays[1].slice(0, arrays[0]);
const array2 = arrays[3].slice(0, arrays[2]);

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
    const { value, done }= iterator.next();
    iterationDone = done;
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
      break
    };

    if(it2.done) {
      result.push(it1.value)
      forcePush(result, iterator1)
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

writeFileSync('output.txt', mergeArrays(
  sourceArrayIterator(array1),
  sourceArrayIterator(array2)
).join(' '));
