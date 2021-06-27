import Canvas from './Canvas';

import life1 from './assets/life1';
import life2 from './assets/life2';
import life3 from './assets/life3';

const WIDTH = 14,
    HEIGHT = 12;

const lifes = [life1, life2, life3];

export default class Life {
    
    private canvas: Canvas;
    private positionX: i32;
    private positionY: i32;

    private amount: i32 = 3;

    constructor(canvas: Canvas, positionX: i32, positionY: i32) {
        this.canvas = canvas;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    decrement(): i32 {
        return --this.amount;
    }

    draw(): void {
        if (this.amount > 0) {
            this.canvas.drawImage(lifes[this.amount - 1], this.positionX, this.positionY - HEIGHT, WIDTH, HEIGHT);
        }
    }
}