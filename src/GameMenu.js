GameMenu = function(game) {

    this.game = game;
    this.gameIsOn = false;
    this.menuPlayer = null;
    this.gameCreate = false;
    this.specificBox1 = null;
    this.specificBox2 = null;
 
};

GameMenu.prototype = {
 
    preload: function () {
        this.game.load.image('menuBackground', 'assets/MenuBackgroung.png');
        this.game.load.image('playerSprite', 'assets/Player.png');
        this.game.load.image('box', 'assets/box.png');
    },
 
    create: function () {
    	var background = this.game.add.sprite(0, 0, 'menuBackground');
		background.scale.setTo(level.scale,level.scale);

		this.menuPlayer = game.add.sprite(380.1, 210, 'playerSprite')
		this.menuPlayer.scale.setTo(level.scale-3,level.scale-3);
		this.menuPlayer.anchor.setTo(0.5, 0.5);
		this.menuPlayer.angle = 90;
		game.physics.enable(this.menuPlayer, Phaser.Physics.ARCADE);

		this.specificBox1 = game.add.sprite(171,324.65, 'box');
        this.specificBox1.scale.setTo(level.scale,level.scale);
        this.specificBox1.anchor.setTo(0.5, 0.5);

		this.specificBox2 = game.add.sprite(171,423.8, 'box');
        this.specificBox2.scale.setTo(level.scale,level.scale);
        this.specificBox2.anchor.setTo(0.5, 0.5);
    },

    update: function(){

		    if (game.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown && (this.menuPlayer.y == 324.65 || this.menuPlayer.y == 422.65))
		    {
		       	var tween = game.add.tween(this.menuPlayer).to({ x: 181 }, 1000, Phaser.Easing.Linear.None)
		       	.start();
		        this.menuPlayer.angle = 180;
		    }
		    else if (game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown && this.menuPlayer.x == 380.1)
		    {
		       	var tween = game.add.tween(this.menuPlayer).to({ y: 210 }, 1000, Phaser.Easing.Linear.None)
		       	.start();
		        this.menuPlayer.angle = -90;
		    }
		    else if (game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown)
		    {
                if(this.menuPlayer.y==324.65){
                    var tween = game.add.tween(this.menuPlayer).to({ y: 422.65}, 1000, Phaser.Easing.Linear.None)
                    .start();
                    this.menuPlayer.angle = 90;
                }
                else if(this.menuPlayer.y==210){
    		        var tween = game.add.tween(this.menuPlayer).to({ y: 324.65}, 1000, Phaser.Easing.Linear.None)
    		       	.start();
    		        this.menuPlayer.angle = 90;
                }
		    }

    	if(this.gameCreate==true){
    		this.gameOn = true;
    		level.create();
		    player.create();
			enemies.create();
		    enemieArrow.create();
			box.create(290,100);
		    hud.create();
		    this.gameCreate = false;
		    this.gameIsOn = true;
    	}
    	if(this.gameIsOn == true){
    		player.update();
    		level.update();
    	}

    	if(this.menuPlayer.x==181 && this.menuPlayer.y==324.65 && this.gameIsOn!= true){
    		this.gameCreate=true;
    	}
    	else if(this.menuPlayer.x==181 && this.menuPlayer.y==422.65 && this.gameIsOn!= true){
            window.close();
    	}

    },
};