const Game = require('./game.js');
const keyMaster = require('keymaster');


function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
  this.img = new Image();
  this.img.onload = () => {
    this.ctx.drawImage(this.img, 0, 0);
  };
  this.img.src = "asteroids.jpg";
}

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx, this.img);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function (){
  key("w", (e)=> {
    this.game.ship.power([0,-1]);
    return false;
});

  key("a", (e) => {
    this.game.ship.power([-1,0]);
    return false;
  });

  key("d", (e) => {
    this.game.ship.power([1, 0]);
    return false;
  });

  key("s", (e) => {
    this.game.ship.power([0, 1]);
    return false;
  });

  key("space", (e) => {
    this.game.ship.fireBullet();
    return false;
  });

}

module.exports = GameView;