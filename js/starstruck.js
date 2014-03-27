
var game = new Phaser.Game(1067, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render }, false, false);

function preload() {

    game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles-1', 'assets/tiles-1.png');
    game.load.spritesheet('girlspritesheet', 'assets/spritesheet.png', 62, 62);
    game.load.spritesheet('smashDeath', 'assets/smashDeath.png', 62, 62);
    game.load.spritesheet('enemy', 'assets/enemy.png', 52, 50);
    game.load.spritesheet('droid', 'assets/droid.png', 32, 32);
    game.load.image('starSmall', 'assets/star.png');
    game.load.image('starBig', 'assets/star2.png');
    game.load.image('blood', 'assets/blockR.png');
    game.load.image('brain', 'assets/blockG.png');
    game.load.image('background', 'assets/background2.png');
    game.load.image('blackground', 'assets/blackground.png');

 //AUDIO
    game.load.audio('playerWalkGrass1', 'assets/SoundEffects/player_walk_grass1.wav');
    game.load.audio('playerWalkGrass2', 'assets/SoundEffects/player_walk_grass2.wav');
    game.load.audio('playerWalkGrass3', 'assets/SoundEffects/player_walk_grass3.wav');
    game.load.audio('playerWalkGrass4', 'assets/SoundEffects/player_walk_grass4.wav');
    game.load.audio('playerBump', 'assets/SoundEffects/player_bump.ogg');
    game.load.audio('stone', 'assets/SoundEffects/stone.ogg');
    game.load.audio('smashDeath', 'assets/SoundEffects/player_smashDeath.ogg');

}

var map;
var tileset;
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
var stoneSoundEffect;
var smashDeath;
var smashDeathSoundEffect;
var emitter;
var emitter1;

function create() {
    game.stage.smoothed = false;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 1067, 600, 'background');
    bg.fixedToCamera = true;

    map = game.add.tilemap('level1');

    map.addTilesetImage('tiles-1');

    layer = [map.createLayer('Background'), map.createLayer('Solid'), map.createLayer('Grass1'), map.createLayer('Grass2')];
    map.setLayer(layer[1]);
    layer[1].resizeWorld();

    map.setCollisionByExclusion([], true, layer[1]);

    game.physics.arcade.gravity.y = 1000;

    player = game.add.sprite(1000, 100, 'girlspritesheet');
    enemy = game.add.sprite(2170, 640, 'enemy');
    smashDeath = game.add.sprite(1046, 754, 'smashDeath');

    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(enemy, Phaser.Physics.ARCADE);

    player.anchor.setTo(.5,.5);
    player.body.collideWorldBounds = true;
    player.scale.setTo(scale);
    player.body.setSize(14, 50, 0, 6);

    enemy.body.immovable = true;
    enemy.body.setSize(25, 45, 5, 6);

    smashDeath.visible = false;

    player.animations.add('walk', [2, 3, 4, 5, 6, 7, 8, 9], 15, false);
    player.animations.add('girlfront', [1], 10, false);
    player.animations.add('girlfalling', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 15, true);
    player.animations.add('girlland', [21, 22, 23, 24, 25, 26, 27], 15, false);
    player.animations.add('girlidle', [0], 20, false);
    player.animations.add('girljump', [28, 29, 30], 10, false);
    player.animations.add('girlbump', [31], 15, false);

    player.animations.getAnimation('girlland').onComplete.add(finishLand);

    enemy.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8], 15, true);

    smashDeath.animations.add('smashDeath', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15, false);

    smashDeath.scale.setTo(-1, 1);


    
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
    walkSoundEffect = [
        game.add.audio('playerWalkGrass1',1,false),
        game.add.audio('playerWalkGrass2',1,false),
        game.add.audio('playerWalkGrass3',1,false),
        game.add.audio('playerWalkGrass4',1,false)
    ];

    bumpSoundEffect = game.add.audio('playerBump',1,true);
    stoneSoundEffect = game.add.audio('stone',1,false);
    smashDeathSoundEffect = game.add.audio('smashDeath',1,false);

    
}

function update() {

    game.physics.arcade.collide(player, layer[1]);
    game.physics.arcade.collide(enemy, layer[1]);
    game.physics.arcade.collide(player, enemy);
    game.physics.arcade.collide(emitter, layer[1], bloodOnFloor, null, this);
    game.physics.arcade.collide(emitter1, layer[1], bloodOnFloor, null, this);
    
    if(gamePaused == false){

       if(player.animations.getAnimation('walk').isPlaying && (player.animations.getAnimation('walk').frame == 3 || player.animations.getAnimation('walk').frame == 7) ) {
            var isPlayingSound = false;
            for (var i = 0; i < 4; i++) {
                isPlayingSound = isPlayingSound || walkSoundEffect[i].isPlaying;
            }
            if (!isPlayingSound)
            {
                walkSoundEffect[Math.round(Math.random()*3)].play('',0,1,false);
            }
        }

        if (cursors.down.isDown){
            map.setCollision([4, 5, 6, 7, 8, 9, 10, 11, 15, 22], false, layer[1]);
        } 
        else {
            map.setCollision([4, 5, 6, 7, 8, 9, 10, 11, 15, 25], true, layer[1]);
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
                player.animations.stop();
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
                player.animations.stop();
                player.animations.play('girlidle');
            }

        }
        else
        {
            if (player.body.velocity.y > 0) {
                player.animations.stop();
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

        if (goEnemy){
            enemy.body.velocity.x = -80;
            enemy.animations.play('move');
            
        } else {
            enemy.body.velocity.x = 0;
            enemy.animations.stop();
        }

        if(enemy.body.x <= 1020){
            player.exists = false;
            smashDeath.visible = true;
            if (!smashDeath.animations.getAnimation('smashDeath').isFinished)
            {
                if (!smashDeath.animations.getAnimation('smashDeath').isPlaying)
                {
                    smashDeath.play('smashDeath');
                }

                if (smashDeath.animations.getAnimation('smashDeath').frame == 4 && !smashDeathSoundEffect.isPlaying)
                {
                    smashDeathSoundEffect.play('',0,1,false);
                    emitter = game.add.emitter(player.body.x+10, player.body.y+25);
                    emitter.makeParticles('blood');
                    emitter.minRotation = 0;
                    emitter.maxRotation = 0;
                    emitter.minParticleSpeed.setTo(-20, -50);
                    emitter.maxParticleSpeed.setTo(50, 50);
                    emitter.gravity = -900;
                    emitter.start(true, 15000, null, 50);

                    emitter1 = game.add.emitter(player.body.x+10, player.body.y+35);
                    emitter1.makeParticles('brain');
                    emitter1.minRotation = 0;
                    emitter1.maxRotation = 0;
                    emitter1.minParticleSpeed.setTo(-50, -50);
                    emitter1.maxParticleSpeed.setTo(50, 50);
                    emitter1.gravity = -900;
                    emitter1.start(true, 15000, null, 10);
                }
            
           }
        }
        if(enemy.body.x <= 1008){
            if (enemy.animations.getAnimation('move').frame == 0){
                goEnemy = false;
            }
        }

        if (player.body.touching.right){
            player.body.blocked;
        }

        if (player.body.x >= 1600 && player.body.y > 400){
            goEnemy = true;
        }
        
        if (enemy.animations.getAnimation('move').frame == 0 && !stoneSoundEffect.isPlaying && goEnemy) {
            stoneSoundEffect.play('',0,1,false);
        }
            
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

function bloodOnFloor(emitter,b){
    emitter.body.velocity = 0;
}

function render () {
    //game.debug.body(player);
    //game.debug.body(enemy);
    game.debug.bodyInfo(player, 16, 24);
    //layer1.debug = true;

}