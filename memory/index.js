const fs = require("fs");
const loader = require("@assemblyscript/loader");
const wasm = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), {});

var { inc, hello, multiply, multiplyByTwo, Int32Array_ID,
  memory, 
  __getString, __pin, __unpin, __new,
  __newString, 
  __getArray,
  __newArray } = wasm.exports;

// ////////////////////////////////////////////////
// integers

console.log(inc(42));

// ////////////////////////////////////////////////
// strings

// convenient 
{
const input = "Tomas";

// retain reference to string object
const pti = __newString(input);

// call wasm, pointer output
const str = __getString(hello(pti));

console.log(str);
}

// direct
{
const input = "Tomas";
const length = input.length;

// allocate memory (usize, String (id=1))
const pt = __new(length << 1, 1);

// load bytes into memory
const ibytes = new Uint16Array(memory.buffer);
for (let i = 0, p = pt >>> 1; i < length; ++i) 
  ibytes[p + i] = input.charCodeAt(i);

// pin object 
const pti = __pin(pt);

// call wasm
const pto = __pin(hello(pti));

const SIZE_OFFSET = -4;
const olength = new Uint32Array(memory.buffer)[pto + SIZE_OFFSET >>> 2];
console.log("olength", olength)
const obytes = new Uint8Array(memory.buffer, pto, olength);
const str = new TextDecoder('utf8').decode(obytes);

// unpin objects for GC
__unpin(pti);
__unpin(pto);

console.log(str);
}
// ////////////////////////////////////////////////
// arrays

console.log('Int32Array_ID', Int32Array_ID);

// input array
var arr = [1, 2, 3]
var arri = __newArray(Int32Array_ID, arr);

// call, output array
var arro1 = multiply(arri, 2);
var arro2 = multiplyByTwo(arri);

console.log(arr);
console.log(__getArray(arro1));
console.log(__getArray(arro2));

// ////////////////////////////////////////////////
// testing

function sayHello(name) {
	// retain reference to object
	var pti = __newString(name);

	// call wasm, copy to string
	var str = __getString(hello(pti));

	return str;
}

module.exports = { inc, sayHello };
