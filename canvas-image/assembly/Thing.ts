import Canvas from './Canvas';

import flagImg from './assets/flag';
import waterImg from './assets/water';
import directionImg from './assets/direction';

export class Thing {

    private width: i32;
    private height: i32;
    private positionX: i32;
    private positionY: i32;

    private canvas: Canvas;
    private image: u8[];
    private hit: boolean = false;

    constructor(canvas: Canvas, image: u8[], width: i32, height: i32, positionX: i32, positionY: i32) {
        this.canvas = canvas;
        this.image = image;
        this.width = width;
        this.height = height;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    draw(position: i32): void {
        this.canvas.drawImage(this.image, this.positionX - position, this.positionY, this.width, this.height);
    }

    reached(x: i32, width: i32): boolean {
        if (x + width >= this.positionX) {
            this.hit = true;
            return true;
        } 
        return false;
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

export class Direction extends Thing {

    constructor(canvas: Canvas, positionX: i32, positionY: i32) {
        super(canvas, directionImg, 18, 18, positionX, positionY);
    }
}

export class Flag extends Thing {

    constructor(canvas: Canvas, positionX: i32, positionY: i32) {
        super(canvas, flagImg, 18, 18, positionX, positionY);
    }
}

export class Water extends Thing {

    constructor(canvas: Canvas, positionX: i32, positionY: i32) {
        super(canvas, waterImg, 18, 18, positionX, positionY);
    }
}
