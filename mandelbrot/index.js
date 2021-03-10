const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let [width, height] = [canvas.width, canvas.height];

let offsetX = 0, 
    offsetY = 0, 
    zoom = 1;

// control elements

document.querySelectorAll('.control')
  .forEach(c => c.onchange = drawCanvas);

// zoom view

let zoomView = calculateZoomView();
const zoomCanvas = document.createElement('CANVAS');
zoomCanvas.width = width;
zoomCanvas.height = height;
zoomCanvas.style.position = 'absolute';
zoomCanvas.style.zIndex = 1;
zoomCanvas.style.left = canvas.offsetLeft;
canvas.parentElement.appendChild(zoomCanvas);

const zoomViewCtx = zoomCanvas.getContext('2d');

const ZOOM = 5; // zoom multiplicator

zoomCanvas.onmousemove = e => {
  zoomViewCtx.clearRect(0, 0, width, height);
  zoomViewCtx.strokeRect(...offsets(e), zoomView.width, zoomView.height);
};
zoomCanvas.onmouseout = () => zoomViewCtx.clearRect(0, 0, width, height);
zoomCanvas.onclick = e => {
  [x, y] = offsets(e);
  offsetX += x / zoom;
  offsetY += y / zoom;
  zoom = zoom * ZOOM;
  console.log('zooming', x, y, offsetX, offsetY, zoom);
  document.querySelector('#offsetX').value = offsetX;
  document.querySelector('#offsetY').value = offsetY;
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

function calculateZoomView() {
  return { width: Math.round(width / 5), height: Math.round(height / 5) };
}

// displaying

async function drawCanvas() {
  canvas.style.filter = 'blur(3px)';

  const iterations = document.querySelector('#iterations').value;
  const colorR = document.querySelector('#colorR').value;
  const colorG = document.querySelector('#colorG').value;
  const colorB = document.querySelector('#colorB').value;
  const useBig = !!document.querySelector('#useBig').checked;
  const size = document.querySelector('#size').value;
  offsetX = +document.querySelector('#offsetX').value;
  offsetY = +document.querySelector('#offsetY').value;

  width = 195 * size;
  height = 138 * size;
  canvas.width = width;
  canvas.height = height;
  zoomView = calculateZoomView();
  zoomCanvas.width = width;
  zoomCanvas.height = height;
  zoomViewCtx.strokeStyle = 'yellow';

  await plotMandelbrot(zoom, offsetX, offsetY, iterations, colorR, colorG, colorB, useBig);

  canvas.style.filter = 'initial';
}

function offsets(e) {
  return [
    Math.min(Math.max(Math.floor(e.offsetX - zoomView.width / 2), 0), width - zoomView.width),
    Math.min(Math.max(Math.floor(e.offsetY - zoomView.height / 2), 0), height - zoomView.height)
  ];
}

// initial plotting

drawCanvas();

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

async function plotMandelbrot(zoom, offsetX, offsetY, iterations, colorR, colorG, colorB, useBig = false) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const wasm = await loadWasm((x, y, r, g, b) => {
    const i = (x + y * width) * 4;
    data[i]     = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = 255;
  });

  console.log('Plotting with', width, height, zoom, offsetX, offsetY, iterations, colorR, colorG, colorB);

  const timeMeasurementLabel = 'Plotting time';
  console.time(timeMeasurementLabel);

  wasm[useBig ? 'mandelbrot_big' : 'mandelbrot_native'](
    width, height, zoom, offsetX, offsetY, iterations, colorR, colorG, colorB);

  console.timeEnd(timeMeasurementLabel);

  ctx.putImageData(imageData, 0, 0);
}