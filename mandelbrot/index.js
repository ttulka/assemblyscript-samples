const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const [width, height] = [canvas.width, canvas.height];

plotMandelbrot();

async function loadWasm() {
  const arraySize = (width * height * 4) >>> 0;
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

async function plotMandelbrot() {
  const wasm = await loadWasm();

  const imageData = ctx.getImageData(0, 0, width, height);
  const bytes = new Uint8ClampedArray(wasm.memory.buffer);

  wasm.mandelbrot(width, height);

  writeImageData(imageData, bytes);
}

function writeImageData(imageData, bytes) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i++) 
    data[i] = bytes[i];

  ctx.putImageData(imageData, 0, 0);
}