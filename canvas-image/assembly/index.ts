import sky from './sky';
import forest from './forest';
import soil from './soil';
import player from './player';

const WIDTH = 100, HEIGHT = 100;

const STEP = 3;

let position = 0;
let playerEven = true;

enum Control {
  Up = 1,
  Down,
  Left,
  Right,
}

export function start(): void {
    // init
}

export function update(control: Control): void {
  switch (control) {
    case Control.Left:
      playerEven = !playerEven;
      position = max(position - STEP, 0);
      break;
    case Control.Right:
      playerEven = !playerEven;
      position += STEP;
      break;
    default:
      playerEven = true;
      break;
  }

  drawLayer(sky, 0, 0);
  drawLayer(forest, position, 3);
  drawLayer(soil, position, 1);

  drawPlayer(player);

  store<u8>(0, position % 255);
}

function drawPlayer(image: u8[]): void {
  const size = 16;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {

      const ci = canvasIndex(x + WIDTH / 2 - (size / 2), y + 18 + (playerEven ? -1 : 0)); // canvas index
      const di = canvasIndex(x, y, size, size);     // data index

      if (image[di + 3] >= 100) { // draw only visible
        store<u8>(ci,     image[di]);
        store<u8>(ci + 1, image[di + 1]);
        store<u8>(ci + 2, image[di + 2]);
        store<u8>(ci + 3, image[di + 3]);
      }
    }
  }
}

function drawLayer(image: u8[], offset: i32, speed: i32): void {
  const off = speed > 0 ? offset / speed : offset;

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {

      const ci = canvasIndex(x, y);                  // canvas index
      const di = canvasIndex((x + off) % WIDTH, y);  // data index

      if (image[di + 3] == 255) { // draw only visible
        store<u8>(ci,     image[di]);
        store<u8>(ci + 1, image[di + 1]);
        store<u8>(ci + 2, image[di + 2]);
        store<u8>(ci + 3, image[di + 3]);
      }
    }
  }
}

function canvasIndex(x: i32, y: i32, w: i32 = WIDTH, h: i32 = HEIGHT): i32 {
  // [0,0] is in the left bottom corner
  return (h - 1 - y) * w * 4 + x * 4;   
}