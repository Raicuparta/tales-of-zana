define(['lib/phaser.min'],function() {
	var _game = null,
	    _background = null,
	    _layer = null,
	    _map = null;

	return{
		init: function(game) {
			_game = game;
		},

		preload: function() {
			_game.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
	        _game.load.image('tiles-1', 'assets/levels/tiles-1.png');

	        _game.load.image('background', 'assets/levels/background2.png');
	        _game.load.image('blackground', 'assets/levels/blackground.png');
		},

		create: function(layer1) {
			_game.stage.backgroundColor = '#000000';
	        _background = _game.add.tileSprite(0, 0, 1067, 600, 'background');
	        _background.fixedToCamera = true;

	        _map = _game.add.tilemap('level1');
	        _map.addTilesetImage('tiles-1');
	        _layer = [_map.createLayer('Background'), _map.createLayer('Solid'), _map.createLayer('Grass1'), _map.createLayer('Grass2')];
	        _layer[1].resizeWorld();
	        _map.setLayer(_layer[1]);
	        _map.setCollisionByExclusion([], true, _layer[1]);
        
		},

		update: function() {

		},

		fallThrough: function(isDown) {
			if (isDown) _map.setCollision([4, 5, 6, 7, 8, 9, 10, 11, 15, 22], false, _layer[1]);
			else _map.setCollision([4, 5, 6, 7, 8, 9, 10, 11, 15, 25], true, _layer[1]);
		},

	    collide: function(object, callback) {
            _game.physics.arcade.collide(object, _layer[1], callback);
	    }

	}

});