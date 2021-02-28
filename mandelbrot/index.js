const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const [width, height] = [canvas.width, canvas.height];

let offsetX = new Big(0.0), 
    offsetY = new Big(0.0), 
    zoom = new Big(1.0);

// initial plotting

plotMandelbrot();

// control elements

document.querySelectorAll('.control')
  .forEach(c => c.onchange = drawCanvas);

// zoom view

const zoomView = { width: 195, height: 138 };
const zoomCanvas = document.createElement('CANVAS');
zoomCanvas.width = width;
zoomCanvas.height = height;
zoomCanvas.style.position = 'absolute';
zoomCanvas.style.zIndex = 1;
canvas.parentElement.appendChild(zoomCanvas);

const zoomViewCtx = zoomCanvas.getContext('2d');

const ZOOM = new Big(zoomView.width / width);

zoomViewCtx.strokeStyle = 'yellow';
zoomCanvas.onmousemove = e => {
  zoomViewCtx.clearRect(0, 0, width, height);
  zoomViewCtx.strokeRect(...offsets(e), zoomView.width, zoomView.height);
};
zoomCanvas.onmouseout = () => zoomViewCtx.clearRect(0, 0, width, height);
zoomCanvas.onclick = e => {
  const[x, y] = offsets(e);
  offsetX = offsetX.plus(zoom.mul(x));
  offsetY = offsetY.plus(zoom.mul(y));
  zoom = zoom.mul(ZOOM);
  console.log(offsetX.toNumber(), offsetY.toNumber(), zoom.toNumber());
  drawCanvas();
};
zoomCanvas.onmousedown = e => {
  if (e.button === 2) { // right mouse button
    zoomCanvas.style.display = 'none';
  }
}
canvas.onmousemove = e => {
  zoomCanvas.style.display = 'initial';
}

// displaying

async function drawCanvas() {
  canvas.style.filter = 'blur(3px)';

  const iterations = document.querySelector('#iterations').value;
  const colorR = document.querySelector('#colorR').value;
  const colorG = document.querySelector('#colorG').value;
  const colorB = document.querySelector('#colorB').value;

  await plotMandelbrot(iterations, colorR, colorG, colorB, offsetX.toNumber(), offsetY.toNumber(), zoom.toNumber());

  canvas.style.filter = 'initial';
}

function offsets(e) {
  return [
    Math.min(Math.max(Math.floor(e.offsetX - zoomView.width / 2), 0), width - zoomView.width),
    Math.min(Math.max(Math.floor(e.offsetY - zoomView.height / 2), 0), height - zoomView.height)
  ];
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
// Wasm glue functions
// /////////////////////////////////////////////////////////////////////////////////////////////////

async function loadWasm(callback) {
  const wasm = await WebAssembly
    .instantiateStreaming(fetch('./build/optimized.wasm'), {
      index: { callback },
      env: {
        abort: (_msg, _file, line, column) => console.error(`Abort at ${line}:${column}`)
      }});
    return wasm.instance.exports;
}

async function plotMandelbrot(iterations, colorR, colorG, colorB, offsetX, offsetY, zoom) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const wasm = await loadWasm((i, r, g, b) => {
    data[i]     = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = 255;
  });

  const timeMeasurementLabel = 'Plotting time';
  console.time(timeMeasurementLabel);

  wasm.mandelbrot(width, height, iterations, colorR, colorG, colorB, offsetX, offsetY, zoom);

  console.timeEnd(timeMeasurementLabel);

  ctx.putImageData(imageData, 0, 0);
}