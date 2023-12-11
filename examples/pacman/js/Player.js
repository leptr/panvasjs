function Player() {
  this.x = 12;
  this.y = 23;
  this.showX = this.x * size;
  this.showY = this.y * size;
  this.nextX = this.showX;
  this.nextY = this.showY;
  this.radius = 10;
  this.dir = "";
  this.timer = 0;
  this.nextTile;
  this.lives = 3;
  this.canEat = false;

  this.reset = () => {
    this.x = 12;
    this.y = 23;
    this.showX = this.x * size;
    this.showY = this.y * size;
    this.nextX = this.showX;
    this.nextY = this.showY;
    this.dir = "";
    this.lives--;
  };

  this.eat = () => {
    this.canEat = true;
    setTimeout(() => {
      this.canEat = false;
    }, 15000);
  };

  this.draw = () => {
    fill(255, 230, 0);
    circle(this.showX + this.radius, this.showY + this.radius, this.radius);
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

  this.update = () => {
    this.draw();
    this.timer++;
    if (field[this.x][this.y].isFood) {
      if (field[this.x][this.y].strengthen) this.eat();
      field[this.x][this.y] = new Blank();
    }
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
    }
    if (this.nextX > this.showX) this.showX++;
    else if (this.nextX < this.showX) this.showX--;
    if (this.nextY > this.showY) this.showY++;
    else if (this.nextY < this.showY) this.showY--;
  };
}
