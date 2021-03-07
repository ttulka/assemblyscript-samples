const fs = require('fs');
const loader = require('@assemblyscript/loader');
const imports = {
    big: {
        logme: (expected, actual) => console.log('Expected', expected, 'Actual', actual)
    }
};
const wasm = loader.instantiateSync(fs.readFileSync(__dirname + '/build/optimized.wasm'), imports);
module.exports = wasm.exports;





const { __getString, __pin, __unpin } = wasm.exports

const aPtr = __pin(wasm.exports.newBig(wasm.exports.__newString('11')))
const a = wasm.exports.Big.wrap(aPtr)
const bPtr = __pin(a.pow(2))
const b = wasm.exports.Big.wrap(bPtr)
const strPtr = b.toString()
console.log(__getString(strPtr))
__unpin(aPtr)
__unpin(bPtr)
