// Main camera class

class Camera {
  constructor(x, y) {
    // The camera is defined by its position, field of view, and angle offset
    this.pos = createVector(x, y);

    this.fov = 60;
    this.angle = 0;

    // The rotateStep and rotateDir variables control the rotation of the camera by the user
    this.rotateStep = 3;
    this.rotateDir = null;

    // The moveStep and moveDir variables control the movement of the camera by the user
    this.moveStep = 3;
    this.moveDir = null;

    // The division value is the angle offset between two adjacent rays cast by the camera
    this.division = 5;

    // The rays array holds all of the rays cast by the camera
    this.rays = [];

    // Creat all of the rays that originate from teh camera with above defined parameters
    for (let i = -(this.fov / 2); i < this.fov / 2; i += 1 / this.division)
      this.rays.push(new Ray(this.pos.x, this.pos.y, i));
  }

  // The draw method draws all of the rays from the camera to display them on the canvas
  draw() {
    for (let i = 0; i < this.rays.length; i++) {
      let ray = this.rays[i];
      ray.pos = this.pos;
      ray.setAngle(this.angle + i / this.division - this.fov / 2);
      ray.update();
    }
  }

  // The rotate method allows the user to rotate the camera
  rotate(dir) {
    this.rotateDir = dir;
  }

  // The move method allows the user to move the camera
  move(dir) {
    this.moveDir = dir;
  }

  // The setPosition method allows the user to change the position of the camera to the given point on the canvas
  setPosition(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  // The look method casts all the rays and finds if they are colliding with any of the walls
  look() {
    for (let i = 0; i < this.rays.length; i++) {
      let ray = this.rays[i];
      // The record variable holds the shortest distance between the ray start and a wall it collides with
      let record = Infinity;
      // The closestPoint variable holds the closest intersection point of the ray and a wall
      // The ray acts like a ray of light. If it is colliding with a wall, it does not go through it, so we only need the closest one
      let closestPoint = null;

      // Iterate through the walls and check them against each ray for collision
      for (let wall of walls) {
        // Check if the ray collides with the wall
        let p = ray.cast(wall);
        if (p) {
          // Get the distance between the ray and the wall
          let dist = distance(ray.pos.x, ray.pos.y, p.x, p.y);

          dist *= abs(cos(ray.dir.angle(true) - this.angle));

          // If the distance is shorter than the current record, make it the new one
          if (dist <= record) {
            record = dist;
            closestPoint = p;
          }
        }
      }

      // Set the scene item at the index i to the record distance
      scene[i] = record;

      // If a closest point exists, it means the ray is colliding with a wall
      if (closestPoint) {
        // Draw the line
        canvas.line(this.pos.x, this.pos.y, closestPoint.x, closestPoint.y);
      }
    }
  }

  // The update method handles the rotation and movement of the camera, and calls the look and draw methods
  update() {
    this.look();

    // Handle camera rotation
    if (this.rotateDir === RIGHT) this.angle -= this.rotateStep;
    else if (this.rotateDir === LEFT) this.angle += this.rotateStep;

    // Handle camera movement
    if (this.moveDir === UP) {
      // The movement is calculated by the camera angle
      // If the player presses a movement key, the camera moves forward in relation to its angle offset
      // The movement is thus calculated by getting the vector of the future position of the camera and adding it to the camera position vector
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

    // Constrain teh camera within the canvas bounds
    // The canvas is in this case split into two halves, so the custom sceneW and sceneH variables are used
    if (this.pos.x <= 0) this.pos.x = 1;
    else if (this.pos.x >= sceneW) this.pos.x = sceneW - 1;
    if (this.pos.y <= 0) this.pos.y = 1;
    else if (this.pos.y >= sceneH) this.pos.y = sceneH - 1;

    this.draw();
  }
}
