import image from './image';

const WIDTH = 100, HEIGHT = 100;

export function update(): void {
  for (let i = 0; i < WIDTH * HEIGHT * 4; i += 4 /*rgba*/) {
    store<u8>(i,     image[i]);
    store<u8>(i + 1, image[i + 1]);
    store<u8>(i + 2, image[i + 2]);
    store<u8>(i + 3, image[i + 3]);
  }
}