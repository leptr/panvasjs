function setup() {
  // Create the canvas
  canvas = createCanvas(innerWidth, innerHeight);
  canvas.background(51);

  // The flakes array will hold all of the snowflake paritcles
  flakes = [];

  // The global gravity vector is a downward facing vector that is used for simulating gravity
  gravity = createVector(0, 0.1);
  // Create the wind vector that is going in a random angle
  wind = Vector.fromAngle(randInt(150, 210));
  // Make the wind a significantly weaker force, so it does not move the snowflakes too much
  wind.divide(17);
}

function update() {
  // Add 3 new snowflakes to the array each frame
  for (let i = 0; i < 3; i++) flakes.push(new Particle());

  // Iterate through all of the snowflakes and update them
  // We are iterating the array backwards because we are removing elements from the array at the sime time
  // If an array is being iterated forwards while elements are being removed from it, it can lead to some elements being skipped
  for (let i = flakes.length - 1; i >= 0; i--) {
    flakes[i].update();

    // If the snowflake is moved off screen, remove it from the array
    if (flakes[i].pos.y >= height) flakes.splice(i, 1);
    if (flakes[i].pos.x <= 0) flakes.splice(i, 1);
  }
}

// Main Particle class
class Particle {
  constructor() {
    // A particle is defined by its position and distance
    this.pos = createVector(random(width * 3), -10);
    this.pos.x -= width;

    // Create the velocity and acceleration vectors
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    // Instead of having a set radius, the snowflakes have a distance from the viewer
    this.distance = random(10);

    this.radius = 0;

    // We are calculating the radius based on the random distance
    // This will make the particles look smaller the further away they are
    this.radius = map(this.distance, 0, 10, 1, 4);
    // We are calculating the air resistance based on the random distance
    // This will create a parallax effect where the snowflakes that are further away appear to fall slower due to the air resistance
    this.airResistance = map(this.distance, 0, 10, 9, 5);
  }

  // The draw method draws the snowflake on the screen
  draw() {
    canvas.noStroke();
    canvas.fill(255);
    canvas.circle(this.pos.x, this.pos.y, this.radius);
  }

  // The update method handles the snowflake physics
  update() {
    // Add gravity and wind to the particle acceleration
    this.acc.add(gravity);
    this.acc.add(wind);
    // Divide the acceleration by the air resistance to make it move slower
    this.acc.divide(this.airResistance);

    // Add the acceleration to the velocity
    this.vel.add(this.acc);
    // Add the velocity to the position to make it move
    this.pos.add(this.vel);
    // Reset the acceleration each frame
    this.acc.multiply(0);

    this.draw();
  }
}
