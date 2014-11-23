GameMananger = function(g) {

	game = g;
	level = null;

};

GameMananger.prototype = {

	preload: function() {
    	level = new Level(game);
		level.preload();
	},

	create: function() {
		level.update();
	},

	update: function() {
		level.update();
	}
	
};