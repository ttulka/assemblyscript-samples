const fs = require('fs');
const loader = require('@assemblyscript/loader');
const imports = { 
    index: { callback: renderPixel }
};
const wasm = loader.instantiateSync(fs.readFileSync(__dirname + '/build/optimized.wasm'), imports);
module.exports = wasm.exports;

// parameters

const args = process.argv.slice(2);

const width = +args[0] || 100, height = Math.ceil(width * 2.5 / 3.3);
const zoom = args[1] || '1';
const x = args[2] || '-2.15';    // -2.15 to 1.15
const y = args[3] || '-1.25';    // -1.25 to 1.25

const interations = +args[4] || 1000;    // > 10

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

const { __newString } = wasm.exports;
wasm.exports.mandelbrot(width, height, __newString(zoom), __newString(x), __newString(y), interations, r, g, b, zoom.length + 1);

console.timeEnd(timeMeasurementLabel);

// render image into a file

const { writePngFile } = require('node-libpng');

writePngFile('image.png', imageData, { width, height })
    .then(() => console.log('Image successfully written.'));

// /////////////////////////////////////////////////////////////////////////////////
// for comparison, do the same natively

// wasm.exports.mandelbrot_native(width, height, +zoom, +x, +y, interations, r, g, b);

// writePngFile('image-native.png', imageData, { width, height })
//     .then(() => console.log('Image successfully written.'));