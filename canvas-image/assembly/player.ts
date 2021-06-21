import Canvas from './Canvas';

import image from './assets/player';

const WIDTH = 16,
    HEIGHT: i32 = WIDTH,
    STEP: i32 = 3,
    JUMP_AMPLITUDE: i32 = 5;    // how high can jump

enum Directions {
    NONE,
    RIGHT,
    LEFT
}

export default class Player {

    private canvas: Canvas;

    private pos: Position;
    private action: Action;

    private readonly startX: i32;
    private readonly startY: i32;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.startX = this.canvas.width / 2 - WIDTH;
        this.startY = HEIGHT + 1;
        this.pos = new Position(this.startX, this.startY);
        this.action = new Idle(this.pos, this.startY);        
        this.reset();
    }

    reset(): void {
        this.pos = new Position(this.startX, this.startY);
        this.action = new Idle(this.pos, this.startY);
    }

    update(): void {
        this.action.perform();
        this.pos = this.action.position();
        this.pos.x = max(this.pos.x, this.startX);
    }

    draw(): void {
        this.canvas.drawImage(image, this.startX, this.pos.y, WIDTH, HEIGHT);
    }

    position(): Position {
        return this.pos;
    }

    positionRelativeX(): i32 {
        return this.pos.x - this.startX;
    }

    width(): i32 {
        return WIDTH;
    }

    idle(): void {
        if (!this.action.isRunning()) {
            this.action = new Idle(this.pos, this.startY);
        }
    }

    moveRight(): void {
        if (!this.action.isRunning()) {
            this.action = new Moving(this.pos, Directions.RIGHT);
        }
    }

    moveLeft(): void {
        if (!this.action.isRunning()) {
            this.action = new Moving(this.pos, Directions.LEFT);
        }
    }

    jump(): void {
        if (!this.action.isRunning()) {
            this.action = new Jumping(this.pos, this.startY, this.action.direction());
        }
    }
}

class Position {
    x: i32;
    y: i32;

    constructor(x: i32, y: i32) {
        this.x = x;
        this.y = y;
    }
}

interface Action {

    perform(): void;
    isRunning(): boolean;
    position(): Position;
    direction(): Directions;
}

class Idle implements Action {
    pos: Position;
    idleY: i32;

    constructor(position: Position, idleY: i32) {
        this.pos = position;
        this.idleY = idleY;
    }

    perform(): void {
        // nothing to do
    }
    isRunning(): boolean {
        return false;
    }
    position(): Position {
        return new Position(this.pos.x, this.idleY);
    }
    direction(): Directions {
        return Directions.NONE;
    }
}

class Moving implements Action {
    direct: Directions;
    pos: Position;
    performed: boolean;

    constructor(position: Position, direction: Directions) {
        this.pos = new Position(position.x, position.y);
        this.direct = direction;
    }

    perform(): void {
        if (this.performed) {
            return;
        }        
        this.performed = true;

        if (Directions.RIGHT == this.direct) {
            this.pos.x += STEP;
        }
        if (Directions.LEFT == this.direct) {
            this.pos.x -= STEP;
        }
        this.pos.y += this.pos.y % 2 == 0 ? -1 : 1; // decent move steps
    }
    isRunning(): boolean {
        return !this.performed;
    }
    position(): Position {
        return this.pos;
    }
    direction(): Directions {
        return this.direct;
    }
}

class Jumping implements Action {
    pos: Position;
    direct: Directions;
    startY: i32;
    performed: boolean;
    jumpStep: i32;

    constructor(position: Position, startY: i32, direction: Directions) {
        this.pos = new Position(position.x, position.y);
        this.direct = direction;
        this.startY = startY;
    }

    perform(): void {
        if (this.performed) {
            return;
        }
        
        if (Directions.RIGHT == this.direct) {
            this.pos.x += STEP + 1;
        }
        if (Directions.LEFT == this.direct) {
            this.pos.x -= STEP + 1;
        }

        if (this.jumpStep < JUMP_AMPLITUDE * 2) {
            this.jumpStep++;
            this.pos.y += this.jumpStep > JUMP_AMPLITUDE ? -STEP : STEP;  // it takes double amplitude to finish a jump
        } else {
            this.pos.y = this.startY;
            this.performed = true;
        }
    }
    isRunning(): boolean {
        return !this.performed;
    }
    position(): Position {
        return this.pos;
    }
    direction(): Directions {
        return this.direct;
    }
}