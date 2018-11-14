
function Field(position, mass) {
  this.position = position;
  this.setMass(mass);
};

Field.prototype.setMass = function(mass) {
  this.mass = mass || 100;
  this.drawColor = mass < 0 ? "#f00" : "#0f0";
}
Field.prototype.draw= function(ctx) {
  ctx.fillStyle = this.drawColor;
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}
