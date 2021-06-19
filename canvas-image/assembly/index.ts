import { Canvas } from './Canvas';
import {Game, Control} from './Game';
import Player from './Player';
import Scene from './Scene';

const WIDTH = 100, HEIGHT = 100;

const canvas = new Canvas(WIDTH, HEIGHT);
const game = new Game(new Scene(canvas), new Player(canvas));

export function start(): void {
    game.start();
}

export function update(control: Control): void {
    game.update(control);
}