// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

function Particle(point, velocity, acceleration, color, life){
  this.position = point || new Vector(0,0);
  this.velocity = velocity || new Vector(0,0);
  this.acceleration = acceleration || new Vector(0,0);
  this.color= color;
  this.lifeTime = life * 60;
  this.timer =0;
  this.alive = true;
}

Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);

  this.timer +=1;
  if(this.timer >= this.lifeTime)
  {
    this.alive = false;
    //console.log("die");
  }
}

Particle.prototype.draw = function(ctx){
  ctx.fillStyle = this.color;
  ctx.fillRect(this.position.x, this.position.y, 1,1);
}

Particle.prototype.handleFields= function(fields){
  var accelX=0;
  var accelY=0;

  for(var i = 0; i< fields.length; i++)
  {
    var field = fields[i];

    var vecX = field.position.x - this.position.x;
    var vecY = field.position.y - this.position.y;

    var force = field.mass / Math.pow(vecX * vecX + vecY * vecY, 1.5);
    accelX += vecX * force;
    accelY += vecY * force;
  }
  this.acceleration = new Vector(accelX, accelY);
}
