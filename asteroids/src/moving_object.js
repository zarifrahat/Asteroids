function MovingObject(options){
    
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
}

MovingObject.prototype.draw = function(ctx){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, (2* Math.PI))
  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos = [(this.pos[0] + this.vel[0]), (this.pos[1] + this.vel[1])];
  if (this.game.isOutOfBounds(this.pos) && !this.isWrappable){
    this.game.remove(this);
  } else {
    this.pos = this.game.wrap(this.pos);
  }
};

MovingObject.prototype.isCollidedWith = function(otherObject){
  const distance = Math.sqrt((this.pos[0] - otherObject.pos[0])**2 + (this.pos[1] - otherObject.pos[1])**2 );
  const radiiSum = this.radius + otherObject.radius;
  return (distance < radiiSum);
};



MovingObject.prototype.collideWith = function (otherObject) {
};

MovingObject.prototype.isWrappable = true;

module.exports = MovingObject; 