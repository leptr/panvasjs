function createMaze(r, c, s) {
  cols = c; // number of columns
  rows = r; // number of rows

  size = s;

  stack = [];

  cells = createMatrix(cols, rows);

  for (let x = 0; x < rows; x++)
    for (let y = 0; y < cols; y++) cells[x][y] = new Cell(x, y);

  current = cells[0][0];
  stack.push(current);

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

  let mazeWalls = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = cells[i][j];
      if (cell.sides[0])
        mazeWalls.push(new Wall(cell.X, cell.Y, cell.X + size, cell.Y, true));
      if (cell.sides[1])
        mazeWalls.push(
          new Wall(
            cell.X + size,
            cell.Y - 1,
            cell.X + size,
            cell.Y + size,
            true
          )
        );
      if (cell.sides[2])
        mazeWalls.push(
          new Wall(cell.X + size, cell.Y + size, cell.X, cell.Y + size, true)
        );
      if (cell.sides[3])
        mazeWalls.push(
          new Wall(cell.X, cell.Y + size + 1, cell.X, cell.Y, true)
        );
    }
  }

  return mazeWalls;
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
