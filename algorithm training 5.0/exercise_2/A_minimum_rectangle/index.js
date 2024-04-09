const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');
const arrays = lines.map(item => item.toString().split(' ').map(item => Number(item)));
const arraysCount = arrays.splice(0, 1)[0]

function getRectangle(field) {
    const rectangleCoord = {
        xMin: field[0][0],
        yMin: field[0][1],
        xMax: field[0][0],
        yMax: field[0][1]
    }

    for(let i = 0; i < field.length; i++) {
        if(i === 2) console.log(field[i])

        if (field[i][0] < rectangleCoord.xMin) rectangleCoord.xMin = field[i][0];
        if (field[i][1] < rectangleCoord.yMin) rectangleCoord.yMin = field[i][1];
        if (field[i][0] > rectangleCoord.xMax) rectangleCoord.xMax = field[i][0];
        if (field[i][1] > rectangleCoord.yMax) rectangleCoord.yMax = field[i][1];
    }

    return `${rectangleCoord.xMin} ${rectangleCoord.yMin} ${rectangleCoord.xMax} ${rectangleCoord.yMax}`
}

writeFileSync("output.txt", getRectangle(arrays));
