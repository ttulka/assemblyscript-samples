import Canvas from './Canvas';
import Life from './Life';
import Player from './Player';
import Scene from './Scene';
import Score from './Score';
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
    private score: Score;
    private life: Life;

    constructor(canvas: Canvas) {
        this.scene = new Scene(canvas);
        this.player = new Player(canvas);
        this.things = [
            new Direction(canvas, 2, 18), 
            new Flag(canvas, 120, 18)
        ];
        this.score = new Score(canvas, canvas.width - 3, canvas.height - 3);
        this.life = new Life(canvas, 3, canvas.height - 3);
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
        this.score.draw();
        this.life.draw();
    }

    private drawThings(position: i32): void {
        for (let i = 0; i < this.things.length; i++) {
            this.things[i].draw(position);
        }
    }
}