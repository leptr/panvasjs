// Main Bird class
class Bird {
  constructor() {
    this.position = createVector(50, height / 2);
    this.radius = 20;

    // Create a new vector for acceleration and velocity of the bird
    this.acceleration = createVector();
    this.velocity = createVector();
  }

  // The draw method draws the bird as a circle on the canvas
  draw() {
    canvas.noStroke();
    canvas.fill(255, 255, 0);
    canvas.circle(this.position.x, this.position.y, this.radius);
  }

  // The jump method sets the bird velocity to a powerful upwards vector to make it jump
  jump() {
    this.velocity.set(0, -10);
  }

  // The collide method detects if the bird has collided with the provided pipe
  // Only one pipe can be on the screen at one given time, so we are detecting the collision with the global pipe variable
  collide() {
    if (
      this.position.x + this.radius >= pipe.x &&
      this.position.x - this.radius <= pipe.x + pipe.width
    ) {
      if (
        this.position.y - this.radius <= pipe.y ||
        this.position.y + this.radius >= pipe.y + pipe.height
      ) {
        // Call the global restart function if the bird has collided with a pipe
        restart();
      }
    }
  }

  // The update method handles the bird physics calculations
  update() {
    // Add the global gravity vector to the bird acceleration
    this.acceleration.add(gravity);
    // Add the acceleration to the bird velocity
    this.velocity.add(this.acceleration);
    // Add the velocity to the bird position to make it move/fall
    this.position.add(this.velocity);

    // Reset the acceleration each frame
    this.acceleration.multiply(0);

    // Call the collide method to check for bird collision
    this.collide();

    // Constrain the bird within the canvas height
    if (this.position.y + this.radius >= height)
      this.position.y = height - this.radius;
    else if (this.position.y - this.radius <= 0) this.position.y = this.radius;

    // Check if the bird has successfully passed the pipe and increase the score
    if (this.position.x - this.radius === pipe.x + pipe.width) score++;

    // Call the draw method to display the bird on the canvas
    this.draw();
  }
}
