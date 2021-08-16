var assert = require("assert");
var wasm = require("..");

assert.equal(wasm.length2x1(), 8);
assert.equal(wasm.length3x2(), 24);

assert.equal(wasm.valueAt2x1(0), 255);
assert.equal(wasm.valueAt2x1(1), 0);
assert.equal(wasm.valueAt2x1(2), 0);
assert.equal(wasm.valueAt2x1(3), 255);
assert.equal(wasm.valueAt2x1(4), 0);
assert.equal(wasm.valueAt2x1(5), 0);
assert.equal(wasm.valueAt2x1(6), 255);
assert.equal(wasm.valueAt2x1(7), 255);

assert.equal(wasm.valueAt3x2(0), 255);
assert.equal(wasm.valueAt3x2(1), 0);
assert.equal(wasm.valueAt3x2(2), 0);
assert.equal(wasm.valueAt3x2(3), 255);
assert.equal(wasm.valueAt3x2(4), 0);
assert.equal(wasm.valueAt3x2(5), 0);
assert.equal(wasm.valueAt3x2(6), 255);
assert.equal(wasm.valueAt3x2(7), 255);
assert.equal(wasm.valueAt3x2(8), 0);
assert.equal(wasm.valueAt3x2(9), 255);
assert.equal(wasm.valueAt3x2(10), 0);
assert.equal(wasm.valueAt3x2(11), 255);
assert.equal(wasm.valueAt3x2(12), 0);
assert.equal(wasm.valueAt3x2(13), 255);
assert.equal(wasm.valueAt3x2(14), 0);
assert.equal(wasm.valueAt3x2(15), 255);
assert.equal(wasm.valueAt3x2(16), 0);
assert.equal(wasm.valueAt3x2(17), 0);
assert.equal(wasm.valueAt3x2(18), 255);
assert.equal(wasm.valueAt3x2(19), 255);
assert.equal(wasm.valueAt3x2(20), 255);
assert.equal(wasm.valueAt3x2(21), 0);
assert.equal(wasm.valueAt3x2(22), 0);
assert.equal(wasm.valueAt3x2(23), 255);
