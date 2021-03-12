const fs = require('fs');
const loader = require('@assemblyscript/loader');
const imports = { 
    index: { callback: renderPixel }
};
const wasm = loader.instantiateSync(fs.readFileSync(__dirname + '/build/optimized.wasm'), imports);
module.exports = wasm.exports;

// parameters

const width = 300, height = Math.ceil(width * 2.5 / 3.3);
const zoom = 100;
const x = -0.65940;    // -2.15 to 1.15
const y = -0.45043;    // -1.25 to 1.25

const interations = 1000;    // > 10

const r = 7, g = 2, b = 4;  // 1 to 10

// handle image data

const imageData = Buffer.alloc(width * height * 3);

async function renderPixel(x, y, r, g, b) {
    const index = (x + y * width) * 3;
    imageData[index + 0] = r;
    imageData[index + 1] = g;
    imageData[index + 2] = b;
}

// call Wasm function

const timeMeasurementLabel = 'Plotting time';
console.time(timeMeasurementLabel);

wasm.exports.mandelbrot_native(width, height, zoom, x, y, interations, r, g, b);
// wasm.exports.mandelbrot(width, height, zoom, x, y, interations, r, g, b);

console.timeEnd(timeMeasurementLabel);

// render image into a file

const { writePngFile } = require('node-libpng');

writePngFile('image.png', imageData, { width, height })
    .then(() => console.log('Image successfully written.'));