var HUD = function(game) {
  var game = game,
    score = 0,
    scoreText = null;
	
  var create = function() {
		this.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	};

  // Define which variables and methods can be accessed
  return {
    score: score,
    scoreText: scoreText,
    create: create
  }
};