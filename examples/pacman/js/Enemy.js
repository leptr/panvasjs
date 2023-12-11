function Enemy() {
  this.x = 12;
  this.y = 12;
  this.showX = this.x * size;
  this.showY = this.y * size;
  this.nextX = this.showX;
  this.nextY = this.showY;
  this.radius = 10;
  this.dir = "up";
  this.timer = 0;
  this.nextTile;
  this.colors = [
    [255, 0, 0],
    [255, 100, 0],
    [10, 220, 0],
    [0, 15, 225],
  ];
  this.colorIndex = floor(random(this.colors.length));
  this.color = this.colors[this.colorIndex];

  this.reset = () => {
    this.x = 12;
    this.y = 12;
    this.showX = this.x * size;
    this.showY = this.y * size;
    this.nextX = this.showX;
    this.nextY = this.showY;
    this.dir = "up";
  };

  this.draw = () => {
    fill(this.color[0], this.color[1], this.color[2]);
    circle(this.showX + this.radius, this.showY + this.radius, this.radius);
    rectangle(this.showX, this.showY + size / 2, size, size / 2);
  };

  this.move = (direction) => {
    switch (direction) {
      case "up":
        this.nextTile = field[this.x][this.y - 1];
        break;
      case "down":
        this.nextTile = field[this.x][this.y + 1];
        break;
      case "left":
        this.nextTile = field[this.x - 1][this.y];
        break;
      case "right":
        this.nextTile = field[this.x + 1][this.y];
        break;
    }
    if (!this.nextTile.isTile) this.dir = direction;
  };

  this.getOptions = () => {
    this.options = [];
    if (!field[this.x][this.y - 1].isTile) this.options.push("up");
    if (!field[this.x][this.y + 1].isTile && !field[this.x][this.y + 1].isSlab) this.options.push("down");
    if (!field[this.x - 1][this.y].isTile) this.options.push("left");
    if (!field[this.x + 1][this.y].isTile) this.options.push("right");
  };

  this.chooseSide = () => {
    let option = floor(random(this.options.length));
    if (this.options.length == 1) this.move(this.options[0]);
    else this.move(this.options[option]);
  };

  this.update = () => {
    this.draw();
    this.timer++;
    this.getOptions();
    if (this.timer == size) {
      switch (this.dir) {
        case "up":
          this.nextTile = field[this.x][this.y - 1];
          if (!this.nextTile.isTile) {
            this.y -= 1;
            this.nextY -= size;
          }
          break;
        case "down":
          this.nextTile = field[this.x][this.y + 1];
          if (!this.nextTile.isTile && !this.nextTile.isSlab) {
            this.y += 1;
            this.nextY += size;
          }
          break;
        case "left":
          this.nextTile = field[this.x - 1][this.y];
          if (!this.nextTile.isTile) {
            this.x -= 1;
            this.nextX -= size;
          }
          break;
        case "right":
          this.nextTile = field[this.x + 1][this.y];
          if (!this.nextTile.isTile) {
            this.x += 1;
            this.nextX += size;
          }
          break;
      }
      this.timer = 0;
      if (this.nextTile.isTile || (this.nextTile.isSlab && this.dir != "up") || this.options.length == 3) this.chooseSide();
    }
    if (this.nextX > this.showX) this.showX++;
    else if (this.nextX < this.showX) this.showX--;
    if (this.nextY > this.showY) this.showY++;
    else if (this.nextY < this.showY) this.showY--;
  };
}
