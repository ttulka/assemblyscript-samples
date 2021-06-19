import Canvas from './Canvas';

import player from './assets/player';

export default class Player {
    
    private readonly SIZE: i32 = 16;
    
    private canvas: Canvas;

    private playerEven: boolean;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.playerEven = true;
    }

    moveRight(): void {
        this.playerEven = !this.playerEven;                
    }

    moveLeft(): void {
        this.playerEven = !this.playerEven;
    }

    idle(): void {
        this.playerEven = true;
    }

    update(): void {
        this.drawPlayer(player);
    }

    private drawPlayer(image: u8[]): void {
        this.canvas.drawImage(image, 
            this.canvas.width / 2 - this.SIZE, 
            this.SIZE + 2 + (this.playerEven ? -1 : 0),
            this.SIZE, 
            this.SIZE);
    }
}