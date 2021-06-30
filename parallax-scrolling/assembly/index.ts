import sky from './assets/sky';
import forest from './assets/forest';
import soil from './assets/soil';

const WIDTH = 100, 
      HEIGHT = 100;

export enum Control {
    Right = 1,
    Left = 2,
}

let position: i32;

export function start(): void {
    position = 0;
}

export function update(control: Control): void {
    switch (control) {
        case Control.Right:
            position++;
            break;
        case Control.Left:
            position = max(position - 1, 0);
            break;
    }
    drawLayer(sky);
    drawLayer(forest, position, 5);
    drawLayer(soil, position, 1);
}

function drawLayer(image: u8[], offset: i32 = 0, speed: i32 = 0): void {
    const imageOffsetX = speed > 0 ? offset / speed : offset;

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {

            const di = arrayIndex((x + imageOffsetX) % WIDTH, y, WIDTH, HEIGHT); // image data index

            if (image[di + 3] < 100) continue;  // not visible
            
            const ci = arrayIndex(x, y, WIDTH, HEIGHT); // canvas index

            store<u8>(ci,     image[di]);
            store<u8>(ci + 1, image[di + 1]);
            store<u8>(ci + 2, image[di + 2]);
            store<u8>(ci + 3, 255);
        }
    }
}

function arrayIndex(x: i32, y: i32, w: i32, h: i32): i32 {
    // [0,0] is in the left bottom corner
    return (h - 1 - y) * w * 4 + x * 4;
}