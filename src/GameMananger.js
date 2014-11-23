GameMananger = function(g) {

	game = g;
	level = null;
	player = null;

};

GameMananger.prototype = {

	preload: function() {
    	level = new Level(game);
		level.preload();

		player = new Player(game);
		player.preload();
	},

	create: function() {
		level.create();
		player.create();
	},

	update: function() {
		level.update();
		player.update();
	}
	
};