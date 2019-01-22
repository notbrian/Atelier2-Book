let background_png;


let ship = {
    x: 0,
    y: 0,
    rot: -90,
    strikes: 0
}
let shipImage
let shipThrust_image

function drawHUD() {
    push()
    imageMode(CORNER)
    image(HUD, 0, 0, 800, 600)
    pop()
}

function doesCollide(rect, asteroidX, asteroidY) {
    var isCollision = false;
    let x = steroidX;
    let y = asteroidY;
    var left = rect.x - rect.width / 2,
        right = rect.x + rect.width / 2;
    var top = rect.y + rect.height / 2,
        bottom = rect.y - rect.height / 2;

    if (x <= right && x >= left && y <= top && y >= bottom) {
        isCollision = true;
    }

    return isCollision;
}

function setup() {
    createCanvas(800, 600);

    background_png = loadImage("./assets/background.png")
    shipImage = loadImage("./assets/ship.png")
    shipThrust_image = loadImage("./assets/shipThrust.png")
    ast_image = loadImage("./assets/Meteorite1.png")

    ship.x = width /2;
    ship.y = 520;
}
function draw() {
    image(background_png, 0,0)
    push()
    translate(ship.x,  ship.y)
    rotate(radians(-90))
    imageMode(CENTER)
    if(keyIsPressed ) {
       image(shipThrust_image, 0, 0, 120,100)
    } else {
       image(shipImage, 0, 0, 100,100)
    }
    pop()
    for (var s = 0; s != null; s++) {
      image(ast_image, Asteroid.x, Asteroid.y, Asteroid.width, Asteroid.height);
      asteroidFall()
      collisonCheck()
    }

    if(keyIsPressed && key === "a") {
        ship.x -= 3;
    }
    if(keyIsPressed && key === "d") {
        ship.x += 3;
    }

    if(ship.x <= 0 ) {
        ship.x = 0
    }

    if(ship.x >= width ) {
        ship.x = width
    }
    textAlign(CENTER);
    drawWords(width * 0.5);
}

function mousePressed() {
    console.log(mouseX, mouseY);
}

var Asteroid = {
  x : Math.random(0,799),
  y : 0,
  width : 15,
  height : 10
};
// Asteroids[Asteroid]
var Asteroids = [Asteroid];
// draw() {
function asteroidFall() {
         for (var i = 0; i < Asteroids.length; i++) {
              Asteroids[i].y = Asteroids[i].y + 5
         }
        }
//        For each Asteroid, subtract the y value by 5
//    }


//    Check if the asteroid is hitting the ship {
//        If it is, then take a strike off the ship
//    }
function collisonCheck() {
  for (var i = 0; i < Asteroids.length; i++) {
    if (doesCollide(Asteroids[i]) && ship.strikes < 3) {
        ship.strikes++
        console.log('!')
    }
    else if (doesCollide() && ship.strikes == 3) {
      s=null;
      function drawWords(x) {
        fill('red');
        text('GAME OVER', width * 0.5, height * 0.5);
}

    }
    else {

    };
  };
}


// }
