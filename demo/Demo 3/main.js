// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var emitter = new Emitter(new Vector(700, 400), Vector.fromAngle(-10, 1), 10);

emitter.setParticlesLifeTime(3);
emitter.useImage("../../images/smiley.png", 15,15);

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
}

function draw() {
    emitter.draw(ctx);
}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();
