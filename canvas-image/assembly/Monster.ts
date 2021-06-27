import Canvas from './Canvas';

import fly1Img from './assets/fly1';
import fly2Img from './assets/fly2';
import fly3Img from './assets/fly3';

const SIZE = 24;
const BODY_SIZE = 12;

enum Vertical {
    UP,
    DOWN
}

enum Horizontal {
    RIGHT,
    LEFT
}

export class Monster {

    private positionX: i32;
    private positionY: i32;

    private canvas: Canvas;
    private images: u8[][];

    private hit: boolean = false;
    private animationStep: i32;

    constructor(canvas: Canvas, positionX: i32, positionY: i32, images: u8[][]) {
        this.canvas = canvas;
        this.images = images;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    update(): void {
        this.animationStep = (this.animationStep + 1) % this.images.length;
    }

    draw(position: i32): void {
        this.canvas.drawImage(this.images[this.animationStep], this.positionX - position, this.positionY, SIZE, SIZE);
    }

    conflictsWith(x: i32, y: i32, size: i32): boolean {
        // RectA.X1 < RectB.X2 && RectA.X2 > RectB.X1 &&
        // RectA.Y1 > RectB.Y2 && RectA.Y2 < RectB.Y1

        const aX1 = this.positionX;
        const aX2 = this.positionX + BODY_SIZE;
        const aY1 = this.positionY;
        const aY2 = this.positionY + BODY_SIZE;
        const bX1 = x;
        const bX2 = x + size;
        const bY1 = y;
        const bY2 = y + size;

        if (aX1 < bX2 && aX2 > bX1 && aY1 > bY2 && aY2 < bY1) {
            const confict = !this.hit;
            this.hit = true;
            return confict;
        } 
        return this.hit = false;
    }
}

export class Fly extends Monster {
    constructor(canvas: Canvas, positionX: i32, positionY: i32) {
        super(canvas, positionX, positionY, [fly1Img, fly2Img, fly3Img]);
    }
}