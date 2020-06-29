let streams = [];
let symbolSize = 30;
let opacity = 0;

function setup() {
    frameRate(20);
    createCanvas(
        windowWidth,
        windowHeight
    );
    background(0);

    let x = 0;
    for (let i = 0; i <= width / symbolSize; i++) {
        let stream = new Stream();
        stream.generateSymbols(x, windowHeight);
        streams.push(stream);
        x += symbolSize
    }
    textFont('Consolas');
}

function draw() {
    textSize(symbolSize);
    background(0, 150);
    streams.forEach(function (stream) {
        stream.render();
    });

    // show framerate
    /* fill(0)
    rect(0, 0, 30, 30)
    fill(255)
    text(Math.floor(frameRate()), 0, 0, 50, 30) */
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
            y -= symbolSize;
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
