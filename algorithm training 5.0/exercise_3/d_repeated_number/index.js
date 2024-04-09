const { readFileSync, writeFileSync } = require("fs");
const arrays = readFileSync("input.txt", "utf8")
    .toString()
    .trim()
    .split('\n');

const k = Number(arrays[0].split(' ')[1]);
const numbers = arrays[1].split(' ').map(item => Number(item));

const numbersIndexes = {};

for(let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    if(numbersIndexes[number] === undefined) {
        numbersIndexes[number] = [i];
    } else {
        numbersIndexes[number].push(i);
    }
}

function hasNubers(numbersIndexes) {
    let hasNumber = false

    Object.keys(numbersIndexes).forEach(item => {
        if (numbersIndexes[item].length > 1) {
            for(let i = 1; i < numbersIndexes[item].length; i++) {
                if (numbersIndexes[item][i] - numbersIndexes[item][i - 1] <= k) {
                    hasNumber = true
                };
            }
        };
    })

    return hasNumber ? 'YES' : 'NO';
}

Object.keys(numbersIndexes).forEach(item => {
    (numbersIndexes[item]);
})

writeFileSync('output.txt', `${hasNubers(numbersIndexes)}`);