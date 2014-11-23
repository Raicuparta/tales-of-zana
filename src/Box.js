Box = function(game) {

    this.game = game;
    this.specificBox = null;


};

Box.prototype = {
 
    preload: function () {
        this.game.load.image('box', 'assets/box.png');
    },
 
    create: function (xc, yc) {

    	this.specificBox = game.add.sprite(xc, yc, 'box');
        this.specificBox.scale.setTo(level.scale,level.scale);
        this.specificBox.anchor.setTo(0.5, 0.5);

        game.physics.arcade.enable(this.specificBox);

        game.add.tween(this.specificBox.scale).to( { x: 1.5, y:1.5 }, 170, Phaser.Easing.Linear.None, true, 0, 0, true);

    },
 
    update: function() {

    },

    CreateRandomBox: function(){
        //n se pode usar o this aqui porque se n ele ia buscar um argumento passado nesta func
    	box.specificBox = game.add.sprite(game.rnd.integerInRange(61, 517), game.rnd.integerInRange(61, 517), 'box');
        box.specificBox.scale.setTo(level.scale,level.scale);
        box.specificBox.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(box.specificBox);
        game.add.tween(box.specificBox.scale).to( { x: 1.5, y:1.5 }, 170, Phaser.Easing.Linear.None, true, 0, 0, true);
	},
 
};