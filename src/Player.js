Player = function(g) {

	game = g;
	spriteMain = null;

};

Player.prototype = {

	preload: function() {
    	game.load.spritesheet('spriteMain', 'assets/sprites/playerMain.png', 62, 62);
	},

	create: function() {
		spriteMain = game.add.sprite(10, 10, 'spriteMain');
	},

	update: function() {
		
	}
	
};