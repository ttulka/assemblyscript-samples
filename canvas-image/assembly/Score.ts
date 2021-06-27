import Canvas from './Canvas';

import digit0 from './assets/digit0';
import digit1 from './assets/digit1';
import digit2 from './assets/digit2';
import digit3 from './assets/digit3';
import digit4 from './assets/digit4';
import digit5 from './assets/digit5';
import digit6 from './assets/digit6';
import digit7 from './assets/digit7';
import digit8 from './assets/digit8';
import digit9 from './assets/digit9';

const WIDTH = 12,
    HEIGHT = 14;

const digits = [digit0, digit1, digit2, digit3, digit4, digit5, digit6, digit7, digit8, digit9];

export default class Score {
    
    private canvas: Canvas;
    private positionX: i32;
    private positionY: i32;

    private amount: i32;

    constructor(canvas: Canvas, positionX: i32, positionY: i32) {
        this.canvas = canvas;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    increment(): void {
        this.amount++;
    }

    draw(): void {
        let i = this.amount;
        let pos = this.positionX - WIDTH;
        do {
            const d = i % 10;
            i = i / 10;
            this.canvas.drawImage(digits[d], pos, this.positionY - HEIGHT, WIDTH, HEIGHT);
            pos -= WIDTH;
        } while (i > 0);
    }
}