// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

function Emitter(point, velocity, spread){
  this.position = point;
  this.velocity = velocity;
  this.spread = spread || Math.PI / 32;
  this.drawColor = "#999";
}

//emit particle from the emitter.
Emitter.prototype.emitParticle = function(){
  var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);

  var magnitude = this.velocity.getMagnitude();

  var position = new Vector(this.position.x, this.position.y);

  var velocity = Vector.fromAngle(angle, magnitude);

  return new Particle(position, velocity);
}
