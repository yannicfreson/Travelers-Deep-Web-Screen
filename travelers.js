let streams = [];
let symbolSize = 36;
let opacity = 0;

// TRAVELER VARIABLES
let frameTraveler;
let gradTraveler = 0;

let xPosTraveler;
let yPosTraveler;

let availableTravelers = [' Traveler 3326', ' Traveler 3465', ' Traveler 3468', ' Traveler 3569', ' Traveler 0115'];

let traveler = '';
let travelerAsArray = traveler.split('');
let displayedTraveler = '';
let currentTravelerCharToType = 0;

// TELL VARIABLES
let frameTell;
let gradTell = 0;

let xPosTell;
let yPosTell;

let availableTells = [' 00.23 AM, 1255ft', ' 03.42 PM, 486ft', ' 09.31 AM, 846ft', ' 7.19 PM, 493ft', ' 05.22 AM, 615ft'];

let tell = '';
let tellAsArray = tell.split('');
let displayedTell = '';
let currentTellCharToType = 0;

// COORDINATES VARIABLES
let frameCoords;
let gradCoords = 0;

let xPosCoords;
let yPosCoords;

let availableCoords = [' 40.910189, -92.673172', ' 38.204280, -115.524777', ' 51.568841, -106.738161', ' 49.200621, -91.627068', ' 45.045031, -77.830214'];

let coords = '';
let coordsAsArray = coords.split('');
let displayedCoords = '';
let currentCoordsCharToType = 0;

// RANDOM BOX VARIABLES
let xPosBox;
let yPosBox;
let frameBox;
let lengthBox;


let finishedTraveler = false;
let finishedTell = false;
let finishedCoords = false;

function setup() {
    frameRate(30);
    createCanvas(windowWidth, windowHeight);
    background(0);

    let x = 0;
    for (let i = 0; i <= Math.floor(windowWidth / symbolSize); i++) {
        let stream = new Stream();
        stream.generateSymbols(x, symbolSize - 8);
        streams.push(stream);
        x += symbolSize;
    }
    textFont('Consolas');
}

function draw() {
    textSize(symbolSize);
    background(0, 100);
    streams.forEach(function (stream) {
        stream.render();
    });

    // RENDER THE RANDOM BOX
    if (frameCount % 170 === 0) {
        frameBox = frameCount;
        lengthBox = round(random(15, 30) * symbolSize);
        xPosBox = -lengthBox;
        yPosBox = Math.floor(Math.random() * Math.floor(windowHeight / symbolSize)) * symbolSize;
    }
    if (frameCount < frameBox + 100) {
        xPosBox += windowWidth / 75;
        randomBox(xPosBox, yPosBox - 1, lengthBox);
    }

    // RENDER THE TRAVELER
    if (frameCount % 300 === 0) {
        frameTraveler = frameCount;
        gradTraveler = 0;
        traveler = availableTravelers[Math.floor(Math.random() * availableTravelers.length)];
        travelerAsArray = traveler.split('');
        displayedTraveler = '';
        currentTravelerCharToType = 0;
        finishedTraveler = false;
        xPosTraveler = Math.floor(Math.random() * Math.floor((windowWidth - (10 * symbolSize)) / symbolSize)) * symbolSize;
        yPosTraveler = Math.floor(Math.random() * Math.floor(windowHeight / symbolSize)) * symbolSize;
    }
    if (frameCount < frameTraveler + 150) {
        gradTraveler += 5;
        showTraveler(xPosTraveler, yPosTraveler);
    }

    // RENDER THE TELL
    if (frameCount % 300 === 0) {
        frameTell = frameCount;
        gradTell = 0;
        tell = availableTells[Math.floor(Math.random() * availableTells.length)];
        tellAsArray = tell.split('');
        displayedTell = '';
        currentTellCharToType = 0;
        finishedTell = false;
        xPosTell = Math.floor(Math.random() * Math.floor((windowWidth - (10 * symbolSize)) / symbolSize)) * symbolSize;
        yPosTell = Math.floor(Math.random() * Math.floor(windowHeight / symbolSize)) * symbolSize;
    }
    if (frameCount < frameTell + 150) {
        gradTell += 5;
        showTell(xPosTell, yPosTell);
    }

    // RENDER THE COORDS
    if (frameCount % 300 === 0) {
        frameCoords = frameCount;
        gradCoords = 0;
        coords = availableCoords[Math.floor(Math.random() * availableCoords.length)];
        coordsAsArray = coords.split('');
        displayedCoords = '';
        currentCoordsCharToType = 0;
        finishedCoords = false;
        xPosCoords = Math.floor(Math.random() * Math.floor((windowWidth - (13 * symbolSize)) / symbolSize)) * symbolSize;
        yPosCoords = Math.floor(Math.random() * Math.floor(windowHeight / symbolSize)) * symbolSize;
    }
    if (frameCount < frameCoords + 150) {
        gradCoords += 5;
        showCoords(xPosCoords, yPosCoords);
    }
}

function Symbol(x, y, highlighted, opacity) {
    this.x = x;
    this.y = y;
    this.highlighted = highlighted;
    this.opacity = opacity;

    this.value;
    this.switchInterval = round(random(10, 20));

    this.setToRandomSymbol = function () {
        let charType = round(random(0, 5));
        if (frameCount % this.switchInterval == 0) {
            if (charType > 1) {
                this.value = String.fromCharCode(
                    0x30A0 + floor(random(0, 97))
                );
            } else {
                this.value = floor(random(0, 10));
            }
        }
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = Math.floor(windowHeight / symbolSize);

    this.generateSymbols = function (x, y) {
        let opacity = 255;
        for (let i = 0; i <= this.totalSymbols; i++) {
            let highlighted = round(random(0, 4)) == 1;
            symbol = new Symbol(
                x,
                y,
                highlighted,
                opacity
            );
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y += symbolSize;
        }
    }

    this.render = function () {
        this.symbols.forEach(function (symbol) {
            if (symbol.highlighted) {
                fill(255, 225, 100, symbol.opacity);
            } else {
                fill(255, 150, 0, symbol.opacity);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.setToRandomSymbol();
        });
    }
}

function typeTraveler() {
    nextChar();
    function nextChar() {
        this.currentCharToType = currentTravelerCharToType;
        if (currentTravelerCharToType < travelerAsArray.length) {
            displayedTraveler += travelerAsArray[currentTravelerCharToType];
            currentTravelerCharToType++;
        } else if (currentTravelerCharToType >= travelerAsArray.length) {
            finishedTraveler = true;
        }
    }
    if (finishedTraveler == false) {
        //setTimeout(typeTraveler, round(random(200, 300)));
    }
}

function typeTell() {
    nextChar();
    function nextChar() {
        this.currentCharToType = currentTellCharToType;
        if (currentTellCharToType < tellAsArray.length) {
            displayedTell += tellAsArray[currentTellCharToType];
            currentTellCharToType++;
        } else if (currentTellCharToType >= tellAsArray.length) {
            finishedTell = true;
        }
    }
    if (finishedTell == false) {
        //setTimeout(typeTell, round(random(200, 300)));
    }
}

function typeCoords() {
    nextChar();
    function nextChar() {
        this.currentCharToType = currentCoordsCharToType;
        if (currentCoordsCharToType < coordsAsArray.length) {
            displayedCoords += coordsAsArray[currentCoordsCharToType];
            currentCoordsCharToType++;
        } else if (currentCoordsCharToType >= coordsAsArray.length) {
            finishedCoords = true;
        }
    }
    if (finishedCoords == false) {
        //setTimeout(typeTell, round(random(200, 300)));
    }
}

function showTraveler(xPos, yPos) {
    fill(0, gradTraveler);
    if (gradTraveler > 100) {
        typeTraveler();
    }
    rect(xPos, yPos, symbolSize * (displayedTraveler.length - 6), symbolSize);
    fill(255, 255, 220);
    text(displayedTraveler, xPos, yPos + 3, xPos + symbolSize * displayedTraveler.length, yPos + symbolSize);
}

function showTell(xPos, yPos) {
    fill(0, gradTell);
    if (gradTell > 100) {
        typeTell();
    }
    rect(xPos, yPos, symbolSize * (displayedTell.length - 7), symbolSize);
    fill(255, 255, 220);
    text(displayedTell, xPos, yPos + 3, xPos + symbolSize * displayedTell.length, yPos + symbolSize);
}

function showCoords(xPos, yPos) {
    fill(0, gradCoords);
    if (gradCoords > 100) {
        typeCoords();
    }
    rect(xPos, yPos, symbolSize * (displayedCoords.length - 9), symbolSize);
    fill(255, 255, 220);
    text(displayedCoords, xPos, yPos + 3, xPos + symbolSize * displayedCoords.length, yPos + symbolSize);
}

function randomBox(xPos, yPos, length) {
    fill(0, 150);
    rect(xPos, yPos, length, symbolSize);
}