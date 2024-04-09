const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');
const arrays = lines.map(item => {
  if (item.length === 0) return [];
  return item.toString().split(' ').map(item => Number(item));
});

const array = arrays[1];

function sort(array) {
  if(array.length <= 1) return array;

  const pivot = array[Math.floor(Math.random() * array.length)]
  
  let eq = 0;
  let hight = 0;

  for (let n = 0; n < array.length; n++) {
    if (array[n] < pivot) {
      const temp = array[n];
      array[n] = array[hight];
      array[hight] = array[eq];
      array[eq] = temp;
      eq++
      hight++
    } else if (array[n] === pivot) {
      const temp = array[n];
      array[n] = array[hight];
      array[hight] = temp;
      hight++
    }
  }
  
  return [].concat(sort(array.slice(0, eq)), array.slice(eq, hight), sort(array.slice(hight, array.length)));
}

writeFileSync('output.txt', Array.isArray(array) ? sort(array).join(' ') : '');
