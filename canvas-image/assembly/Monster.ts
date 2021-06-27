import Canvas from './Canvas';

import fly1Img from './assets/fly1';
import fly2Img from './assets/fly2';
import fly3Img from './assets/fly3';

const SIZE = 24;

export class Monster {

    width: i32;
    height: i32;
    positionX: i32;
    positionY: i32;

    private canvas: Canvas;
    private images: u8[][];

    private hit: boolean = false;
    private animationStep: i32;

    constructor(canvas: Canvas, positionX: i32, positionY: i32, images: u8[][]) {
        this.canvas = canvas;
        this.images = [fly1Img, fly2Img, fly3Img];
        this.width = SIZE;
        this.height = SIZE;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    update(): void {
        this.animationStep = (this.animationStep + 1) % this.images.length;
    }

    draw(position: i32): void {
        this.canvas.drawImage(this.images[this.animationStep], this.positionX - position, this.positionY, this.width, this.height);
    }

    conflictsWith(x: i32, y: i32, size: i32): boolean {
        // RectA.X1 < RectB.X2 && RectA.X2 > RectB.X1 &&
        // RectA.Y1 > RectB.Y2 && RectA.Y2 < RectB.Y1

        let aX1: i32, aX2: i32, bX1: i32, bX2: i32;

        if (this.positionX < x) {
            aX1 = this.positionX + 1;
            aX2 = this.positionX + this.width - 1;
            bX1 = x;
            bX2 = x + size;
        } else {
            aX1 = x + 1;
            aX2 = x + size - 1;
            bX1 = this.positionX;
            bX2 = this.positionX + this.width;
        }

        if (aX1 < bX2 && aX2 > bX1 
            && this.positionY + this.height > y) {
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