Player = function(g) {

	game = g;
	spriteMain = null;
	speed = 250;

};

Player.prototype = {

	preload: function() {
    	game.load.spritesheet('spriteMain', 'assets/sprites/playerMain.png', 62, 62);
	},

	create: function() {
		
		spriteMain = game.add.sprite(10, 10, 'spriteMain');
		game.physics.enable(spriteMain, Phaser.Physics.ARCADE);
		spriteMain.anchor.setTo(.5,.5);
		spriteMain.body.collideWorldBounds = true;
        spriteMain.body.setSize(14, 50, 0, 6);
        this.follow();
	},

	update: function() {
		level.collide(spriteMain);
	},

	moveRight: function() {
        spriteMain.body.velocity.x = speed;
        spriteMain.scale.x = 1;
	},

	moveLeft: function() {
		spriteMain.body.velocity.x = -speed;
        spriteMain.scale.x = -1;
	},

	stopWalking: function() {
		spriteMain.body.velocity.x = 0;
	},

	getX: function() {
		return spriteMain.x;
	},

	getY: function() {
		return spriteMain.y;
	},

	follow: function(){
		//game.camera.follow(spriteMain);
		game.camera.follow(spriteMain,  Phaser.Camera.STYLE_LOCKON)
	},

	jump: function() {
		if (spriteMain.body.onFloor()) {
			spriteMain.body.velocity.y = -350;
		}
	},

	collideBlock: function(object){
		game.physics.arcade.collide(spriteMain, object);
    }, 

	render: function() {
   	        //game.debug.bodyInfo(spriteMain, 16, 24);
    } 
	
};