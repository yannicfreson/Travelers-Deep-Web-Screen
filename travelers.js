let streams = [];
let fadeInterval = 2;
let symbolSize = 30;
let opacity = 0;

function setup() {
    frameRate(60);
    createCanvas(
        window.innerWidth,
        window.innerHeight
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
}

function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.value;

    this.speed = 0
    this.first = first;
    this.opacity = opacity;

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

    this.rain = function () {
        this.y = (this.y >= height + symbolSize) ? 0 : this.y += this.speed;
    }

}

function Stream() {
    this.symbols = [];
    //this.totalSymbols = round(random(5, 34));
    this.totalSymbols = Math.floor(windowHeight / symbolSize);
    //this.speed = random(2, 8);
    this.speed = 0;

    this.generateSymbols = function (x, y) {
        let opacity = 255;
        for (let i = 0; i <= this.totalSymbols; i++) {
            let highlighted = round(random(0, 4)) == 1;
            symbol = new Symbol(
                x,
                y,
                this.speed,
                highlighted,
                opacity
            );
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            //opacity -= (255 / this.totalSymbols) / fadeInterval;
            y -= symbolSize;
            //highlighted = false;
        }
    }

    this.render = function () {
        this.symbols.forEach(function (symbol) {
            if (symbol.first) {
                fill(255, 225, 100, symbol.opacity);
            } else {
                fill(255, 150, 0, symbol.opacity);
            }
            text(symbol.value, symbol.x, symbol.y);
            //symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
