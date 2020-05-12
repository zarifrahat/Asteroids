const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');
const Bullet = require('./bullet.js');



function Ship(pos, game){
    this.RADIUS = 10;
    this.COLOR = "red";
    this.vel = [0,0];
    this.pos = pos;
    this.game = game;

    MovingObject.call(this, {
        pos: this.pos, radius: this.RADIUS, color: this.COLOR, vel: this.vel, game: this.game 
    })

}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
}

Ship.prototype.power = function(impulse){
    this.vel = [(this.vel[0] + impulse[0]), (this.vel[1] + impulse[1])]
}

Ship.prototype.fireBullet = function(){
    if (!this.vel.every((el) => el === 0)) {
      const bulletSpeed = [this.vel[0]*2, this.vel[1]*2];
      this.game.add(new Bullet(this.pos, bulletSpeed, this.game));  
    }
}

// Ship.prototype.draw = function(ctx){
//   ctx.beginPath();
//   ctx.moveTo(75, 50);
//   ctx.lineTo(100, 75);
//   ctx.lineTo(100, 25);
//   ctx.fillStyle = "red";
//   ctx.fill();
// };

module.exports = Ship;
