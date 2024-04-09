const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');
const arrays = lines.map(item => item.toString().split(' ').map(item => Number(item)));

const user1 = {
    treeNumber: arrays[0][0],
    distance: arrays[0][1],
}

const user2 = {
    treeNumber: arrays[1][0],
    distance: arrays[1][1],
}

const rangeUser1 = {
    start: user1.treeNumber - user1.distance,
    finish: user1.treeNumber + user1.distance,
}

const rangeUser2 = {
    start: user2.treeNumber - user2.distance,
    finish: user2.treeNumber + user2.distance,
}

const hasCrossing = (range1, range2) => (
        (range1.start >= range2.start && range1.start <= range2.finish) ||
        (range1.finish >= range2.start && range1.finish <= range2.finish) ||
        (range2.start >= range1.start && range2.start <= range1.finish) ||
        (range2.finish >= range1.start && range2.finish <= range1.finish)
    );

function treeCounts(range1, range2) {
    if (hasCrossing(range1, range2)) {
        const startRange = range1.start < range2.start ? range1.start : range2.start;
        const finishRange = range1.finish > range2.finish ? range1.finish : range2.finish;
        return finishRange - startRange + 1;
    } else {
        const user1Count = range1.finish - range1.start + 1;
        const user2Count = range2.finish - range2.start + 1;
        return user1Count + user2Count;
    }
}

writeFileSync("output.txt", `${treeCounts(rangeUser1, rangeUser2)}`);
