Block = function(g) {

	game = g;
	sprite = null;
};

Block.prototype = {

	preload: function() {
    	game.load.spritesheet('sprite', 'assets/sprites/block.png', 52, 50);
	},

	create: function(layer1) {
		sprite = game.add.sprite(2170, 640, 'sprite');
	},

	update: function() {

	},

	debug: function() {
	}
};