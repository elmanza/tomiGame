export class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Preloader' });
    }

    preload() {
        this.load.image('background', 'assets/images/background/5.png');
        this.load.image('player', 'assets/images/player.png');
        this.load.image('obstacle', 'assets/images/obstacles/Box8.png');
        // this.load.image('zombie', 'assets/images/obstacles/zombie.png');
        this.load.image('coin', 'assets/images/star2.png');
        this.load.image('tomi8', 'assets/images/tomi8.png');

        // Platforms
        this.load.image('floor_left', 'assets/images/platform/tile_half_left.png');
        this.load.image('floor_center', 'assets/images/platform/tile_half_center.png');
        this.load.image('floor_right', 'assets/images/platform/tile_half_right.png');
        this.load.image('floor', 'assets/images/background/floor.png');

        // Float Platforms
        this.load.image('p_xl_l', 'assets/images/platform/1x/p_xl_l.png');
        this.load.image('p_xl_r', 'assets/images/platform/1x/p_xl_r.png');
        this.load.image('p_l_l', 'assets/images/platform/1x/p_l_l.png');
        this.load.image('p_l_r', 'assets/images/platform/1x/p_l_r.png');
        this.load.image('p_m_l', 'assets/images/platform/1x/p_m_l.png');
        this.load.image('p_m_r', 'assets/images/platform/1x/p_m_r.png');
        this.load.image('p_s_l', 'assets/images/platform/1x/p_s_l.png');
        this.load.image('p_s_r', 'assets/images/platform/1x/p_s_r.png');

        // Zombie__Zombie01_Walk_000
        this.load.image('zombie_move_0', 'assets/images/obstacles/zombie/__Zombie01_Walk_000.png');
        this.load.image('zombie_move_1', 'assets/images/obstacles/zombie/__Zombie01_Walk_001.png');
        this.load.image('zombie_move_2', 'assets/images/obstacles/zombie/__Zombie01_Walk_002.png');
        this.load.image('zombie_move_3', 'assets/images/obstacles/zombie/__Zombie01_Walk_003.png');
        this.load.image('zombie_move_4', 'assets/images/obstacles/zombie/__Zombie01_Walk_004.png');
        this.load.image('zombie_move_5', 'assets/images/obstacles/zombie/__Zombie01_Walk_005.png');
        this.load.image('zombie_move_6', 'assets/images/obstacles/zombie/__Zombie01_Walk_006.png');
        this.load.image('zombie_move_7', 'assets/images/obstacles/zombie/__Zombie01_Walk_007.png');
        this.load.image('zombie_move_8', 'assets/images/obstacles/zombie/__Zombie01_Walk_008.png');
        this.load.image('zombie_move_9', 'assets/images/obstacles/zombie/__Zombie01_Walk_009.png');


        // Fire
        this.load.image('fire_1', 'assets/images/obstacles/fire/Explosion_1.png');
        this.load.image('fire_2', 'assets/images/obstacles/fire/Explosion_2.png');
        this.load.image('fire_3', 'assets/images/obstacles/fire/Explosion_3.png');
        this.load.image('fire_4', 'assets/images/obstacles/fire/Explosion_4.png');
        this.load.image('fire_5', 'assets/images/obstacles/fire/Explosion_5.png');
        this.load.image('fire_6', 'assets/images/obstacles/fire/Explosion_6.png');
        // ... Load other assets here
    }

    create() {
        this.scene.start('GameScene');
    }
}
