const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');

const membersCount = (lines.length - 1) / 2;

const arrays = lines.map(item => item.toString().split(' '));

const soungsEstimate = {};

for(let i = 2; i < arrays.length; i += 2) {
    arrays[i].forEach(item => {
        if(soungsEstimate[item] === undefined) {
            soungsEstimate[item] = 1;
        } else {
            soungsEstimate[item] += 1;
        }
    })
}

let songs = [];

Object.keys(soungsEstimate).forEach(item => {
    const count = soungsEstimate[item];
    if(count === membersCount) songs.push(item);
})

writeFileSync("output.txt", `${songs.length}\n${songs.sort().join(' ')}`);
