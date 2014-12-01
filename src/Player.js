Player = function(g) {

	game = g;
	spriteMain = null;
	speed = 250;
	spriteExplosion = null;
    partBlood = null;
    partBrain = null;

};

Player.prototype = {

	preload: function() {
    	game.load.spritesheet('spriteMain', 'assets/sprites/playerMain.png', 62, 62);
    	game.load.spritesheet('spriteExplosion', 'assets/sprites/playerExplosion.png', 62, 62);
        game.load.image('spriteBlood', 'assets/sprites/partBlood.png');
        game.load.image('spriteBrain', 'assets/sprites/partBrain.png');
	},

	create: function() {
		
		spriteMain = game.add.sprite(1500, 500, 'spriteMain');
		game.physics.enable(spriteMain, Phaser.Physics.ARCADE);
		spriteMain.anchor.setTo(.5,.5);
		spriteMain.body.collideWorldBounds = true;
        spriteMain.body.setSize(14, 50, 0, 6);
        this.follow();
        spriteExplosion = game.add.sprite(1046, 754, 'spriteExplosion');
        spriteExplosion.visible = false;
        spriteExplosion.animations.add('spriteExplosion', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15, false);
		spriteExplosion.scale.setTo(-1, 1);
	},

	update: function() {
		level.collide(spriteMain);
		level.collide(partBlood, this.bloodOnFloor);
		level.collide(partBrain, this.bloodOnFloor);
	},

	moveRight: function() {
        spriteMain.body.velocity.x = speed;
        spriteMain.scale.x = 1;
	},

	moveLeft: function() {
		spriteMain.body.velocity.x = -speed;
        spriteMain.scale.x = -1;
	},

	stopWalking: function() {
		spriteMain.body.velocity.x = 0;
	},

	getX: function() {
		return spriteMain.x;
	},

	getY: function() {
		return spriteMain.y;
	},

	follow: function(){
		game.camera.follow(spriteMain,  Phaser.Camera.STYLE_LOCKON)
	},

	jump: function() {
		if (spriteMain.body.onFloor()) {
			spriteMain.body.velocity.y = -350;
		}
	},

	playSmashDeath: function() {
        spriteMain.exists = false;
        spriteExplosion.visible = true;
        if (!spriteExplosion.animations.getAnimation('spriteExplosion').isFinished)
        {
            if (!spriteExplosion.animations.getAnimation('spriteExplosion').isPlaying)
            {
                spriteExplosion.play('spriteExplosion');
            }

            if (spriteExplosion.animations.getAnimation('spriteExplosion').frame == 4)
            {
                partBlood = game.add.emitter(spriteMain.body.x+10, spriteMain.body.y+25);
                partBlood.makeParticles('spriteBlood');
                partBlood.minRotation = 0;
                partBlood.maxRotation = 0;
                partBlood.minParticleSpeed.setTo(-20, -50);
                partBlood.maxParticleSpeed.setTo(50, 50);
                partBlood.gravity = -900;
                partBlood.start(true, 15000, null, 50);
      

                partBrain = game.add.emitter(spriteMain.body.x+10, spriteMain.body.y+35);
                partBrain.makeParticles('spriteBrain');
                partBrain.minRotation = 0;
                partBrain.maxRotation = 0;
                partBrain.minParticleSpeed.setTo(-50, -50);
                partBrain.maxParticleSpeed.setTo(50, 50);
                partBrain.gravity = -900;
               	partBrain.start(true, 15000, null, 10);

               	game.add.tween(picture).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            }
        
        }
    },

    bloodOnFloor: function(particle){
        particle.body.velocity = 0;
    },

	collideBlock: function(object){
		game.physics.arcade.collide(spriteMain, object);
    }, 

	render: function() {
   	        //game.debug.bodyInfo(spriteMain, 16, 24);
    } 
	
};