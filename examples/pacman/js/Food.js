function Food(x, y) {
  this.x = x;
  this.y = y;
  this.isTile = false;
  this.isFood = true;
  if (random() > 0.95) {
    this.strengthen = true;
    this.radius = 4;
  } else {
    this.strengthen = false;
    this.radius = 2;
  }
  this.draw = () => {
    fill(255);
    circle(this.x + size / 2, this.y + size / 2, this.radius);
  };
}
