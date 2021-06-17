import sky from './sky';
import forest from './forest';
import soil from './soil';

const WIDTH = 100, HEIGHT = 100;

export function update(): void {
  drawLayer(sky);
  drawLayer(forest);
  drawLayer(soil);
}

function drawLayer(image: u8[]): void {
  for (let i = 0; i < WIDTH * HEIGHT * 4; i += 4 /*rgba*/) {
    if (image[i + 3] == 255) {
      store<u8>(i,     image[i]);
      store<u8>(i + 1, image[i + 1]);
      store<u8>(i + 2, image[i + 2]);
      store<u8>(i + 3, image[i + 3]);
    }
  }
}