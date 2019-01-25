// Author: Michael Bridgette
// Date: 02/11/2018
// Particle System

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var emitter = new Emitter(new Vector(800, 530), Vector.fromAngle(-1.5, 1), 10 ,'rgb(0,255,255)');
emitter.setParticlesLifeTime(1);

var testCount = 0;
tests();

function tests()
{
  assert(typeof(emitter) === 'object' , 'Not an Emitter object');
  assert(emitter.width === 1 && emitter.height === 1, 'Width and height are not the default values');
  assert(typeof(emitter.getAmountOfParticles()) === "number", 'Not a Number');
  assert(typeof(emitter.emitParticle()) === 'object' , 'Not a Particle object');
  assert(emitter.useTriangle === false && emitter.useCircle === false, 'Not a square (default)');
  assert(emitter.useGravity === false, "Gravity is on");
  assert(emitter.particleLifeTime === 1, "Particle lifetime is not what was set by user");
  assert(emitter.maxParticles === 25000, "Max Particles is not the default value");
  assert(emitter.emissionRate === 5, "Emission Rate is not default value");
  assert(typeof(emitter.position.x) === "number" && typeof(emitter.position.y) === "number", "Coordinates are not numbers");
  assert(emitter.useImg === false, "Emitter is using an image");
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


}

function draw() {

}


function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
    else{
      testCount+= 1;
      console.log("Test ", testCount, " passed");
    }
}

function queue() {
  window.requestAnimationFrame(loop);
}
//tests();
loop();
