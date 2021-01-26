const fs = require("fs");
const loader = require("@assemblyscript/loader");

const memory = new WebAssembly.Memory({initial:1});
memory.grow(1);

const wasm = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), {	
	env: { memory }
});

const memoryBytes = new Uint8Array(wasm.exports.memory.buffer);

memoryBytes[0] = 33;

wasm.exports.updateMemory();

console.log(memoryBytes);

module.exports = { memory: idx => memoryBytes[idx] };
