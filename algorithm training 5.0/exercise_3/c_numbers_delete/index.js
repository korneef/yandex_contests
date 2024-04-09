const { readFileSync, writeFileSync } = require("fs");
const numbers = readFileSync("input.txt", "utf8")
    .toString()
    .trim()
    .split('\n')[1]
    .split(' ')
    .map(item => Number(item));

const groupOfNumbers = {};

for (let i = 0; i < numbers.length; i++) {
    groupOfNumbers[numbers[i]] = 0;
}

numbers.forEach(number => {
    groupOfNumbers[number] += 1;
    if (groupOfNumbers[number + 1] !== undefined) groupOfNumbers[number + 1] += 1;
})

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

writeFileSync('output.txt', `${numbers.length - getMaxOfArray(Object.values(groupOfNumbers))}`);