import Player from './Player';
import Scene from './Scene';

const STEP = 3;

export enum Control {
    Up = 1,
    Down,
    Left,
    Right,
}

export class Game {

    private scene: Scene;
    private player: Player;

    private position: i32;

    constructor(scene: Scene, player: Player) {
        this.scene = scene;
        this.player = player;
        this.position = 0;
    }

    start(): void {
        this.position = 0;
    }

    update(control: Control): void {
        switch (control) {
            case Control.Right:
                this.position += STEP;
                this.player.moveRight();
                break;
            case Control.Left:
                this.position = max(this.position - STEP, 0);
                this.player.moveLeft();
                break;
            default:
                this.player.idle();
                break;
        }
        
        this.scene.update(this.position);
        this.player.update();
    }
}