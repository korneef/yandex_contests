const { readFileSync, writeFileSync } = require("fs");
const lists = readFileSync("input.txt", "utf8")
    .toString()
    .trim()
    .split('\n')
    .map(item => item.split(' '))

const dictionary = {};
let minimumDictionaryLength = lists[0][0].length;

lists[0].forEach(item => {
    if(item.length < minimumDictionaryLength) minimumDictionaryLength = item.length;
});

lists[0].forEach(item => {
    let word = '';
    for(let i = 0; i < minimumDictionaryLength; i++) {
        word += item[i];
    }

    if(dictionary[word]) {
        dictionary[word].push(item);
    } else {
        dictionary[word] = [item];
    }
});

Object.keys(dictionary).forEach(key => {
    dictionary[key].sort();

    for(let i = 0; i < dictionary[key].length; i++) {
        const regex = new RegExp("^" + dictionary[key][i]);

        for (let y = 0; y < dictionary[key].length; y++) {
            if(regex.test(dictionary[key][y])) dictionary[key][y] = dictionary[key][i];
        }

        dictionary[key] = arrayToUniqueArray(dictionary[key]);
    }
})

const text = lists[1];

for(let i = 0; i < text.length; i++) {
    let word = '';
    if(text[i].length < minimumDictionaryLength) continue;
    
    for(let y = 0; y < minimumDictionaryLength; y++) {
        word += text[i][y];
    }

    if(dictionary[word]) {
        for(let y = 0; y < dictionary[word].length; y++) {
            if(new RegExp("^" + dictionary[word][y]).test(text[i])) {
                text[i] = dictionary[word][y];
                break;
            };
        }
    }
}

function arrayToUniqueArray(arr) {
    const set = new Set(arr);
    return Array.from(set);
  }

writeFileSync('output.txt', text.join(' '));
