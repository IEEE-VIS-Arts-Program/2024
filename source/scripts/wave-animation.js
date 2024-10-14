// config vars for the gui
let config = {
    "idx": 13,
    "velocity": 1.8,
    "nWaves": 32,
    "shift": 40,
    "hueSpread": 45,
    "saturation": 5,
    "brightness": 90,
    "drawFill": true
};

// global vars
let data;
let creators;
let ws;

// ---------------

class WaveSet {
    constructor(nWaves, shift, width, height){
        this.waves = [];
        this.nWaves = nWaves;
        this.shift = shift;
        this.velocity = 0.8;
        this.width = width;
        this.height = height;
        this.colorRange = [100, -100];
        this.saturation = 60;
        this.brightness = 100;
        this.drawFill = true;
    }
    makeWave(amplitude, period, phase){
        this.waves.push(
            new Wave(amplitude, period, phase)
        );
    }
    drawWave(offset){
        translate(0, -this.height * (1/this.nWaves));
        let inverseOffset = (this.nWaves-1)-offset;
        const c = color(
            map(inverseOffset, 0, this.nWaves, this.colorRange[0], this.colorRange[1]), //  hue
            map(inverseOffset, 0, this.nWaves, 100, this.saturation), // saturation
            this.brightness // brightness
        );
        beginShape();
        if (this.drawFill) {
            fill(c);
            noStroke();
            vertex(0, -this.height);
        } else {
            noFill();
            stroke(0);
        }
        for (let x=0; x < this.width; x++){
            let y = 0;
            this.waves.forEach(d=>{
                y += d.evaluate(x, (offset * this.shift) + (frameCount * this.velocity))
            })
            vertex(x, y)
        }
        if (this.drawFill) {
            vertex(this.width, -this.height);
            endShape(CLOSE);
        } else {
            endShape();
        }
        }
    drawWaves(){
        for (let i=0; i < this.nWaves; i++){
            this.drawWave(i);
        }    
    }
}

class Wave {
    constructor(amplitude, period, phase){
        this.amplitude = amplitude;
        this.period = period;
        this.phase = phase;
    }
    evaluate(x, shift){
        return sin((this.phase * -shift) + TWO_PI * x / this.period) * this.amplitude;
    }
}

function getObjLength(dataObj){
    let len = 0;
    for (const key in dataObj) {len++;}
    return len;
}

function getAngleRange(arr, key, spread = 0){
    let min = arr[0][key];
    let max = arr[0][key];
    arr.forEach(d=>{
        min = d[key] < min ? d[key]: min;
        max = d[key] > max ? d[key]: max;
    });
    // hsb needs positive numbers
    min = min < 0 ? 360 + min: min;
    max = max < 0 ? 360 + max: max;
    return [min - spread, max + spread];
}

// P5 -------------

function preload(){
    data = loadJSON('./scripts/visap24DataProcessed.json');
}

function setup(){
    let renderer = createCanvas(windowWidth, windowWidth * 0.65);
    renderer.parent("wave-animation");
    colorMode(HSB);
    frameRate(24);
}

function windowResized() {
    resizeCanvas(windowWidth, windowWidth * 0.65);
}

function draw(){
    console.log(
        frameRate()
    );

    // WaveSet(nWaves, shift, width, height)
    ws = new WaveSet(config.nWaves, config.shift, width, height);
    creators = data[config.idx].creators;
    // update instance vars
    ws.velocity = config.velocity;
    ws.colorRange = getAngleRange(creators, "angleDeg", config.hueSpread);
    ws.saturation = config.saturation;
    ws.brightness = config.brightness;
    ws.drawFill = config.drawFill;

    creators.forEach((d,i) => {
        // makeWave(amplitude, period, phase)
        ws.makeWave(
            config.nWaves / creators.length, 
            map(d.dist, 40, 500, 100, 200), 
            0.02
        );
    });
    
    // draw
    const bgColor = color(
        map(config.nWaves, 0, config.nWaves, ws.colorRange[0], ws.colorRange[1]), 
        map(config.nWaves, 0, config.nWaves, 100, config.saturation), 
        config.brightness
    )
    background(bgColor);
    translate(0, height)    
    ws.drawWaves();
}

// ---------------

