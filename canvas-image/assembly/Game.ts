import Canvas from './Canvas';
import Life from './Life';
import Player from './Player';
import Scene from './Scene';
import Score from './Score';
import { Thing, Direction, Flag, Water } from './Thing';

export enum Control {
    Up = 1,
    Down,
    Left,
    Right,
}

export class Game {

    private scene: Scene;
    private player: Player;
    private things: Thing[];
    private obstacles: Thing[];
    private flag: Flag;
    private score: Score;
    private life: Life;

    private level: i32 = 1;

    private canvas: Canvas;

    private running: boolean;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.scene = new Scene(canvas);
        this.player = new Player(canvas);
        this.score = new Score(canvas, canvas.width - 3, canvas.height - 3);
        this.life = new Life(canvas, 3, canvas.height - 3);

        this.things = [];
        this.obstacles = [];
        this.flag = new Flag(canvas, 120, 18);
    }

    start(): void {
        this.player.reset();
        this.things = [
            new Direction(this.canvas, 2, 18)
        ];
        this.obstacles = [
            new Water(this.canvas, 60, 2)
        ];
        this.flag = new Flag(this.canvas, 120 * this.level, 18);

        this.running = true;
    }

    update(control: Control): void {
        if (!this.running) {
            this.canvas.turnToGray();
            return;
        }        
        this.updatePlayer(control);
        this.updateIteractions();
        this.drawGame();
    }

    private updatePlayer(control: Control): void {
        switch (control) {
            case Control.Right:
                this.player.moveRight();
                break;
            case Control.Left:
                this.player.moveLeft();
                break;
            case Control.Up:
                this.player.jump();
                break;
            default:
                this.player.idle();
                break;
        }
        
        this.player.update();
    }

    private updateIteractions(): void {
        // hit by an obstacle
        if (this.hasHitWith(this.obstacles, this.player.position().x, this.player.position().y, this.player.width())) {
            this.life.decrement();
            if (this.life.isDead()) {
                this.running = false;
                return;
            }
        }

        // next level reached
        if (this.flag.reached(this.player.position().x, this.player.width())) {
            this.level++;
            this.score.increment();
            this.start();
        }
    }

    private drawGame(): void {
        this.scene.draw(this.player.positionRelativeX());
        this.drawThings(this.things, this.player.positionRelativeX());
        this.drawThings(this.obstacles, this.player.positionRelativeX());
        this.flag.draw(this.player.positionRelativeX());
        this.player.draw();
        this.score.draw();
        this.life.draw();
    }

    private drawThings(things: Thing[], position: i32): void {
        for (let i = 0; i < things.length; i++) {
            things[i].draw(position);
        }
    }

    private hasHitWith(things: Thing[], x: i32, y: i32, width: i32): boolean {
        for (let i = 0; i < things.length; i++) {
            const thing = things[i];
            if (thing.conflictsWith(x, y, width)) {
                return true;
            }
        }
        return false;
    }
}