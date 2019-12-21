function Bird() {
  this.pos = createVector(width / 10, height / 2);
  this.r = height / 45;

  this.force = createVector(0, 0);
  this.maxForce = height / 65;

  autoUpdate(this);

  this.jump = () => {
    this.force.set(0, -this.maxForce);
  };

  this.applyForce = force => {
    this.force.add(force);
  };

  this.show = () => {
    canvas.fill(240, 240, 0);
    canvas.circle(this.pos.x, this.pos.y, this.r);
  };

  this.update = () => {
    constrain(this.force.y, -this.maxForce, this.maxForce * 2);
    this.pos.add(this.force);
    if (this.pos.y - this.r <= 0) {
      this.pos.y = 1 + this.r;
      this.force.set(0, -1);
    } else if (this.pos.y + this.r >= height) {
      this.pos.y = height - this.r - 1;
      this.force.set(0, 0);
    }
    this.show();
  };
}
