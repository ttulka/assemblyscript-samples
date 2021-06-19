import {Game, Control} from './Game';
import Canvas from './Canvas';
import Scene from './Scene';
import Player from './Player';

const WIDTH = 100, 
      HEIGHT = 100;

const game = new Game(new Canvas(WIDTH, HEIGHT));

export function start(): void {
    game.start();
}

export function update(control: Control): void {
    game.update(control);
}