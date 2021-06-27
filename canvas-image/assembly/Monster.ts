import Canvas from './Canvas';

import fly1Img from './assets/fly1';
import fly2Img from './assets/fly2';
import fly3Img from './assets/fly3';

const SIZE = 24;
const BODY_SIZE = 12;
const STEP_H = 2;
const STEP_V = 3;
const MIN_HIGH = 20;
const CHANCE_OF_DIRECTION_CHANGE = 0.2;

enum Horizontal {
    RIGHT,
    LEFT
}

enum Vertical {
    UP,
    DOWN
}

export class Monster {

    private canvas: Canvas;
    private images: u8[][];

    private positionX: i32;
    private positionY: i32;

    private horizontal: Horizontal;
    private vertical: Vertical;

    private hunting: boolean = true;
    private animationStep: i32 = 0;

    constructor(canvas: Canvas, positionX: i32, positionY: i32, images: u8[][]) {
        this.canvas = canvas;
        this.images = images;
        this.positionX = positionX;
        this.positionY = positionY;
        this.horizontal = Horizontal.RIGHT;
        this.vertical = Vertical.DOWN;
    }

    update(position: i32): void {
        this.animationStep = (this.animationStep + 1) % this.images.length;

        if (this.positionX > position + SIZE + this.canvas.width / 2
            || this.positionX < position - this.canvas.width / 2) {
            return; // not visible
        }

        if (this.hunting) { // follow the prey
            this.vertical = Vertical.DOWN;

            if (this.positionX > position) {
                this.horizontal = Horizontal.LEFT;
            }
            if (this.positionX < position) {
                this.horizontal = Horizontal.RIGHT;
            }
        } else {    // fly away
            this.horizontal = Horizontal.LEFT;
            this.vertical = Vertical.UP;
        }

        // randomly change direction
        if (Math.random() < CHANCE_OF_DIRECTION_CHANGE) {
            this.vertical = this.vertical == Vertical.UP ? Vertical.DOWN : Vertical.UP;
        }

        // edge conditions
        if (this.positionX - STEP_H < 0) {
            this.horizontal = Horizontal.RIGHT;
        }
        if (this.positionY - STEP_V < MIN_HIGH) {
            this.vertical = Vertical.UP;
        }
        if (this.positionY + SIZE + STEP_V >= this.canvas.height) {
            this.vertical = Vertical.DOWN;
        }

        this.positionX += this.horizontal == Horizontal.RIGHT ? STEP_H : -STEP_H;
        this.positionY += this.vertical == Vertical.UP ? STEP_V : -STEP_V;
    }

    draw(position: i32): void {
        this.canvas.drawImage(this.images[this.animationStep], this.positionX - position, this.positionY, SIZE, SIZE);
    }

    conflictsWith(x: i32, y: i32, size: i32): boolean {
        if (!this.hunting) {
            return false;
        }
        const offset = (SIZE - BODY_SIZE) / 2 + BODY_SIZE / 2;
        const aX = this.positionX + offset;
        const aY1 = this.positionY;
        const aY2 = this.positionY + BODY_SIZE;
        const bX1 = x;
        const bX2 = x + size;
        const bY1 = y;
        const bY2 = y + size - BODY_SIZE / 3;

        if (aX >= bX1 && aX <= bX2 && aY1 < bY2 && aY2 > bY1) {
            this.hunting = false;
            return true;
        } 
        return false;
    }
}

export class Fly extends Monster {
    constructor(canvas: Canvas, positionX: i32, positionY: i32) {
        super(canvas, positionX, positionY, [fly1Img, fly2Img, fly3Img]);
    }
}