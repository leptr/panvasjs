class Ball {
  constructor() {
    this.radius = 10;

    this.set();
  }

  set() {
    this.x = width / 2;
    this.y = height / 2;

    this.speedX = random() > 0.5 ? randInt(-10, -5) : randInt(5, 10);
    this.speedY = random() > 0.5 ? randInt(-10, -5) : randInt(5, 10);
  }

  checkCollision(paddle) {
    if (
      this.y + this.radius >= paddle.y &&
      this.y - this.radius <= paddle.y + paddle.height
    ) {
      if (
        paddle.isPlayer1 &&
        this.x - this.radius <= paddle.x + paddle.width &&
        this.speedX < 0
      )
        this.speedX *= -1;
      else if (
        !paddle.isPlayer1 &&
        this.x + this.radius >= paddle.x &&
        this.speedX > 0
      )
        this.speedX *= -1;
    }
  }

  draw() {
    canvas.noStroke();
    canvas.fill(255);
    canvas.circle(this.x, this.y, this.radius);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y - this.radius <= 0 || this.y + this.radius >= height)
      this.speedY *= -1;

    if (this.x - this.radius <= 0) {
      player2.score++;
      this.set();
    } else if (this.x + this.radius >= width) {
      player1.score++;
      this.set();
    }

    this.draw();
  }
}
