import { Preloader } from "./assets/js/preload.js";
import { GameScene } from "./assets/js/gameScene.js";
// import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    parent: 'phaser-game',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 200 }, debug: false }
    },
    scene: [Preloader, GameScene]
};

const game = new Phaser.Game(config);


window.addEventListener('keyup', function(event) {
console.log(event.key);
    if (event.key === 'p' || event.key === 'P' || event.key === 'Escape') {
        game.pause();
    }

    if (event.key === 'r' || event.key === 'R' || event.key === 'Enter') {
        game.resume();
    }
});