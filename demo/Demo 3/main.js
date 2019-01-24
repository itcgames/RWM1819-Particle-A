// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var emitter = new Emitter(new Vector(700, 400), Vector.fromAngle(-10, 1), 10);
var emitter2 = new Emitter(new Vector(800, 400),Vector.fromAngle(-10, 1), 10, "rgb(0,255,0)");
var emitter3 = new Emitter(new Vector(900, 400),Vector.fromAngle(-10, 1), 10, "rgb(0,0,255)" );


emitter.setParticlesLifeTime(1);
emitter.useImage("../../images/smiley.png", 15,15);

emitter2.setParticlesLifeTime(1);
emitter2.useACircle();
emitter2.updateSize(15,15);

emitter3.setParticlesLifeTime(1);
emitter3.useATriangle();
emitter3.updateSize(15,15);

function loop() {
  clear();
  update();
  draw();
  queue();
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    emitter.addNewParticles();
    emitter.plotParticles(canvas.width, canvas.height);

    emitter2.addNewParticles();
    emitter2.plotParticles(canvas.width, canvas.height);

    emitter3.addNewParticles();
    emitter3.plotParticles(canvas.width, canvas.height);
}

function draw() {
    emitter.draw(ctx);

    emitter2.draw(ctx);

    emitter3.draw(ctx);
}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();
