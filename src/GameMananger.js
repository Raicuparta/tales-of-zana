GameMananger = function(g) {

	game = g;
	level = null;
	player = null;
	block = null;
	cursors = null;

};

GameMananger.prototype = {

	preload: function() {
    	level = new Level(game);
		level.preload();

		player = new Player(game);
		player.preload();

		block = new Block(game);
		block.preload();


	},

	create: function() {
		level.create();
		player.create();
		block.create();

		cursors = game.input.keyboard.createCursorKeys();
	},

	update: function() {
		level.update();
		player.update();
		block.update();

		if (cursors.left.isDown) {
            player.moveLeft();
        } else if (cursors.right.isDown) {
            player.moveRight();
        } else {
        	player.stopWalking();
        }
	}
};