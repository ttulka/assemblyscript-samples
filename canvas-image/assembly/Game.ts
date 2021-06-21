import Canvas from './Canvas';
import Player from './Player';
import Scene from './Scene';
import { Thing, Direction, Flag } from './Thing';

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

    constructor(canvas: Canvas) {
        this.scene = new Scene(canvas);
        this.player = new Player(canvas);
        this.things = [
            new Direction(canvas, 2, 18), 
            new Flag(canvas, 120, 18)
        ];
    }

    start(): void {
        this.player.reset();
    }

    update(control: Control): void {
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

        this.scene.draw(this.player.positionRelativeX());
        this.drawThings(this.player.positionRelativeX());
        this.player.draw();
    }

    private drawThings(position: i32): void {
        for (let i = 0; i < this.things.length; i++) {
            this.things[i].draw(position);
        }
    }
}