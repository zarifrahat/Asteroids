const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');


function Bullet(pos, vel, game){
    this.pos = pos;
    this.vel = vel;
    this.RADIUS = 2;
    this.COLOR = "yellow";
    this.game = game;
    this.isWrappable = false;


    MovingObject.call(this, {
        pos: this.pos, radius: this.RADIUS, color: this.COLOR, vel: this.vel, game: this.game
    })
}
Util.inherits(Bullet, MovingObject);

// Bullet.prototype.collideWith = function (otherObject) {
//     if (otherObject instanceof Asteroid) {
//       this.game.remove(otherObject);
//       this.game.remove(this);
//     }
// };



module.exports = Bullet;