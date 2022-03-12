class Camera {
  constructor(x, y) {
    this.pos = createVector(x, y);

    this.fov = 60;
    this.angle = 0;

    this.rotateStep = 3;
    this.rotateDir = null;

    this.moveStep = 3;
    this.moveDir = null;

    this.division = 5;

    this.rays = [];

    for (let i = -(this.fov / 2); i < this.fov / 2; i += 1 / this.division)
      this.rays.push(new Ray(this.pos.x, this.pos.y, i));
  }

  draw() {
    for (let i = 0; i < this.rays.length; i++) {
      let ray = this.rays[i];
      ray.pos = this.pos;
      ray.setAngle(this.angle + i / this.division - this.fov / 2);
      ray.update();
    }
  }

  rotate(dir) {
    this.rotateDir = dir;
  }

  move(dir) {
    this.moveDir = dir;
  }

  setPosition(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  look() {
    for (let i = 0; i < this.rays.length; i++) {
      let ray = this.rays[i];
      let record = Infinity;
      let closestPoint = null;

      for (let wall of walls) {
        let p = ray.cast(wall);
        if (p) {
          let dist = distance(ray.pos.x, ray.pos.y, p.x, p.y);

          dist *= abs(cos(ray.dir.angle(true) - this.angle));

          if (dist <= record) {
            record = dist;
            closestPoint = p;
          }
        }
      }

      scene[i] = record;

      if (closestPoint) {
        canvas.line(this.pos.x, this.pos.y, closestPoint.x, closestPoint.y);
      }
    }
  }

  update() {
    this.look();

    if (this.rotateDir === RIGHT) this.angle -= this.rotateStep;
    else if (this.rotateDir === LEFT) this.angle += this.rotateStep;

    if (this.moveDir === UP) {
      let newA = Vector.fromAngle(this.angle);
      newA.multiply(this.moveStep);
      this.pos.add(newA);
    } else if (this.moveDir === DOWN) {
      let newA = Vector.fromAngle(this.angle);
      newA.multiply(this.moveStep);
      this.pos.subtract(newA);
    } else if (this.moveDir === RIGHT) {
      let newA = Vector.fromAngle(this.angle - 90);
      newA.multiply(this.moveStep);
      this.pos.add(newA);
    } else if (this.moveDir === LEFT) {
      let newA = Vector.fromAngle(this.angle + 90);
      newA.multiply(this.moveStep);
      this.pos.add(newA);
    }

    if (this.pos.x <= 0) this.pos.x = 1;
    else if (this.pos.x >= sceneW) this.pos.x = sceneW - 1;
    if (this.pos.y <= 0) this.pos.y = 1;
    else if (this.pos.y >= sceneH) this.pos.y = sceneH - 1;

    this.draw();
  }
}
