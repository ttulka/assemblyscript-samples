const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const [width, height] = [canvas.width, canvas.height];

// initial plotting
plotMandelbrot();

// control elements
document.querySelectorAll('.control').forEach(c => c.onchange = async () => {
  canvas.style.filter = 'blur(3px)';
  await plotMandelbrot();
  canvas.style.filter = 'initial';
});

// zoom view
const zoomView = { width: 195, height: 138 };
const zoomCanvas = document.createElement('CANVAS');
zoomCanvas.width = width;
zoomCanvas.height = height;
zoomCanvas.style.position = 'absolute';
canvas.parentElement.appendChild(zoomCanvas);

const zoomViewCtx = zoomCanvas.getContext('2d');

zoomViewCtx.strokeStyle = 'lime';
zoomCanvas.onmousemove = e => {
  zoomViewCtx.clearRect(0, 0, width, height);
  zoomViewCtx.strokeRect(e.clientX - zoomView.width / 2, e.clientY - zoomView.height / 2, zoomView.width, zoomView.height);
};
zoomCanvas.onmouseout = () => zoomViewCtx.clearRect(0, 0, width, height);
zoomCanvas.onclick = e => {
  
};

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

async function plotMandelbrot() {
  const wasm = await loadWasm();

  const imageData = ctx.getImageData(0, 0, width, height);
  const bytes = new Uint8ClampedArray(wasm.memory.buffer);

  const iterations = document.querySelector('#iterations').value;
  const colorR = document.querySelector('#colorR').value;
  const colorG = document.querySelector('#colorG').value;
  const colorB = document.querySelector('#colorB').value;


  const timeMeasurementLabel = 'Plotting time';
  console.time(timeMeasurementLabel);

  wasm.mandelbrot(width, height, iterations, colorR, colorG, colorB);

  console.timeEnd(timeMeasurementLabel);

  writeImageData(imageData, bytes);
}

function writeImageData(imageData, bytes) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i++) 
    data[i] = bytes[i];

  ctx.putImageData(imageData, 0, 0);
}