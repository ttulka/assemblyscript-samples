const fs = require("fs");
const { WASI } = require("wasi");
const { argv, env } = require("process");
const loader = require("@assemblyscript/loader");

const wasi = new WASI({
    args: argv,
    env,
    preopens: { }
});

const wasm = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), { 
    console: { log: m => console.log("### " + wasm.exports.__getString(m)) },
    wasi_snapshot_preview1: wasi.wasiImport
});

wasi.start(wasm);

module.exports = wasm.exports;
