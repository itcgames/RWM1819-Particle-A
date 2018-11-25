// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
var emitters = [new Emitter(new Vector(850, 630), Vector.fromAngle(-1.5, 1), 0.7,'rgb(0,255,0)'), new Emitter(new Vector(850, 630), Vector.fromAngle(-1.5, 1), 0.7,'rgb(255,0,0)'),
new Emitter(new Vector(850, 630), Vector.fromAngle(-1.5, 1), 0.7, 0.7 ,'rgb(0,0,255)'), new Emitter(new Vector(850, 630), Vector.fromAngle(-1.5, 1), 0.7 ,'rgb(255,255,0)')];
var fields = [new Field(new Vector(850, 470), 900), new Field(new Vector(850,570), -100)];


for (var i =0; i< emitters.length; i++)
{
  emitters[i].setMaxParticles(1000);
  emitters[i].setEmissionRate(5);
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
  for(var i = 0; i< emitters.length; i++)
  {
    emitters[i].addNewParticles();
    emitters[i].plotParticles(canvas.width, canvas.height, fields);
  }



}

function draw() {


  for(var i =0; i< emitters.length; i++)
  {
    emitters[i].draw(ctx);
  }

  for(var i =0; i< fields.length; i++)
  {
    fields[i].draw(ctx);
  }
}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();
