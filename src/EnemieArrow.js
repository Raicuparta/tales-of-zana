EnemieArrow = function(game) { 

    this.game = game;
    this.blockEnemie = null;
    this.emitterFireFront1 = null;
    this.emitterFireFront2 = null;
    this.emitterFireFront3 = null;
    this.emitterFireFront4 = null;
    this.emitterFireFront5 = null;
    this.emitterFireFront6 = null;
    this.emitterFireFront7 = null;
    this.emitterFireFront8 = null;  


}
EnemieArrow.prototype = {
 
    preload: function () {
        this.game.load.image('arrow', 'assets/Arrow.png');
    },
 
    create: function () {

        this.emitterFireFront1 = game.add.emitter(58, 40, 100);
        this.emitterFireFront1.makeParticles('arrow', [0], 100, true, false);

        this.emitterFireFront1.minParticleSpeed.setTo(0, 70);
        this.emitterFireFront1.maxParticleSpeed.setTo(0, 120);
        this.emitterFireFront1.gravity = 0;
        this.emitterFireFront1.angularDrag = 0;
        this.emitterFireFront1.minRotation = 0;
        this.emitterFireFront1.maxRotation = 0;

        this.emitterFireFront2 = game.add.emitter(124, 40, 100);
        this.emitterFireFront2.makeParticles('arrow', [0], 100, true, false);

        this.emitterFireFront2.minParticleSpeed.setTo(0, 70);
        this.emitterFireFront2.maxParticleSpeed.setTo(0, 120);
        this.emitterFireFront2.gravity = 0;
        this.emitterFireFront2.angularDrag = 0;
        this.emitterFireFront2.minRotation = 0;
        this.emitterFireFront2.maxRotation = 0;

        this.emitterFireFront3 = game.add.emitter(190, 40, 100);
        this.emitterFireFront3.makeParticles('arrow', [0], 100, true, false);

        this.emitterFireFront3.minParticleSpeed.setTo(0, 70);
        this.emitterFireFront3.maxParticleSpeed.setTo(0, 120);
        this.emitterFireFront3.gravity = 0;
        this.emitterFireFront3.angularDrag = 0;
        this.emitterFireFront3.minRotation = 0;
        this.emitterFireFront3.maxRotation = 0;

        this.emitterFireFront4 = game.add.emitter(256, 40, 100);
        this.emitterFireFront4.makeParticles('arrow', [0], 100, true, false);

        this.emitterFireFront4.minParticleSpeed.setTo(0, 70);
        this.emitterFireFront4.maxParticleSpeed.setTo(0, 120);
        this.emitterFireFront4.gravity = 0;
        this.emitterFireFront4.angularDrag = 0;
        this.emitterFireFront4.minRotation = 0;
        this.emitterFireFront4.maxRotation = 0;

        this.emitterFireFront5 = game.add.emitter(322, 40, 100);
        this.emitterFireFront5.makeParticles('arrow', [0], 100, true, false);

        this.emitterFireFront5.minParticleSpeed.setTo(0, 70);
        this.emitterFireFront5.maxParticleSpeed.setTo(0, 120);
        this.emitterFireFront5.gravity = 0;
        this.emitterFireFront5.angularDrag = 0;
        this.emitterFireFront5.minRotation = 0;
        this.emitterFireFront5.maxRotation = 0;

        this.emitterFireFront6 = game.add.emitter(388, 40, 100);
        this.emitterFireFront6.makeParticles('arrow', [0], 100, true, false);

        this.emitterFireFront6.minParticleSpeed.setTo(0, 70);
        this.emitterFireFront6.maxParticleSpeed.setTo(0, 120);
        this.emitterFireFront6.gravity = 0;
        this.emitterFireFront6.angularDrag = 0;
        this.emitterFireFront6.minRotation = 0;
        this.emitterFireFront6.maxRotation = 0;

        this.emitterFireFront7 = game.add.emitter(453, 40, 100);
        this.emitterFireFront7.makeParticles('arrow', [0], 100, true, false);

        this.emitterFireFront7.minParticleSpeed.setTo(0, 70);
        this.emitterFireFront7.maxParticleSpeed.setTo(0, 120);
        this.emitterFireFront7.gravity = 0;
        this.emitterFireFront7.angularDrag = 0;
        this.emitterFireFront7.minRotation = 0;
        this.emitterFireFront7.maxRotation = 0;

        this.emitterFireFront8 = game.add.emitter(520, 40, 100);
        this.emitterFireFront8.makeParticles('arrow', [0], 100, true, false);

        this.emitterFireFront8.minParticleSpeed.setTo(0, 70);
        this.emitterFireFront8.maxParticleSpeed.setTo(0, 120);
        this.emitterFireFront8.gravity = 0;
        this.emitterFireFront8.angularDrag = 0;
        this.emitterFireFront8.minRotation = 0;
        this.emitterFireFront8.maxRotation = 0;

        },
};