const { readFileSync, writeFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf8").toString().trim().split('\n');
const arrays = lines.map(item => item.toString().split(' ').map(item => Number(item)));

const expirationDate = arrays[0][1];
const pricePerDay = arrays[1];

function getMaximumPrice(pricePerDay, expirationDate) {
    let maximumPrice = 0;

    for(let i = 0; i < pricePerDay.length; i++) {
        for(let y = 1; y <= expirationDate; y++) {
            const currentDifference = pricePerDay[i + y] - pricePerDay[i];
            if(currentDifference > maximumPrice) maximumPrice = currentDifference;
        }
    }

    return `${maximumPrice}`
}

writeFileSync("output.txt", getMaximumPrice(pricePerDay, expirationDate));
