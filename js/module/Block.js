define(['module/Player', 'module/Level'],function(Player, Level) {
	var _game = null,
		_sprite = null,

	    _active = false,

	    _soundStepGrass = null

	return{
		init: function(game) {
			_game = game;
		},

		preload: function() {
			_game.load.spritesheet('sprite', 'assets/sprites/block.png', 52, 50);
			_game.load.audio('soundStepGrass', 'assets/sound/Block/stepGrass.ogg');
		},

		create: function(layer1) {
			_solidLayer = layer1;
			_sprite = _game.add.sprite(2170, 640, 'sprite');
	        _game.physics.enable(_sprite, Phaser.Physics.ARCADE);
	        _sprite.body.immovable = true;
	        _sprite.body.setSize(25, 45, 5, 6);
	        _sprite.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 15, true);

	        _soundStepGrass = _game.add.audio('soundStepGrass',1,false);

		},

		update: function() {
			Level.collide(_sprite);
			Player.collide(_sprite);

			if (_active){
                _sprite.body.velocity.x = -80;
                _sprite.animations.play('move');
                
            } else {
                _sprite.body.velocity.x = 0;
                _sprite.animations.stop();
            }

            if(_sprite.body.x <= 1020){
                Player.playSmashDeath();
            }
            if(_sprite.body.x <= 1008){
                if (_sprite.animations.getAnimation('move').frame == 0){
                    _active = false;
                }
            }

            if (Player.x() >= 1600 && Player.y() > 400){
                _active = true;
            }
            
            if (_sprite.animations.getAnimation('move').frame == 0 && !_soundStepGrass.isPlaying && _active) {
                _soundStepGrass.play('',0,1,false);
            }
		},

        debug: function() {
            _game.debug.body(_sprite);
        },

        x: function() {
            return _sprite.body.x;
        },
        y: function() {
            return _sprite.body.y;
        }

	}

});