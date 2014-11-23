Block = function(game) {

	this.game = game;
	this.sprite = null,
	this.active = false,
	this.soundStepGrass = null
};

Block.prototype = {

	preload: function() {
    	this.game.load.spritesheet('sprite', 'assets/sprites/block.png', 52, 50);
	},

	create: function(layer1) {

	},

	update: function() {

	},

	debug: function() {
	}
};