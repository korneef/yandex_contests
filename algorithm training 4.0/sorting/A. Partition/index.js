const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');
const arrays = lines.map(item => {
  if (item.length === 0) return [];
  return item.toString().split(' ').map(item => Number(item));
});

const array = arrays[1].slice(0, arrays[0] + 1);
const predicate = arrays[2][0];

function partition(array, predicate) {
  const predicateIsInArray = array.findIndex(item => item === predicate)

  if (predicateIsInArray === -1 && array.length <= 1) {
    return predicate < array[0] ? `${0}\n${array.length}` : `${array.length}\n${0}`
  }
  
  let eq = 0;
  let hight = 0;

  for (let n = 0; n < array.length; n++) {
    if (array[n] < predicate) {
      const temp = array[n];
      array[n] = array[hight];
      array[hight] = array[eq];
      array[eq] = temp;
      eq++
      hight++
    }

    if (array[n] === predicate) {
      const temp = array[n];
      array[n] = array[hight];
      array[hight] = temp;
      hight++
    }
  }
  return `${array.slice(0, eq).length}\n${array.slice(eq, array.length).length}`

}

writeFileSync('output.txt', partition(array, predicate));
