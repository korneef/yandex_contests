const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input17.txt", "utf8").toString().trim().split('\n');

const array = (lines.slice(1, Number(lines[0]) + 1));

let resultString = `Initial array:\n${array.join(', ')}\n**********\n`;
const phasesConunt = array[0].length;

const resultArray = [];
let phaseResult = [];

function firstPhase(array) {
  const phaseResult = [];
  for (let j = 0; j < array.length; j++) {
    const element = array[j];
    const bucketNumber = element[phasesConunt - 1];
    if (phaseResult[bucketNumber] === undefined) {
      phaseResult[bucketNumber] = [element]
    } else {
      phaseResult[bucketNumber].push(element)
    }
  }
  return phaseResult;
}

phaseResult = firstPhase(array);
resultString = resultString + writeResult(phaseResult, 1)

for (let i = 2; i <= phasesConunt; i++) {
  const iterationResult = [];
  
  for(let j = 0; j < phaseResult.length; j++) {
    const currentBucket = phaseResult[j];
    if(Array.isArray(currentBucket)) {
      
      currentBucket.forEach(item => {
        const iterationBucketIndex = Number([item[phasesConunt - i]]);
        if (Array.isArray(iterationResult[iterationBucketIndex])) {
          iterationResult[iterationBucketIndex].push(item)
        } else {
          iterationResult[iterationBucketIndex] = [item]
        }
      })

    }
  }
  resultString = resultString + writeResult(iterationResult, i);
  phaseResult = iterationResult;
}

for(let i = 0; i < phaseResult.length; i ++) {
  if(Array.isArray(phaseResult[i])) {
    phaseResult[i].forEach(item => resultArray.push(item));
  }
}

const sortedArrayString = `Sorted array:\n${resultArray.join(', ')}`
const finallyResult = resultString + sortedArrayString;

writeFileSync('output.txt', finallyResult);

function writeResult(array, phaseNubmer) {
  let phaseResult = `Phase ${phaseNubmer}\n`
  for (let i = 0; i < 10; i++) {
    let bucketNumber = `Bucket ${i}:`
    if (Array.isArray(array[i])) {
      bucketNumber = `${bucketNumber} ${array[i].join(', ')}\n`
    } else {
      bucketNumber = `${bucketNumber} empty\n`
    }
    phaseResult = phaseResult + bucketNumber;
  }

  return `${phaseResult}**********\n`;
}
