function Slab(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 8;
  this.isTile = false;
  this.isSlab = true;

  this.draw = () => {
    fill(211);
    rectangle(this.x, this.y, this.width, this.height);
  };
}
