GameMananger = function(g) {

	game = g;
	level = null;
	player = null;
	block = null;
	cursors = null;
	powerUp = null;
};

GameMananger.prototype = {

	preload: function() {
    	level = new Level(game);
		level.preload();

		player = new Player(game);
		player.preload();

		block = new Block(game);
		block.preload();

		tutorial = new Tutorial(game);

		powerUp = new PowerUp(game);
		powerUp.preload();

	},

	create: function() {
		level.create();
		player.create();
		block.create();
		powerUp.create();

		tutorial.print('Use the arrow keys to move around.', 500, 150, 24);

		cursors = game.input.keyboard.createCursorKeys();


	},

	update: function() {
		level.update();
		player.update();
		block.update();
		powerUp.update();

		level.fallThrough(cursors.down.isDown);

		if (cursors.left.isDown) {
            player.moveLeft();
        } else if (cursors.right.isDown) {
            player.moveRight();
        } else {
        	player.stopWalking();
        }

        if (cursors.up.isDown) {
            player.jump();
        }
	},

	render: function(){
		player.render();
	}
};