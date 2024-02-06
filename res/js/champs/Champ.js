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
}
