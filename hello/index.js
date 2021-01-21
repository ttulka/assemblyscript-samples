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
