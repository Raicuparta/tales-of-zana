Block = function(g) {

	game = g;
	sprite = null;
	playerNear = null;
	shakeWorld = 0;
	shakeRate = 8;
	blockVelocity = 0;
	blocked = true;
	this.fallPowerUp = false;
	countBlockFalls = 0;

};

Block.prototype = {

	preload: function() {
    	game.load.spritesheet('sprite', 'assets/sprites/block.png', 52, 50);
	},

	create: function() {
		sprite = game.add.sprite(2170, 640, 'sprite');
		game.physics.enable(sprite, Phaser.Physics.ARCADE);
		sprite.body.allowGravity = false;
	    sprite.body.immovable = true;
	    sprite.body.setSize(25, 45, 5, 6);
	},

	update: function() {
		level.collide(sprite);
		player.collideBlock(sprite);
		sprite.body.velocity.x = blockVelocity;

		if(sprite.body.blocked.left == true){
			blockVelocity = 0;
			blocked = false;
			sprite.body.allowGravity = false;
			sprite.body.speed = 0;
		}

        /*if(sprite.body.x <= 1020){
            player.playSmashDeath();
        }*/

        if (player.getX() >= 1600 && player.getY() > 400 && blocked){
            blockVelocity = -80;
            sprite.body.allowGravity = true;
        }

        if (!sprite.body.onFloor()){
		   	shakeWorld = 8;
		}

		if (shakeWorld>0 && sprite.body.onFloor()){
			game.camera.unfollow();
		   	var rand1 = game.rnd.integerInRange(-shakeRate,shakeRate);
		   	var rand2 = game.rnd.integerInRange(-shakeRate,shakeRate);
		    game.camera.x = player.getX()-(game.camera.width/2)+rand1;
		    game.camera.y = game.camera.y+rand2;
		    shakeWorld--;
		    if (shakeWorld == 0) {
		    	countBlockFalls++;
		   		if(countBlockFalls == 3){
		   			this.fallPowerUp = true;
		   			countBlockFalls = 0;
		   		}
		    	player.follow();
		    }
		}

    },

     render: function() {
   		//game.debug.body(sprite);
   		//game.debug.bodyInfo(sprite, 16, 24);
	}	
	
};