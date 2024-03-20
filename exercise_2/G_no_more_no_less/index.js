const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');
const arrays = lines.map(item => item.split(' ').map(item => Number(item)));

let result = '';

for (let i = 2; i < arrays.length; i += 2) {
    result += getSegments(arrays[i]);
}

function getSegments(array) {
    let segment = [];
    let minValue = array[0];
    let segments = '';
    let segmentsCount = 0;

    for (let i = 0; i < array.length; i++) {
        const currentValue = array[i];

        if(currentValue < minValue) minValue = currentValue;

        if(minValue >= segment.length + 1) {
            segment.push(array[i]);
        } else {
            segmentsCount += 1;
            segments = segments + `${segment.length} `;
            segment = [array[i]];
            minValue = array[i];
        }
    }

    segmentsCount += 1;
    segments = segments + `${segment.length} `;

    return `${segmentsCount}\n${segments}\n`;
}

writeFileSync("output.txt", result);
