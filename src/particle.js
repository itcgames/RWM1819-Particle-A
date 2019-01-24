// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

function Particle(point, velocity, acceleration, color, life, shape){
  this.position = point || new Vector(0,0);
  this.velocity = velocity || new Vector(0,0);
  this.acceleration = acceleration || new Vector(0,0);
  this.color= color;
  this.lifeTime = life * 60;
  this.timer = 0;
  this.alive = true;



  this.useImg = false;
  this.imgSrc ="";
  this.img;
  this.imgWidth;
  this.imgHeight;

  this.gravity = 0.05;
  this.gravitySpeed = 0;

  this.useCircle = false;
  this.width = 1;
  this.height = 1;

  this.useTriangle = false;
}

Particle.prototype.updateSize = function(width, height)
{
  this.width = width;
  this.height = height;
}

Particle.prototype.useACircle = function()
{
  this.useCircle = true;
  this.useTriangle = false;
}
Particle.prototype.useATriangle = function ()
{
  this.useTriangle = true;
  this.useCircle = false;
};

Particle.prototype.useImage = function (src, width, height) {
  this.useImg = true;
  this.imgSrc= src;

  this.img = new Image();
  this.img.src = this.imgSrc;

  this.imgWidth = width;
  this.imgHeight = height;
};



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
  if(this.useImg == false)
  {
    if(this.useTriangle === true)
    {
      ctx.beginPath();
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(this.position.x + this.width, this.position.y + (-this.height));
      ctx.lineTo(this.position.x + this.width * 2, this.position.y);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    else if(this.useCircle !== true && this.useTriangle !== true && this.useImg !== true) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    else if(this.useCircle === true){
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.width, 0, 2 * Math.PI);
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }
  else if(this.useImg === true)
  {
    ctx.save();
    ctx.drawImage(this.img, this.position.x - (this.imgWidth/2), this.position.y - (this.imgHeight/2), this.imgWidth, this.imgHeight);
    ctx.restore();
  }

}

Particle.prototype.applyGravity = function(){
  this.gravitySpeed += this.gravity;
  this.position.y += this.gravitySpeed;
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
