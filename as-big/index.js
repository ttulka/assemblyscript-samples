const fs = require('fs');
const loader = require('@assemblyscript/loader');
const imports = { 
    big: {
        logme: (expected, actual) => console.log('Expected', expected, 'Actual', actual)
    }
};
const wasm = loader.instantiateSync(fs.readFileSync(__dirname + '/build/optimized.wasm'), imports);

const stringToString = n => wasm.exports.__getString(wasm.exports.stringToString(wasm.exports.__newString(n)));
const floatToString = n => wasm.exports.__getString(wasm.exports.floatToString(n));
const stringToNumber = n => wasm.exports.stringToNumber(wasm.exports.__newString(n));
const floatToNumber = n => wasm.exports.floatToNumber(n);
const cmp = (a, b) => wasm.exports.cmp(wasm.exports.__newString(a), wasm.exports.__newString(b));
const plus = (a, b) => wasm.exports.__getString(wasm.exports.plus(wasm.exports.__newString(a), wasm.exports.__newString(b)));

module.exports = {
    stringToString, 
    stringToNumber,
    floatToNumber,
    floatToString,
    cmp,
    plus
};