const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');

function isAnagram(word1, word2) {
    const lettersOfWord1 = getLettersCount(word1);
    const lettersOfWord2 = getLettersCount(word2);

    for (key in lettersOfWord1) {
        if(lettersOfWord1[key] !== lettersOfWord2[key]) return 'NO';
    }

    return 'YES';
}

function getLettersCount(string) {
    const lettersCount = {};

    for(let i = 0; i < string.length; i++) {
        const letter = string[i];

        if(lettersCount[letter] === undefined) {
            lettersCount[letter] = 1;
        } else {
            lettersCount[letter] += 1;
        }
    }

    return lettersCount;
}

writeFileSync('output.txt', isAnagram(lines[0], lines[1]));