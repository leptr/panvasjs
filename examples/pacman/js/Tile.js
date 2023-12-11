function Tile(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 20;
  this.isTile = true;

  this.draw = () => {
    fill(2, 80, 206);
    rectangle(this.x, this.y, this.width, this.height);
  };
}
