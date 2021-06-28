const WIDTH = 100, HEIGHT = 100;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

start();

const Controls = {
  None: 0,
  Right: 1,
  Left: 2
}

let control = Controls.None;

document.addEventListener('keydown', event => {
  switch (event.key) {
    case "ArrowLeft":
      control = Controls.Left;
      break;
    case "ArrowRight":
      control = Controls.Right;
      break;
    default:
      control = Controls.None;
      break;
  }
});

async function loadWasm() {
  const wasm = await WebAssembly
    .instantiateStreaming(fetch('./build/optimized.wasm'), {
      env: {
        abort: (_msg, _file, line, column) => console.error(`Abort at ${line}:${column}`)
      }});
    return wasm.instance.exports;
}

async function start() {
  const wasm = await loadWasm();
  wasm.start();

  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);

  const renderCall = () => writeImageData(imageData, wasm.memory.buffer);
  const updateCall = () => update(wasm, renderCall);

  setInterval(updateCall, 60);
}

function update(wasm, render) {
    //console.log('update', new Date())
    wasm.update(control);    
    
    //control = Controls.None;  // reset control
    control = control == Controls.None ? Controls.Right : control;   // move constantly

    render();
}

function writeImageData(imageData, buffer) {
  const bytes = new Uint8ClampedArray(buffer);
  const data = imageData.data;

  for (let i = 0; i < WIDTH * HEIGHT * 4; i++) 
     data[i] = bytes[i];

  ctx.putImageData(imageData, 0, 0);
}
