class Paddle {
  constructor(player) {
    this.isPlayer1 = player;

    this.height = 100;
    this.width = 20;

    this.x = this.isPlayer1 ? this.width : width - this.width * 2;
    this.y = (height - this.height) / 2;

    this.moveDir = null;
    this.moveSpeed = 5;

    this.score = 0;
  }

  draw() {
    canvas.noStroke();
    canvas.fill(255);
    canvas.rect(this.x, this.y, this.width, this.height);

    canvas.fill(255, 150);
    canvas.textAlign(CENTER);
    if (this.isPlayer1) canvas.text(this.score, 30, 50, 50, "Arial");
    else canvas.text(this.score, width - 40, 50, 50, "Arial");
  }

  move(dir) {
    this.moveDir = dir;
  }

  update() {
    if (this.moveDir === UP) this.y -= this.moveSpeed;
    else if (this.moveDir === DOWN) this.y += this.moveSpeed;

    if (this.y < 0) this.y = 1;
    else if (this.y + this.height > height) this.y = height - this.height - 1;

    this.draw();
  }
}
