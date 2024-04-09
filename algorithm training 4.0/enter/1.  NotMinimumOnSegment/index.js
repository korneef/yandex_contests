const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');
const arrays = lines.map(item => item.toString().split(' ').map(item => Number(item)));

function reducer (input) {
  const initialArray = input[1].slice(0, input[0][0]);
  const tasks = input.slice(2, input[0][1]+2)
  let result = ''
  tasks.forEach(element => {
    const partOfInitial = initialArray.slice(element[0], element[1]+1).sort((a,b) => a - b);
    let minimumNumber = 'NOT FOUND\n';
    for (let i = 1; i < partOfInitial.length; i++) {
      if(partOfInitial[i]>partOfInitial[0]) {
        minimumNumber = `${partOfInitial[i]}\n`;
        break
      }
    }
    result += minimumNumber;
  });
  return result
}

writeFileSync("output.txt", reducer(arrays))