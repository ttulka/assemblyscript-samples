const WIDTH = 100, HEIGHT = 100;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

start();

async function loadWasm() {
  const arraySize = (WIDTH * HEIGHT * 4) >>> 0;
  const nPages = ((arraySize + 0xffff) & ~0xffff) >>> 16;
  const memory = new WebAssembly.Memory({ initial: nPages });

  const wasm = await WebAssembly
    .instantiateStreaming(fetch('./build/optimized.wasm'), {
      env: {
        memory, // npm run asbuild:optimized -- --importMemory
        abort: (_msg, _file, line, column) => console.error(`Abort at ${line}:${column}`)
      }});
    return wasm.instance.exports;
}

async function start() {
  const wasm = await loadWasm();

  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);

  update(wasm, imageData);
}

function update(wasm, imageData) {
    wasm.update();
    
    const bytes = new Uint8ClampedArray(wasm.memory.buffer); 
    writeImageData(imageData, bytes);
}

function writeImageData(imageData, bytes) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i++) 
     data[i] = bytes[i];

  ctx.putImageData(imageData, 0, 0);
}
