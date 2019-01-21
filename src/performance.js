const times = [];
let fps;

var totalParticles=0;

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");

function getFrameRate(){
  const now = performance.now();
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  fps = times.length;
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Frames Per Second: " + fps, 50, 50);
}


function countParticles(emitters){
  if(emitters instanceof Array == true)
  {
    for(var i=0; i<emitters.length; i++)
    {
      totalParticles += emitters[i].getAmountOfParticles();
    }
  }
  else {
    totalParticles += emitters.getAmountOfParticles();
  }

  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Amount Of Particles: " + totalParticles, 50, 100);
  totalParticles = 0;
}
