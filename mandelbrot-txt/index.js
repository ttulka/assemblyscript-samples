const fs = require('fs');
const loader = require('@assemblyscript/loader');
const imports = { 
    index: { callback: renderPixel }
};
const wasm = loader.instantiateSync(fs.readFileSync(__dirname + '/build/optimized.wasm'), imports);
module.exports = wasm.exports;

// parameters

const width = 60, height = 20;
const interations = 100;    // > 10

// handle image data

const imageData = [];

function renderPixel(x, y, value) {
    imageData[x + y * width] = value;
}

// call Wasm function

wasm.exports.mandelbrot(width, height, interations);

// render image as txt into the console

let output = '';
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        output += txt(imageData[x + y * width]);
    }
    console.log(output);
    output = '';
}

function txt(value) {
    return !value ? ' ' : '#';
}