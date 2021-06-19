import Canvas from './Canvas';

export default class Thing {

    canvas: Canvas;
    image: u8[];
    width: i32;
    height: i32;
    positionX: i32;
    positionY: i32;

    constructor(canvas: Canvas,  image: u8[], width: i32, height: i32, positionX: i32, positionY: i32) {
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
}