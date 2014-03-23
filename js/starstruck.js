
var game = new Phaser.Game(1067, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render }, false, false);

function preload() {

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
var layer1;
var layer2;
var layer3;
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

    bg = game.add.tileSprite(0, 0, 1067, 600, 'background');
    bg.fixedToCamera = true;

    map = game.add.tilemap('level1');

    map.addTilesetImage('tiles-1');

    map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    layer1 = map.createLayer('Tile Layer 1');
    layer1.scale.setTo(scale);
    layer1.resizeWorld();

    layer2 = map.createLayer('Tile Layer 2');
    layer2.scale.setTo(scale);
    layer2.resizeWorld();

    layer3 = map.createLayer('Tile Layer 3');
    layer3.scale.setTo(scale);
    layer3.resizeWorld();

    game.physics.arcade.gravity.y = 1000;

    player = game.add.sprite(1000, 50, 'girlspritesheet');
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

    player.animations.getAnimation('girlland').onComplete.add(finishLand);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //TEXT

    text = game.add.text(500, 150, 'Use the arrow keys to move around.', { font: "24pt Fixedsys", fill: "white", align: "center"});
    text.alpha = 0;
    text.anchor.setTo(0.5, 0.5);
    game.add.tween(text).to( { alpha: 1 }, 350, Phaser.Easing.Linear.None, true, 100, false);
    game.add.tween(text).to({y: 100}, 350, Phaser.Easing.Out, true,100, false);
    
}

function update() {
    
    game.physics.arcade.collide(player, layer1);
    game.physics.arcade.collide(player, layer2);
    game.physics.arcade.collide(player, layer3);



    if (cursors.down.isDown) {
        
    }
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -playerSpeed;
        player.scale.x = -scale;
        facing = "left";
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = playerSpeed;
        player.scale.x = scale;
        facing = "right";
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


function finishLand () {
    fall = false;
}

function render () {

    game.debug.body(player);
    game.debug.bodyInfo(player, 16, 24);
    layer1.debug = true;
    layer2.debug = true;

}