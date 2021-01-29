const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const [width, height] = [canvas.width, canvas.height];

const img = new Image();
img.src = './waterlily.png';
img.crossOrigin = 'anonymous';
img.onload = () => original();

async function loadWasm() {
  const arraySize = (width * height * 4) >>> 0;
  const nPages = ((arraySize + 0xffff) & ~0xffff) >>> 16;
  const memory = new WebAssembly.Memory({ initial: nPages });

  const wasm = await WebAssembly
    .instantiateStreaming(fetch('./build/optimized.wasm'), {
      env: {
        memory, // npm run asbuild:optimized -- --importMemory
        abort: (_msg, _file, line, column) => console.error(`Abort at ${line}:${column}`),
        seed: () => new Date().getTime()
      }});
    return wasm.instance.exports;
}

function original() {
  ctx.drawImage(img, 0, 0, width, height);
}

async function manipulate(action, params = []) {
  const wasm = await loadWasm();

  const imageData = originalImageData();
  const bytes = new Uint8ClampedArray(wasm.memory.buffer);

  copyData(imageData.data, bytes);

  wasm[action](width, height, ...params);

  writeImageData(imageData, bytes);
}

function originalImageData() {
  original();
  return ctx.getImageData(0, 0, width, height);
}

function copyData(src, dest) {
  for (let i = 0; i < src.length; i++)
    dest[i] = src[i];
}

function writeImageData(imageData, bytes) {
  const data = imageData.data;
  for (let i = 0; i < bytes.length; i++) 
     data[i] = bytes[i];

  ctx.putImageData(imageData, 0, 0);
}

document.querySelector('.action.original').onclick = e => {
  e.preventDefault();
  original();
}

document.querySelector('.action.invert').onclick = e => {
  e.preventDefault();
  manipulate('invert');
}

document.querySelector('.action.grayscale').onclick = e => {
  e.preventDefault();
  manipulate('grayscale');
}

document.querySelector('.action.basicMonochrome').onclick = e => {
  e.preventDefault();
  manipulate('basicMonochrome', [150]);
}

document.querySelector('.action.randomMonochrome').onclick = e => {
  e.preventDefault();
  manipulate('randomMonochrome', [80]);
}