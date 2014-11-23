Level = function(game) {

	this.game = game;
	this.background = null,
	this.layer = null,
	this.map = null;
};

Level.prototype = {

	preload: function() {
    	this.game.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
      	this.game.load.image('tiles-1', 'assets/levels/tiles-1.png');

        this.game.load.image('background', 'assets/levels/background2.png');
        this.game.load.image('blackground', 'assets/levels/blackground.png');
	},

	create: function() {
		this.game.stage.backgroundColor = '#000000';
        this.background = this.game.add.tileSprite(0, 0, 1067, 600, 'background');
        this.background.fixedToCamera = true;

        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tiles-1');
        this.layer = [
        	this.map.createLayer('Background'),	//layer[0]
        	this.map.createLayer('Solid'),		//layer[1]
        	this.map.createLayer('Grass1'),		//layer[2]
        	this.map.createLayer('Grass2')		//layer[3]
        ];
        this.layer[1].resizeWorld();
        this.map.setLayer(this.layer[1]);
        this.map.setCollisionByExclusion([], true, this.layer[1]);
	},

    collide: function(object, callback) {
            game.physics.arcade.collide(object, this.layer[1], callback);
    },

	update: function() {
		
	}
	
};