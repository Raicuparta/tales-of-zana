Block = function(g) {

	game = g;
	sprite = null;
	playerNear = null;
	shakeWorld = 0;
};

Block.prototype = {

	preload: function() {
    	game.load.spritesheet('sprite', 'assets/sprites/block.png', 52, 50);
	},

	create: function() {
		sprite = game.add.sprite(2170, 640, 'sprite');
		game.physics.enable(sprite, Phaser.Physics.ARCADE);
	    sprite.body.immovable = true;
	    sprite.body.setSize(25, 45, 5, 6);
	},

	update: function() {
		level.collide(sprite);

		if (playerNear){
            sprite.body.velocity.x = -80;
        } 
        else{
            sprite.body.velocity.x = 0;
        }

        /*if(sprite.body.x <= 1020){
            player.playSmashDeath();
        }*/
        if (player.getX() >= 1600 && player.getY() > 400){
            playerNear = true;
        }

        if(sprite.y == 715.25 || sprite.y == 763.25){
		   	shakeWorld = 8;
		}

		if (shakeWorld > 0) {
			game.camera.unfollow();
		   	var rand1 = game.rnd.integerInRange(-20,20);
		   	var rand2 = game.rnd.integerInRange(-20,20);
		    game.camera.x = player.getX()+rand1;
		    game.camera.y = player.getY()+rand2;
		    shakeWorld--;
		    if (shakeWorld == 0) {
		    	player.follow();
		    }
		}

    }

};