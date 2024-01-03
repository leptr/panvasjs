// Main Pipe class
class Pipe {
  constructor() {
    this.x = width;
    // The y position of the pipe is randomly selected between 30% and 70& of the canvas
    this.y = random(height * 0.3, height * 0.7);

    this.width = 80; // The width of the pipe
    this.height = 150; // The height of the pipe is the space between the top and the bottom pipe

    // The speed at which the pipe moves on the screen
    this.speed = 3;
  }

  // The draw method draws the pipe on the canvas
  draw() {
    canvas.noStroke();
    canvas.fill(100, 255, 100);
    // Draw the top of the pipe at the pipe position
    canvas.rect(this.x, 0, this.width, this.y);
    // Draw the bottom of the pipe 150 pixels below the top pipe
    canvas.rect(this.x, this.y + this.height, this.width, height - this.y - this.height);
  }

  // The update method handles the pipe movement
  update() {
    // Move the pipe across the screen
    this.x -= this.speed;

    // If the pipe has moved off screen, reset its position to the start and give it a new height
    if (this.x < -this.width) {
      this.x = width;
      this.y = random(height * 0.3, height * 0.7);
    }

    // Call the draw method to display the pipe on the canvas
    this.draw();
  }
}
