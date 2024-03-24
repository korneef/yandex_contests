const { readFileSync, writeFileSync } = require("fs");
const lists = readFileSync("input.txt", "utf8")
    .toString()
    .trim()
    .split('\n')
    .map(item => item.split(' ').map(item => Number(item)));

let oneOfThree = {};

const result = new Set();

for(let i = 0; i < lists[1].length || i < lists[3].length || i < lists[5].length; i++) {
    const firstListNumber = lists[1][i];
    if(firstListNumber !== undefined) {
        if(oneOfThree[firstListNumber] === undefined) {
            oneOfThree[firstListNumber] = {};
            oneOfThree[firstListNumber].firstList = true;
        } else {
            oneOfThree[firstListNumber].firstList = true;
        }
        if(oneOfThree[firstListNumber].secondList !== undefined ||
           oneOfThree[firstListNumber].thirdList !== undefined) result.add(firstListNumber);
    } 

    const secondListNumber = lists[3][i];
    if(secondListNumber !== undefined) {
        if(oneOfThree[secondListNumber] === undefined) {
            oneOfThree[secondListNumber] = {};
            oneOfThree[secondListNumber].secondList = true;
        } else {
            oneOfThree[secondListNumber].secondList = true;
        }
        if(oneOfThree[secondListNumber].firstList !== undefined ||
           oneOfThree[secondListNumber].thirdList !== undefined) result.add(secondListNumber);
    } 

    const thirdListNumber = lists[5][i];
    if(thirdListNumber !== undefined) {
        if(oneOfThree[thirdListNumber] === undefined) {
            oneOfThree[thirdListNumber] = {};
            oneOfThree[thirdListNumber].thirdList = true;
        } else {
            oneOfThree[thirdListNumber].thirdList = true;
        }
        if(oneOfThree[thirdListNumber].firstList !== undefined ||
           oneOfThree[thirdListNumber].secondList !== undefined) result.add(thirdListNumber);
    } 
}

const resultArray = Array.from(result);
resultArray.sort((a, b) => a - b);

writeFileSync('output.txt', resultArray.join(' '));
