Enemies = function(game) {
 
    this.game = game;
    this.emitterFireLeft = null;
    this.emitterFireRight = null;
    this.arrowLabel = null;
    this.antLabel = null;
    this.holeLabel = null;
    this.iceLabel = null;
    this.rad;
    this.timedEmmiter = null;
    this.ice = false;
    this.aux = 0;
    this.firstTimeIceAux = true;
    this.openFlor = null;
 
};

Enemies.prototype = {
 
    preload: function () {
        this.game.load.image('ants', 'assets/Ants.png');
        this.game.load.image('antLabel', 'assets/antLabel.png');
        this.game.load.image('arrowLabel', 'assets/arrowLabel.png');
        this.game.load.image('holeLabel', 'assets/holeLabel.png');
        this.game.load.image('iceLabel', 'assets/iceLabel.png');
        this.game.load.image('ice', 'assets/florIce.png')
        this.game.load.audio('antsWalk', "sounds/NFF-bugs.wav")
        this.game.load.audio('fireArrow', "sounds/Bow_Fire_Arrow-Stephan_Schutze-2133929391.wav")
        this.game.load.audio('openFlor', "sounds/NFF-cannon.wav")
        this.game.load.audio('iceFlorsound', "sounds/NFF-wind-gust-3.wav")
    },
 
    create: function () {

        ////////////////enemieAnts////////////////////////////////////

        this.emitterFireLeft = game.add.emitter(-15, 290, 20);
        this.emitterFireLeft.makeParticles('ants', [0], 1000, true, false);

        this.emitterFireLeft.minParticleSpeed.setTo(10, -50);
        this.emitterFireLeft.maxParticleSpeed.setTo(50, 50);
        this.emitterFireLeft.gravity = 0;
        this.emitterFireLeft.angularDrag = 0;
        this.emitterFireLeft.minRotation = 0;
        this.emitterFireLeft.maxRotation = 0;

        this.emitterFireRight = game.add.emitter(595, 290, 20);
        this.emitterFireRight.makeParticles('ants', [0], 1000, true, false);

        this.emitterFireRight.minParticleSpeed.setTo(-10, -50);
        this.emitterFireRight.maxParticleSpeed.setTo(-50, 50);
        this.emitterFireRight.gravity = 0;
        this.emitterFireRight.angularDrag = 0;
        this.emitterFireRight.minRotation = 0;
        this.emitterFireRight.maxRotation = 0;

        this.rad = game.rnd.integerInRange(1, 4);

    },

    choseEnemie: function(){
        if(this.rad==1){
            level.flor.loadTexture('flor');

            if(this.antLabel!=null){
                this.antLabel.destroy();
            }
            if(this.arrowLabel!=null){
                this.arrowLabel.destroy();
            }
            if(this.holeLabel!=null){
                this.holeLabel.destroy();
            }
            if(this.iceLabel!=null){
                this.iceLabel.destroy();
            }
            if(this.timedEmmiter!=null){
                game.time.events.remove(this.timedEmmiter);
            }
            if(enemieHole.enemieSpike1!=null){
                game.time.events.add(Phaser.Timer.SECOND * 6, this.killHole, this);
            }

            fireArrow = game.add.audio('fireArrow');
            fireArrow .play('',0,0.5);

            enemieArrow.emitterFireFront1.start(true, 7000, null, 1, true);
            enemieArrow.emitterFireFront2.start(true, 7000, null, 1, true);
            enemieArrow.emitterFireFront3.start(true, 7000, null, 1, true);
            enemieArrow.emitterFireFront4.start(true, 7000, null, 1, true);
            enemieArrow.emitterFireFront5.start(true, 7000, null, 1, true);
            enemieArrow.emitterFireFront6.start(true, 7000, null, 1, true);
            enemieArrow.emitterFireFront7.start(true, 7000, null, 1, true);
            enemieArrow.emitterFireFront8.start(true, 7000, null, 1, true);

            this.arrowLabel = game.add.sprite(714 , 432, 'arrowLabel')
            this.arrowLabel.anchor.setTo(0.5,0.5);
            this.arrowLabel.scale.setTo(level.scale+3,level.scale+3);

            game.add.tween(this.arrowLabel.scale).to( { x: level.scale, y: level.scale }, 180, Phaser.Easing.Linear.None, true, 0, 0, false);

            if(this.timedEmmiter!=null){
                game.time.events.remove(this.timedEmmiter);
            }

            this.timedEmmiter = game.time.events.loop(Phaser.Timer.SECOND*2, this.emmitArrows, this);

            radSpeak = game.rnd.integerInRange(1, 4);
            if(radSpeak==2)
            hud.playerText.setText("They seem like\n\nice creams\n\n hummm");
            if(radSpeak==4)
            hud.playerText.setText("So warm");
            else
            hud.playerText.setText("")

            this.rad = game.rnd.integerInRange(2, 4);
            return 0;

        }

        else if(this.rad==2){
            level.flor.loadTexture('flor');

            if(this.arrowLabel!=null){
                this.arrowLabel.destroy();
            }
            if(this.antLabel!=null){
                this.antLabel.destroy();
            }
            if(this.holeLabel!=null){
                this.holeLabel.destroy();
            }
            if(this.iceLabel!=null){
                this.iceLabel.destroy();
            }
            if(this.timedEmmiter!=null){
                game.time.events.remove(this.timedEmmiter);
            }
            if(enemieHole.enemieSpike1!=null){
                game.time.events.add(Phaser.Timer.SECOND * 6, this.killHole, this);
            }

            antsWalk = game.add.audio('antsWalk');
            antsWalk.play('',0,0.5);

            this.emitterFireLeft.start(true, 25000, null, 25);
            this.emitterFireRight.start(true, 25000, null, 25);

            this.antLabel = game.add.sprite(710 , 432, 'antLabel')
            this.antLabel.anchor.setTo(0.5,0.5);
            this.antLabel.scale.setTo(level.scale+3,level.scale+3);

            game.add.tween(this.antLabel.scale).to( { x: level.scale, y: level.scale }, 180, Phaser.Easing.Linear.None, true, 0, 0, false);

            if(this.timedEmmiter!=null){
                game.time.events.remove(this.timedEmmiter);
            }

            this.timedEmmiter = game.time.events.loop(Phaser.Timer.SECOND*4, this.emmitAnts, this);


            radSpeak = game.rnd.integerInRange(1, 4);
            if(radSpeak==2)
            hud.playerText.setText("Oh Shit!\n\ni fuc*ing hate\n\nants");
            if (radSpeak==4)
            hud.playerText.setText("Go WAYYYYYYY!\n\n\"Screams like\n\na chick\"");
            else
            hud.playerText.setText("")

            var aux = game.rnd.integerInRange(1, 2);
            if(aux==1){
                this.rad=1;
            }
            if(aux==2){
                this.rad=3;
            }
             return 0;
        }

        else if(this.rad==3){

            if(this.arrowLabel!=null){
                this.arrowLabel.destroy();
            }
            if(this.antLabel!=null){
                this.antLabel.destroy();
            }
            if(this.holeLabel!=null){
                this.holeLabel.destroy();
            }
            if(this.iceLabel!=null && this.ice != true){
                this.iceLabel.destroy();
            }
            if(this.timedEmmiter!=null){
                game.time.events.remove(this.timedEmmiter);
                this.killHole();
            }
            if(this.ice != true){
                this.holeLabel = game.add.sprite(714 , 432, 'holeLabel')
                this.holeLabel.anchor.setTo(0.5,0.5);
                this.holeLabel.scale.setTo(level.scale,level.scale);
            }

            enemieHole.goSpike();
            game.time.events.add(Phaser.Timer.SECOND * 1.5, this.holeSound, this);
            
            this.timedEmmiter = game.time.events.loop(Phaser.Timer.SECOND*6, this.emmitHole, this);

            radSpeak = game.rnd.integerInRange(1, 6);
            if(radSpeak==1)
            hud.playerText.setText("Hum...\n\ncurious holes\n\n..What??");
            if(radSpeak==3)
            hud.playerText.setText("They seem so\n\ndeep");
            if(radSpeak==5)
            hud.playerText.setText("the easiest\n\nones");
            else
            hud.playerText.setText("");

            ////ICE STUFFFFF/////////////////////////////////
            
            if(this.ice == true){
                if(this.firstTimeIceAux == true){
                    this.firstTimeIceAux = false;
                    this.aux = hud.count+1;
                }
                if(hud.count==this.aux){
                    console.log("entrou");
                    this.rad = game.rnd.integerInRange(1, 2);
                    console.log(this.rad);
                    this.ice = false;
                    this.firstTimeIceAux == true;
                    level.flor.loadTexture('flor');
                    this.iceLabel.destroy();
                    this.rad = game.rnd.integerInRange(1, 2);
                    return 0;
                }
                else{
                    this.rad = 3
                    this.firstTimeIceAux == false;
                    return 0;
                }
            }
            else{
                var aux = game.rnd.integerInRange(1, 3);
                if(aux==1){
                    this.rad=1;
                }
                if(aux==2){
                    this.rad=2;
                }
                else{
                    this.rad=4;
                }
                return 0;
            }  

            /////////////////////////////////////////////////

        }
        else if(this.rad==4){
            if(this.arrowLabel!=null){
                this.arrowLabel.destroy();
            }
            if(this.antLabel!=null){
                this.antLabel.destroy();
            }
            if(this.holeLabel!=null){
                this.holeLabel.destroy();
            }
            if(this.iceLabel!=null){
                this.iceLabel.destroy();
            }

            this.iceLabel = game.add.sprite(714 , 432, 'iceLabel')
            this.iceLabel.anchor.setTo(0.5,0.5);
            this.iceLabel.scale.setTo(level.scale,level.scale);

            iceTurn = game.add.audio('iceFlorsound');
            iceTurn.play('',0,0.5);

            this.ice = true;
            level.flor.loadTexture('ice')
            this.rad = 3
            return 0;
        }
    },

    emmitAnts: function(){
            
        this.emitterFireLeft.start(true, 25000, null, 25);
        this.emitterFireRight.start(true, 25000, null, 25);

        antsWalk = game.add.audio('antsWalk');

        antsWalk.play('',0,0.5);
    },

    emmitArrows: function(){
        enemieArrow.emitterFireFront1.start(true, 7000, null, 1, true);
        enemieArrow.emitterFireFront2.start(true, 7000, null, 1, true);
        enemieArrow.emitterFireFront3.start(true, 7000, null, 1, true);
        enemieArrow.emitterFireFront4.start(true, 7000, null, 1, true);
        enemieArrow.emitterFireFront5.start(true, 7000, null, 1, true);
        enemieArrow.emitterFireFront6.start(true, 7000, null, 1, true);
        enemieArrow.emitterFireFront7.start(true, 7000, null, 1, true);
        enemieArrow.emitterFireFront8.start(true, 7000, null, 1, true);

        fireArrow = game.add.audio('fireArrow');
        fireArrow .play('',0,0.5);
    },

    emmitHole: function(){
        if(enemieHole.enemieSpike1!=null){
            enemieHole.enemieSpike1.kill();
            enemieHole.enemieSpike2.kill();
            enemieHole.enemieSpike3.kill();
            enemieHole.enemieSpike4.kill();
            enemieHole.enemieSpike5.kill();
            enemieHole.enemieSpike6.kill();
            enemieHole.enemieSpike7.kill();
        }
        enemieHole.goSpike();
        game.time.events.add(Phaser.Timer.SECOND * 1.5, this.holeSound, this);
    },

    killHole: function(){
        if(enemieHole.enemieSpike1!=null){
            enemieHole.enemieSpike1.kill();
            enemieHole.enemieSpike2.kill();
            enemieHole.enemieSpike3.kill();
            enemieHole.enemieSpike4.kill();
            enemieHole.enemieSpike5.kill();
            enemieHole.enemieSpike6.kill();
            enemieHole.enemieSpike7.kill();
        }
    },

    holeSound: function(){
        this.openFlor = game.add.audio('openFlor');
        this.openFlor.play('',0,0.5);
    },
 
};