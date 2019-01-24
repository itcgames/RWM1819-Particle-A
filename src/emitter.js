// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

function Emitter(point, velocity, spread, color){
  this.position = point;
  this.velocity = velocity;
  this.spread = spread || Math.PI / 32;
  this.drawColor = "#999";
  this.color = color;

  this.particles = [];
  this.maxParticles = 25000;
  this.emissionRate = 5;

  this.particleLifeTime = 5;

  this.useImg = false;
  this.imageSrc = "";
  this.imageWidth;
  this.imageHeight;

  this.useGravity = false;

  this.useCircle = false;
  this.width=1;
  this.height=1;
  this.useTriangle = false;


  this.emitterLifeTime=0;
}
Emitter.prototype.useATriangle = function()
{
  this.useTriangle = true;
  this.useCircle = false;
}
Emitter.prototype.useACircle = function()
{
  this.useCircle = true;
  this.useTriangle = false;
}
Emitter.prototype.updateSize = function(width, height)
{
  this.width =  width;
  this.height = height;
}
Emitter.prototype.getAmountOfParticles = function()
{
  return this.particles.length;
}

Emitter.prototype.applyGravity= function()
{
  this.useGravity = true;
}

Emitter.prototype.useImage = function(src, width, height){
  this.useImg = true;
  this.useTriangle = false;
  this.useCircle = false;
  this.imageSrc = src;
  this.imageWidth= width;
  this.imageHeight= height;
}

Emitter.prototype.setParticlesLifeTime = function(num){
  this.particleLifeTime = num;
}

Emitter.prototype.setMaxParticles = function(num){
  this.maxParticles = num;
  //console.log("Max Particles: ",this.maxParticles);
}
Emitter.prototype.setEmissionRate = function(num){
  this.emissionRate = num;
  //console.log("Emission Rate: ",this.emissionRate);
}


//emit particle from the emitter.
Emitter.prototype.emitParticle = function(){

  var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);

  var magnitude = this.velocity.getMagnitude();

  var position = new Vector(this.position.x, this.position.y);

  var velocity = Vector.fromAngle(angle, magnitude);

  var ttl = Math.max(this.particleLifeTime * (Math.random() * 2) - 1, 0);

if(this.useImg == false)
{
  var part = new Particle(position, velocity,new Vector(0,0),this.color, ttl);
  if(this.useCircle === true)
  {
    part.useACircle();
    part.updateSize(this.width, this.height);
    return part;
  }
  else if(this.useTriangle === true){
    part.useATriangle();
    part.updateSize(this.width, this.height);
    return part;
  }
  else if (this.useCircle === false && this.useTriangle === false) {
    part.updateSize(this.width, this.height);
    return part;
  }
}
else if(this.useImg === true) {
  var part = new Particle(position, velocity,new Vector(0,0),this.color, ttl);
  part.useImage(this.imageSrc, this.imageWidth, this.imageHeight);
  return part;
}

}

Emitter.prototype.setPos = function(x,y){
  this.position.x = x;
  this.position.y = y;
}

Emitter.prototype.addNewParticles = function(){
  this.emitterLifeTime +=1;
  // if we're at our max, stop emitting.
  if(this.particles.length > this.maxParticles) return;

  for(var j=0; j< this.emissionRate; j++){
    this.particles.push(this.emitParticle());
  }
}

Emitter.prototype.plotParticles = function(boundsX, boundsY, fields){
  var currentParticles= [];

  for(var i=0; i< this.particles.length; i++){
    var particle = this.particles[i];
    var pos = particle.position;
    var alive = particle.alive;

    if(pos.x<0|| pos.x> boundsX || pos.y<0 || pos.y > boundsY) continue;

    if(alive == false) continue;

    if(fields != undefined)
    {
      particle.handleFields(fields);
    }

    if(this.useGravity == true)
    {
      particle.applyGravity();
    }

    particle.update();

    currentParticles.push(particle);
  }
  this.particles = currentParticles;
}
Emitter.prototype.draw = function(ctx)
{
  for( var i = 0; i< this.particles.length; i++)
  {
    this.particles[i].draw(ctx);
  }
}
