// Main Bass class
class Ball {
  constructor() {
    this.radius = 10;

    this.set();
  }

  // The set method sets the initial ball position, speed, and direction
  set() {
    this.x = width / 2;
    this.y = height / 2;

    this.speedX = random() > 0.5 ? randInt(-10, -5) : randInt(5, 10);
    this.speedY = random() > 0.5 ? randInt(-10, -5) : randInt(5, 10);
  }

  // The checkCollision method checks if the ball is colliding with the provided paddle
  checkCollision(paddle) {
    // We are using basic circle-rectangle collision detection by checking the edges that the ball is close to
    if (this.y + this.radius >= paddle.y && this.y - this.radius <= paddle.y + paddle.height) {
      if (paddle.isPlayer1 && this.x - this.radius <= paddle.x + paddle.width && this.speedX < 0) this.speedX *= -1;
      else if (!paddle.isPlayer1 && this.x + this.radius >= paddle.x && this.speedX > 0) this.speedX *= -1;
    }
  }

  // The draw method draws the ball on the canvas
  draw() {
    canvas.noStroke();
    canvas.fill(255);
    canvas.circle(this.x, this.y, this.radius);
  }

  // The update method handles all of the ball physics
  update() {
    // Handle ball movement based on Y speed and X speed
    this.x += this.speedX;
    this.y += this.speedY;

    // Handle ball bouncing off the top and bottom edge
    if (this.y - this.radius <= 0 || this.y + this.radius >= height) this.speedY *= -1;

    if (this.x - this.radius <= 0) {
      // If the ball X is below 0, it has hit the left edge and player 2 scores
      player2.score++;
      this.set();
    } else if (this.x + this.radius >= width) {
      // If the ball X is above canvas width, it has hit the right edge and player 1 scores
      player1.score++;
      this.set();
    }

    this.draw();
  }
}
