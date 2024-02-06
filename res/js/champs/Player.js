export class Player {
  constructor() {
    this.img = new Image();
    this.path = "./res/img/champs/teemo.png";
    this.img.src = this.path;
    this.ratio = 0.15;
    this.size = {
      width: 250 * this.ratio,
      height: 500 * this.ratio,
    };
    this.position = {
      x: 1280 / 2 - this.size.width / 2,
      y: 500,
    };
    this.velocity = {
      x: 2,
      y: 1,
    };
    this.canShoot = true;
    this.dart = new Dart();
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  update(keys, ctx) {
    this.movement(keys);
    this.attack(keys, ctx);
  }

  movement(keys) {
    if (keys["KeyA"]) {
        // return - na tomto radku se zastavi kod, tim padem se
        // this.position.x -= this.velocity.x; neprovede
        if (this.position.x - this.velocity.x < 400) return;
        this.position.x -= this.velocity.x;
    }
    if (keys["KeyD"]) {
        if (this.position.x + this.velocity.x > 850) return;
        this.position.x += this.velocity.x;
    }
  }

  attack(keys, ctx) {
    if (keys["Space"] && this.canShoot) {
        this.canShoot = false;
        this.dart.x = this.position.x + this.size.width / 2 - 5;
        this.dart.y = this.position.y - 30;
        this.dart.width = 10;
        this.dart.height = 20;
        this.dart.type = 0;
        this.dart.ctx = ctx;
        this.dart.shoot(this);
    }
  }
}

class Dart {

    constructor() {
        this.velocity = 0.005;
    }

    shoot(player) {
        this.y -= this.velocity;
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.y > 0) {
            return this.shoot(player);
        }
        player.canShoot = true;
    }

}