import Canvas from './Canvas';

import sky from './assets/sky';
import forest from './assets/forest';
import soil from './assets/soil';

export default class Scene {

    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    draw(position: i32): void {
        this.drawLayer(sky, 0, 0);
        this.drawLayer(forest, position, 3);
        this.drawLayer(soil, position, 1);
    }

    private drawLayer(image: u8[], offset: i32, speed: i32): void {
        this.canvas.drawBackground(image, speed > 0 ? offset / speed : offset);
    }
}