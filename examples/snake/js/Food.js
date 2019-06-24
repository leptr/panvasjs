function Food() {
  this.pos = createVector(randInt(cols), randInt(rows));
  this.pos.multiply(size);

  this.show = () => {
    canvas.noStroke();
    canvas.fill(200, 0, 0);
    canvas.rect(this.pos.x, this.pos.y, size, size);
  };
}
