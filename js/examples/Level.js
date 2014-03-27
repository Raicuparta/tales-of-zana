var Level = function(game) {
	var game = game,
		platforms = null,
		stars = null;
	
	var preload = function() {
		game.load.image('sky', 'assets/sky.png');
  	game.load.image('ground', 'assets/platform.png');
  	game.load.image('star', 'assets/star.png');
	};

	var create = function() {
		// add background for this level
		game.add.sprite(0, 0, 'sky');

		//  The platforms group contains the ground and the 2 ledges we can jump on
  	this.platforms = game.add.group();

  	// Here we create the ground.
    var ground = this.platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
 
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
 
    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // create a group for stars
    this.stars = game.add.group();
 
    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
      //  Create a star inside of the 'stars' group
      var star = this.stars.create(i * 70, 0, 'star');

      //  Let gravity do its thing
      star.body.gravity.y = 6;

      //  This just gives each star a slightly random bounce value
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
	};

	var update = function() {
		game.physics.collide(this.stars, this.platforms);
	};

	// Define which variables and methods can be accessed
	return {
		platforms: platforms,
		stars: stars,
		preload: preload,
		create: create,
		update: update
	}
};