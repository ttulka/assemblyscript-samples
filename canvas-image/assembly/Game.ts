import Canvas from './Canvas';
import Player from './Player';
import Scene from './Scene';
import Thing from './Thing';

import directionImg from './assets/direction';
import flagImg from './assets/flag';

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
            new Thing(canvas, directionImg, 18, 18, 2, 18),
            new Thing(canvas, flagImg, 18, 18, 120, 18)
        ];
    }

    start(): void {
        this.player.reset();
    }

    update(control: Control): void {
        switch (control) {
            case Control.Right:
                this.player.headRight();
                break;
            case Control.Left:
                this.player.headLeft();
                break;
            case Control.Up:
                this.player.jump();
                break;
            default:
                this.player.idle();
                break;
        }
        
        this.player.update();

        this.scene.draw(this.player.position());
        this.drawThings(this.player.position());
        this.player.draw();
    }

    private drawThings(position: i32): void {
        for (let i = 0; i < this.things.length; i++) {
            this.things[i].draw(position);
        }
    }
}