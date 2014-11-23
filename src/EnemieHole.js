EnemieHole = function(game) { 

    this.game = game;
    this.enemieSpike1;
    this.enemieSpike2;
    this.enemieSpike3;
    this.enemieSpike4;
    this.enemieSpike5;
    this.enemieSpike6;
    this.enemieSpike7;

}
EnemieHole.prototype = {
 
    preload: function () {
        this.game.load.image('spike', 'assets/hole.png');
        this.game.load.image('dangerous', 'assets/dangerous.png');
        this.game.load.image('iceHole', 'assets/iceHole.png');
    },

    goSpike: function(){
        this.enemieSpike1 = game.add.sprite(game.rnd.integerInRange(73, 505), 73, 'dangerous')
        this.enemieSpike1.scale.setTo(level.scale-2,level.scale-2);
        this.enemieSpike1.anchor.setTo(0.5, 0.5);
        this.enemieSpike1.alpha = 0;

        this.enemieSpike2 = game.add.sprite(game.rnd.integerInRange(73, 505),145, 'dangerous')
        this.enemieSpike2.scale.setTo(level.scale-2,level.scale-2);
        this.enemieSpike2.anchor.setTo(0.5, 0.5);
        this.enemieSpike2.alpha = 0;

        this.enemieSpike3 = game.add.sprite(game.rnd.integerInRange(73, 505), 218, 'dangerous')
        this.enemieSpike3.scale.setTo(level.scale-2,level.scale-2);
        this.enemieSpike3.anchor.setTo(0.5, 0.5);
        this.enemieSpike3.alpha = 0;

        this.enemieSpike4 = game.add.sprite(game.rnd.integerInRange(73, 505), 291, 'dangerous')
        this.enemieSpike4.scale.setTo(level.scale-2,level.scale-2);
        this.enemieSpike4.anchor.setTo(0.5, 0.5);
        this.enemieSpike4.alpha = 0;

        this.enemieSpike5 = game.add.sprite(game.rnd.integerInRange(73, 505), 364, 'dangerous')
        this.enemieSpike5.scale.setTo(level.scale-2,level.scale-2);
        this.enemieSpike5.anchor.setTo(0.5, 0.5);
        this.enemieSpike5.alpha = 0;

        this.enemieSpike6 = game.add.sprite(game.rnd.integerInRange(73, 505), 437, 'dangerous')
        this.enemieSpike6.scale.setTo(level.scale-2,level.scale-2);
        this.enemieSpike6.anchor.setTo(0.5, 0.5);
        this.enemieSpike6.alpha = 0;

        this.enemieSpike7 = game.add.sprite(game.rnd.integerInRange(73, 505), 505, 'dangerous')
        this.enemieSpike7.scale.setTo(level.scale-2,level.scale-2);
        this.enemieSpike7.anchor.setTo(0.5, 0.5);
        this.enemieSpike7.alpha = 0;
        

        game.add.tween(this.enemieSpike1).to( { alpha: 0.9 }, 3500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.enemieSpike2).to( { alpha: 0.9 }, 3500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.enemieSpike3).to( { alpha: 0.9 }, 3500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.enemieSpike4).to( { alpha: 0.9 }, 3500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.enemieSpike5).to( { alpha: 0.9 }, 3500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.enemieSpike6).to( { alpha: 0.9 }, 3500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.enemieSpike7).to( { alpha: 0.9 }, 3500, Phaser.Easing.Linear.None, true);

        game.time.events.add(Phaser.Timer.SECOND * 1.5, this.spikesGoUp, this);
    },

    spikesGoUp: function(){
        game.physics.arcade.enable([this.enemieSpike1, this.enemieSpike2, this.enemieSpike3, this.enemieSpike4, this.enemieSpike5, this.enemieSpike6, this.enemieSpike7]);
        if(enemies.ice==true){
            enemieHole.enemieSpike1.loadTexture('iceHole')
            enemieHole.enemieSpike2.loadTexture('iceHole')
            enemieHole.enemieSpike3.loadTexture('iceHole')
            enemieHole.enemieSpike4.loadTexture('iceHole')
            enemieHole.enemieSpike5.loadTexture('iceHole')
            enemieHole.enemieSpike6.loadTexture('iceHole')
            enemieHole.enemieSpike7.loadTexture('iceHole')
        }
        else{
            this.enemieSpike1.loadTexture('spike')
            this.enemieSpike2.loadTexture('spike')
            this.enemieSpike3.loadTexture('spike')
            this.enemieSpike4.loadTexture('spike')
            this.enemieSpike5.loadTexture('spike')
            this.enemieSpike6.loadTexture('spike')
            this.enemieSpike7.loadTexture('spike')
        }
    }
};