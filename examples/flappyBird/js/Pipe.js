function Pipe() {
  this.margin = floor(height / 4);
  this.x = width;
  this.y = randInt(this.margin, height - this.margin * 2);
  this.speed = width / 200;
  this.passed = false;

  this.width = (this.margin / 4) * 3;

  this.show = () => {
    canvas.fill(0, 173, 43);
    canvas.rect(this.x, 0, this.width, this.y);
    canvas.rect(
      this.x,
      this.y + this.margin,
      this.width,
      height - this.margin - this.y
    );
  };

  this.update = () => {
    this.x -= this.speed;
    this.show();
  };
}
