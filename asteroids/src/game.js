const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');


function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 600;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this.randomPosition(), this);
  this.bullets = [];
}

Game.prototype.randomPosition = function () {
  const pos = [];
  pos.push(Math.floor(Math.random() * this.DIM_X));
  pos.push(Math.floor(Math.random() * this.DIM_Y));
  return pos;
};

Game.prototype.addAsteroids = function() {
  while (this.asteroids.length < this.NUM_ASTEROIDS) {
    const options = { pos: this.randomPosition(), game: this };
    this.add(new Asteroid(options));
  }
};

Game.prototype.draw = function (ctx, img) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, 1000, 600);
  ctx.drawImage(img, 0, 0);
  this.allObjects().forEach((object) => object.draw(ctx));
};

Game.prototype.moveObjects = function () {
    this.allObjects().forEach((object) => object.move());
};

Game.prototype.wrap = function(pos){
    let [x,y] = pos;
    if (x > 1000){
        x = 0;
    }
    if (y > 600) {
        y = 0;
    }
    if (x < 0){
        x = 1000;
    }
    if (y < 0) {
        y = 600;
    }
    return [x,y];
};

Game.prototype.checkCollisions = function () {
  const objs = this.allObjects();
  for (let idx1 = 0; idx1 < objs.length - 1; idx1++) {
    for (let idx2 = idx1 + 1; idx2 < objs.length; idx2++) {
      if (objs[idx1].isCollidedWith(objs[idx2])) {
        objs[idx1].collideWith(objs[idx2]);
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};


Game.prototype.allObjects = function(){
    return this.asteroids.concat(this.ship, this.bullets);
}

Game.prototype.add = function(obj){
  if (obj instanceof Asteroid){
    this.asteroids.push(obj);
  } else if (obj instanceof Bullet){
    this.bullets.push(obj);
  }
}

Game.prototype.remove = function(obj){
  if (obj instanceof Asteroid) {
    const idx = this.asteroids.indexOf(obj);
    this.asteroids.splice(idx, 1);
    const options = { pos: this.randomPosition(), game: this };
    this.add(new Asteroid(options));
  } else if (obj instanceof Bullet) {
      const idx = this.bullets.indexOf(obj);
      this.bullets.splice(idx, 1);
  }
}

Game.prototype.isOutOfBounds = function(pos){
  let [x,y] = pos;
  return ((x > this.DIM_X || y > this.DIM_Y) || (x < 0 || y < 0));
}

module.exports = Game;
