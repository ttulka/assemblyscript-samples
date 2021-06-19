import Canvas from './Canvas';

import image from './assets/player';

const WIDTH = 16,
    HEIGHT: i32 = WIDTH,
    STEP: i32 = 3,
    JUMP_AMPLITUDE: i32 = 12;    // how high can jump

enum Actions {
    IDLE,
    MOVING,
    JUMPING
}

enum Directions {
    NONE,
    RIGHT,
    LEFT
}

export default class Player {

    private canvas: Canvas;

    private pos: i32;
    private action: Actions;
    private direction: Directions;

    private stepOdd: boolean;
    private actionStep: i32;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset(): void {
        this.pos = 0;
        this.action = Actions.IDLE;
        this.direction = Directions.NONE;

        this.stepOdd = true;
        this.actionStep = 0;
    }

    update(): void {
        if (this.isMoving()) {
            this.move();
            this.stepOdd = !this.stepOdd;
        }
        if (this.isJumping()) {
            this.move();
            this.actionStep = this.actionStep < JUMP_AMPLITUDE * 2
                ? this.actionStep + STEP
                : 0;
        }
    }

    draw(): void {
        this.canvas.drawImage(image, this.x(), this.y(), WIDTH, HEIGHT);
    }

    position(): i32 {
        return this.pos;
    }

    x(): i32 {
        return this.canvas.width / 2 - WIDTH;    // always in the middle
    }

    y(): i32 {
        const y = HEIGHT + 1;
        if (this.isMoving()) {
            return y + this.moveOffsetY();
        }
        if (this.isJumping()) {
            return y + this.jumpOffsetY();
        }
        return y;
    }

    idle(): void {
        this.action = this.nextAction(Actions.IDLE);
        if (this.isIdle()) {
            this.direction = Directions.NONE;
            this.stepOdd = true;
        }
    }

    headRight(): void {
        this.action = this.nextAction(Actions.MOVING);
        if (this.isMoving()) {
            this.direction = Directions.RIGHT;
        }
    }

    headLeft(): void {
        this.action = this.nextAction(Actions.MOVING);
        if (this.isMoving()) {
            this.direction = Directions.LEFT;
        }
    }

    jump(): void {
        this.action = this.nextAction(Actions.JUMPING);
    }

    private move(): void {
        if (Directions.RIGHT == this.direction) {
            this.pos += STEP;
        }
        if (Directions.LEFT == this.direction) {
            this.pos = max(this.pos - STEP, 0);
        }
    }

    private isIdle(): boolean {
        return Actions.IDLE == this.action;
    }

    private isMoving(): boolean {
        return Actions.MOVING == this.action;
    }

    private isJumping(): boolean {
        return Actions.JUMPING == this.action;
    }

    private nextAction(current: Actions): Actions {
        if (this.isJumping()) {
            return this.actionStep > 0 
                ? Actions.JUMPING
                : Actions.MOVING;
        }
        return current;
    }

    private moveOffsetY(): i32 {
        return this.stepOdd ? 0 : 1;    // decent move steps
    }

    private jumpOffsetY(): i32 {
        return this.actionStep > JUMP_AMPLITUDE    // it takes double amplitude to finish a jump
            ? JUMP_AMPLITUDE * 2 - this.actionStep
            : this.actionStep;
    }
}