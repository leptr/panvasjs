class Bird {
  constructor() {
    this.position = createVector(50, height / 2);
    this.radius = 20;

    this.acceleration = createVector();
    this.velocity = createVector();
  }

  draw() {
    canvas.noStroke();
    canvas.fill(255, 255, 0);
    canvas.circle(this.position.x, this.position.y, this.radius);
  }

  jump() {
    this.velocity.set(0, -10);
  }

  collide() {
    if (
      this.position.x + this.radius >= pipe.x &&
      this.position.x - this.radius <= pipe.x + pipe.width
    ) {
      if (
        this.position.y - this.radius <= pipe.y ||
        this.position.y + this.radius >= pipe.y + pipe.height
      ) {
        restart();
      }
    }
  }

  update() {
    this.acceleration.add(gravity);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.multiply(0);

    this.collide();

    if (this.position.y + this.radius >= height)
      this.position.y = height - this.radius;
    else if (this.position.y - this.radius <= 0) this.position.y = this.radius;

    if (this.position.x - this.radius === pipe.x + pipe.width) score++;

    this.draw();
  }
}
