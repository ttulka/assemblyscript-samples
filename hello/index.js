var fs = require("fs");
var loader = require("@assemblyscript/loader");

var imports = {
  "index": {
    print: console.log
  }
};

var wasm = loader.instantiateSync(
  fs.readFileSync("./build/optimized.wasm"), 
  imports);

wasm.exports.main();

var { hello, 
  __newString,
  __getString, 
  __retain,
  __release } = wasm.exports;

var pti = __retain(__newString("Tomas"));

var pto = hello(pti);

var str = __getString(pto);

__release(pti);
__release(pto);

console.log(str);