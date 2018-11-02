// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

function Vector(x,y){
  this.x = x || 0;
  this.y = y || 0;
}

//add a vector to another
Vector.prototype.add = function(vector){
  this.x += vector.x;
  this.y += vector.y;
}
//gets the length of the vector
Vector.prototype.getMagnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

//gets the angle accounting for the quadrant we're in
Vector.prototype.getAngle = function(){
  return Math.atan2(this.y, this.x);
};

Vector.fromAngle = function(angle, magnitude){
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};
