define(['module/Level'],function(Level) {

    var _game = null,

    _cursors = null,
    _jumpButton = null,

    _spriteMain = null,
    _spriteFlipped = null,
    _spriteExplosion = null,

    _lefts = null,
    _rights = null,
    _left = [],
    _right = [],
    _graphics = [],
    _mirror = null,


    _soundStepGrass = null,
    _soundExplosion = null,

    _partBlood = null,
    _partBrain = null,

    _falling = false,
    _blocked = false,
    _facing = 'left',

    _speed = 250;

    var _finishLand = function() {
        _falling = false;
    }
    var _bloodOnFloor = function(particle) {
        particle.body.velocity = 0;
    }

    return {
        init: function(game) {
            _game = game;
        },

        playSmashDeath: function() {
            _spriteMain.exists = false;
            _spriteExplosion.visible = true;
            if (!_spriteExplosion.animations.getAnimation('spriteExplosion').isFinished)
            {
                if (!_spriteExplosion.animations.getAnimation('spriteExplosion').isPlaying)
                {
                    _spriteExplosion.play('spriteExplosion');
                }

                if (_spriteExplosion.animations.getAnimation('spriteExplosion').frame == 4 && !_soundExplosion.isPlaying)
                {
                    _soundExplosion.play('',0,1,false);
                    _partBlood = _game.add.emitter(_spriteMain.body.x+10, _spriteMain.body.y+25);
                    _partBlood.makeParticles('spriteBlood');
                    _partBlood.minRotation = 0;
                    _partBlood.maxRotation = 0;
                    _partBlood.minParticleSpeed.setTo(-20, -50);
                    _partBlood.maxParticleSpeed.setTo(50, 50);
                    _partBlood.gravity = -900;
                    _partBlood.start(true, 15000, null, 50);
          

                    _partBrain = _game.add.emitter(_spriteMain.body.x+10, _spriteMain.body.y+35);
                    _partBrain.makeParticles('spriteBrain');
                    _partBrain.minRotation = 0;
                    _partBrain.maxRotation = 0;
                    _partBrain.minParticleSpeed.setTo(-50, -50);
                    _partBrain.maxParticleSpeed.setTo(50, 50);
                    _partBrain.gravity = -900;
                    _partBrain.start(true, 15000, null, 10);
      
                    Level.collide(_partBlood, _bloodOnFloor);//NAO FUNCIONA
                    Level.collide(_partBrain, _bloodOnFloor);
                }
            
            }
        },

        preload: function() {
            _game.load.spritesheet('spriteMain', 'assets/sprites/playerMain.png', 62, 62);
            _game.load.spritesheet('spriteExplosion', 'assets/sprites/playerExplosion.png', 62, 62);
            _game.load.image('spriteBlood', 'assets/sprites/partBlood.png');
            _game.load.image('spriteBrain', 'assets/sprites/partBrain.png');
            _game.load.image('invisible', 'assets/sprites/invisible.png');
            _game.load.image('mirror', 'assets/sprites/mirror.png');

            _game.load.audio('soundStepGrass1', 'assets/sound/Player/stepGrass1.ogg');
            _game.load.audio('soundStepGrass2', 'assets/sound/Player/stepGrass2.ogg');
            _game.load.audio('soundStepGrass3', 'assets/sound/Player/stepGrass3.ogg');
            _game.load.audio('soundStepGrass4', 'assets/sound/Player/stepGrass4.ogg');
            _game.load.audio('soundExplosion', 'assets/sound/Player/explosion.ogg');
        },

        create: function(layer1) {
            _solidLayer = layer1;

            

            _spriteMain = _game.add.sprite(1000, 100, 'spriteMain');
            _spriteFlipped = _game.add.sprite(0, 0, 'spriteMain');
            _spriteExplosion = _game.add.sprite(1046, 754, 'spriteExplosion');
            _game.physics.enable(_spriteMain, Phaser.Physics.ARCADE);
            _spriteMain.anchor.setTo(.5,.5);
            _spriteMain.body.collideWorldBounds = true;
            _spriteMain.body.setSize(14, 50, 0, 6);
            _spriteExplosion.visible = false;

            _spriteFlipped.anchor.setTo(.5,.5);
            _spriteFlipped.scale.y = -1;

            _spriteMain.animations.add('walk', [2, 3, 4, 5, 6, 7, 8, 9], 15, false);
            _spriteMain.animations.add('girlfront', [1], 10, false);
            _spriteMain.animations.add('girlfalling', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 15, true);
            _spriteMain.animations.add('girlland', [21, 22, 23, 24, 25, 26, 27], 15, false);
            _spriteMain.animations.add('girlidle', [0], 20, false);
            _spriteMain.animations.add('girljump', [28, 29, 30], 10, false);

            _spriteMain.animations.getAnimation('girlland').onComplete.add(_finishLand);
            _spriteExplosion.animations.add('spriteExplosion', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15, false);

            _spriteExplosion.scale.setTo(-1, 1);

            _game.camera.follow(_spriteMain);

            _cursors = _game.input.keyboard.createCursorKeys();
            _jumpButton = _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            _soundStepGrass = [
                _game.add.audio('soundStepGrass1',1,false),
                _game.add.audio('soundStepGrass2',1,false),
                _game.add.audio('soundStepGrass3',1,false),
                _game.add.audio('soundStepGrass4',1,false)
            ];

            _soundExplosion = _game.add.audio('soundExplosion',1,false);

            _lefts = _game.add.group();
            _rights = _game.add.group();
            Level.getMap().createFromObjects('Points',56,'invisible', 0, true, false, _lefts);
            Level.getMap().createFromObjects('Points',57,'invisible', 0, true, false, _rights);
            //mirror.scale.x = Level.getWidth();
            



            var i = 0;
            _lefts.forEach(function(l) {
                _left[i] = l;
                _graphics[i] = _game.add.graphics(0, 0);
                i++;
            });
            var j = 0;
            _rights.forEach(function(r) {
                _right[j] = r;
                j++;
            });
            _mirror = _game.add.sprite(0, Level.getHeight()/2, 'mirror');
            _mirror.scale.y = Level.getHeight()/2;
            _mirror.scale.x = Level.getWidth();


        },

        update: function() {
            //testing lines:
            /*line.start.set(_spriteMain.body.x, _spriteMain.body.y);
            line.end.set(200, 200);*/

            //testing lines:
            
            for (var i = 0; i < _lefts.length; i++) {
                _graphics[i].clear();
                _graphics[i].beginFill(0x244660);
                _graphics[i].fillAlpha = 0.5;
                //_graphics[i].lineStyle(2, 0x666a75, 0.5);
                _graphics[i].moveTo(_right[i].x, _right[i].y);
                _graphics[i].lineTo(Level.getHeight()*(_spriteMain.body.x - _right[i].x)/(_spriteMain.body.y - _right[i].y) + _spriteMain.body.x, Level.getHeight());
                _graphics[i].lineTo(Level.getHeight()*(_spriteMain.body.x - _left[i].x)/(_spriteMain.body.y - _left[i].y) + _spriteMain.body.x, Level.getHeight());
                _graphics[i].lineTo(_left[i].x, _left[i].y);
                _graphics[i].lineTo(_right[i].x, _right[i].y);
                _graphics[i].endFill();

            }

            Level.collide(_spriteMain);

            Level.fallThrough(_cursors.down.isDown);

            if(_spriteMain.animations.getAnimation('walk').isPlaying && (_spriteMain.animations.getAnimation('walk').frame == 3 || _spriteMain.animations.getAnimation('walk').frame == 7) ) {
                var isPlayingSound = false;
                for (var i = 0; i < 4; i++) {
                    isPlayingSound = isPlayingSound || _soundStepGrass[i].isPlaying;
                }
                if (!isPlayingSound && _spriteMain.body.velocity.x != 0 && _spriteMain.body.velocity.y == 0)
                {
                    _soundStepGrass[Math.round(Math.random()*3)].play('',0,1,false);
                }
            }

            _spriteMain.body.velocity.x = 0;
            if (_cursors.left.isDown) {
                _spriteMain.body.velocity.x = -_speed;
                _spriteMain.scale.x = -1;
                _facing = "left";
            }
            else if (_cursors.right.isDown) {
                _spriteMain.body.velocity.x = _speed;
                _spriteMain.scale.x = 1;
                _facing = "right";
            }

            if(_spriteMain.body.velocity.y > 200) {
                _falling = true;
            }
            

            //ANIMACOES
            if (_spriteMain.body.onFloor()) {
                if (_cursors.up.isDown)
                {
                    _spriteMain.body.velocity.y = -400;
                    _spriteMain.animations.play('girljump');

                }

                else if (_spriteMain.body.velocity.x != 0) {
                    if (_falling) {
                        _spriteMain.animations.play('girlland');
                    }
                    else
                    {
                        _spriteMain.animations.play('walk');
                    }
                }
                else if (_spriteMain.body.velocity.x == 0 && _falling) {
                    _spriteMain.animations.play('girlland');
                }

                else {
                    _spriteMain.animations.play('girlidle');
                }

            }
            else
            {
                if (_spriteMain.body.velocity.y > 0) {
                    //_spriteMain.animations.stop();
                    _spriteMain.animations.play('girlfalling');
                }
            }

            if (_spriteMain.body.blocked.left || _spriteMain.body.blocked.right) {
                _blocked = true;
            }

            if (_blocked) {
                if ((_facing == 'right' && _cursors.right.isDown) || (_facing == 'left' && _cursors.left.isDown) || _cursors.up.isDown ){
                    _blocked = false;
                }
            }

            _spriteFlipped.x = _spriteMain.x;
            _spriteFlipped.y = 48*20 - _spriteMain.y;
            _spriteFlipped.scale.x = _spriteMain.scale.x;
            _spriteFlipped.animations.frame = _spriteMain.animations.currentFrame.index;
        },

        debug: function(info) {
            _game.debug.body(_spriteMain);
            if (info) _game.debug.bodyInfo(_spriteMain, 16, 24);

            _game.debug.geom(line);
            _game.debug.rectangle(line);
        },

        collide: function(object, callback) {
            _game.physics.arcade.collide(object, _spriteMain, callback);
        },

        x: function() {
            return _spriteMain.body.x;
        },
        y: function() {
            return _spriteMain.body.y;
        }



    }

});