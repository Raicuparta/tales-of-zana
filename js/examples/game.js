var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player = null;
var level = null;
var hud = null;

function preload()
{
    level = new Level(game);
    level.preload();

    player = new Player(game);
    player.preload();

    hud = new HUD(game);
}

function create()
{
    level.create();
    player.create();
    hud.create();
}

function update() 
{
    level.update();
    player.update();
}
