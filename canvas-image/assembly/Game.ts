import Player from './Player';
import Scene from './Scene';

export enum Control {
    Up = 1,
    Down,
    Left,
    Right,
}

export class Game {

    private scene: Scene;
    private player: Player;

    constructor(scene: Scene, player: Player) {
        this.scene = scene;
        this.player = player;
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
        this.player.draw();
    }
}