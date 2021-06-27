import Canvas from './Canvas';
import Player from './Player';
import Scene from './Scene';
import Score from './Score';
import { Thing, Direction, Flag, Water } from './Thing';
import { Monster, Fly } from './Monster';

const JOURNEY_LENGTH = 150; // length of journey base

export enum Control {
    Up = 1,
    Left,
    Right,
}

export class Game {

    private scene: Scene;
    private player: Player;
    private things: Thing[];
    private obstacles: Thing[];
    private monsters: Monster[];
    private flag: Flag;
    private score: Score;

    private level: i32 = 1;

    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.scene = new Scene(canvas);
        this.player = new Player(canvas);
        this.score = new Score(canvas, canvas.width - 3, canvas.height - 3);

        this.things = [];
        this.obstacles = [];
        this.monsters = [];
        this.flag = new Flag(canvas, JOURNEY_LENGTH + 20, 18);
    }

    start(): void {
        this.player.start();
        this.things = [
            new Direction(this.canvas, 2, 18)
        ];
        this.monsters = [
            new Fly(this.canvas, 50, 75)
        ];
        this.obstacles = this.placeObstacles();
        this.flag = new Flag(this.canvas, JOURNEY_LENGTH * this.level, 18);
    }

    update(control: Control): void {
        if (!this.player.isAlive()) {
            this.canvas.turnToGray();
            return;
        }        
        this.updatePlayer(control);
        this.updateMonsters();
        this.performIteractions();
        this.drawGame();
    }

    private placeObstacles(): Thing[] {
        const obstacles: Thing[] = [];
        const occupied: i32[] = [];
        const lengthInSteps: i32 = JOURNEY_LENGTH / 3 * this.level / this.player.width() - 2;
        
        const m = Math.pow(this.level, 2);
        let i = 0;
        while (i < m) {
            const pos = i32(Math.random() * lengthInSteps + 2) * 3 * this.player.width();
            if (occupied.includes(pos)) continue;
            obstacles.push(new Water(this.canvas, pos, 2));
            i++;
        }
        return obstacles;
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

    private updateMonsters(): void {
        for (let i = 0; i < this.monsters.length; i++) {
            this.monsters[i].update();
        }
    }

    private performIteractions(): void {
        // caught by a monster
        if (this.wasCaught(this.monsters, this.player.position().x, this.player.position().y, this.player.width())) {
            this.player.hit();
            if (!this.player.isAlive()) {
                return;
            }
        }
        // hit by an obstacle
        if (this.hasHitWith(this.obstacles, this.player.position().x, this.player.position().y, this.player.width())) {
            this.player.hit();
            if (!this.player.isAlive()) {
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
        this.drawMonsters(this.monsters, this.player.positionRelativeX());
        this.score.draw();
        this.player.drawLife();
    }

    private drawThings(things: Thing[], position: i32): void {
        for (let i = 0; i < things.length; i++) {
            things[i].draw(position);
        }
    }

    private drawMonsters(monsters: Monster[], position: i32): void {
        for (let i = 0; i < monsters.length; i++) {
            monsters[i].draw(position);
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

    private wasCaught(monsters: Monster[], x: i32, y: i32, width: i32): boolean {
        for (let i = 0; i < monsters.length; i++) {
            const monster = monsters[i];
            if (monster.conflictsWith(x, y, width)) {
                return true;
            }
        }
        return false;
    }
}