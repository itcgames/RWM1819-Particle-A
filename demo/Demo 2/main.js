// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// array to hold all our particle objects
var particles = [];

// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
var emitters = [new Emitter(new Vector(850, 630), Vector.fromAngle(-1.5, 1), 0.7,'rgb(0,255,0)'), new Emitter(new Vector(850, 630), Vector.fromAngle(-1.5, 1), 0.7,'rgb(255,0,0)'),
new Emitter(new Vector(850, 630), Vector.fromAngle(-1.5, 1), 0.7, 0.7 ,'rgb(0,0,255)'), new Emitter(new Vector(850, 630), Vector.fromAngle(-1.5, 1), 0.7 ,'rgb(255,255,0)')];
var fields = [new Field(new Vector(850, 470), 900), new Field(new Vector(850,570), -100)];

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
  addNewParticles();
  plotParticles(canvas.width, canvas.height);


}

function draw() {
  for( var i = 0; i< particles.length; i++)
  {
    particles[i].draw(ctx);
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

var maxParticles = 10000;
var emissionRate = 5;


function addNewParticles(){

  // if we're at our max, stop emitting.
  if(particles.length > maxParticles) return;
  // for each emitter
  for(var i=0; i< emitters.length; i++){

    // for [emissionRate], emit a particle
    for(var j=0; j< emissionRate; j++){
      particles.push(emitters[i].emitParticle());
    }
  }
}


function plotParticles(boundsX, boundsY){
  var currentParticles= [];

  for(var i=0; i< particles.length; i++){
    var particle = particles[i];
    var pos = particle.position;

    if(pos.x<0|| pos.x> boundsX || pos.y<0 || pos.y > boundsY) continue;

    particle.handleFields(fields);

    particle.update();

    currentParticles.push(particle);
  }
  particles = currentParticles;
}
