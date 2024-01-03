function setup() {
  // Create the canvas
  canvas = createCanvas(800, 600);
  canvas.background(33, 33, 69);

  // Fireworks array will contain all the fireworks
  fireworks = [];

  // Create a gravity vector that will pull everything downwards
  gravity = createVector(0, 0.2);
}

function update() {
  canvas.noStroke();

  // 5% chance to create a new firework each frame
  if (random() < 0.05) fireworks.push(new Firework());

  // Iterate through all the fireworks and update them
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    // Remove all fireworks that have finished their life cycle
    if (fireworks[i].hasExploded && fireworks[i].particles.length === 0) fireworks.splice(i, 1);
  }
}

// Pre-defined colors for the fireworks
const colors = [
  {
    r: 128,
    g: 0,
    b: 201,
  },
  {
    r: 246,
    g: 148,
    b: 32,
  },
  {
    r: 32,
    g: 246,
    b: 50,
  },
  {
    r: 222,
    g: 33,
    b: 33,
  },
  {
    r: 232,
    g: 16,
    b: 178,
  },
  {
    r: 16,
    g: 232,
    b: 225,
  },
  {
    r: 255,
    g: 217,
    b: 0,
  },
  {
    r: 0,
    g: 255,
    b: 115,
  },
  {
    r: 63,
    g: 47,
    b: 237,
  },
];

// Main Particle class
class Particle {
  constructor(x, y, radius, angle, r, g, b) {
    this.pos = createVector(x, y);
    this.radius = radius;

    // Allow the particle to be created with an angle of movement
    if (!angle) {
      // Give the firework a random upwards velocity
      this.vel = createVector(0, -random(12, 14));
      // If no angle is provided, it means the particle is a parent particle/firework
      this.firework = true;
      this.r = 255;
      this.g = 255;
      this.b = 255;
    } else {
      // If an angle is provided, the particle is a child particle caused by a firework explosion
      this.vel = Vector.fromAngle(angle);
      // Multiply the particle velocity by a random number
      this.vel.multiply(random(3, 10));
      // Being a child particle means this is not a firework
      this.firework = false;
      this.r = r;
      this.g = g;
      this.b = b;
    }

    // Trail array will contain the trail particles
    this.trail = [];
    // Lifespan variable will be used as the alpha for the color to visually represent the particle lifetimg
    this.lifespan = 255;
    this.acc = createVector(0, 0);
  }

  // Draw function draws a circle on the particle position, and on each particle in the trail
  draw() {
    canvas.fill(this.r, this.g, this.b, this.lifespan);
    canvas.circle(this.pos.x, this.pos.y, this.radius);
    for (let circle of this.trail) canvas.circle(circle.x, circle.y, this.radius);
  }

  // Update function handles all physics calculations for the particle and the trail
  update() {
    // Add gravity to the particle
    this.addForce(gravity);

    // Add acceleration to the velocity over time
    this.vel.add(this.acc);
    // Add the velocity to the particle position to make it move
    this.pos.add(this.vel);
    // Reset the acceleration
    this.acc.multiply(0);

    // Push the current position to the trail array
    this.trail.push({
      x: this.pos.x,
      y: this.pos.y,
    });

    // Remove the oldest element from the trail array if there are more than 10 elements
    if (this.trail.length >= 10) this.trail.splice(0, 1);

    // Add air resistance if the self is not a firework
    if (!this.firework) {
      this.vel.multiply(0.97);
      this.lifespan -= 7;
    }

    this.draw();
  }

  // Function to apply a force to the particle, allowing outside factors to manipulate the particle movement and position
  addForce(force) {
    this.acc.add(force);
  }
}

// Main Firework class
class Firework {
  constructor() {
    // Create new particle as the firework
    this.firework = new Particle(random(width), height, 2);
    // The hasExploded variable indicates if the fireworks has exploded or not
    this.hasExploded = false;
    // The particle array will contain all child particles that are created when the firework explodes
    this.particles = [];
  }

  update() {
    // If the firework has not exploded, draw it on the canvas and update its position
    if (!this.hasExploded) {
      this.firework.update();
      // If the firework upward velocity has reached 0, it is at its peak height; make it explode
      if (this.firework.vel.y >= 0) {
        this.hasExploded = true;
        this.explode();
      }
    }

    // Update all of the child particles
    // We are iterating the array backwards because we are removing elements from the array at the sime time
    // If an array is being iterated forwards while elements are being removed from it, it can lead to some elements being skipped
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      // Remove all the child particles whose lifespan has reached 0
      if (this.particles[i].lifespan <= 0) this.particles.splice(i, 1);
    }
  }

  // The explode method handles the firework after it has exploded and spawns in all the child particles
  explode() {
    // Get a random color for the child particles
    let color = random(colors);
    // Go around the current position in a circle and create a child particle every 20 degrees
    for (let i = 1; i < 360; i += 20) {
      let p = new Particle(this.firework.pos.x, this.firework.pos.y, 2, i, color.r, color.g, color.b);
      // Push the new child particle into the particles array
      this.particles.push(p);
    }
  }
}
