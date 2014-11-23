Level = function(g) {

	game = g;
	background = null,
	layer = null,
	map = null;
};

Level.prototype = {

	preload: function() {
    	game.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
      	game.load.image('tiles-1', 'assets/levels/tiles-1.png');

        game.load.image('background', 'assets/levels/background2.png');
        game.load.image('blackground', 'assets/levels/blackground.png');
	},

	create: function() {
		game.stage.backgroundColor = '#000000';
        background = game.add.tileSprite(0, 0, 1067, 600, 'background');
        background.fixedToCamera = true;

        map = game.add.tilemap('level1');
        map.addTilesetImage('tiles-1');
        layer = [
        	map.createLayer('Background'),	//layer[0]
        	map.createLayer('Solid'),		//layer[1]
        	map.createLayer('Grass1'),		//layer[2]
        	map.createLayer('Grass2')		//layer[3]
        ];
        layer[1].resizeWorld();
        map.setLayer(layer[1]);
        map.setCollisionByExclusion([], true, layer[1]);
	},

    collide: function(object, callback) {
        game.physics.arcade.collide(object, layer[1], callback);
    },

	update: function() {	
	},

    fallThrough: function(isDown) {
        if (isDown) map.setCollision([4, 5, 6, 7, 8, 9, 10, 11, 15, 22], false, layer[1]);
        else map.setCollision([4, 5, 6, 7, 8, 9, 10, 11, 15, 25], true, layer[1]);
    }

	
};