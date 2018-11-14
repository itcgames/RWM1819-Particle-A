// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

function Emitter(point, velocity, spread, color){
  this.position = point;
  this.velocity = velocity;
  this.spread = spread || Math.PI / 32;
  this.drawColor = "#999";
  this.color = color;
}

//emit particle from the emitter.
Emitter.prototype.emitParticle = function(){
  var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);

  var magnitude = this.velocity.getMagnitude();

  var position = new Vector(this.position.x, this.position.y);

  var velocity = Vector.fromAngle(angle, magnitude);

  return new Particle(position, velocity,new Vector(0,0),this.color);
}

Emitter.prototype.setPos = function(x,y){
  this.position.x = x;
   this.position.y = y;
}
