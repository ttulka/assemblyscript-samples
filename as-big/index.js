const fs = require('fs');
const loader = require('@assemblyscript/loader');
const imports = {
    big: {
        logme: (expected, actual) => console.log('Expected', expected, 'Actual', actual)
    }
};
const wasm = loader.instantiateSync(fs.readFileSync(__dirname + '/build/optimized.wasm'), imports);

// TODO remove convinience functions:
//module.exports = wasm.exports;

const stringToString = n => wasm.exports.__getString(wasm.exports.stringToString(wasm.exports.__newString(n)));
const floatToString = n => wasm.exports.__getString(wasm.exports.floatToString(n));
const stringToNumber = n => wasm.exports.stringToNumber(wasm.exports.__newString(n));
const floatToNumber = n => wasm.exports.floatToNumber(n);
const abs = n => wasm.exports.__getString(wasm.exports.abs(wasm.exports.__newString(n)));
const cmp = (a, b) => wasm.exports.cmp(wasm.exports.__newString(a), wasm.exports.__newString(b));
const round = (n, dp = 0, rm = 1) => wasm.exports.__getString(wasm.exports.round(wasm.exports.__newString(n), dp, rm));
const prec = (n, sd, rm = 1) => wasm.exports.__getString(wasm.exports.prec(wasm.exports.__newString(n), sd, rm));
const plus = (a, b) => wasm.exports.__getString(wasm.exports.plus(wasm.exports.__newString(a), wasm.exports.__newString(b)));
const minus = (a, b) => wasm.exports.__getString(wasm.exports.minus(wasm.exports.__newString(a), wasm.exports.__newString(b)));
const times = (a, b) => wasm.exports.__getString(wasm.exports.times(wasm.exports.__newString(a), wasm.exports.__newString(b)));
const div = (a, b) => wasm.exports.__getString(wasm.exports.div(wasm.exports.__newString(a), wasm.exports.__newString(b)));
const divDP = (a, b, dp) => wasm.exports.__getString(wasm.exports.divDP(wasm.exports.__newString(a), wasm.exports.__newString(b), dp));
const mod = (a, b) => wasm.exports.__getString(wasm.exports.mod(wasm.exports.__newString(a), wasm.exports.__newString(b)));
const pow = (n, x) => wasm.exports.__getString(wasm.exports.pow(wasm.exports.__newString(n), x));

module.exports = {
    stringToString,
    stringToNumber,
    floatToNumber,
    floatToString,
    abs,
    cmp,
    round,
    prec,
    plus,
    minus,
    times,
    div,
    divDP,
    mod,
    pow
};
