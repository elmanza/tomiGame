import { Preloader } from "./assets/js/preload.js";
import { GameScene } from "./assets/js/gameScene.js";
// import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: '100%',
    height: 400,
    parent: 'phaser-game',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 200 }, debug: false }
    },
    scene: [Preloader, GameScene]
};

function resizeGame() {
    const gameContainer = document.getElementById('phaser-game');
    const width = window.innerWidth;
    const height = window.innerHeight;
    if(width > 800){
        gameContainer.style.width = 800 + 'px';
        config.width = 800;
    } else {
        gameContainer.style.width = width + 'px';
    }
    gameContainer.style.height = height + 'px';
}
window.addEventListener('resize', resizeGame);
const game = new Phaser.Game(config);

resizeGame();

window.addEventListener('keyup', function(event) {
console.log(event.key);
    if (event.key === 'p' || event.key === 'P' || event.key === 'Escape') {
        game.pause();
    }

    if (event.key === 'r' || event.key === 'R' || event.key === 'Enter') {
        game.resume();
    }
});