const fs = require("fs");
const loader = require("@assemblyscript/loader");
const wasm = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), {});

var { inc, hello, multiply, multiplyByTwo, Int32Array_ID,
  memory, 
  __getString, 
  __newString, 
  __getArray,
  __newArray,
  __new,
  __pin, __collect,
  __unpin } = wasm.exports;

// ////////////////////////////////////////////////
// integers

console.log(inc(42));

// ////////////////////////////////////////////////
// strings

var input = "Tomas";

// retain reference to string object
var pti = __newString(input);

// call wasm, pointer output
var pto = __pin(hello(pti));

var str = __getString(pto);

__unpin(pto);

console.log(str);

// ////////////////////////////////////////////////
// arrays

console.log('Int32Array_ID', Int32Array_ID);

// input array
var arr = [1, 2, 3]
var arri = __newArray(Int32Array_ID, arr);

// call, output array
var arro1 = __pin(multiply(arri, 2));
var arro2 = __pin(multiplyByTwo(arri));

console.log(arr);
console.log(__getArray(arro1));
console.log(__getArray(arro2));

__unpin(arro1);
__unpin(arro2);

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
