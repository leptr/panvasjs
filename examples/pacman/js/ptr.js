function isMobile() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

let canvas, id, keyCode, mouseX, mouseY;
let touches = [];
width = height = null;
const PI = Math.PI;
const E = Math.E;
const SQRT2 = Math.SQRT2;
const SQRT1_2 = Math.SQRT1_2;
const LN2 = Math.LN2;
const LN10 = Math.LN10;
const LOG2E = Math.LOG2E;
const LOG10E = Math.LOG10E;
let mobile;

let fr = 30;

function framerate(x) {
  if (x == null) {
    console.log("Please specify the framerate in framerate function");
  } else {
    clearInterval(interval);
    fr = x;
    interval = setInterval(loop, 1000 / fr);
  }
}

function playPause() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  } else {
    interval = setInterval(loop, fr);
  }
}

window.onload = function () {
  mobile = isMobile();
  if (typeof onMobile === "function" && mobile) onMobile();
  setup();
};

function loop() {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  update();
}

function createCanvas(w, h) {
  if (w == null && h == null) {
    console.log("Function createCanvas requires at least one attribute");
  } else {
    if (h != null) {
      this.width = w;
      this.height = h;
    } else {
      this.width = this.height = w;
    }
    width = w;
    height = h;

    canvas = document.createElement("CANVAS"); //creating a canvas element

    document.body.appendChild(canvas); //adding the canvas to the body

    canvas.width = this.width; //setting width
    canvas.height = this.height; //setting heigt

    interval = setInterval(loop, 1000 / fr);
  }
}

function setSize(w, h) {
  if (w == null && h == null) {
    log("setSize function requires at least one attribute");
  } else {
    if (h != null) {
      canvas.width = w;
      canvas.height = h;
    } else {
      canvas.width = canvas.height = w;
    }
    width = w;
    height = h;
  }
}

function getContext(can) {
  this.canvas = can;
  let c = this.canvas.getContext("2d");
  return c;
}

function background(r, g, b) {
  if ((r == null && g == null && b == null) || (r != null && g != null && b == null)) {
    console.log("Invalid attributes for background function");
  } else {
    if (g == null && b == null) {
      this.green = this.blue = this.red = r;
    } else {
      this.red = r;
      this.green = g;
      this.blue = b;
    }

    let col = "rgb(" + this.red + "," + this.green + "," + this.blue + ")"; //creating a string with the imputed color
    canvas.style.backgroundColor = col; //setting the background color
  }
}

function fill(r, g, b) {
  if ((r == null && g == null && b == null) || (r != null && g != null && b == null)) {
    console.log("Invalid attributes for fill function");
  } else {
    if (g == null && b == null) {
      this.green = this.blue = this.red = r;
    } else {
      this.red = r;
      this.green = g;
      this.blue = b;
    }

    let col = "rgb(" + this.red + "," + this.green + "," + this.blue + ")"; //creating a string with the imputed color
    canvas.getContext("2d").fillStyle = col;
  }
}

function stroke(r, g, b) {
  if ((r == null && g == null && b == null) || (r != null && g != null && b == null)) {
    console.log("Invalid attributes for stroke function");
  } else {
    if (g == null && b == null) {
      this.green = this.blue = this.red = r;
    } else {
      this.red = r;
      this.green = g;
      this.blue = b;
    }

    let col = "rgb(" + this.red + "," + this.green + "," + this.blue + ")"; //creating a string with the imputed color
    canvas.getContext("2d").strokeStyle = col;
  }
}

function rectangle(x, y, w, h) {
  if (w == null && h == null) {
    console.log("Invalid dimensions for rectangle function");
  } else {
    this.x = x;
    this.y = y;
    this.width = w;
    if (h == null) this.height = w;
    else this.height = h;
    canvas.getContext("2d").fillRect(this.x, this.y, this.width, this.height);
  }
}

function circle(x, y, r) {
  if (r == null) {
    console.log("Invalid radius for circle function");
  } else {
    this.x = x;
    this.y = y;
    this.radius = r;

    canvas.getContext("2d").beginPath();
    canvas.getContext("2d").arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    canvas.getContext("2d").fill();
  }
}

function Vector2(x, y) {
  this.x = 0;
  this.y = 0;

  this.previousX = 0;
  this.previousY = 0;

  if (x != null) this.x = x;
  if (y != null) this.y = y;

  this.Set = function (x, y) {
    if (x == null && y == null) {
      console.log("No X or Y value has been passed to the Vector2 Set function");
    } else {
      this.previousX = x;
      this.previousX = y;
      if (x != null) this.x = x;

      if (y != null) this.y = y;
    }
  };

  this.Add = function (x, y) {
    if (x == null && y == null) {
      console.log("No X or Y value has been passed to the Vector2 Add function");
    } else {
      this.previousX = this.x;
      this.previousY = this.y;

      if (x != null) this.x += x;

      if (y != null) this.y += y;
    }
  };

  this.Normalize = function () {
    let tmp = new Vector2(this.x, this.y);

    let mag = Math.sqrt(tmp.x * tmp.x + tmp.y * tmp.y);

    tmp.x = tmp.x / mag;
    tmp.y = tmp.y / mag;

    return tmp;
  };

  this.Distance = function (vec2) {
    if (vec2 != null) return Math.sqrt((this.x - vec2.x) * (this.x - vec2.x) + (this.y - vec2.y) * (this.y - vec2.y));
    else return Math.sqrt((this.x - previousX) * (this.x - previousX) + (this.y - previousY) * (this.y - previousY));
  };

  this.isOffScreen = function () {
    if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) return true;
    else return false;
  };
}

function random(a, b) {
  if (a == null && b == null) {
    return Math.random();
  } else {
    if (b != null) return Math.random() * a + (b - a);
    else return Math.random() * a;
  }
}

function floor(num) {
  return Math.floor(num);
}

function ceil(num) {
  return Math.ceil(num);
}

function round(num) {
  return Math.round(num);
}

function pow(base, pow) {
  return Math.pow(base, pow);
}

function sqrt(num) {
  return Math.sqrt(num);
}

function abs(num) {
  return Math.abs(num);
}

function sin(deg) {
  return Math.sin((deg * PI) / 180);
}

function cos(deg) {
  return Math.cos((deg * PI) / 180);
}

function acos(num) {
  return Math.acos(num);
}

function asin(num) {
  return Math.asin(num);
}

function tan(deg) {
  return Math.tan(deg);
}

function atan(num) {
  return Math.atan(num);
}

function exp(num) {
  return Math.exp(num);
}

function lg(num) {
  return Math.log(num);
}

let min = Math.min();

let max = Math.max();

function write(x) {
  document.write(x);
}

function log(x) {
  console.log(x);
}

function wait(x) {
  setTimeout(null, x);
}

function setText(el, x, isClass) {
  let elem;
  if (!isClass) {
    elem = document.getElementById(el);
  } else {
    elem = document.getElementByClassName(el);
  }
  elem.innerHtml = x;
}

window.addEventListener("keydown", function (e) {
  if (typeof keyDown === "function") {
    keyCode = e.keyCode;
    keyDown();
  }
});

window.addEventListener("keyup", function (e) {
  if (typeof keyUp === "function") {
    keyCode = e.keyCode;
    keyUp();
  }
});

window.addEventListener("touchstart", function (ev) {
  let touches = ev.touches;
  if (typeof touchStart === "function") {
    touchStart();
  }
});

window.addEventListener("touchmove", function (ev) {
  let touches = ev.touches;
  if (typeof touchMove === "function") {
    touchMove();
  }
});

window.addEventListener("touchend", function (ev) {
  let touches = ev.touches;
  if (typeof touchEnd === "function") {
    touchEnd();
  }
});

window.addEventListener("mousedown", function (ev) {
  if (!mobile) {
    mouseX = ev.mouseX;
    mouseY = ev.mouseY;
    if (typeof mouseDown === "function") {
      mouseDown();
    }
  }
});

window.addEventListener("mousemove", function (ev) {
  if (!mobile) {
    mouseX = ev.mouseX;
    mouseY = ev.mouseY;
    if (typeof mouseMove === "function") {
      mouseMove();
    }
  }
});

window.addEventListener("mouseup", function (ev) {
  if (!mobile) {
    mouseX = ev.mouseX;
    mouseY = ev.mouseY;
    if (typeof mouseUp === "function") {
      mouseUp();
    }
  }
});

function include(file) {
  let script = document.createElement("script");
  script.src = file;
  document.head.appendChild(script);
}
