// Main Paddle class
class Paddle {
  constructor(player) {
    // Determine if the paddle is player 1 or player 2
    this.isPlayer1 = player;

    // Define paddle size
    this.height = 100;
    this.width = 20;

    // Define paddle position based on whether it is player 1 or player 2
    this.x = this.isPlayer1 ? this.width : width - this.width * 2;
    this.y = (height - this.height) / 2;

    // Variables for handling movement
    this.moveDir = null;
    this.moveSpeed = 5;

    // Score per player
    this.score = 0;
  }

  // Draw the paddle
  draw() {
    canvas.noStroke();
    canvas.fill(255);
    canvas.rect(this.x, this.y, this.width, this.height);

    // Display player score
    canvas.fill(255, 150);
    canvas.textAlign(CENTER);
    // Draw the score at the right place depending on whether this is player 1 or player 2
    if (this.isPlayer1) canvas.text(this.score, 30, 50, 50, "Arial");
    else canvas.text(this.score, width - 40, 50, 50, "Arial");
  }

  // Handle switching player movement
  move(dir) {
    this.moveDir = dir;
  }

  // Update method handles player movement
  update() {
    // Move the player up or down based on the moveDir variable
    if (this.moveDir === UP) this.y -= this.moveSpeed;
    else if (this.moveDir === DOWN) this.y += this.moveSpeed;

    // Lock the player position if he is on the edges
    if (this.y < 0) this.y = 1;
    else if (this.y + this.height > height) this.y = height - this.height - 1;

    this.draw();
  }
}
