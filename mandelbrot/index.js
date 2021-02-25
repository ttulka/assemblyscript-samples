const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const [width, height] = [canvas.width, canvas.height];

let offsetX = 0, offsetY = 0, ratio = 1.0;

// initial plotting
plotMandelbrot();

// control elements
document.querySelector('#reset').onclick = () => redrawCanvas(plotMandelbrot);
document.querySelectorAll('.control').forEach(c => c.onchange = () => redrawCanvas(drawCanvas));

async function drawCanvas() {
  const iterations = document.querySelector('#iterations').value;
  const colorR = document.querySelector('#colorR').value;
  const colorG = document.querySelector('#colorG').value;
  const colorB = document.querySelector('#colorB').value;

  await plotMandelbrot(iterations, colorR, colorG, colorB, offsetX, offsetY, ratio);
}

canvas.style.overflow = 'hidden';

async function redrawCanvas(plottingFn) {
  canvas.style.filter = 'blur(3px)';
  await plottingFn();
  canvas.style.filter = 'initial';
}

// zoom view
const zoomView = { width: 195, height: 138 };
const zoomCanvas = document.createElement('CANVAS');
zoomCanvas.width = width;
zoomCanvas.height = height;
zoomCanvas.style.position = 'absolute';
zoomCanvas.style.zIndex = 1;
canvas.parentElement.appendChild(zoomCanvas);

const zoomViewCtx = zoomCanvas.getContext('2d');

ratio = zoomView.width / width;

zoomViewCtx.strokeStyle = 'yellow';
zoomCanvas.onmousemove = e => {
  offsetX = Math.min(Math.max(Math.floor(e.offsetX - zoomView.width / 2), 0), width - zoomView.width);
  offsetY = Math.min(Math.max(Math.floor(e.offsetY - zoomView.height / 2), 0), height - zoomView.height);

  zoomViewCtx.clearRect(0, 0, width, height);
  zoomViewCtx.strokeRect(offsetX, offsetY, zoomView.width, zoomView.height);
};
zoomCanvas.onmouseout = () => zoomViewCtx.clearRect(0, 0, width, height);
zoomCanvas.onclick = e => {
  
  console.log(offsetX, offsetY, ratio);
};
zoomCanvas.onmousedown = e => {
  if (e.button === 2) { // right mouse button
    zoomCanvas.style.display = 'none';
  }
}
canvas.onmousemove = e => {
  zoomCanvas.style.display = 'initial';
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
// Wasm glue functions
// /////////////////////////////////////////////////////////////////////////////////////////////////

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

async function plotMandelbrot(iterations, colorR, colorG, colorB, offsetX, offsetY, ratio) {
  const wasm = await loadWasm();

  const imageData = ctx.getImageData(0, 0, width, height);
  const bytes = new Uint8ClampedArray(wasm.memory.buffer);

  const timeMeasurementLabel = 'Plotting time';
  console.time(timeMeasurementLabel);

  wasm.mandelbrot(width, height, iterations, colorR, colorG, colorB, offsetX, offsetY, ratio);

  console.timeEnd(timeMeasurementLabel);

  writeImageData(imageData, bytes);
}

function writeImageData(imageData, bytes) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i++) 
    data[i] = bytes[i];

  ctx.putImageData(imageData, 0, 0);
}