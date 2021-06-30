import sky from './assets/sky';
import forest from './assets/forest';
import ground from './assets/ground';

const WIDTH = 100, 
      HEIGHT = 100;

export enum Controls {
    None,
    Right,
    Left
}

let position: i32;

export function start(): void {
    position = 0;
}

export function update(control: Controls): void {
    switch (control) {
        case Controls.Right:
            position++;
            break;
        case Controls.Left:
            position = max(position - 1, 0);
            break;
    }
    drawLayer(sky);
    drawLayer(forest, position, 5);
    drawLayer(ground, position, 1);
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