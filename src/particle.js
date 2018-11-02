// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

function Particle(point, velocity, acceleration){
  this.position = point || new Vector(0,0);
  this.velocity = velocity || new Vector(0,0);
  this.acceleration = acceleration || new Vector(0,0);
}

Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
}

Particle.prototype.draw = function(ctx){
  ctx.fillStyle = 'rgb(255,0,255)';

  ctx.fillRect(this.position.x, this.position.y, 1,1);
}
