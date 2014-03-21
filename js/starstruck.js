
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles-1', 'assets/tiles-1.png');
    game.load.spritesheet('girlwalking', 'assets/walking.png', 30, 30);
    game.load.spritesheet('girlfalling', 'assets/falling.png', 30, 30);
    game.load.spritesheet('girlland', 'assets/land.png', 30, 30);
    game.load.spritesheet('droid', 'assets/droid.png', 32, 32);
    game.load.image('girlidle', 'assets/idle.png');
    game.load.image('starSmall', 'assets/star.png');
    game.load.spritesheet('girlfront', 'assets/front.png', 30, 30);
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
var turning;

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

    //  Un-comment this on to see the collision tiles
    // layer.debug = true;

    layer.resizeWorld();

    game.physics.arcade.gravity.y = 250;

    player = game.add.sprite(30, 30, 'girlwalking');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.anchor.setTo(.5,.5);
    player.scale.setTo(2,2);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    //player.body.setSize(20, 32, -5, -16);

    player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
    player.animations.add('girlfront', [0], 20, true);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {

    game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            turning = true;
            //game.time.events.add(Phaser.Timer.SECOND * 0.1, turngirl, this);
            //if(turning){
                player.animations.play('girlfront')
            //}
            /*else{
                player.animations.play('walk');
                player.scale.setTo(-2,2);
                facing = 'left';
            }*/
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            if(turning){
                player.animations.play('girlfront');
            }
            else{
                player.animations.play('walk');
                player.scale.setTo(2,2);
                facing = 'right';
            }
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }

}

function render () {

    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}

function turngirl(){
    turning = false;
}
