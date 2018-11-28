// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
var emitters = [new Emitter(new Vector(800, 530), Vector.fromAngle(-1.5, 1), 10 ,'rgb(0,255,255)'),
   new Emitter(new Vector(900, 530), Vector.fromAngle(-1.5, 1), 10 ,'rgb(255,0,255)'),
   new Emitter(new Vector(1000, 530), Vector.fromAngle(-10, 1), 10 ,'rgb(255,255,0)')
    ];


for (var i =0; i<emitters.length; i++)
{
  emitters[i].setParticlesLifeTime(1);
}

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
  for(var i =0; i < emitters.length; i++)
  {
    emitters[i].addNewParticles();
    emitters[i].plotParticles(canvas.width, canvas.height);
  }

}

function draw() {
  for( var i = 0; i< emitters.length; i++)
  {
    emitters[i].draw(ctx);
  }
}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();
