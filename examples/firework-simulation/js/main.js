function setup() {
  canvas = createCanvas(800, 600);
  canvas.background(33, 33, 69);

  fireworks = [];

  gravity = createVector(0, 0.2);
}

function update() {
  canvas.noStroke();

  if (random() < 0.05) fireworks.push(new Firework());

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    if (fireworks[i].hasExploded && fireworks[i].particles.length === 0)
      fireworks.splice(i, 1);
  }
}

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

class Particle {
  constructor(x, y, radius, angle, r, g, b) {
    this.pos = createVector(x, y);
    this.radius = radius;

    if (!angle) {
      this.vel = createVector(0, -random(12, 14));
      this.firework = true;
      this.r = 255;
      this.g = 255;
      this.b = 255;
    } else {
      this.vel = Vector.fromAngle(angle);
      this.vel.multiply(random(3, 10));
      this.firework = false;
      this.r = r;
      this.g = g;
      this.b = b;
    }

    this.trail = [];
    this.lifespan = 255;
    this.acc = createVector(0, 0);
  }

  draw() {
    canvas.fill(this.r, this.g, this.b, this.lifespan);
    canvas.circle(this.pos.x, this.pos.y, this.radius);
    for (let circle of this.trail)
      canvas.circle(circle.x, circle.y, this.radius);
  }

  update() {
    this.addForce(gravity);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.multiply(0);

    this.trail.push({
      x: this.pos.x,
      y: this.pos.y,
    });

    if (this.trail.length >= 10) this.trail.splice(0, 1);

    if (!this.firework) {
      this.vel.multiply(0.97);
      this.lifespan -= 7;
    }

    this.draw();
  }

  addForce(force) {
    this.acc.add(force);
  }
}

class Firework {
  constructor() {
    this.firework = new Particle(random(width), height, 2);
    this.hasExploded = false;
    this.particles = [];
  }

  update() {
    if (!this.hasExploded) {
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.hasExploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].lifespan <= 0) this.particles.splice(i, 1);
    }
  }

  explode() {
    let color = random(colors);
    for (let i = 1; i < 360; i += 20) {
      let p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        2,
        i,
        color.r,
        color.g,
        color.b
      );
      this.particles.push(p);
    }
  }
}
