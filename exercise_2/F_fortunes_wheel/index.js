const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');
const arrays = lines.map(item => item.toString().split(' ').map(item => Number(item)));

const [sectorsCount] = arrays[0];
const sectorsPoints = arrays[1];
const [minSpeed, maxSpeed, slowDown] = arrays[2];

function getMaximumPoint() {
    let minRollsCount = minSpeed <= slowDown ? 0 : Math.floor(minSpeed / slowDown);
    let maxRollsCount = maxSpeed <= slowDown ? 0 : Math.floor(maxSpeed / slowDown);
    if(minSpeed % slowDown === 0 && minRollsCount !== 0) minRollsCount -= 1; 
    if(maxSpeed % slowDown === 0 && maxRollsCount !== 0) maxRollsCount -= 1; 

    let maxPoint = 0;

    if (maxRollsCount - minRollsCount >= sectorsCount) {
        sectorsPoints.forEach(point => {
            if(point > maxPoint) maxPoint = point;
        })

        return `${maxPoint}`;
    }

    const startPositionRight = getPositionIndex(minRollsCount, sectorsCount, 'right');
    const endPositionRight = getPositionIndex(maxRollsCount, sectorsCount, 'right');
    const startPositionLeft = getPositionIndex(minRollsCount, sectorsCount, 'left');
    const endPositionLeft = getPositionIndex(maxRollsCount, sectorsCount, 'left');

    const rightIterationCount = 
        startPositionRight > endPositionRight 
        ? sectorsCount - startPositionRight + endPositionRight 
        : endPositionRight - startPositionRight + 1;

    for (let i = 0; i < rightIterationCount; i++) {
        let index = startPositionRight + i;

        if(index > sectorsCount - 1) index = index - sectorsCount;

        const currentPoint = sectorsPoints[index];

        if(currentPoint > maxPoint) maxPoint = currentPoint;
    }

    const leftIterationCount = 
        endPositionLeft > startPositionLeft 
        ? sectorsCount - endPositionLeft + startPositionLeft + 1
        : startPositionLeft - endPositionLeft + 1;
        
    for (let i = 0; i < leftIterationCount; i++) {
        let index = startPositionLeft - i;

        if(index < 0) index = index + sectorsCount;

        const currentPoint = sectorsPoints[index];

        if(currentPoint > maxPoint) maxPoint = currentPoint;
    }

    return `${maxPoint}` 
}

function getPositionIndex(rollsCount, sectorsCount, direction) {
    const i = rollsCount % sectorsCount;
    
    if (direction === 'right') return i;

    if (i === 0) return 0;
    return sectorsCount - i;
}

writeFileSync("output.txt", `${getMaximumPoint()}`);
