export class Champ {
  constructor(name, hp, dmg, mana, type) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.img = new Image();
    this.setType(type);
    this.img.src = this.path;
    this.ratio = 0.2;
    this.size = {
      width: 500 * this.ratio,
      height: 500 * this.ratio,
    };
    this.position = {
      x: 600,
      y: 10,
    };
    this.velocity = {
      x: 1,
      y: 1,
    };
  }

  update() {
    this.move();
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.x >= 750) {
      this.velocity.x *= -1;
      this.velocity.y = -1;
      this.position.y = 99;
    }
    if (this.position.x <= 450) {
      this.velocity.x *= -1;
      this.velocity.y = -1;
      this.position.y = 99;
    }
    if (this.position.y <= 10) {
      this.velocity.y = 0;
    }
    if (this.position.x >= 595 && this.position.x <= 605 && this.position.y === 10) {
      this.velocity.y = 1;
    }
    if (this.position.y >= 100) {
      this.velocity.y = 0;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    ctx.save(); //ulozi soucasny stav stetce
    ctx.fillStyle = "red";
    ctx.fillRect(
      (this.position.x) - 15,
      this.position.y - 20,
      this.hp,
      20
    );
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.strokeRect(
      (this.position.x) - 15,
      this.position.y - 20,
      100,
      20
    );
    ctx.restore();
  }

  attack() {
    console.log(`${this.name} is attacking!`);
  }

  setType(type) {
    const paths = [
      "./res/img/champs/caitlyn.png",
      "./res/img/champs/ezreal.png",
      "./res/img/champs/jinx.png",
      "./res/img/champs/vayne.png",
    ];
    this.path = paths[type];
  }

  static detectHit(dart, champ) {
    if (
      dart.x < champ.position.x + champ.size.width &&
      dart.x + dart.width > champ.position.x &&
      dart.y < champ.position.y + champ.size.height &&
      dart.y + dart.height > champ.position.y
    ) {
      dart.hit = true;
      champ.hp -= dart.dmg;
      dart.x = -50;
      if (champ.hp <= 0) {
        champ.position.x = 2000;
      }
    }
  }
}