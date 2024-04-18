const config = {
    width: 800,
    height: 400
}
const platformsNames = [  'p_l_r', 'p_m_l', 'p_m_r', 'p_s_l', 'p_s_r' ];
const titleElement = document.getElementById('title');
const jumpButton = document.getElementById('jump');


export class GameScene extends Phaser.Scene {
    static canJump =  false;
    static floor = null;
    static platforms = [];
    static obstacles = [];
    static coins = [];
    static tomi8 = 0;
    static player = null;
    static isTouchingPlatform = false;
    static currentScene = null;
    constructor() {
        super({ key: 'GameScene' });
        this._posYPlatforms = [310, 210, 110];
        this.jumpTimer = 0;
        this.jumpPower = 0;
        this.maxJumpPower = 120;
        this.score = 0;
        this.scoreText = "";
    }

    create() {
        GameScene.currentScene = this;

        this.backgroundTile = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0, 0).setTileScale(0.3);
        this.backgroundTile.setScale(1); // Adjust scale as needed

        this.floor = this.add.tileSprite(0, config.height - 160, config.width, config.height, 'floor').setOrigin(0, 0).setTileScale(0.3);
        this.floor.setScale(3); 

        // Create the player
        this.player = this.physics.add.sprite(((config.width * 25) / 100), config.height - 100, 'player');
        this.player.setScale(.12);
        this.player.setBounce(0.2); // Set bounce for a more natural jump
        this.player.setCollideWorldBounds(true); // Prevent player from going off screen

        this.createFloor(this.player);

        // Create cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Initialize score and score text
        
        this.scoreText = this.add.text(20, 20, `Score: 0 - Tomi8: ${GameScene.tomi8}/7`, { fontSize: '20px', fill: '#fff' });

        // Zombies
        this.anims.create({
            key: 'zombie_move', // Nombre de la animación
            frames: [,
                { key: 'zombie_move_0' },
                { key: 'zombie_move_1' },
                { key: 'zombie_move_2' },
                { key: 'zombie_move_3' },
                { key: 'zombie_move_4' },
                { key: 'zombie_move_5' },
                { key: 'zombie_move_6' },
                { key: 'zombie_move_7' },
                { key: 'zombie_move_8' },
                { key: 'zombie_move_9' }
            ],
            frameRate: 6, // Velocidad de la animación en fotogramas por segundo
            repeat: -1 // Repetir indefinidamente (-1) o un número específico de veces
        });

        let _tempXZombie = config.width + 10;
        for (let i = 0; i < 100; i++) {
            this.createZombie(this.player, this.physics, _tempXZombie);
            _tempXZombie += Phaser.Math.Between(200, 700);
        }

        // fire
        this.anims.create({
            key: 'fire_anim', // Nombre de la animación
            frames: [,
                { key: 'fire_1' },
                { key: 'fire_2' },
                { key: 'fire_3' },
                { key: 'fire_4' },
                { key: 'fire_5' },
                { key: 'fire_6' },
            ],
            frameRate: 12, // Velocidad de la animación en fotogramas por segundo
            repeat: -1 // Repetir indefinidamente (-1) o un número específico de veces
        });


        let _tempXFire = config.width + 10;
        for (let i = 0; i < 100; i++) {
            this.createFire(this.player, this.physics, _tempXFire);
            _tempXFire += Phaser.Math.Between(200, 700);
        }

        let _tempXCoin = 400;
        for (let i = 0; i < 80; i++) {
            this.createCoins(this.player, this.physics, _tempXCoin, i);
            _tempXCoin += Phaser.Math.Between(200, 1100);
        }


        let _tempXTomi8 = 2300;
        for (let i = 0; i < 20; i++) {
            this.createTomi8(this.player, this.physics, _tempXTomi8, i);
            _tempXTomi8 += Phaser.Math.Between(1000, 2000);
        }

        
        GameScene.canJump = true; // Flag to control jumping
    }

    

    

    createFloor(player){

        // Crear un sprite con un rectángulo como textura
        const rectangle = this.add.rectangle(0, config.height, config.width, 20, 0xFF0000); // x, y, width, height, fillColor

        // Habilitar físicas en el sprite
        GameScene.floor = this.physics.add.existing(rectangle);
        GameScene.floor.setVisible(false);
        GameScene.floor.body.setCollideWorldBounds(true);
        console.log(GameScene.floor.body.immovable);

        this.physics.add.collider(player, GameScene.floor, this.onTouchFloor);
    }

    onTouchPlatform(){
        if(!GameScene.canJump) {
            GameScene.canJump = true;
        }
    }


    onTouchFloor(){
        if(!GameScene.canJump) {
            GameScene.canJump = true;
        }
    }

    // Function to handle player-obstacle collision (example)
    onHitObstacle() {
        GameScene.currentScene.score = 0;
        GameScene.tomi8 = 0; // Reset Tomi8 count
        GameScene.currentScene.scene.restart();
    }

    // Function to handle player-coin collision (example)
    onHitCoin(coin, points) {
        coin.destroy();
        this.score += points; // Increase score by 10 (adjust as needed)
        if(points === 50){
            GameScene.tomi8++;
            if(GameScene.tomi8 > 4){
                GameScene.currentScene.scene.pause();
                titleElement.innerText = 'Ganaaaaste!!!';
            }
        }
        this.scoreText.setText(`Score: ${this.score} - Tomi8: ${GameScene.tomi8}/7`);
        
    }

    createZombie(player, physics, posX) {
        // ZOMBIES
        let _zombie = physics.add.sprite(posX, Phaser.Math.Between(140, config.height - 50) , 'zombie_move_0');
        _zombie.setScale(-0.13, 0.13);
        _zombie.play('zombie_move');
        _zombie.setVelocityX(-120);
        _zombie.body.allowGravity = false;
        _zombie.body.immovable = true;
        _zombie.body.setSize((_zombie.width / 2) + 10, _zombie.height - 80); // ENTRE 40 Y 100
        _zombie.body.setOffset(_zombie.width -120, 70); 
        physics.add.overlap(player, _zombie, this.onHitObstacle);
        GameScene.obstacles.push(_zombie);
    }

    createFire(player, physics, posX) {
        // FIRE
        let _fire = physics.add.sprite(posX, config.height - 45, 'fire_1');
        _fire.setScale(-0.19, 0.19);
        _fire.play('fire_anim');
        _fire.setVelocityX(-90);
        _fire.body.allowGravity = false;
        _fire.body.immovable = true;
        _fire.body.setSize((_fire.width / 2) + 10, _fire.height - 80); // ENTRE 40 Y 100
        _fire.body.setOffset(_fire.width -100, 30); 
        // physics.add.collider(GameScene.floor, _fire);

        physics.add.overlap(player, _fire, this.onHitObstacle);
        GameScene.obstacles.push(_fire);
    }
    
    createCoins(player, physics, posX, i){
        // COINS
        let _coin = physics.add.sprite(posX, Phaser.Math.Between(80, config.height - 50), 'coin');
        _coin.setScale(-0.28, 0.28);
        _coin.setVelocityX(-90);
        _coin.index = i;
        _coin.body.allowGravity = false;
        _coin.body.immovable = true;
        _coin.body.setSize(_coin.width, _coin.height); // ENTRE 40 Y 100
        _coin.body.setOffset(_coin.width, 0); 

        physics.add.overlap(player, _coin, this.onHitCoin.bind(this, _coin, 15));
        GameScene.coins.push(_coin);
    }


    createTomi8(player, physics, posX, i){
        // COINS
        let _tomi8 = physics.add.sprite(posX, Phaser.Math.Between(80, config.height - 50), 'tomi8');
        _tomi8.setScale(0.06);
        _tomi8.setVelocityX(-90);
        _tomi8.index = i;
        _tomi8.body.allowGravity = false;
        _tomi8.body.immovable = true;
        _tomi8.body.setSize(_tomi8.width, _tomi8.height); // ENTRE 40 Y 100
        _tomi8.body.setOffset(0, 0); 

        physics.add.overlap(player, _tomi8, this.onHitCoin.bind(this, _tomi8, 50));
        // GameScene.coins.push(_tomi8);
    }


    handlerPlatforms(player, physics){
        let _tempX = 0;
        let _initX = 500;
        let _tempY = 300;
        let _posY = 0;
        let ind = 0;
        for (let i = 0; i < 30; i++) {
            // Eje X
            let _x = _initX + _tempX + 100;
                _tempX = _x;
            // Eje Y
            if(_posY === 0){
                ind = Math.floor(Math.random() * 2);
                _posY = ind;
                if(ind === 0){ _tempX += 500; }
                _tempY = this._posYPlatforms[ind];
            } else if(_posY === 1){
                ind = Math.floor(Math.random() * this._posYPlatforms.length);
                _tempY = Phaser.Math.Between(this._posYPlatforms[ind], this._posYPlatforms[2]);
                _posY = ind;
            } else {
                ind = Math.floor(Math.random() * 2);
                _posY = ind;
                _tempY = Phaser.Math.Between(this._posYPlatforms[0], this._posYPlatforms[1]);
            }
            this.createPlatorms(player, physics, _tempX, _tempY);
        }
    }

    createPlatorms(player, physics, x, y){
        let _temp_platform = physics.add.sprite(x, y, platformsNames[Math.floor(Math.random() * platformsNames.length)]);
        _temp_platform.setScale(1.2, .9);
        _temp_platform.setBounce(0);
        _temp_platform.setGravityY(0);
        _temp_platform.setVelocityX(-100);
        _temp_platform.body.allowGravity = false;
        _temp_platform.body.immovable = true;
        physics.add.collider(player, _temp_platform, this.onTouchPlatform, null);
        GameScene.platforms.push(_temp_platform);
    }

    update() {
        for (let i = 0; i < GameScene.platforms.length; i++) {
            if (GameScene.platforms[i].x <= -140) {
                GameScene.platforms[i].destroy();
                GameScene.platforms.splice(i, 1);
            }            
        }

        for (let i = 0; i < GameScene.obstacles.length; i++) {
            if (GameScene.obstacles[i].x <= -140) {
                GameScene.obstacles[i].destroy();
                GameScene.obstacles.splice(i, 1);
            }            
        }

        for (let i = 0; i < GameScene.coins.length; i++) {
            if (GameScene.coins[i].x <= -140) {
                GameScene.coins[i].destroy();
                GameScene.coins.splice(i, 1);
            }            
        }
        
        this.backgroundTile.tilePositionX += .3; // Adjust speed as needed
        this.floor.tilePositionX += 2; // Adjust speed as needed
        const cursors = this.cursors;



        if (cursors.left.isDown) {
            // this.player.setVelocityX(-30);
        } else if (cursors.right.isDown) {
            // this.player.setVelocityX(30);
        }

        // Detectar la duración del botón de salto presionado
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            // Reiniciar el temporizador y la potencia de salto
            this.jumpTimer = this.time.now;
            this.jumpPower = 0;
        } else if (this.cursors.up.isDown || this.cursors.space.isDown) {
            // Incrementar la potencia de salto mientras se mantiene presionado el botón
            this.jumpPower = Math.min(this.maxJumpPower, this.time.now - this.jumpTimer);
        } else if (Phaser.Input.Keyboard.JustUp(this.cursors.up) || Phaser.Input.Keyboard.JustUp(this.cursors.space)) {
            // Realizar el salto con la potencia determinada
            const jumpVelocity = -this.jumpPower * 2; // Ajusta según sea necesario
            this.player.setVelocityY(jumpVelocity);

            // Restablecer el temporizador y la potencia de salto
            this.jumpTimer = 0;
            this.jumpPower = 0;

        }
    }
}

// Agregar un event listener para el evento 'click'
jumpButton.addEventListener('click', function() {
    GameScene.currentScene.player.setVelocityY(-210);
});