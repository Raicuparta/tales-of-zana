Block = function(g) {

	game = g;
	sprite = null;
};

Block.prototype = {

	preload: function() {
    	game.load.spritesheet('sprite', 'assets/sprites/block.png', 52, 50);
	},

	create: function() {
		sprite = game.add.sprite(200, 10, 'sprite');
	},

	update: function() {

	},

	debug: function() {
	}
};