const Util = require('./utils.js');
const MovingObject = require("./moving_object.js");
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');


function Asteroid(options) {
  this.COLOR = 'gray';
  this.RADIUS = 20;

    const asteroidOptions = {
        pos: options.pos,
        vel: Util.randomVec(1),
        radius: this.RADIUS,
        color: this.COLOR,
        game: options.game
    }
    MovingObject.call(this, asteroidOptions);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  } else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
}

module.exports = Asteroid;