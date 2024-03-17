const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');

const countFirstMatch = {
    teamA: lines[0].split(':').map(item => Number(item))[0],
    teamB: lines[0].split(':').map(item => Number(item))[1]
}

const countSecondtMatch = {
    teamA: lines[1].split(':').map(item => Number(item))[0],
    teamB: lines[1].split(':').map(item => Number(item))[1]
}

const firstGameInHome = lines[2] === '1' ? true : false;

const currentCount = {
    teamA: countFirstMatch.teamA + countSecondtMatch.teamA,
    teamB: countFirstMatch.teamB + countSecondtMatch.teamB
}

function getGoalsCount() {
    const currentDifference = currentCount.teamA - currentCount.teamB;
    if(currentDifference > 0) return 0;

    if(currentDifference === 0) {
        const guestDifference = firstGameInHome ? 
        countSecondtMatch.teamA - countFirstMatch.teamB : 
        countFirstMatch.teamA - countSecondtMatch.teamB;

        if(guestDifference > 0) return 0

        return Math.abs(currentDifference) + 1;
    };

    if(firstGameInHome) {
        if(countFirstMatch.teamA === countSecondtMatch.teamB) return Math.abs(currentDifference) + 1;
    }
    
    return Math.abs(currentDifference) + 1;
}
console.log(getGoalsCount())
writeFileSync("output.txt", `${getGoalsCount()}`);
