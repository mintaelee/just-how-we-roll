/*
# ========================================================
# = Initialization
# ========================================================
*/

const sixes = [];
const doubleSixes = [];
const twelves = [];
const twenties = [];

window.onload = init;

function init() {
    setStartingImages();

    const d6Roll = document.querySelector('#d6-roll');
    d6Roll.addEventListener('click', rollD6);

    const doubleD6Roll1 = document.querySelector('#double-d6-roll-1');
    doubleD6Roll1.addEventListener('click', rollDoubleD6);
    const doubleD6Roll2 = document.querySelector('#double-d6-roll-2');
    doubleD6Roll2.addEventListener('click', rollDoubleD6);

    const d12Roll = document.querySelector('#d12-roll');
    d12Roll.addEventListener('click', rollD12);
    
    const d20Roll = document.querySelector('#d20-roll');
    d20Roll.addEventListener('click', rollD20);

    const resetButton = document.querySelector('#reset-button')
    resetButton.addEventListener('click', resetAllRolls);

}

function setStartingImages() {
    const START_DIRECTORY = './images/start';
    const SIX_SIDED_START_IMAGE = `${START_DIRECTORY}/d6.png`;

    const d6Roll = document.querySelector('#d6-roll');
    d6Roll.src = SIX_SIDED_START_IMAGE;

    const doubleD12Roll1 = document.querySelector('#double-d6-roll-1')
    const doubleD12Roll2 = document.querySelector('#double-d6-roll-2');
    doubleD12Roll1.src = SIX_SIDED_START_IMAGE;
    doubleD12Roll2.src = SIX_SIDED_START_IMAGE;

    const d12Roll = document.querySelector('#d12-roll');
    d12Roll.src = `${START_DIRECTORY}/d12.jpeg`;
    
    const d20Roll = document.querySelector('#d20-roll');
    d20Roll.src = `${START_DIRECTORY}/d20.jpg`;
}

/*
# ========================================================
# = Roll Functions
# ========================================================
*/

function rollD6(event){
    // Grab HTML tag for single six-sided die.
    const d6Roll = document.querySelector('#d6-roll');

    // Grab and display the image that corresponds to the rolled number.
    d6Roll.src = diceRoll(6, sixes);

    // Grab HTML tag for mean and median
    const d6RollMean = document.querySelector('#d6-rolls-mean');
    const d6RollMedian = document.querySelector('#d6-rolls-median');
    const d6RollMode = document.querySelector('#d6-rolls-mode');



    // Update the new mean & median
    d6RollMean.innerText = mean(sixes);
    d6RollMedian.innerText = median(sixes);
    d6RollMode.innerText = mode(sixes);


}

function rollDoubleD6(event){
    // Grab the HTML tag of both dice.
    const firstD6Roll = document.querySelector(`#double-d6-roll-1`);
    const secondD6Roll = document.querySelector(`#double-d6-roll-2`);


    // Grab and display the image that corresponds to the rolled number.
    firstD6Roll.src = diceRoll(6, doubleSixes);
    secondD6Roll.src = diceRoll(6, doubleSixes);

    // Grab HTML tag for mean and median
    const doubleD6RollMean = document.querySelector('#double-d6-rolls-mean');
    const doubleD6RollMedian = document.querySelector('#double-d6-rolls-median');


    // Update the new mean & median
    doubleD6RollMean.innerText = mean(doubleSixes);
    doubleD6RollMedian.innerText = median(doubleSixes);
    
}

function rollD12(event){
    // Grab the HTML tag for the 12-sided die.
    const d12Roll = document.querySelector('#d12-roll');

    // Grab and display the image that corresponds to the rolled number.
    d12Roll.src = diceRoll(12, twelves);

    // Grab HTML tag for mean and median
    const d12RollMean = document.querySelector('#d12-rolls-mean');
    const d12RollMedian = document.querySelector('#d12-rolls-median');


    // Update the new mean & median
    d12RollMean.innerText = mean(twelves);
    d12RollMedian.innerText = median(twelves);
}

function rollD20(event){
    // Grab the HTML tag for the 20-sided die.
    const d20Roll = document.querySelector('#d20-roll');

    // Grab and display the image that corresponds to the rolled number.
    d20Roll.src = diceRoll(20, twenties);

    // Grab HTML tag for mean and median
    const d20RollMean = document.querySelector('#d20-rolls-mean');
    const d20RollMedian = document.querySelector('#d20-rolls-median');


    // Update the new mean & median
    d20RollMean.innerText = mean(twenties);
    d20RollMedian.innerText = median(twenties);
}

function resetAllRolls(event){
    setStartingImages();

    while (sixes.length > 0){
        sixes.pop();
    }
    while (doubleSixes.length > 0){
        doubleSixes.pop();
    }
    while (twelves.length > 0){
        twelves.pop();
    }
    while (twenties.length > 0){
        twenties.pop();
    }
}

/*
# ========================================================
# = Math Functions
# ========================================================
*/
function mean(diceArray){
    const reducer = (sum, current) => sum + current;

    return (diceArray.reduce(reducer)/diceArray.length).toFixed(2);
}

function median(diceArray){
    diceArray.sort((a,b)=> a-b);
    const arrayLen = diceArray.length;
    if (arrayLen % 2 === 0){
        return (diceArray[arrayLen/2 - 1] + diceArray[arrayLen/2]) / 2
    } else {
        return (diceArray[Math.floor(arrayLen/2)]);
    }
}

function mode(diceArray){
    let counter = 0;
    let highestCounter = 0;
    let indexOfMode = 0;
    for (let i = 0; i < diceArray.length - 1; i++){
        for (let j = i + 1; j < diceArray.length; j++) {
            if (diceArray[i] === diceArray[j]){
                counter++;
            }
        }
        if (counter > highestCounter) {
            highestCounter = counter;
            indexOfMode = i;
        }
    }
    return diceArray[indexOfMode];``
}
/*
# ========================================================
# = Helper Functions - Stretch Goals!
# ========================================================
*/

// Function to get random integer between 1 and chosen max.
function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max))+1;
}

function diceRoll(numSides, diceArray) {
    // Set start directory for images
    let START_DIRECTORY = './images/';

    if (numSides === 6) {
        START_DIRECTORY += 'd6';
    } else {
        START_DIRECTORY += 'numbers';
    }

    // Roll by getting a random integer between 1-6.
    let rolledNum = getRandomInt(numSides);

    // Add the rolled number to the sixes array.
    diceArray.push(rolledNum);

     // Grab and display the image that corresponds to the rolled number.
     const rolledD6Image = `${START_DIRECTORY}/${rolledNum}.png`;

    return rolledD6Image;
}

