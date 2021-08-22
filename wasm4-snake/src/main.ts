import * as w4 from "./wasm4";

import {FRUIT, BRICK, SNAKE_HEAD, SNAKE_BODY} from "./assets";

const SCREEN_SIZE: u8 = 160;
const TILE_SIZE: u8 = 8;
const MOVE_DURATION_FRAMES = 5;

store<u32>(w4.PALETTE, 0xe0f8cf, 0);    // light
store<u32>(w4.PALETTE, 0x7c3f58, 4);    // red
store<u32>(w4.PALETTE, 0x86c06c, 8);    // green
store<u32>(w4.PALETTE, 0x306850, 12);   // dark

const game = new Game();

export function update(): void {
    game.update();
}

class Game {

    private readonly snake: Snake = new Snake();
    private fruit: Fruit = this.placeFruit();

    private score: i32 = 0;
    private gameover: boolean = false;

    private previousGamepad: u8 = 0;
    private moveDelay: i32 = 0

    update(): void {
        if (!this.gameover) {            
            this.gamepadControl();

            if (this.moveDelay > 0) {
                this.moveDelay--;

            } else {
                this.moveDelay = MOVE_DURATION_FRAMES;
             
                this.snake.move();      
             
                this.checkCollisions();
                this.checkHits();
            }
        }

        this.fruit.draw();
        this.snake.draw();

        this.drawWalls();
        this.drawStats();
    }

    private gamepadControl(): void {
        const gamepad = load<u8>(w4.GAMEPAD1);
        const pressed = gamepad & (gamepad ^ this.previousGamepad);
        this.previousGamepad = gamepad;

        if (pressed & w4.BUTTON_RIGHT) {
            this.snake.direction = Direction.RIGHT;
        }
        if (pressed & w4.BUTTON_LEFT) {
            this.snake.direction = Direction.LEFT;
        }
        if (pressed & w4.BUTTON_UP) {
            this.snake.direction = Direction.UP;
        }
        if (pressed & w4.BUTTON_DOWN) {
            this.snake.direction = Direction.DOWN;
        }
    }

    private checkCollisions(): void {
        if (this.snake.collides(this.fruit.position)) {
            this.score++;
            this.snake.grow();
            this.fruit = this.placeFruit();
        }
    }

    private checkHits(): void {
        const head = this.snake.head();
        if (this.snake.hitsSelf()
                || head.x < TILE_SIZE || head.x > SCREEN_SIZE - TILE_SIZE * 2 
                || head.y < TILE_SIZE || head.y > SCREEN_SIZE - TILE_SIZE * 2) {
            this.snake.unmove();
            this.gameover = true;
        }
    }

    private placeFruit(): Fruit {
        let fruit: Fruit;
        do {
            fruit = new Fruit();
        } while(this.snake.collides(fruit.position, false));

        return fruit;
    }

    private drawStats(): void {
        store<u16>(w4.DRAW_COLORS, 0x43);
        w4.text("Score: " + (this.score).toString(), 0, 0);

        if (this.gameover) {
            store<u16>(w4.DRAW_COLORS, 0x44);
            w4.rect(30, 55, 100, 16);
            store<u16>(w4.DRAW_COLORS, 0x41);
            w4.text("GAME OVER!", 40, 60);
        }
    }

    private drawWalls(): void {
        store<u16>(w4.DRAW_COLORS, 4);
    
        for (let i: u8 = 0; i < SCREEN_SIZE; i += TILE_SIZE) {
            w4.blit(BRICK, i, 0, TILE_SIZE, TILE_SIZE, w4.BLIT_1BPP | w4.BLIT_FLIP_Y);
            w4.blit(BRICK, i, SCREEN_SIZE - TILE_SIZE, TILE_SIZE, TILE_SIZE, w4.BLIT_1BPP);
    
            if (i > 0 && i < SCREEN_SIZE - TILE_SIZE) {
                w4.blit(BRICK, 0, i, TILE_SIZE, TILE_SIZE, w4.BLIT_1BPP | w4.BLIT_FLIP_Y | w4.BLIT_ROTATE);
                w4.blit(BRICK, SCREEN_SIZE - TILE_SIZE, i, TILE_SIZE, TILE_SIZE, w4.BLIT_1BPP | w4.BLIT_ROTATE);
            }
        }
    }
}

class Snake {
    readonly body: Position[] = [new Position(80, 80)];
    direction: Direction = Direction.NONE; 

    private growing: boolean = false;

    head(): Position {
        return this.body[0];
    }

    grow(): void {
        this.growing = true;
    }

    move(): void {
        if (Direction.NONE == this.direction) {
            return;
        }
        const head = this.body[0];
        const newHead = new Position(head.x + this.direction.x, head.y + this.direction.y);
        this.body.unshift(newHead);
        if (!this.growing && !this.hitsSelf()) {
            this.body.pop();
        }
        this.growing = false;
    }
    
    unmove(): void {
        const current = this.direction;
        this.direction = current.negative();
        this.move();
        this.direction = current;
    }

    collides(other: Position, justHead: boolean = true): boolean {
        for (let i = 0, l = justHead ? 1 : this.body.length; i < l; i++) {
            if (this.body[i].equals(other)) {
                return true;
            }
        }
        return false;
    }

    hitsSelf(): boolean {
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].equals(this.body[0])) {
                return true;
            }
        }
        return false;
    }

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 0x13);
        // tail first
        for (let i = 1; i < this.body.length; i++) {
            w4.blit(SNAKE_BODY, this.body[i].x, this.body[i].y, TILE_SIZE, TILE_SIZE, w4.BLIT_1BPP);
        }
        // head afterwards to show a potential self-hit
        w4.blit(SNAKE_HEAD, this.body[0].x, this.body[0].y, TILE_SIZE, TILE_SIZE, w4.BLIT_1BPP 
            | (this.direction.y > 0 ? w4.BLIT_FLIP_Y : 0)
            | (this.direction.x > 0 ? w4.BLIT_FLIP_Y | w4.BLIT_ROTATE : 0)
            | (this.direction.x < 0 ? w4.BLIT_ROTATE : 0));
    }
}

class Fruit {
    readonly position: Position = Fruit.distribute();

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 2);
        w4.blit(FRUIT, this.position.x, this.position.y, TILE_SIZE, TILE_SIZE, w4.BLIT_1BPP);
    }

    static distribute(): Position {
        const min = 1;
        const max = SCREEN_SIZE / TILE_SIZE - 3;
        return new Position(
            u8(Math.random() * max + min) * TILE_SIZE,
            u8(Math.random() * max + min) * TILE_SIZE
        );
    }
}

class Position {
    readonly x: u8;
    readonly y: u8;

    constructor(x: u8, y: u8) {        
        this.x = x;
        this.y = y;
    }
    
    equals(other: Position): boolean {
        return other.x == this.x && other.y == this.y;
    }
}

class Direction {
    static NONE: Direction = new Direction(0, 0);
    static RIGHT: Direction = new Direction(TILE_SIZE, 0);
    static LEFT: Direction = new Direction(-TILE_SIZE, 0);
    static UP: Direction = new Direction(0, -TILE_SIZE);
    static DOWN: Direction = new Direction(0, TILE_SIZE);

    readonly x: i8;
    readonly y: i8;

    private constructor(x: i8, y: i8) {        
        this.x = x;
        this.y = y;
    }

    negative(): Direction {
        return new Direction(-this.x, -this.y);
    }
}