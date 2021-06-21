import Canvas from './Canvas';

import directionImg from './assets/direction';
import flagImg from './assets/flag';

export class Thing {

    private canvas: Canvas;
    private image: u8[];
    width: i32;
    height: i32;
    positionX: i32;
    positionY: i32;

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

    overlapsWith(x: i32, width: i32): boolean {
        return x + width >= this.positionX;
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
