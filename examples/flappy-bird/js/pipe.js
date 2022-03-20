class Pipe {
  constructor() {
    this.x = width;
    this.y = random(height * 0.3, height * 0.7);

    this.width = 80;
    this.height = 150;

    this.speed = 3;
  }

  draw() {
    canvas.noStroke();
    canvas.fill(100, 255, 100);
    canvas.rect(this.x, 0, this.width, this.y);
    canvas.rect(
      this.x,
      this.y + this.height,
      this.width,
      height - this.y - this.height
    );
  }

  update() {
    this.x -= this.speed;

    if (this.x < -this.width) {
      this.x = width;
      this.y = random(height * 0.3, height * 0.7);
    }

    this.draw();
  }
}
