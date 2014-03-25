
var game = new Phaser.Game(1067, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render }, false, false);

function preload() {

    game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles-1', 'assets/tiles-1.png');
    game.load.spritesheet('girlspritesheet', 'assets/spritesheet.png', 62, 62);
    game.load.spritesheet('enemy', 'assets/enemy.png', 52, 50);
    game.load.spritesheet('droid', 'assets/droid.png', 32, 32);
    game.load.image('starSmall', 'assets/star.png');
    game.load.image('starBig', 'assets/star2.png');
    game.load.image('background', 'assets/background2.png');
    game.load.image('blackground', 'assets/blackground.png');

 //AUDIO
    game.load.audio('playerWalkGrass', 'assets/SoundEffects/player_walk_grass.ogg');
    game.load.audio('playerBump', 'assets/SoundEffects/player_bump.ogg');

}

var map;
var tileset;
var layer1;
var layer2;
var layer3;
var facing = 'left';
var cursors;
var jumpButton;
var bg;
var enemy;
var fall = false;
var playerSpeed = 250;
var scale = 1;
var playerIdle = true;
var fallTimer = 0;
var blocked = false;
var gamePaused = false;
var walkSoundEffect;
var bumpSoundEffect;
var goEnemy = false;


function create() {
    game.stage.smoothed = false;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 1067, 600, 'background');
    bg.fixedToCamera = true;

    map = game.add.tilemap('level1');

    map.addTilesetImage('tiles-1');
    map.setLayer(layer1);


    layer2 = map.createLayer('Tile Layer 2');
    layer2.scale.setTo(scale);
    layer2.resizeWorld();

    layer1 = map.createLayer('Tile Layer 1');
    layer1.scale.setTo(scale);
    layer1.resizeWorld();

    map.setCollisionByExclusion([], true, layer1);

    game.physics.arcade.gravity.y = 1000;

    player = game.add.sprite(1000, 600, 'girlspritesheet');
    enemy = game.add.sprite(2200, 650, 'enemy');

    game.physics.enable([player, enemy], Phaser.Physics.ARCADE);

    player.anchor.setTo(.5,.5);
    player.body.collideWorldBounds = true;
    player.scale.setTo(scale);
    player.body.setSize(14, 50, 0, 6);

    enemy.body.immovable = true;
    enemy.body.allowRotation = true;

    player.animations.add('walk', [2, 3, 4, 5, 6, 7, 8, 9], 15, false);
    player.animations.add('girlfront', [1], 10, false);
    player.animations.add('girlfalling', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 15, true);
    player.animations.add('girlland', [21, 22, 23, 24, 25, 26, 27], 15, false);
    player.animations.add('girlidle', [0], 20, false);
    player.animations.add('girljump', [28, 29, 30], 10, false);
    player.animations.add('girlbump', [31], 15, false);

    enemy.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8], 15, true);
    enemy.animations.play('move');

    player.animations.getAnimation('girlland').onComplete.add(finishLand);

    
    //enemy.physics.arcade.gravity.y = 1000;
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //TEXT

    text = game.add.text(500, 150, 'Use the arrow keys to move around.', { font: "24pt Fixedsys", fill: "white", align: "center"});
    text.alpha = 0;
    text.anchor.setTo(0.5, 0.5);
    game.add.tween(text).to( { alpha: 1 }, 350, Phaser.Easing.Linear.None, true, 100, false);
    game.add.tween(text).to({y: 100}, 350, Phaser.Easing.Out, true,100, false);

    //OBJECTS


    //AUDIO
    bumpSoundEffect = game.add.audio('playerBump',1,true);
    walkSoundEffect = game.add.audio('playerWalkGrass',1,true);
    walkSoundEffect.play('',0,1,true);
    
}

function update() {

    game.physics.arcade.collide(player, layer1);
    game.physics.arcade.collide(enemy, layer1);
    game.physics.arcade.collide(player, enemy);
    
    if(gamePaused == false){

       if(player.body.velocity.x == 0 || player.body.blocked.left || player.body.blocked.right || !player.body.blocked.down) {
            walkSoundEffect.pause();
        } else {
            walkSoundEffect.resume();
        }

        if (cursors.down.isDown){
            map.setCollision([4, 5, 6, 7, 8, 9, 10, 11, 15, 22], false, layer1);
        } 
        else {
            map.setCollision([4, 5, 6, 7, 8, 9, 10, 11, 15, 25], true, layer1);
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

        if(player.body.velocity.y > 200) {
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

        if (player.body.blocked.left || player.body.blocked.right) {
            /*if (!player.animations.getAnimation('girlbump').isPlaying) {
                bumpSoundEffect.play('',0,1,false);
            }*/
            blocked = true;
        }

        if (blocked) {
            player.animations.play('girlbump');

            if ((facing == 'right' && cursors.right.isDown) || (facing == 'left' && cursors.left.isDown) || cursors.up.isDown ){
                blocked = false;
            }
        }

        


        if(enemy.body.x == 1025){
            enemy.body.velocity.x = 0;
        }

        if (player.body.touching.right){
            player.body.blocked;
        }

        if (player.body.x >= 1600){
            goEnemy = true;
        }

        if (goEnemy){
            enemy.body.velocity.x = -80;
            
        }
        console.log(enemy.animations.getAnimation('move').frame);
            
    }

}


function finishLand () {
    fall = false;
}

function oneLessLife(girl, enemy){
    gamePaused = true;
    black = game.add.tileSprite(0, 0, 1067, 600, 'blackground');
    game.time.events.add(Phaser.Timer.SECOND * 4, fadeBlackground, this);
    black.fixedToCamera = true;
    player.body.x = 1000;
    player.body.y = 50;
}

function fadeBlackground(){
    game.add.tween(black).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    gamePaused = false;
}

function render () {

    //game.debug.body(player);
    game.debug.bodyInfo(player, 16, 24);
    //layer1.debug = true;

}