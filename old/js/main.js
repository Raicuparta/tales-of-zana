//vamos passar o Player e o Phaser como dependencias, mas deixar o Phaser sem nome
//para isso, temos que ter o phaser no final da lista, para ser o unico sem nome
require(['module/Player', 'module/Block', 'module/Level', 'lib/phaser.min'],function(Player, Block, Level){
    var game = new Phaser.Game(1067, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render }, false, false);
    var gamePaused = false;

    function preload() {

        Level.init(game);
        Level.preload();

        Player.init(game);
        Player.preload();

        Block.init(game);
        Block.preload();

    }

    function create() {

        //game.stage.smoothed = false;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1000;

        Level.create();
        Player.create();
        Block.create();
        
        

        //TEXT

        text = game.add.text(500, 150, 'Use the arrow keys to move around.', { font: "24pt Fixedsys", fill: "white", align: "center"});
        text.alpha = 0;
        text.anchor.setTo(0.5, 0.5);
        game.add.tween(text).to( { alpha: 1 }, 350, Phaser.Easing.Linear.None, true, 100, false);
        game.add.tween(text).to({y: 100}, 350, Phaser.Easing.Out, true,100, false);

        
    }

    function update() {
        
        if(gamePaused == false){
            Player.update();
            Block.update();
            Level.update();
        }

    }

    function oneLessLife(girl, enemy){
        gamePaused = true;
        black = game.add.tileSprite(0, 0, 1067, 600, 'blackground');
        game.time.events.add(Phaser.Timer.SECOND * 4, fadeBlackground, this);
        black.fixedToCamera = true;
        Player.x = 1000;
        Player.y = 50;
    }

    function fadeBlackground(){
        game.add.tween(black).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        gamePaused = false;
    }

    function render () {
        Player.debug(false);
        //Block.debug();
        //layer1.debug = true;

    }
});