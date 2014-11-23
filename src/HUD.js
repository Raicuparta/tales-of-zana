HUD = function(game) {

    this.game = game;
    this.count = 0;
    this.white = null;
    this.bigBox = null;
    this.playerText = null;
    this.text;
};

HUD.prototype = {

	preload: function() {
		this.game.load.image('white', 'assets/white.png');
		this.game.load.image('bigBox', 'assets/bigBox.png');
		game.load.bitmapFont('font', 'assets/bitmapFonts/carrier_command.png', 'assets/bitmapFonts/carrier_command.xml');
	},

	create: function() {
		
		this.white = this.game.add.sprite(579, 0, 'white');
		this.white.scale.setTo(level.scale,level.scale);
		this.bigBox = this.game.add.sprite(595, 32, 'bigBox');
		this.bigBox.scale.setTo(level.scale,level.scale);

	    this.text = game.add.bitmapText(700, 42, 'font', "0", 60)
	    if(level.bestScore==0){
	    	this.bestScoreText = game.add.bitmapText(592, 540, 'font', "Best Score:0", 15)
		}
		else
			this.bestScoreText = game.add.bitmapText(592, 540, 'font', "Best Score:"+ level.bestScore +"", 15);

	    radSpeak = game.rnd.integerInRange(1, 3);
        if(radSpeak==1)
	    this.playerText = game.add.bitmapText(663, 265, 'font', "there he is!\n\nthe epic box..\n\nwith epic stuf", 10)
		if(radSpeak==2)
		this.playerText = game.add.bitmapText(663, 265, 'font', "Let's Go\n\nb*tch!...\n\njust kidding", 10)
		if(radSpeak==3)
		this.playerText = game.add.bitmapText(663, 265, 'font', "...", 10)
	},

	updateText: function() {
    	this.count++;
    	this.text.setText(""+ this.count +"");
	},

	bestScoreFun: function(){
		if(level.bestScore<this.count){
			level.bestScore=this.count;
			this.bestScoreText.setText("Best Score:"+ this.count +"");
		}
	},

};