PowerUp = function(g) {

	game = g;
	this.powerUp = null;

};

PowerUp.prototype = {

	preload: function() {
    	game.load.spritesheet('sprite', 'assets/sprites/block.png', 52, 50);
	},

	create: function() {
		this.powerUp = game.add.sprite(1900, 480, 'sprite');
		game.physics.enable(this.powerUp, Phaser.Physics.ARCADE);
		this.powerUp.body.allowGravity = false;
	    this.powerUp.body.immovable = true;
	    this.powerUp.scale.x=0.5;
	    this.powerUp.scale.y=0.5;
	},

	update: function() {
		if(block.fallPowerUp){
			this.powerUp.body.allowGravity = true;
		}
    }	
};