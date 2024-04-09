const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');
const arrays = lines.map(item => item.toString().split(' ').map(item => Number(item)));

const swawnCells = arrays;

swawnCells.shift(1);

let chessDesk = [];

for(let i = 0; i <= 9; i++) {
    const swawnRowCells = swawnCells.filter(item => item[1] === i);
    chessDesk[i] = zerosArray(10);

    if (swawnRowCells) {
        swawnRowCells.forEach(item => {
            chessDesk[i][item[0]] = 1;
        })
    }
}

function getArea(chessDesk) {
    let area = 0;

    swawnCells.forEach(swawnCell => {
        getShiftCells(swawnCell).forEach(cell => {
            if(chessDesk[cell[1]][cell[0]] === 0) area += 1;
        });
        
    })

    return area;
}

function getShiftCells(coord) {
    return [
        [coord[0], coord[1] - 1],
        [coord[0] + 1, coord[1]],
        [coord[0] - 1, coord[1]],
        [coord[0], coord[1] + 1],
    ]
}

function zerosArray(lenght) {
    return Array.from({length: lenght}, () => 0)
}

writeFileSync("output.txt", `${getArea(chessDesk)}`);
