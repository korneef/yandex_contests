const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');
const arrays = lines.map(item => item.toString().split(' ').map(item => Number(item)));

const ropes = lines[1].split(' ').map(rope => Number(rope));

function getMinRope(ropes) {
    let maxLength = 0;
    let sum = 0;

    for(let i = 0; i < ropes.length; i++) {
        const rope = ropes[i];

        if(maxLength < rope) maxLength = rope;

        sum = sum + rope;
    }

    if (maxLength * 2 > sum) return maxLength * 2 - sum;

    return sum;
}

writeFileSync("output.txt", `${getMinRope(ropes)}`);
