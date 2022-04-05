import { main, hello, multiply } from "./build/release.js";

main();

var greeting = hello("Joe");
console.log(greeting);

var result = multiply([1, 2, 3], 2)
console.log(result);



var url = "./build/release.wasm";
var module = await (
  typeof globalThis.fetch === "function"
    ? WebAssembly.compileStreaming(globalThis.fetch(url))
    : WebAssembly.compile((await import("node:fs")).readFileSync(url))
)
var imports = {
    env: {
        "console.log": console.log,
        abort: () => {}
    }
}

const { exports: {
    hello: hello2, memory,
    __new, __pin, __unpin
}} = await WebAssembly.instantiate(module, imports);

var input = "Tomas";
var length = input.length;

// allocate memory (usize, string [class id=1])
var pt = __new(length << 1, 1);

// load bytes into memory (chars in AS are 16-bit)
var ibytes = new Uint16Array(memory.buffer);
for (let i = 0, p = pt >>> 1; i < length; ++i) 
ibytes[p + i] = input.charCodeAt(i);

// pin object 
var pti = __pin(pt);

// call wasm
var pto = __pin(hello2(pti));

// retrieve string size (uint is 32-bit)
var SIZE_OFFSET = -4;
var olength = new Uint32Array(memory.buffer)[pto + SIZE_OFFSET >>> 2];

// load string from memory
var obytes = new Uint8Array(memory.buffer, pto, olength);
var str = new TextDecoder('utf8').decode(obytes);

// unpin objects for GC
__unpin(pti);
__unpin(pto);

console.log(str);