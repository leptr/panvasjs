function setup() {
  canvas = createCanvas();
  canvas.background(48);

  size = 20; // size of a single cell
  cols = 20; // number of columns
  rows = 20; // number of rows

  canvas.setSize(rows * size, cols * size);

  showGeneration = false; // if true, generation is animated; if false, generation is done before the page loads
  framerate(60); // change to tweak FPS

  stack = [];

  cells = createMatrix(cols, rows);

  for (let x = 0; x < rows; x++)
    for (let y = 0; y < cols; y++) cells[x][y] = new Cell(x, y);

  current = cells[0][0];
  stack.push(current);

  if (showGeneration === false) {
    while (stack.length > 0) {
      current.visited = true;
      next = current.pickNeighbour();

      if (next !== undefined) {
        removeWalls(current, next);

        stack.push(next);
        current = next;
      } else {
        current = stack.pop();
      }
    }
  }
}

function update() {
  for (let y = 0; y < cols; y++)
    for (let x = 0; x < rows; x++) {
      if (cells[x][y]) cells[x][y].draw();
    }

  if (showGeneration && stack.length > 0) {
    // drawing the orange indicator of the current cell
    canvas.noStroke();
    canvas.fill(246, 148, 32);
    canvas.rect(current.X, current.Y, size, size);

    current.visited = true;
    next = current.pickNeighbour();

    if (next !== undefined) {
      removeWalls(current, next);

      stack.push(next);
      current = next;
    } else {
      current = stack.pop();
    }
  }
}

class Cell {
  constructor(x, y) {
    this.X = x * size;
    this.Y = y * size;

    this.x = x;
    this.y = y;

    this.sides = [1, 1, 1, 1];

    this.visited = false;
  }

  draw() {
    canvas.stroke(255);
    canvas.lineWidth(1);

    if (this.sides[0]) canvas.line(this.X, this.Y, this.X + size, this.Y);
    if (this.sides[1])
      canvas.line(this.X + size, this.Y, this.X + size, this.Y + size);
    if (this.sides[2])
      canvas.line(this.X + size, this.Y + size, this.X, this.Y + size);
    if (this.sides[3]) canvas.line(this.X, this.Y + size, this.X, this.Y);
    canvas.noStroke();
  }

  pickNeighbour() {
    let neighbours = [];

    let top = current.y > 0 ? cells[current.x][current.y - 1] : undefined;
    let right =
      current.x < rows - 1 ? cells[current.x + 1][current.y] : undefined;
    let bottom =
      current.y < cols - 1 ? cells[current.x][current.y + 1] : undefined;
    let left = current.x > 0 ? cells[current.x - 1][current.y] : undefined;

    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    return random(neighbours);
  }
}

function removeWalls(c, n) {
  let xdist = c.x - n.x;
  let ydist = c.y - n.y;

  if (xdist === 1) {
    c.sides[3] = 0;
    n.sides[1] = 0;
  } else if (xdist === -1) {
    c.sides[1] = 0;
    n.sides[3] = 0;
  }

  if (ydist === 1) {
    c.sides[0] = 0;
    n.sides[2] = 0;
  } else if (ydist === -1) {
    c.sides[2] = 0;
    n.sides[0] = 0;
  }
}

function keyDown() {
  if (keyCode === KEY.SPACE) canvas.screenshot();
  else if (keyCode === KEY.ENTER) set();
}
