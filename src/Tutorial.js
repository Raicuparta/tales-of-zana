Tutorial = function(g) {

	game = g;

};

Tutorial.prototype = {

	print: function(text, x, y, size) {
		text = game.add.text(x, y, text, { font: "" + size + "pt Fixedsys", fill: "white", align: "center"});
        text.alpha = 0;
        text.anchor.setTo(0.5, 0.5);
        game.add.tween(text).to( { alpha: 1 }, 350, Phaser.Easing.Linear.None, true, 100, false);
        game.add.tween(text).to({y: 100}, 350, Phaser.Easing.Out, true,100, false);
	}
	
};