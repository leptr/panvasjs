function setup() {
  canvas = createCanvas(innerWidth, innerHeight);
  canvas.background(51);

  flakes = [];

  gravity = createVector(0, 0.1);
  wind = Vector.fromAngle(randInt(150, 210));
  wind.divide(17);
}

function update() {
  for (let i = 0; i < 3; i++) flakes.push(new Particle());

  for (let i = flakes.length - 1; i >= 0; i--) {
    flakes[i].update();

    if (flakes[i].pos.y >= height) flakes.splice(i, 1);
    if (flakes[i].pos.x <= 0) flakes.splice(i, 1);
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width * 3), -10);
    this.pos.x -= width;

    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.distance = random(10);

    this.radius = 0;

    this.radius = map(this.distance, 0, 10, 1, 4);
    this.airResistance = map(this.distance, 0, 10, 9, 5);
  }

  draw() {
    canvas.noStroke();
    canvas.fill(255);
    canvas.circle(this.pos.x, this.pos.y, this.radius);
  }

  update() {
    this.acc.add(gravity);
    this.acc.add(wind);
    this.acc.divide(this.airResistance);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.multiply(0);

    this.draw();
  }
}
