
var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render }, false, false);

function preload() {

    game.scale.refresh();

    game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles-1', 'assets/tiles-1.png');
    game.load.spritesheet('girlspritesheet', 'assets/spritesheet.png', 62, 62);
    game.load.spritesheet('droid', 'assets/droid.png', 32, 32);
    game.load.image('starSmall', 'assets/star.png');
    game.load.image('starBig', 'assets/star2.png');
    game.load.image('background', 'assets/background2.png');

}

var map;
var tileset;
var layer;
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var fall = false;
var playerSpeed = 100;
var scale = 1;
var playerIdle = true;

function create() {
    game.stage.smoothed = false;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    bg.fixedToCamera = true;

    map = game.add.tilemap('level1');

    map.addTilesetImage('tiles-1');

    map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    layer = map.createLayer('Tile Layer 1');
    layer.scale.setTo(scale);

    layer.resizeWorld();

    game.physics.arcade.gravity.y = 1000;

    player = game.add.sprite(50, 50, 'girlspritesheet');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.anchor.setTo(.5,.5);
    player.body.collideWorldBounds = true;
    player.scale.setTo(scale);
    player.body.setSize(20, 50, 0, 7);


    player.animations.add('walk', [2, 3, 4, 5, 6, 7, 8, 9], 15, false);
    player.animations.add('girlfront', [1], 10, false);
    player.animations.add('girlfalling', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 15, true);
    player.animations.add('girlland', [21, 22, 23, 24, 25, 26, 27], 15, false);
    player.animations.add('girlidle', [0], 20, true);
    player.animations.add('girljump', [28, 29, 30], 10, false);


    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {
    playerIdle = true;

    game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
            player.body.velocity.x = -playerSpeed;
            player.scale.x = -scale;
    }
    else if (cursors.right.isDown) {
            player.body.velocity.x = playerSpeed;
            player.scale.x = scale;
    }
    

    if(player.animations.getAnimation('girlland').onComplete) {
        fall = false;
    }

    if(player.body.velocity.y > 300) {
        fall = true;
    }
    

    //ANIMACOES
    if (player.body.onFloor()) {
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -400;
            player.animations.play('girljump');
            //jumpTimer = game.time.now + 500;
        }

        else if (player.body.velocity.x != 0) {
            if (fall) {
                player.animations.play('girlland');
            }
            else
            {
                player.animations.play('walk');
            }
        }
        else if (player.body.velocity.x == 0 && fall) {
            player.animations.play('girlland');
        }

        else {
            player.animations.play('girlidle');
        }

    }
    else
    {
        if (player.body.velocity.y > 0) {
            player.animations.play('girlfalling');
        }
    }

}

function render () {

    //game.debug.body(player);
    game.debug.bodyInfo(player, 16, 24);
    //layer.debug = true;

}