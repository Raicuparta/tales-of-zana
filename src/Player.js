Player = function(g) {

	game = g;
	spriteMain = null;

};

Player.prototype = {

	preload: function() {
    	game.load.spritesheet('spriteMain', 'assets/sprites/playerMain.png', 62, 62);
	},

	create: function() {
		game.camera.follow(_spriteMain);
		
		spriteMain = game.add.sprite(10, 10, 'spriteMain');
		game.physics.enable(spriteMain, Phaser.Physics.ARCADE);
		spriteMain.anchor.setTo(.5,.5);
		spriteMain.body.collideWorldBounds = true;
        spriteMain.body.setSize(14, 50, 0, 6);
	},

	update: function() {
		
	}
	
};