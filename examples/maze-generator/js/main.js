function setup() {
  // Create the canvas
  canvas = createCanvas();
  canvas.background(48);

  size = 20; // Size of a single cell
  cols = 20; // Number of columns
  rows = 20; // Number of rows

  // Set the canvas size to be variable based on the number of columns and rows and their size
  canvas.setSize(rows * size, cols * size);

  framerate(60); // Change to tweak FPS

  // The stack array keeps track of all the cells that have been iterated through
  stack = [];

  // Create all the cells as a new matrix
  cells = createMatrix(cols, rows); // createMatrix function is a PanvasJS method that returns a 2D array with the provided number of columns and rows

  // Go through the matrix and create a new cell at each x and y coordinate
  for (let x = 0; x < rows; x++) for (let y = 0; y < cols; y++) cells[x][y] = new Cell(x, y);

  // Make the current cell the first cell in the matrix
  current = cells[0][0];
  // Push the current cell into the stack
  stack.push(current);
}

function update() {
  // Go through all cells and draw them
  for (let y = 0; y < cols; y++)
    for (let x = 0; x < rows; x++) {
      if (cells[x][y]) cells[x][y].draw();
    }

  // If there are elements in the stack, keep the algorith running
  if (stack.length > 0) {
    // Drawing the orange indicator of the current cell
    canvas.noStroke();
    canvas.fill(246, 148, 32);
    // Draw a rectangle at the position of the current cell to show it on the screen
    canvas.rect(current.X, current.Y, size, size);

    // Mark the current cell as visited
    current.visited = true;
    // Pick the next cell to visit
    next = current.pickNeighbour();

    if (next !== undefined) {
      // If the pickNeighbour method returned a new cell successfully, remove the walls between it and the current cell
      removeWalls(current, next);

      // Push the next cell into the stack
      stack.push(next);
      // Make the next cell the current one
      current = next;
    } else {
      // If the pickNeighbour method did not return a new cell, it means there are unvisited neighbours around the current cell
      // Pop the previous cell from the stack and make it the current one again in order to find unvisited neighbours
      current = stack.pop();
    }
  }
}

// Main Cell class
class Cell {
  constructor(x, y) {
    // The actual X and Y coordinates of the cell on the canvas are calcualted based on their X and Y coordinates inside the matrix and the cell size
    this.X = x * size;
    this.Y = y * size;

    this.x = x;
    this.y = y;

    // The sides array holds the information on the walla of the cell
    // The order of the walls is: top, right, down, left
    // If the value is 1, the wall is still there and was not removed, if the value is 0, the wall was removed
    this.sides = [1, 1, 1, 1];

    // The cell is not visited by default
    this.visited = false;
  }

  // The draw method displays the cell on the canvas
  draw() {
    // We are using lines to draw the cell walls on the canvas
    canvas.stroke(255);
    canvas.lineWidth(1);

    // Go through each side and check the wall state
    // If the wall was not removed, draw a line at its position
    if (this.sides[0]) canvas.line(this.X, this.Y, this.X + size, this.Y);
    if (this.sides[1]) canvas.line(this.X + size, this.Y, this.X + size, this.Y + size);
    if (this.sides[2]) canvas.line(this.X + size, this.Y + size, this.X, this.Y + size);
    if (this.sides[3]) canvas.line(this.X, this.Y + size, this.X, this.Y);
    canvas.noStroke();
  }

  // The pickNeighbour method will return a random unvisited neighbour
  // Neighbouring cells are the 4 cells that are directly bordering this cell at the top, right, bottom, and left sides
  pickNeighbour() {
    // The neighbours array will hold all unvisited neighbours that can be chosen from
    let neighbours = [];

    // Get all 4 neighbouring cells
    // The current cell can happen to be at one of the edges of the matrix
    // In that case, some of the neighbours it is trying to pick are non-existent
    // If the neighbour does not exist, return undefined
    // This part can be altered to support edge wrapping in the matrix
    let top = current.y > 0 ? cells[current.x][current.y - 1] : undefined;
    let right = current.x < rows - 1 ? cells[current.x + 1][current.y] : undefined;
    let bottom = current.y < cols - 1 ? cells[current.x][current.y + 1] : undefined;
    let left = current.x > 0 ? cells[current.x - 1][current.y] : undefined;

    // Check all 4 neighbouring cells
    // If they exist (they are not undefined) and they are not visited, push them into the neighbours array
    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    // Return a random neighbour from the array
    return random(neighbours);
  }
}

// The removeWalls function removes the walls that are between two neighbouring cells
function removeWalls(c, n) {
  // The xdist and ydist variables will be used to determine where the next cell is in relation to the current
  // We find this out by subtracting their x and y coordinates
  // The cells are neighbours, so their position only differs by 1 in either the X or Y direction
  // By subtracting both axes, we can determin if the next cells is above, below, to the right, or to the left of the current cell
  let xdist = c.x - n.x;
  let ydist = c.y - n.y;

  // Based on the position of the next cell relative to the current, remove the walls between them
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

// The keyDown function is called by PanvasJS every time a key is pressed
// If the key is the space button, take a screenshot of the canvas
function keyDown() {
  if (keyCode === KEY.SPACE) canvas.screenshot();
}
