const { readFileSync, writeFileSync } = require("fs");
const positiveWildberries = [];
const negativeWildberries = [];
let maxPositiveDownWildberry = [0, -1];
let maxNegativeUpWildberry = [-1, 0];
readFileSync("input.txt", "utf8").toString().trim().split('\n').map(item => item
    .toString()
    .split(' ')
    .map(item => Number(item)))
    .map((wildberry, index) => {
        if(index === 0) return

        wildberry.push(index);

        if(wildberry[0] > wildberry[1]) {
            if(wildberry[1] > maxPositiveDownWildberry[1]) {
                if (maxPositiveDownWildberry[1] !== -1) positiveWildberries.push(maxPositiveDownWildberry);
                maxPositiveDownWildberry = wildberry;
            } else {
                positiveWildberries.push(wildberry);
            }
        } else {
            if(wildberry[0] > maxNegativeUpWildberry[0]) {
                if(maxNegativeUpWildberry[0] !== -1) negativeWildberries.push(maxNegativeUpWildberry);
                maxNegativeUpWildberry = wildberry;
            } else {
                negativeWildberries.push(wildberry);
            };
        };
})

function getWildberriesOrder() {
    let wildberriesOrder = '';
    let currentAttitude = 0;
    let maxAttitude = 0;

    positiveWildberries.forEach(wildberry => {
        wildberriesOrder += wildberry[2] + ' ';
        currentAttitude = currentAttitude + wildberry[0] - wildberry[1];
    })

    if (maxPositiveDownWildberry[1] > -1) {
        currentAttitude += maxPositiveDownWildberry[0];
        console.log(currentAttitude)
        maxAttitude = currentAttitude;
        console.log(maxAttitude)
        wildberriesOrder += maxPositiveDownWildberry[2] + ' ';
        if(maxNegativeUpWildberry[0] > -1) currentAttitude -= maxPositiveDownWildberry[1];
    }

    if (maxNegativeUpWildberry[0] > -1) {
        currentAttitude += maxNegativeUpWildberry[0]

        if (currentAttitude > maxAttitude) maxAttitude = currentAttitude;

        wildberriesOrder += maxNegativeUpWildberry[2] + ' ';
    }

    negativeWildberries.forEach(wildberry => {
        wildberriesOrder += wildberry[2] + ' ';
    })

    return `${maxAttitude}\n${wildberriesOrder}`;
}

writeFileSync("output.txt", getWildberriesOrder());
