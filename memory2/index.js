const fs = require("fs");
const loader = require("@assemblyscript/loader");
const wasm = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), {	
});

const memoryBytes = new Uint8Array(wasm.exports.memory.buffer);

memoryBytes[0] = 33;

wasm.exports.updateMemory();

console.log(memoryBytes);
